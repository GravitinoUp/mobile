import AppActionsheet from '../../../../components/ui/actionsheet'
import AppSelect from '../../../../components/ui/select'
import AppStrings from '../../../../constants/strings'
import { useGetAllOrderStatusesQuery } from '../../../../redux/api/order-statuses'
import { Text, VStack } from '@gluestack-ui/themed'
import AppButton from '../../../../components/ui/button'
import {
    defaultSelectItem,
    placeholderQuery,
    sortVariants,
    taskTypes,
} from '../../../../constants/constants'
import { useGetBranchesQuery } from '../../../../redux/api/branch'
import { useForm } from '../../../../components/form/form'
import { z } from 'zod'
import { Controller } from 'react-hook-form'
import { Fragment, useContext, useState } from 'react'
import { TasksFilterQueryContext } from '../../../../context/tasks/tasks-filter-query'
import DatePicker from 'react-native-date-picker'

const filterSchema = z.object({
    task_type: z.string(),
    order_status_id: z.number(),
    branch_id: z.number(),
    sorting: z.string(),
})

interface FiltersActionsheetProps {
    actionsheetOpen: boolean
    setActionsheetOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const FiltersActionsheet = ({
    actionsheetOpen,
    setActionsheetOpen,
}: FiltersActionsheetProps) => {
    const [datePickerOpen, setDatePickerOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())

    const form = useForm({
        schema: filterSchema,
        defaultValues: {
            task_type: 'all',
            order_status_id: 0,
            branch_id: 0,
            sorting: 'ASC',
        },
    })

    const { personalOrdersQuery, setPersonalOrdersQuery } = useContext(
        TasksFilterQueryContext
    )

    const {
        data: orderStatuses = [],
        isLoading: orderStatusesLoading,
        isSuccess: orderStatusesSuccess,
        error: orderStatusesError,
    } = useGetAllOrderStatusesQuery()

    const formattedOrderStatuses = orderStatuses.map((status) => ({
        label: status.order_status_name,
        value: `${status.order_status_id}`,
    }))
    formattedOrderStatuses.unshift(defaultSelectItem)

    const {
        data: branches = { count: 0, data: [] },
        isLoading: branchesLoading,
        isSuccess: branchesSuccess,
        error: branchesError,
    } = useGetBranchesQuery(placeholderQuery)

    const formattedBranches = branches.data.map((branch) => ({
        label: branch.branch_name,
        value: `${branch.branch_id}`,
    }))
    formattedBranches.unshift(defaultSelectItem)

    const handleSubmit = (data: z.infer<typeof filterSchema>) => {
        setPersonalOrdersQuery({
            ...personalOrdersQuery,
            filter: {
                facility: {
                    checkpoint: {
                        branch: {
                            branch_id:
                                data.branch_id !== 0
                                    ? data.branch_id
                                    : undefined,
                        },
                    },
                },
                order_status:
                    data.order_status_id !== 0
                        ? [{ order_status_id: data.order_status_id }]
                        : undefined,
            },
        })

        setActionsheetOpen(false)
    }

    return (
        <Fragment>
            <DatePicker
                modal
                mode="date"
                open={datePickerOpen}
                date={selectedDate}
                onConfirm={(newDate) => {
                    setDatePickerOpen(false)
                    setSelectedDate(newDate)
                }}
                onCancel={() => setDatePickerOpen(false)}
            />
            <AppActionsheet
                px="$6"
                isOpen={actionsheetOpen}
                onClose={() => setActionsheetOpen(false)}
            >
                <Text
                    fontSize="$xl"
                    fontWeight="$bold"
                    textAlign="center"
                    mt="$2"
                    mb="$8"
                >
                    {AppStrings.setFilter}
                </Text>
                <VStack gap="$6" mb="$10">
                    <Controller
                        control={form.control}
                        name="task_type"
                        render={({ field }) => (
                            <AppSelect
                                hint={AppStrings.taskType}
                                items={taskTypes}
                                selectedValue={field.value}
                                onValueChange={field.onChange}
                            />
                        )}
                    />
                    <Controller
                        control={form.control}
                        name="order_status_id"
                        render={({ field }) => (
                            <AppSelect
                                hint={AppStrings.status}
                                items={formattedOrderStatuses}
                                selectedValue={
                                    field.value !== 0
                                        ? String(field.value)
                                        : 'all'
                                }
                                onValueChange={(value) =>
                                    field.onChange(
                                        value !== 'all' ? Number(value) : 0
                                    )
                                }
                                isDisabled={orderStatusesLoading}
                            />
                        )}
                    />
                    <Controller
                        control={form.control}
                        name="branch_id"
                        render={({ field }) => (
                            <AppSelect
                                hint={AppStrings.branch}
                                items={formattedBranches}
                                selectedValue={
                                    field.value !== 0
                                        ? String(field.value)
                                        : 'all'
                                }
                                onValueChange={(value) =>
                                    field.onChange(
                                        value !== 'all' ? Number(value) : 0
                                    )
                                }
                                isDisabled={branchesLoading}
                            />
                        )}
                    />
                    <Controller
                        control={form.control}
                        name="sorting"
                        render={({ field }) => (
                            <AppSelect
                                hint={AppStrings.sortTasks}
                                items={sortVariants}
                                selectedValue={field.value}
                                onValueChange={field.onChange}
                            />
                        )}
                    />
                </VStack>
                <AppButton
                    text={AppStrings.apply}
                    onPress={() => {
                        handleSubmit(form.getValues())
                    }}
                    py={10}
                    mb="$4"
                />
            </AppActionsheet>
        </Fragment>
    )
}

export default FiltersActionsheet
