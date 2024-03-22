import { SafeAreaView } from 'react-native-safe-area-context'
import { AppColors } from '../../../../constants/colors'
import { StyleSheet, useWindowDimensions } from 'react-native'
import AppStrings from '../../../../constants/strings'
import AppBar, { AppBarTitle } from '../../../../components/ui/app-bar'
import { OrderInterface } from '../../../../types/interface/orders'
import { HStack, Text } from '@gluestack-ui/themed'
import OrderStatusCard from '../../../../components/order-status-card/order-status-card'
import BackButton from '../../../../components/back-button/back-button'
import { useContext, useEffect, useState } from 'react'
import { TabView } from 'react-native-tab-view'
import AppTabBar from '../../../../components/tab-bar/tab-bar'
import {
    useGetPersonalOrdersQuery,
    useUpdateStatusMutation,
    useUploadFileMutation,
} from '../../../../redux/api/orders'
import LoadingView from '../../../../components/ui/loading-view'
import useErrorToast from '../../../../hooks/use-error-toast'
import { TasksFilterQueryContext } from '../../../../context/tasks/tasks-filter-query'
import CloseOrderScreen from './close-order-screen'
import useSuccessToast from '../../../../hooks/use-success-toast'
import AsyncStorage from '@react-native-async-storage/async-storage'
import OrderInfo from './order-info'

const renderScene = ({
    route,
    navigation,
    order,
    files,
    setFiles,
    submitOrder,
    isLoading,
}: {
    route: {
        key: string
        title: string
    }
    navigation: any
    order: OrderInterface
    files: string[]
    setFiles: React.Dispatch<React.SetStateAction<string[]>>
    submitOrder: () => void
    isLoading: boolean
}) => {
    switch (route.key) {
        case 'orderClose':
            return (
                <CloseOrderScreen
                    order={order}
                    navigation={navigation}
                    files={files}
                    setFiles={setFiles}
                    submitOrder={submitOrder}
                    isLoading={isLoading}
                />
            )
        case 'orderInfo':
            return <OrderInfo order={order} />
        default:
            return null
    }
}

export default function OrderScreen({ navigation, route }: any) {
    const orderID: number = route.params.orderID

    const layout = useWindowDimensions()

    const [index, setIndex] = useState(0)
    const [routes, setRoutes] = useState([
        { key: 'orderClose', title: 'Закрыть задачу' },
        { key: 'orderInfo', title: 'Инфо о задаче' },
    ])

    const { personalOrdersQuery } = useContext(TasksFilterQueryContext)
    const {
        data: orders = { count: 0, data: [] },
        isFetching: orderFetching,
        isSuccess: orderSuccess,
        error: orderError,
    } = useGetPersonalOrdersQuery({
        ...personalOrdersQuery,
        filter: { order_id: orderID },
    })

    const [files, setFiles] = useState<string[]>([])

    const [
        closeOrder,
        { isLoading: orderClosing, isSuccess: closeSuccess, error: closeError },
    ] = useUpdateStatusMutation()

    const [
        uploadFiles,
        {
            isLoading: orderUploading,
            isSuccess: uploadSuccess,
            error: uploadError,
        },
    ] = useUploadFileMutation()

    const submitOrder = () => {
        const formData = new FormData()
        files.forEach((value) => {
            formData.append('files', {
                uri: value,
                name: value.split('/').pop(),
                type: `image/${value.split('.').pop()}`,
            })
        })

        uploadFiles({
            orderIDs: [orderID],
            directory: 'orders',
            formData,
        })
    }

    useEffect(() => {
        if (orderSuccess && orders.data[0].order_status.order_status_id !== 3) {
            setRoutes([{ key: 'orderInfo', title: 'Инфо о задаче' }])
        }
    }, [orderSuccess])

    useEffect(() => {
        if (uploadSuccess) {
            closeOrder({ order_id: orderID, order_status_id: '4' })
        }
    }, [uploadSuccess])

    useEffect(() => {
        if (closeSuccess) {
            AsyncStorage.removeItem(`order-${orderID}`).then(() => {
                navigation.navigate('HomeScreen')
            })
        }
    }, [closeSuccess])

    useSuccessToast('Задача успешно закрыта!', closeSuccess)
    useErrorToast(orderError || closeError || uploadError)

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: AppColors.background }}
        >
            <AppBar style={styles.header}>
                <HStack justifyContent="space-between" alignItems="center">
                    <BackButton navigation={navigation} />
                    {!orderFetching && (
                        <OrderStatusCard
                            orderStatus={
                                orders.data[0].order_status.order_status_name
                            }
                        />
                    )}
                </HStack>
                <AppBarTitle>
                    {!orderFetching
                        ? `№${orders.data[0].order_id}`
                        : AppStrings.loading}
                </AppBarTitle>
            </AppBar>
            {!orderFetching && orderSuccess ? (
                <TabView
                    navigationState={{ index, routes }}
                    onIndexChange={setIndex}
                    renderTabBar={(props) => {
                        props.navigationState.routes =
                            props.navigationState.routes.filter(
                                (value) =>
                                    (value.key !== 'orderClose' &&
                                        orders.data[0].order_status
                                            .order_status_id !== 3) ||
                                    orders.data[0].order_status
                                        .order_status_id === 3
                            )

                        return <AppTabBar {...props} />
                    }}
                    renderScene={({ route }) =>
                        renderScene({
                            route,
                            navigation,
                            order: orders.data[0],
                            files,
                            setFiles,
                            submitOrder,
                            isLoading: orderClosing || orderUploading,
                        })
                    }
                    initialLayout={{ width: layout.width }}
                />
            ) : (
                <LoadingView />
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 8,
        paddingBottom: 16,
        paddingHorizontal: 16,
    },
})
