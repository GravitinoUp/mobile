import { useContext, useEffect, useState } from 'react'
import { Divider, SearchIcon, View } from '@gluestack-ui/themed'
import { FlatList, RefreshControl, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import DateList from './components/date-list'
import OrderCard from './components/order-card'
import OrderStatusList from './components/order-status-list'
import EmptyList from '../../../components/empty-list/empty-list'
import AppBar from '../../../components/ui/app-bar'
import AppInput from '../../../components/ui/input'
import LoadingView from '../../../components/ui/loading-view'
import { AppColors } from '../../../constants/colors'
import AppStrings from '../../../constants/strings'
import { TasksFilterQueryContext } from '../../../context/tasks/tasks-filter-query'
import useErrorToast from '../../../hooks/use-error-toast'
import { useGetPersonalOrdersQuery } from '../../../redux/api/orders'

export default function OrdersScreen({ navigation }: any) {
    const [search, setSearch] = useState('')
    //const [actionsheetOpen, setActionsheetOpen] = useState(false)

    const { personalOrdersQuery, setPersonalOrdersQuery } = useContext(
        TasksFilterQueryContext
    )

    const {
        data: orders = { count: 0, data: [] },
        isFetching,
        isSuccess,
        error,
        refetch,
    } = useGetPersonalOrdersQuery(personalOrdersQuery)

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

    useErrorToast(error)

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: AppColors.background }}
        >
            <AppBar style={styles.header}>
                <View px="$4">
                    <AppInput
                        value={search}
                        onChangeText={setSearch}
                        placeholder={AppStrings.search}
                        leadingIcon={<SearchIcon />}
                        //trailingIcon={<SettingsIcon />}
                        //onTrailingIconPress={() => setActionsheetOpen(true)}
                    />
                    <DateList />
                </View>
                <Divider my="$3" />
                <View px="$4">
                    <OrderStatusList />
                </View>
            </AppBar>
            {!isFetching && isSuccess ? (
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
                    ListEmptyComponent={
                        <EmptyList label={AppStrings.emptyOrderList} />
                    }
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
            )}
            {/* <FiltersActionsheet
                actionsheetOpen={actionsheetOpen}
                setActionsheetOpen={setActionsheetOpen}
            /> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 0,
        paddingBottom: 12,
        elevation: 12,
        shadowColor: AppColors.text,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
})
