import { HStack, SearchIcon } from '@gluestack-ui/themed'
import { useContext, useEffect, useState } from 'react'
import { FlatList, RefreshControl, useWindowDimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AltButton from '../../../components/alt-button/alt-button'
import { SettingsIcon } from '../../../components/icons/SettingsIcon'
import AppBar from '../../../components/ui/app-bar'
import AppInput from '../../../components/ui/input'
import LoadingView from '../../../components/ui/loading-view'
import { AppColors } from '../../../constants/colors'
import AppStrings from '../../../constants/strings'
import { TasksFilterQueryContext } from '../../../context/tasks/tasks-filter-query'
import { useGetPersonalOrdersQuery } from '../../../redux/api/orders'
import { formatDateISO } from '../../../utils/helpers'
import EmptyOrderList from './components/empty-order-list'
import OrderCard from './components/order-card'
import FiltersActionsheet from './components/filters-actionsheet'
import { TabView } from 'react-native-tab-view'
import useErrorToast from '../../../hooks/use-error-toast'
import AppTabBar from '../../../components/tab-bar/tab-bar'

const OrdersTab = ({ navigation, query }: { navigation: any; query: any }) => {
    const {
        data: orders = { count: 0, data: [] },
        isFetching,
        isSuccess,
        error,
        refetch,
    } = useGetPersonalOrdersQuery(query)

    useErrorToast(error)

    return !isFetching && isSuccess ? (
        <FlatList
            contentContainerStyle={{ flexGrow: 1 }}
            refreshControl={
                <RefreshControl
                    refreshing={false}
                    onRefresh={() => {
                        refetch()
                    }}
                />
            }
            ListEmptyComponent={<EmptyOrderList />}
            data={orders.data}
            renderItem={({ item, index }) => (
                <OrderCard
                    style={index === 0 ? { marginTop: 26 } : null}
                    orderData={item}
                    onPress={() =>
                        navigation.navigate('OrderScreen', {
                            orderID: item.order_id,
                        })
                    }
                />
            )}
        />
    ) : (
        <LoadingView />
    )
}

const renderScene = ({
    route,
    navigation,
    query,
}: {
    route: {
        key: string
        title: string
    }
    navigation: any
    query: any
}) => {
    switch (route.key) {
        case 'inProgress':
            return (
                <OrdersTab
                    navigation={navigation}
                    query={{
                        ...query,
                        filter: {
                            ...query.filter,
                            order_status: [{ order_status_id: 3 }],
                        },
                    }}
                />
            )
        case 'closed':
            return (
                <OrdersTab
                    navigation={navigation}
                    query={{
                        ...query,
                        filter: {
                            ...query.filter,
                            order_status: [{ order_status_id: 5 }],
                        },
                    }}
                />
            )
        default:
            return null
    }
}

export default function OrdersScreen({ navigation }: any) {
    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: 'inProgress', title: AppStrings.orderInProgress },
        { key: 'closed', title: AppStrings.closedOrders },
    ])

    const [search, setSearch] = useState('')
    const [actionsheetOpen, setActionsheetOpen] = useState(false)

    const { personalOrdersQuery, setPersonalOrdersQuery } = useContext(
        TasksFilterQueryContext
    )

    const generateDates = () => {
        let list = []

        for (let i = -1; i < 2; i++) {
            const currentDate = new Date()
            currentDate.setDate(currentDate.getDate() + i)
            currentDate.setHours(0, 0, 0, 0)

            const buttonTitle =
                i === -1
                    ? AppStrings.yesterday
                    : i === 0
                    ? AppStrings.today
                    : AppStrings.tomorrow

            list.push(
                <AltButton
                    key={`date-${i}`}
                    text={buttonTitle}
                    onPress={() => {
                        const date = formatDateISO(currentDate, true)
                        currentDate.setHours(24, 0, 0, 0)
                        const endDate = formatDateISO(currentDate, true)

                        setPersonalOrdersQuery({
                            ...personalOrdersQuery,
                            period: {
                                date_start: date,
                                date_end: endDate,
                            },
                        })

                        console.log(date)
                        console.log(endDate)
                    }}
                    selected={
                        personalOrdersQuery.period.date_start ===
                        formatDateISO(currentDate, true)
                    }
                />
            )
        }

        return list
    }

    useEffect(() => {
        const delayTimeoutId = setTimeout(() => {
            setPersonalOrdersQuery({
                ...personalOrdersQuery,
                filter: {
                    ...personalOrdersQuery.filter,
                    order_name:
                        search.trim().length !== 0 ? search.trim() : undefined,
                },
            })
        }, 500)
        return () => clearTimeout(delayTimeoutId)
    }, [search, 500])

    const layout = useWindowDimensions()
    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: AppColors.background }}
        >
            <AppBar>
                <AppInput
                    value={search}
                    onChangeText={(text) => setSearch(text)}
                    placeholder={AppStrings.search}
                    leadingIcon={<SearchIcon />}
                    trailingIcon={<SettingsIcon />}
                    onTrailingIconPress={() => setActionsheetOpen(true)}
                />
                <HStack mt="$3" gap={'$2'}>
                    {generateDates()}
                </HStack>
            </AppBar>
            <TabView
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderTabBar={(props) => <AppTabBar {...props} />}
                renderScene={({ route }) =>
                    renderScene({
                        route,
                        navigation,
                        query: personalOrdersQuery,
                    })
                }
                initialLayout={{ width: layout.width }}
            />
            <FiltersActionsheet
                actionsheetOpen={actionsheetOpen}
                setActionsheetOpen={setActionsheetOpen}
            />
        </SafeAreaView>
    )
}
