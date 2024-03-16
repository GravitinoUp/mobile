import { createSlice } from '@reduxjs/toolkit'
import { AuthInterface } from '../../types/interface/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

const initialState: AuthInterface = {
    isLogin: false,
    user: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (_, action) => {
            AsyncStorage.setItem('accessToken', action.payload)
        },
        setRefreshToken: (_, action) => {
            AsyncStorage.setItem('refreshToken', action.payload)
        },
    },
})

export const { setAccessToken, setRefreshToken } = authSlice.actions
export default authSlice.reducer
