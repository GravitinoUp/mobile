import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import getServerHost from '../../utils/getServerHost'
import {
    OrderStateInterface,
    OrderInterface,
    OrderPayloadInterface,
    OrderStatusInterface,
} from '../../types/interface/orders'
import { FetchDataInterface } from '../../types/interface/fetch'

const initialState: OrderStateInterface = {
    orders: [],
    orderStatuses: [],
    error: null,
    isLoading: false,
}

export const fetchOrders = createAsyncThunk<OrderStateInterface, undefined>(
    'order/fetchOrders',
    async (params, thunkApi) => {
        try {
            const host = await getServerHost()

            const state: any = thunkApi.getState()
            const accessToken = state.auth.token.accessToken

            const response = await axios.get<OrderInterface[]>(
                `${host}/order/all`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            )
            const orders = response.data

            const orderState: OrderStateInterface = {
                orders: orders,
                orderStatuses: [],
                isLoading: false,
                error: null,
            }

            return orderState
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)

export const fetchMyOrders = createAsyncThunk<
    OrderStateInterface,
    OrderPayloadInterface
>('order/fetchMyOrders', async (params, thunkApi) => {
    try {
        const host = await getServerHost()

        const state: any = thunkApi.getState()
        const accessToken = state.auth.token.accessToken

        const response = await axios.post<FetchDataInterface<OrderInterface[]>>(
            `${host}/order/my`,
            params,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        )
        const orders = response.data

        const orderState: OrderStateInterface = {
            orders: orders.data,
            orderStatuses: [],
            isLoading: false,
            error: null,
        }

        return orderState
    } catch (error: any) {
        console.log(error)
        return thunkApi.rejectWithValue(error.response.data)
    }
})

export const fetchOrderStatuses = createAsyncThunk<
    OrderStateInterface,
    undefined
>('order/fetchOrderStatuses', async (params, thunkApi) => {
    try {
        const host = await getServerHost()

        const state: any = thunkApi.getState()
        const accessToken = state.auth.token.accessToken

        const response = await axios.get<
            FetchDataInterface<OrderStatusInterface[]>
        >(`${host}/order-status/all`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })

        const orderStatuses = response.data

        const orderState: OrderStateInterface = {
            orders: [],
            orderStatuses: orderStatuses.data,
            isLoading: false,
            error: null,
        }

        return orderState
    } catch (error: any) {
        console.log(error)
        return thunkApi.rejectWithValue(error.response.data)
    }
})

const OrderSlice = createSlice({
    name: 'orderSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchOrders.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchOrders.fulfilled, (state, { payload }: any) => {
            state.isLoading = false
            state.orders = payload.orders
            state.error = null
        })
        builder.addCase(fetchOrders.rejected, (state, { payload }: any) => {
            state.isLoading = false
            state.error = `${payload.text}`
        })
        builder.addCase(fetchMyOrders.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchMyOrders.fulfilled, (state, { payload }: any) => {
            state.isLoading = false
            state.orders = payload.orders
            state.error = null
        })
        builder.addCase(fetchMyOrders.rejected, (state, { payload }: any) => {
            state.isLoading = false
            state.error = `${payload.text}`
        })
        builder.addCase(fetchOrderStatuses.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(
            fetchOrderStatuses.fulfilled,
            (state, { payload }: any) => {
                state.isLoading = false
                state.orderStatuses = payload.orderStatuses
                state.error = null
            }
        )
        builder.addCase(
            fetchOrderStatuses.rejected,
            (state, { payload }: any) => {
                state.isLoading = false
                state.error = `${payload.text}`
            }
        )
    },
})

export const {} = OrderSlice.actions
export default OrderSlice.reducer
