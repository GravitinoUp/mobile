import AppStrings from './strings'
import { addDays, formatDateISO } from '../utils/helpers'

export const TASK_STATUSES = {
    CREATED: AppStrings.orderCreated,
    ASSIGNED: AppStrings.orderAssigned,
    IN_PROGRESS: AppStrings.orderInProgress,
    ON_VERIFICATION: AppStrings.orderOnVerification,
    CLOSED: AppStrings.orderClosed,
    CANCELED: AppStrings.orderCancelled,
    DEADLINE_CLOSED: AppStrings.orderDeadlineClosed,
    NEED_WORK: AppStrings.orderNeedWork,
    NOT_ASSIGNED: AppStrings.orderNotAssigned,
}

export const placeholderQuery = {
    offset: {
        count: 10,
        page: 1,
    },
    filter: {},
    sorts: {},
    period: {
        date_start: formatDateISO(new Date(), true),
        date_end: formatDateISO(addDays(new Date(), 1), true),
    },
}

export const defaultSelectItem = {
    label: 'Все',
    value: 'all',
}

export const sortVariants = [
    { label: 'По возрастанию', value: 'ASC' },
    { label: 'По убыванию', value: 'DESC' },
]

export const taskTypes = [
    defaultSelectItem,
    { label: 'Плановая', value: 'planned' },
    { label: 'Внеплановая', value: 'unplanned' },
]

export const ADMIN_ROLE_ID = 5

export const QUALITY_STATUSES = {
    MEDIUM: 50,
    HIGH: 90,
}

export const GRAVITINO_URL = 'https://gravitino.ru'
