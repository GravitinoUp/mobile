import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { OrderPayloadInterface } from '../../types/interface/orders'
import { addDays, dateToEpoch, formatDateISO } from '../../utils/helpers'

const currentDate = dateToEpoch(new Date())
const DEFAULT_ORDERS_PER_PAGE = 10

const defaultQuery = {
    offset: {
        count: DEFAULT_ORDERS_PER_PAGE,
        page: 1,
    },
    filter: { order_status: [{ order_status_id: 3 }] },
    sorts: {},
    period: {
        date_start: formatDateISO(currentDate, true),
        date_end: formatDateISO(addDays(currentDate, 1), true),
    },
}

interface ContextValuesType {
    personalOrdersQuery: OrderPayloadInterface
    setPersonalOrdersQuery: Dispatch<SetStateAction<OrderPayloadInterface>>
}

export const TasksFilterQueryContext = createContext<ContextValuesType>(null!)

export const TaskFilterQueryProvider = ({
    children,
}: {
    children: ReactNode
}) => {
    const [personalOrdersQuery, setPersonalOrdersQuery] =
        useState<OrderPayloadInterface>(defaultQuery)

    useEffect(
        () => console.log(personalOrdersQuery.period),
        [personalOrdersQuery]
    )

    const contextState = useMemo(
        () => ({
            personalOrdersQuery,
            setPersonalOrdersQuery,
        }),
        [personalOrdersQuery]
    )

    return (
        <TasksFilterQueryContext.Provider value={contextState}>
            {children}
        </TasksFilterQueryContext.Provider>
    )
}
