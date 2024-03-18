import { StyleSheet } from 'react-native'
import AppActionsheet from '../../../../components/ui/actionsheet'
import AppSelect, {
    SelectItemInterface,
} from '../../../../components/ui/select'
import AppStrings from '../../../../constants/strings'
import { useGetAllOrderStatusesQuery } from '../../../../redux/api/order-statuses'
import { Text, VStack } from '@gluestack-ui/themed'
import AppButton from '../../../../components/ui/button'
import { AppColors } from '../../../../constants/colors'
import { useState } from 'react'
import {
    defaultSelectItem,
    placeholderQuery,
    sortVariants,
    taskTypes,
} from '../../../../constants/constants'
import { useGetBranchesQuery } from '../../../../redux/api/branch'

interface FiltersActionsheetProps {
    actionsheetOpen: boolean
    setActionsheetOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const FiltersActionsheet = ({
    actionsheetOpen,
    setActionsheetOpen,
}: FiltersActionsheetProps) => {
    const [taskType, setTaskType] =
        useState<SelectItemInterface>(defaultSelectItem)
    const [orderStatus, setOrderStatus] =
        useState<SelectItemInterface>(defaultSelectItem)
    const [branch, setBranch] = useState<SelectItemInterface>(defaultSelectItem)
    const [sorting, setSorting] = useState<SelectItemInterface>(sortVariants[0])

    const {
        data: orderStatuses = [],
        isLoading: orderStatusesLoading,
        isSuccess: orderStatusesSuccess,
        error: orderStatusesError,
    } = useGetAllOrderStatusesQuery()

    const formattedOrderStatuses = orderStatuses.map((status) => ({
        label: status.order_status_name,
        value: status.order_status_name,
    }))

    const {
        data: branches = { count: 0, data: [] },
        isLoading: branchesLoading,
        isSuccess: branchesSuccess,
        error: branchesError,
    } = useGetBranchesQuery(placeholderQuery)

    const formattedBranches = branches.data.map((branch) => ({
        label: branch.branch_name,
        value: branch.branch_name,
    }))

    return (
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
                <AppSelect
                    hint={AppStrings.taskType}
                    items={taskTypes}
                    value={taskType}
                    setValue={setTaskType}
                />
                <AppSelect
                    hint={AppStrings.status}
                    items={formattedOrderStatuses}
                    value={orderStatus}
                    setValue={setOrderStatus}
                    isDisabled={orderStatusesLoading}
                />
                <AppSelect
                    hint={AppStrings.branch}
                    items={formattedBranches}
                    value={branch}
                    setValue={setBranch}
                    isDisabled={branchesLoading}
                />
                <AppSelect
                    items={sortVariants}
                    value={sorting}
                    setValue={setSorting}
                    includeDefault={false}
                    hint={AppStrings.sortTasks}
                />
                {/* <HStack flexDirection="row" alignItems="center">
                    <Text
                        style={{ flex: 1 }}
                        color={AppColors.bodyLight}
                        fontSize={14}
                        mr="$2"
                    >
                        {AppStrings.sortTasks}
                    </Text>
                    <AppSelect
                        style={{ flex: 2 }}
                        items={sortVariants}
                        value={sorting}
                        setValue={setSorting}
                        includeDefault={false}
                        placeholder={AppStrings.defaultSorting}
                    />
                </HStack> */}
            </VStack>
            <AppButton
                text={AppStrings.apply}
                onPress={() => {
                    setActionsheetOpen(false)
                }}
                py={10}
                mb="$4"
            />
        </AppActionsheet>
    )
}

export default FiltersActionsheet

const styles = StyleSheet.create({
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
    sortText: {
        paddingHorizontal: 10,
        paddingVertical: 3.5,
        fontSize: 16,
        color: AppColors.text,
    },
})
