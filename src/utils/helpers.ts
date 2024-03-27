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
    newDate.setMilliseconds(date.getMilliseconds() - 1)

    return newDate
}

export const dateToEpoch = (date: Date) => {
    date.setHours(0, 0, 0, 0)

    return date
}

export const checkPermissions = (permission_sku_list: string[]) => {
    const permissions = globalThis.userPermissions

    const permissionValue = permissions.find(
        (permission) =>
            (permission.permission_sku === 'admin' && permission.rights) ||
            (permission_sku_list.includes(permission.permission_sku) &&
                permission.rights)
    )

    return !!(permissionValue || permission_sku_list.length === 0)
}
