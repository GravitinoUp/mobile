import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppDispatch'
import {
    fetchMyOrders,
    fetchOrderStatuses,
} from '../../../redux/features/OrderSlice'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    FlatList,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import AppInput from '../../../components/ui/input'
import AppColors from '../../../constants/Colors'
import { SettingsIcon } from '../../../components/icons/SettingsIcon'
import AppButton from '../../../components/ui/button'
import OrderCard from './components/OrderCard'
import moment from 'moment'
import 'moment/locale/ru'
import AppStrings from '../../../constants/Strings'
import AppTopBar from '../../../components/AppTopBar'
import AppSelect from '../../../components/AppSelect'
import AddIcon from '../../../components/icons/AddIcon'
import EmptyOrderList from './components/EmptyOrderList'
import AppActionSheet from '../../../components/AppActionSheet'
import { ItemType } from 'react-native-dropdown-picker'
import {
    OrderPayloadInterface,
    OrderStatusInterface,
} from '../../../types/interface/orders'
import { HStack, SearchIcon } from '@gluestack-ui/themed'

moment.locale('ru')

export default function OrdersScreen({ navigation }: any) {
    const [search, onChangeSearch] = useState('')
    const [selectedDate, setSelectedDate] = useState(new Date())

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
    const orderState = useAppSelector((state) => state.order)

    useEffect(() => {
        dispatch(fetchOrderStatuses())
    }, [])

    useEffect(() => {
        const newStatusList: { value: number; label: string }[] = []

        orderState.orderStatuses.forEach((status: OrderStatusInterface) => {
            newStatusList.push({
                value: status.order_status_id!,
                label: `${status.order_status_name}`,
            })
        })

        setStatusList([...statusList, ...newStatusList])
    }, [orderState.orderStatuses])

    useEffect(() => {
        fetchOrders()
    }, [selectedDate])

    const fetchOrders = () => {
        const dateStart = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate()
        )
        const dateEnd = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate(),
            23,
            59,
            59
        )

        dateStart.setDate(selectedDate.getDate())
        dateEnd.setDate(selectedDate.getDate())

        const data: OrderPayloadInterface = {
            offset: {
                count: 50,
                page: 1,
            },
            filter: {
                order_status:
                    statusId > 0 ? [{ order_status_id: statusId }] : undefined,
                facility: {
                    checkpoint: {
                        branch: {
                            branch_id: branchId > 0 ? branchId : undefined,
                        },
                    },
                },
            },
            sorts: {
                planned_datetime: sort,
            },
            period: {
                date_start: dateStart.toDateString(),
                date_end: dateEnd.toDateString(),
            },
        }

        dispatch(fetchMyOrders(data))
    }

    const generateDates = () => {
        let list = []

        for (let i = -1; i < 7; i++) {
            const currentDate = new Date()
            currentDate.setDate(currentDate.getDate() + i)
            const formattedDate = moment(currentDate).format(
                AppStrings.shortDateFormat
            )

            list.push(
                <AppButton
                    key={`date-${i}`}
                    onPress={() => {
                        const current = moment(currentDate).format(
                            AppStrings.shortDateFormat
                        )
                        const selected = moment(selectedDate).format(
                            AppStrings.shortDateFormat
                        )

                        if (current != selected) {
                            setSelectedDate(currentDate)
                        }
                    }}
                    text={`${
                        i <= 1
                            ? i <= 0
                                ? i === -1
                                    ? AppStrings.yesterday
                                    : AppStrings.today
                                : AppStrings.tomorrow
                            : formattedDate
                    } `}
                    borderRadius={30}
                    borderColor={AppColors.text}
                    backgroundColor={
                        currentDate.getDate() === selectedDate.getDate()
                            ? AppColors.text
                            : AppColors.background
                    }
                    foregroundColor={
                        currentDate.getDate() === selectedDate.getDate()
                            ? AppColors.textOnPrimary
                            : AppColors.text
                    }
                    width="110px"
                    paddingY={5}
                    paddingX={10}
                    isLoading={
                        orderState.isLoading &&
                        currentDate.getDate() === selectedDate.getDate()
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
            <AppTopBar style={styles.header}>
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
                <ScrollView
                    horizontal
                    overScrollMode="never"
                    showsHorizontalScrollIndicator={false}
                    style={{ marginTop: 14 }}
                    contentContainerStyle={{ flexGrow: 1, gap: 8 }}
                >
                    {generateDates()}
                </ScrollView>
            </AppTopBar>
            {/* {!orderState.isLoading ? ( */}
            <FlatList
                contentContainerStyle={{ flexGrow: 1 }}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={() => fetchOrders()}
                    />
                }
                ListEmptyComponent={<EmptyOrderList />}
                data={orderState.orders}
                renderItem={({ item, index }) => (
                    <OrderCard
                        style={index === 0 ? { marginTop: 26 } : null}
                        orderData={item}
                        icon={<AddIcon />}
                        onPress={() =>
                            navigation.navigate('OrderScreen', { order: item })
                        }
                    />
                )}
            />
            {/* ) : (<LoadingView />)} */}
            <AppActionSheet
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
                    <AppSelect
                        hint={AppStrings.taskType}
                        items={taskTypeList}
                        value={taskTypeId}
                        setValue={setTaskTypeId}
                        searchable={false}
                    />
                    <AppSelect
                        hint={AppStrings.status}
                        items={statusList}
                        value={statusId}
                        setValue={setStatusId}
                        searchable={false}
                    />
                    <AppSelect
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
                        <AppSelect
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
                        fetchOrders()
                        setActionsheetOpen(false)
                    }}
                    paddingY={10}
                />
            </AppActionSheet>
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
