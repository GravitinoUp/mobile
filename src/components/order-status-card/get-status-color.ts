import { TASK_STATUS_COLORS } from '../../constants/colors'
import { TASK_STATUSES } from '../../constants/constants'

export const getStatusColor = (orderStatus: string) => {
    const orderStatusKey = Object.entries(TASK_STATUSES).find(
        (value) => value[1].toLowerCase() === orderStatus.toLowerCase()
    )?.[0]

    return Object.entries(TASK_STATUS_COLORS).find(
        (value) => value[0] === orderStatusKey
    )?.[1]
}
