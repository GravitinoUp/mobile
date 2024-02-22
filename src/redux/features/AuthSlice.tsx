import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import {
    AuthPayloadInterface,
    AuthInterface,
    JWT,
    TokenInterface,
} from '../../types/interface/auth'
import { UserInterface } from '../../types/interface/user'
import { jwtDecode } from 'jwt-decode'
import { decode } from 'base-64'
import AsyncStorage from '@react-native-async-storage/async-storage'
import getServerHost from '../../utils/getServerHost'

global.atob = decode

const initialState: AuthInterface = {
    user: null,
    token: {
        refreshToken: null,
        accessToken: null,
    },
    error: null,
    isLoading: false,
    remember: false,
    host: null,
}

export const fetchAuth = createAsyncThunk<AuthInterface, AuthPayloadInterface>(
    'auth/fetchAuth',
    async (params, thunkApi) => {
        try {
            const response = await axios.post<TokenInterface>(
                `${params.host}/auth`,
                params
            )
            const token = response.data

            let id = null
            if (token.accessToken !== null && token.refreshToken !== null) {
                const { user_id }: JWT = jwtDecode(token.accessToken)
                id = user_id
            }

            const fetchUser = await axios.get<UserInterface>(
                `${params.host}/users/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token.accessToken}`,
                    },
                }
            )

            const auth: AuthInterface = {
                user: fetchUser.data,
                token: token,
                error: null,
                isLoading: false,
                remember: params.remember,
                host: params.host,
            }

            return auth
        } catch (error: any) {
            console.log(error)

            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)

export const fetchRefreshAuth = createAsyncThunk<AuthInterface, undefined>(
    'auth/fetchRefreshAuth',
    async (params, thunkApi) => {
        try {
            const storage: any = await AsyncStorage.getItem('persist:root')

            const state = JSON.parse(storage!)
            const a = JSON.parse(state.auth)

            const refreshToken = a.token.refreshToken
            const remember = a.remember
            const host = await getServerHost()

            if (!remember) {
                await AsyncStorage.clear()
                throw new Error('Clear login')
            }

            const response = await axios.post<string>(`${host}/auth/refresh`, {
                refresh_token: refreshToken,
            })
            const accessToken = response.data

            let id = null
            if (accessToken !== null) {
                const { user_id }: JWT = jwtDecode(accessToken)
                id = user_id
            }

            const fetchUser = await axios.get<UserInterface>(
                `${host}/users/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            )

            const token: TokenInterface = {
                refreshToken: refreshToken,
                accessToken: accessToken,
            }

            const auth: AuthInterface = {
                user: fetchUser.data,
                token: token,
                error: null,
                isLoading: false,
                remember: true,
                host: host,
            }

            return auth
        } catch (error: any) {
            console.log(`fetchRefresh: ${error}`)

            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)

const AuthSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAuth.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchAuth.fulfilled, (state, { payload }: any) => {
            state.isLoading = false
            state.user = payload.user
            state.token = payload.token
            state.host = payload.host
            state.remember = payload.remember
            state.error = null
        })
        builder.addCase(fetchAuth.rejected, (state, { payload }: any) => {
            state.isLoading = false
            state.error = `${payload.text}`
        })
        builder.addCase(fetchRefreshAuth.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(
            fetchRefreshAuth.fulfilled,
            (state, { payload }: any) => {
                state.isLoading = false
                state.user = payload.user
                state.token = payload.token
                state.error = null
            }
        )
        builder.addCase(fetchRefreshAuth.rejected, (state) => {
            state.isLoading = false
            state.error = ``
        })
    },
})

export const {} = AuthSlice.actions
export default AuthSlice.reducer
