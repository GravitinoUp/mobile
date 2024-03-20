import { useContext } from 'react'
import AltButton from '../../../../components/alt-button/alt-button'
import AppStrings from '../../../../constants/strings'
import { formatDateISO } from '../../../../utils/helpers'
import { TasksFilterQueryContext } from '../../../../context/tasks/tasks-filter-query'
import { HStack } from '@gluestack-ui/themed'

const DateList = () => {
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
    return (
        <HStack mt="$3" gap={'$2'}>
            {generateDates()}
        </HStack>
    )
}

export default DateList
