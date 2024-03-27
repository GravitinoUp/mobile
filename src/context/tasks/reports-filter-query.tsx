import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useMemo,
    useState,
} from 'react'
import { PayloadInterface } from '../../types/interface/fetch'
import { addDays, formatDateISO } from '../../utils/helpers'

const DEFAULT_REPORTS_PER_PAGE = 10

const defaultQuery = {
    offset: {
        count: DEFAULT_REPORTS_PER_PAGE,
        page: 1,
    },
    filter: {},
    sorts: {},
    period: {
        date_start: formatDateISO(addDays(new Date(), -1)),
        date_end: formatDateISO(new Date()),
    },
}

interface ContextValuesType {
    reportsQuery: PayloadInterface<any, any>
    setReportsQuery: Dispatch<SetStateAction<PayloadInterface<any, any>>>
}

export const ReportsFilterQueryContext = createContext<ContextValuesType>(null!)

export const ReportsFilterQueryProvider = ({
    children,
}: {
    children: ReactNode
}) => {
    const [reportsQuery, setReportsQuery] = useState(defaultQuery)

    const contextState = useMemo(
        () => ({
            reportsQuery,
            setReportsQuery,
        }),
        [reportsQuery]
    )

    return (
        <ReportsFilterQueryContext.Provider value={contextState}>
            {children}
        </ReportsFilterQueryContext.Provider>
    )
}
