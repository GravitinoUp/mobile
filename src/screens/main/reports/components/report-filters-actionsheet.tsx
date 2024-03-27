import { useContext, useState } from 'react'
import { Text, VStack, View } from '@gluestack-ui/themed'
import DatePicker from 'react-native-date-picker'
import { z } from 'zod'
import CalendarIcon from '../../../../assets/icons/calendar'
import { CustomForm, useForm } from '../../../../components/form/form'
import AppActionsheet from '../../../../components/ui/actionsheet'
import AppButton from '../../../../components/ui/button'
import {
    FormField,
    FormItem,
    FormMessage,
} from '../../../../components/ui/form'
import AppInput from '../../../../components/ui/input'
import AppSelect from '../../../../components/ui/select'
import { AppColors } from '../../../../constants/colors'
import { sortVariants } from '../../../../constants/constants'
import AppStrings from '../../../../constants/strings'
import { ReportsFilterQueryContext } from '../../../../context/tasks/reports-filter-query'
import { formatDate, formatDateISO } from '../../../../utils/helpers'

const filterSchema = z
    .object({
        sorting_column: z.string(),
        sorting_variant: z.string(),
        date_start: z.string(),
        date_end: z.string(),
    })
    .refine((data) => data.date_end > data.date_start, {
        message: AppStrings.dateMismatch,
        path: ['date_start'],
    })

interface ReportFiltersActionsheetProps {
    actionsheetOpen: boolean
    setActionsheetOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ReportFiltersActionsheet = ({
    actionsheetOpen,
    setActionsheetOpen,
}: ReportFiltersActionsheetProps) => {
    const [invalid, setInvalid] = useState(false)

    const [startDatePickerOpen, setStartDatePickerOpen] = useState(false)
    const [endDatePickerOpen, setEndDatePickerOpen] = useState(false)

    const { reportsQuery, setReportsQuery } = useContext(
        ReportsFilterQueryContext
    )

    const form = useForm({
        schema: filterSchema,
        defaultValues: {
            sorting_column: 'completed_percent',
            sorting_variant: 'DESC',
            date_start: reportsQuery.period.date_start,
            date_end: reportsQuery.period.date_end,
        },
    })

    const onSubmit = (data: z.infer<typeof filterSchema>) => {
        setInvalid(false)

        setReportsQuery({
            ...reportsQuery,
            sorts: {
                [`${data.sorting_column}`]: data.sorting_variant,
            },
            period: {
                date_start: formatDateISO(data.date_start),
                date_end: formatDateISO(data.date_end),
            },
        })

        setActionsheetOpen(false)
    }

    const columns = [
        { label: 'Количеству исполненных задач', value: 'completed_percent' },
        { label: 'Количеству провереннных задач', value: 'checked_percent' },
    ]

    return (
        <AppActionsheet
            px="$6"
            isOpen={actionsheetOpen}
            onClose={() => setActionsheetOpen(false)}
        >
            <CustomForm form={form}>
                <Text
                    fontSize="$xl"
                    fontWeight="$bold"
                    textAlign="center"
                    mt="$2"
                    mb="$8"
                >
                    {AppStrings.setFilter}
                </Text>
                <VStack gap="$2" mb="$5">
                    <FormField
                        control={form.control}
                        name="sorting_column"
                        render={({ field }) => (
                            <AppSelect
                                hint={AppStrings.sortBy}
                                items={columns}
                                selectedValue={field.value}
                                onValueChange={field.onChange}
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="sorting_variant"
                        render={({ field }) => (
                            <AppSelect
                                hint={AppStrings.sortVariant}
                                items={sortVariants}
                                selectedValue={field.value}
                                onValueChange={field.onChange}
                            />
                        )}
                    />
                </VStack>
                <Text pb={6} fontSize="$sm" color={AppColors.bodyLight}>
                    {AppStrings.period}
                </Text>
                <View style={{ flexDirection: 'row' }} gap="$2">
                    <FormField
                        control={form.control}
                        name="date_start"
                        render={({ field }) => (
                            <FormItem style={{ flex: 1 }}>
                                <DatePicker
                                    modal
                                    mode="date"
                                    open={startDatePickerOpen}
                                    date={new Date(field.value)}
                                    onConfirm={(newDate) => {
                                        setStartDatePickerOpen(false)

                                        field.onChange(formatDateISO(newDate))
                                    }}
                                    onCancel={() =>
                                        setStartDatePickerOpen(false)
                                    }
                                />
                                <AppInput
                                    value={formatDate(field.value)}
                                    placeholder={AppStrings.dateStart}
                                    leadingIcon={<CalendarIcon />}
                                    readOnly
                                    onTouchEnd={() =>
                                        setStartDatePickerOpen(true)
                                    }
                                />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="date_end"
                        render={({ field }) => (
                            <FormItem style={{ flex: 1 }}>
                                <DatePicker
                                    modal
                                    mode="date"
                                    open={endDatePickerOpen}
                                    date={new Date(field.value)}
                                    onConfirm={(newDate) => {
                                        setEndDatePickerOpen(false)

                                        field.onChange(formatDateISO(newDate))
                                    }}
                                    onCancel={() => setEndDatePickerOpen(false)}
                                />
                                <AppInput
                                    value={formatDate(field.value)}
                                    placeholder={AppStrings.dateEnd}
                                    leadingIcon={<CalendarIcon />}
                                    readOnly
                                    onTouchEnd={() =>
                                        setEndDatePickerOpen(true)
                                    }
                                />
                            </FormItem>
                        )}
                    />
                </View>
                <View mt="$1" mb="$10">
                    {invalid && form.getFieldState('date_start').invalid && (
                        <FormMessage>{AppStrings.dateMismatch}</FormMessage>
                    )}
                </View>
                <AppButton
                    text={AppStrings.apply}
                    onPress={form.handleSubmit(onSubmit, () =>
                        setInvalid(true)
                    )}
                    py={10}
                    mb="$4"
                />
            </CustomForm>
        </AppActionsheet>
    )
}

export default ReportFiltersActionsheet
