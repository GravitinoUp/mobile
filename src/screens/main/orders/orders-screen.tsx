import { useContext, useEffect, useState } from 'react'
import { SearchIcon } from '@gluestack-ui/themed'
import { FlatList, RefreshControl, useWindowDimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TabView } from 'react-native-tab-view'
import DateList from './components/date-list'
import FiltersActionsheet from './components/filters-actionsheet'
import OrderCard from './components/order-card'
import EmptyList from '../../../components/empty-list/empty-list'
import { SettingsIcon } from '../../../components/icons/SettingsIcon'
import AppTabBar from '../../../components/tab-bar/tab-bar'
import AppBar from '../../../components/ui/app-bar'
import AppInput from '../../../components/ui/input'
import LoadingView from '../../../components/ui/loading-view'
import { AppColors } from '../../../constants/colors'
import AppStrings from '../../../constants/strings'
import { TasksFilterQueryContext } from '../../../context/tasks/tasks-filter-query'
import useErrorToast from '../../../hooks/use-error-toast'
import { useGetPersonalOrdersQuery } from '../../../redux/api/orders'
import { OrderStatusInterface } from '../../../types/interface/orders'

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
            ListEmptyComponent={<EmptyList label={AppStrings.emptyOrderList} />}
            data={orders.data}
            renderItem={({ item, index }) => (
                <OrderCard
                    style={index === 0 ? { marginTop: 20 } : null}
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
    const orderStatuses: Partial<OrderStatusInterface>[] = []
    switch (route.key) {
        case 'assigned':
            orderStatuses.push({ order_status_id: 2 })
            break
        case 'inProgress':
            orderStatuses.push({ order_status_id: 3 })
            break
        case 'onVerification':
            orderStatuses.push({ order_status_id: 4 })
            break
        case 'closed':
            orderStatuses.push({ order_status_id: 5 })
            orderStatuses.push({ order_status_id: 7 })
            break
        default:
    }

    return (
        <OrdersTab
            navigation={navigation}
            query={{
                ...query,
                filter: {
                    ...query.filter,
                    order_status: orderStatuses,
                },
            }}
        />
    )
}

export default function OrdersScreen({ navigation }: any) {
    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: 'assigned', title: AppStrings.orderAssigned },
        { key: 'inProgress', title: AppStrings.orderInProgress },
        { key: 'onVerification', title: AppStrings.orderOnVerification },
        { key: 'closed', title: AppStrings.closedOrders },
    ])

    const [search, setSearch] = useState('')
    const [actionsheetOpen, setActionsheetOpen] = useState(false)

    const { personalOrdersQuery, setPersonalOrdersQuery } = useContext(
        TasksFilterQueryContext
    )

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
                    onChangeText={setSearch}
                    placeholder={AppStrings.search}
                    leadingIcon={<SearchIcon />}
                    trailingIcon={<SettingsIcon />}
                    onTrailingIconPress={() => setActionsheetOpen(true)}
                />
                <DateList />
            </AppBar>
            <TabView
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderTabBar={(props) => <AppTabBar scrollEnabled {...props} />}
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
