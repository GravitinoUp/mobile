import { HStack, SearchIcon } from '@gluestack-ui/themed'
import { useContext, useState } from 'react'
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import { ItemType } from 'react-native-dropdown-picker'
import { SafeAreaView } from 'react-native-safe-area-context'
import AltButton from '../../../components/alt-button/alt-button'
import { SettingsIcon } from '../../../components/icons/SettingsIcon'
import AppActionsheet from '../../../components/ui/actionsheet'
import AppBar from '../../../components/ui/app-bar'
import AppButton from '../../../components/ui/button'
import AppInput from '../../../components/ui/input'
import LoadingView from '../../../components/ui/loading-view'
import Select from '../../../components/ui/select'
import { AppColors } from '../../../constants/colors'
import AppStrings from '../../../constants/strings'
import { TasksFilterQueryContext } from '../../../context/tasks/tasks-filter-query'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { api } from '../../../redux/api'
import { useGetPersonalOrdersQuery } from '../../../redux/api/orders'
import { formatDateISO } from '../../../utils/helpers'
import EmptyOrderList from './components/EmptyOrderList'
import OrderCard from './components/order-card'

export default function OrdersScreen({ navigation }: any) {
    const [search, onChangeSearch] = useState('')

    const [isActionsheetOpen, setActionsheetOpen] = useState(false)

    const [taskTypeId, setTaskTypeId] = useState(0)
    const [taskTypeList, setTaskTypeList] = useState<ItemType<number>[]>([
        { value: 0, label: 'Все' },
    ])

    const [statusId, setStatusId] = useState(0)
    const [statusList, setStatusList] = useState<ItemType<number>[]>([
        { value: 0, label: 'Все' },
    ])

    const [branchId, setBranchId] = useState(0)
    const [branchList, setBranchList] = useState<ItemType<number>[]>([
        { value: 0, label: 'Все' },
    ])

    const [sort, setSort] = useState<'ASC' | 'DESC'>('ASC')
    const sortList = [
        { value: 'ASC', label: 'По возрастанию' },
        { value: 'DESC', label: 'По убыванию' },
    ]

    const dispatch = useAppDispatch()

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
            {!isLoading ? (
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
            <AppActionsheet
                style={{ paddingHorizontal: 30 }}
                isOpen={isActionsheetOpen}
                onClose={() => setActionsheetOpen(false)}
            >
                <Text style={styles.filterTitle}>{AppStrings.setFilter}</Text>
                <View
                    style={{
                        flexDirection: 'column',
                        gap: 25,
                        marginBottom: 40,
                    }}
                >
                    <Select
                        hint={AppStrings.taskType}
                        items={taskTypeList}
                        value={taskTypeId}
                        setValue={setTaskTypeId}
                        searchable={false}
                    />
                    <Select
                        hint={AppStrings.status}
                        items={statusList}
                        value={statusId}
                        setValue={setStatusId}
                        searchable={false}
                    />
                    <Select
                        hint={AppStrings.branch}
                        items={branchList}
                        value={branchId}
                        setValue={setBranchId}
                        searchable={false}
                    />
                    <HStack style={{ alignItems: 'center' }}>
                        <Text style={[styles.filterSort, { flex: 1 }]}>
                            {AppStrings.sortTasks}
                        </Text>
                        <Select
                            style={{ flex: 1 }}
                            items={sortList}
                            value={sort}
                            setValue={setSort}
                            searchable={false}
                            labelStyle={styles.sortText}
                        />
                    </HStack>
                </View>
                <AppButton
                    style={styles.filterApplyButton}
                    text={AppStrings.apply}
                    onPress={() => {
                        refetch()
                        setActionsheetOpen(false)
                    }}
                    py={10}
                />
            </AppActionsheet>
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
