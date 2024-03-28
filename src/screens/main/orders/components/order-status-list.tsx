import { useContext } from 'react'
import { HStack } from '@gluestack-ui/themed'
import AltButton from '../../../../components/alt-button/alt-button'
import { AppColors, TASK_STATUS_COLORS } from '../../../../constants/colors'
import { TasksFilterQueryContext } from '../../../../context/tasks/tasks-filter-query'

const OrderStatusList = () => {
    const { personalOrdersQuery, setPersonalOrdersQuery } = useContext(
        TasksFilterQueryContext
    )

    const orderStatuses1 = [
        {
            label: 'В работе',
            id: [3],
            color: TASK_STATUS_COLORS.IN_PROGRESS,
        },
        {
            label: 'На проверке',
            id: [4],
            color: TASK_STATUS_COLORS.ON_VERIFICATION,
        },
        {
            label: 'Завершенные',
            id: [5, 7],
            color: TASK_STATUS_COLORS.CLOSED,
        },
    ]

    return (
        <HStack gap="$2">
            {orderStatuses1.map((status, index) => (
                <AltButton
                    flex={index != 2 ? 3 : 4}
                    key={`status-${status.id}`}
                    text={status.label}
                    textProps={{
                        fontSize: '$xs',
                        color:
                            personalOrdersQuery.filter.order_status?.findIndex(
                                (value) =>
                                    value?.order_status_id === status.id[0]
                            ) !== -1 && status.id[0] !== 4
                                ? AppColors.textOnPrimary
                                : AppColors.text,
                    }}
                    borderColor={status.color}
                    bgColor={
                        personalOrdersQuery.filter.order_status?.findIndex(
                            (value) => value?.order_status_id === status.id[0]
                        ) !== -1
                            ? status.color
                            : AppColors.background
                    }
                    onPress={() => {
                        setPersonalOrdersQuery({
                            ...personalOrdersQuery,
                            filter: {
                                order_status: status.id.map((id) => ({
                                    order_status_id: id,
                                })),
                            },
                        })
                    }}
                    selected={
                        personalOrdersQuery.filter.order_status?.findIndex(
                            (value) => value?.order_status_id === status.id[0]
                        ) !== -1
                    }
                />
            ))}
        </HStack>
    )
}

export default OrderStatusList
