import AsyncStorage from '@react-native-async-storage/async-storage'

export const getJWTtokens = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken')
    const refreshToken = await AsyncStorage.getItem('refreshToken')

    return { accessToken, refreshToken }
}
