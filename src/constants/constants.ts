import AppStrings from './strings'

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
        date_start: '2024-01-01',
        date_end: '2025-01-01',
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
    { label: 'Плановая', value: 'planned' },
    { label: 'Внеплановая', value: 'unplanned' },
]
