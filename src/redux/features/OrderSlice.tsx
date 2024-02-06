import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IMyOrdersPayload, IOrder, IOrderState, IOrderStatusPayload } from "../../types/interface/order";
import axios from "axios";
import getServerHost from "../../utils/getServerHost";

const initialState: IOrderState = {
  orders: [],
  orderStatuses: [],
  error: null,
  isLoading: false,
};

export const fetchOrders = createAsyncThunk<IOrderState, undefined>('order/fetchOrders', async (params, thunkApi) => {
  try {
    const host = await getServerHost();

    const state: any = thunkApi.getState();
    const accessToken = state.auth.token.accessToken;

    const response = await axios.get<IOrder[]>(`${host}/order/all`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const orders = response.data;

    const orderState: IOrderState = {
      orders: orders,
      orderStatuses: [],
      isLoading: false,
      error: null,
    }

    return orderState;
  } catch (error: any) {
    console.log(error);
    return thunkApi.rejectWithValue(error.response.data);
  }
});

export const fetchMyOrders = createAsyncThunk<IOrderState, IMyOrdersPayload>('order/fetchMyOrders', async (params, thunkApi) => {
  try {
    const host = await getServerHost();

    const state: any = thunkApi.getState();
    const accessToken = state.auth.token.accessToken;

    const response = await axios.post<IOrder[]>(`${host}/order/my`, params, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
    });
    const orders = response.data;

    const orderState: IOrderState = {
      orders: orders,
      orderStatuses: [],
      isLoading: false,
      error: null,
    }

    return orderState;
  } catch (error: any) {
    console.log(error);
    return thunkApi.rejectWithValue(error.response.data);
  }
});

export const fetchOrderStatuses = createAsyncThunk<IOrderState, IOrderStatusPayload>('order/fetchOrderStatuses', async (params, thunkApi) => {
  try {
    const host = await getServerHost();

    const state: any = thunkApi.getState();
    const accessToken = state.auth.token.accessToken;

    const response = await axios.post<IOrder[]>(`${host}/order-status/all`, params, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
    });

    // const response = await axios.get<IOrder[]>(`${host}/order-status/all`, {
    //   headers: {
    //     'Authorization': `Bearer ${accessToken}`
    //   },
    // });
    const orderStatuses = response.data;

    const orderState: IOrderState = {
      orders: [],
      orderStatuses: orderStatuses,
      isLoading: false,
      error: null,
    }

    return orderState;
  } catch (error: any) {
    console.log(error);
    return thunkApi.rejectWithValue(error.response.data);
  }
});

const OrderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, { payload }: any) => {
      state.isLoading = false;
      state.orders = payload.orders;
      state.error = null;
    });
    builder.addCase(fetchOrders.rejected, (state, { payload }: any) => {
      state.isLoading = false;
      state.error = `${payload.text}`;
    });
    builder.addCase(fetchMyOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMyOrders.fulfilled, (state, { payload }: any) => {
      state.isLoading = false;
      state.orders = payload.orders;
      state.error = null;
    });
    builder.addCase(fetchMyOrders.rejected, (state, { payload }: any) => {
      state.isLoading = false;
      state.error = `${payload.text}`;
    });
    builder.addCase(fetchOrderStatuses.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchOrderStatuses.fulfilled, (state, { payload }: any) => {
      state.isLoading = false;
      state.orderStatuses = payload.orderStatuses;
      state.error = null;
    });
    builder.addCase(fetchOrderStatuses.rejected, (state, { payload }: any) => {
      state.isLoading = false;
      state.error = `${payload.text}`;
    });
  },
});

export const { } = OrderSlice.actions
export default OrderSlice.reducer