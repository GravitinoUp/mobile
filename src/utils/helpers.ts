import AsyncStorage from '@react-native-async-storage/async-storage'
import { format } from 'date-fns'

export const formatDate = (
    date?: string | Date | null,
    includeTime?: boolean
) => {
    if (!date) {
        return ''
    }
    const newDate = new Date(date)
    return format(newDate, `dd.MM.yyyy${includeTime ? ' HH:mm' : ''}`)
}

export const formatDateISO = (
    date?: string | Date | null,
    includeTime?: boolean
) => {
    if (!date) {
        return ''
    }
    const newDate = new Date(date)
    return format(newDate, `yyyy-MM-dd${includeTime ? ' HH:mm' : ''}`)
}

export const getJWTtokens = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken')
    const refreshToken = await AsyncStorage.getItem('refreshToken')

    return { accessToken, refreshToken }
}

export const addDays = (date: Date, days: number) => {
    const newDate = new Date(date)
    newDate.setDate(date.getDate() + days)
    return newDate
}
