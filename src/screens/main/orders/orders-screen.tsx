import { HStack, SearchIcon } from '@gluestack-ui/themed'
import { useContext, useEffect, useMemo, useState } from 'react'
import { FlatList, RefreshControl, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AltButton from '../../../components/alt-button/alt-button'
import { SettingsIcon } from '../../../components/icons/SettingsIcon'
import AppBar from '../../../components/ui/app-bar'
import AppInput from '../../../components/ui/input'
import LoadingView from '../../../components/ui/loading-view'
import { AppColors } from '../../../constants/colors'
import AppStrings from '../../../constants/strings'
import { TasksFilterQueryContext } from '../../../context/tasks/tasks-filter-query'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { api } from '../../../redux/api'
import { useGetPersonalOrdersQuery } from '../../../redux/api/orders'
import { formatDateISO } from '../../../utils/helpers'
import EmptyOrderList from './components/empty-order-list'
import OrderCard from './components/order-card'
import FiltersActionsheet from './components/filters-actionsheet'

export default function OrdersScreen({ navigation }: any) {
    const dispatch = useAppDispatch()

    const [search, onChangeSearch] = useState('')
    const [actionsheetOpen, setActionsheetOpen] = useState(false)

    const { personalOrdersQuery, setPersonalOrdersQuery } = useContext(
        TasksFilterQueryContext
    )

    const {
        data: orders = { count: 0, data: [] },
        isLoading,
        isSuccess,
        error,
        refetch,
    } = useGetPersonalOrdersQuery(personalOrdersQuery)

    useEffect(() => {
        console.log(orders)
        console.log(personalOrdersQuery)
    }, [orders])

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
                        currentDate.setHours(23, 59, 0, 0)
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

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: AppColors.background }}
        >
            <AppBar style={styles.header}>
                <AppInput
                    value={search}
                    onChangeText={(text: string) => {
                        onChangeSearch(text)
                    }}
                    placeholder={AppStrings.search}
                    leadingIcon={<SearchIcon />}
                    trailingIcon={<SettingsIcon />}
                    onTrailingIconPress={() => setActionsheetOpen(true)}
                />
                <HStack mt="$3" gap={'$2'}>
                    {generateDates()}
                </HStack>
            </AppBar>
            {!isLoading && isSuccess ? (
                <FlatList
                    contentContainerStyle={{ flexGrow: 1 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={() => {
                                dispatch(api.util.invalidateTags(['Orders']))
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
                                    order: item,
                                })
                            }
                        />
                    )}
                />
            ) : (
                <LoadingView />
            )}
            <FiltersActionsheet
                actionsheetOpen={actionsheetOpen}
                setActionsheetOpen={setActionsheetOpen}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 12,
        paddingTop: 30,
        paddingBottom: 16,
    },
    filterTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: AppColors.text,
        textAlign: 'center',
        marginBottom: 40,
    },
    filterSort: {
        fontSize: 15,
        color: AppColors.bodyLight,
    },
    filterApplyButton: {
        marginHorizontal: 30,
        marginBottom: 40,
    },
    sortText: {
        paddingHorizontal: 10,
        paddingVertical: 3.5,
        fontSize: 16,
        color: AppColors.text,
    },
})
