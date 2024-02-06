import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IAuthPayload, IAuthentication, IRegisterPayload, IToken, JWT } from "../../types/interface/auth";
import { IUser } from "../../types/interface/user";
import { jwtDecode } from "jwt-decode";
import { decode } from "base-64";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getServerHost from "../../utils/getServerHost";

global.atob = decode;

const initialState: IAuthentication = {
  user: null,
  token: {
    refreshToken: null,
    accessToken: null,
  },
  error: null,
  isLoading: false,
  remember: false,
  host: null
};

export const fetchAuth = createAsyncThunk<IAuthentication, IAuthPayload>('auth/fetchAuth', async (params, thunkApi) => {
  try {
    const response = await axios.post<IToken>(`${params.host}/auth`, params);
    const token = response.data;

    let id = null;
    if (token.accessToken !== null && token.refreshToken !== null) {
      const { user_id }: JWT = jwtDecode(token.accessToken);
      id = user_id;
    }

    const fetchUser = await axios.get<IUser>(`${params.host}/users/${id}`, {
      headers: {
        'Authorization': `Bearer ${token.accessToken}`
      }
    });

    const auth: IAuthentication = {
      user: fetchUser.data,
      token: token,
      error: null,
      isLoading: false,
      remember: params.remember,
      host: params.host
    };

    return auth;
  } catch (error: any) {
    console.log(error);

    return thunkApi.rejectWithValue(error.response.data);
  }
});

export const fetchRefreshAuth = createAsyncThunk<IAuthentication, undefined>('auth/fetchRefreshAuth', async (params, thunkApi) => {
  try {
    const storage: any = await AsyncStorage.getItem('persist:root');

    const state = JSON.parse(storage!);
    const a = JSON.parse(state.auth);

    const refreshToken = a.token.refreshToken;
    const remember = a.remember;
    const host = await getServerHost();

    if (!remember) {
      await AsyncStorage.clear();
      throw new Error('Clear login');
    }

    const response = await axios.post<string>(`${host}/auth/refresh`, { refresh_token: refreshToken });
    const accessToken = response.data;

    let id = null;
    if (accessToken !== null) {
      const { user_id }: JWT = jwtDecode(accessToken);
      id = user_id;
    }

    const fetchUser = await axios.get<IUser>(`${host}/users/${id}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });


    const token: IToken = {
      refreshToken: refreshToken,
      accessToken: accessToken
    }

    const auth: IAuthentication = {
      user: fetchUser.data,
      token: token,
      error: null,
      isLoading: false,
      remember: true,
      host: host,
    };

    return auth;
  } catch (error: any) {
    console.log(`fetchRefresh: ${error}`);

    return thunkApi.rejectWithValue(error.response.data);
  }
});

export const fetchRegisterUser = createAsyncThunk<IAuthentication, IRegisterPayload>('auth/fetchRegisterUser', async (params, thunkApi) => {
  try {
    const response = await axios.post<IUser>(`http://192.168.1.54:3000/users/`, params);
    const registeredUser = response.data;

    const authResponse = await axios.post<IToken>(`http://192.168.1.54:3000/auth`, { email: params.email, password: params.password });
    const token = authResponse.data;

    const fetchUser = await axios.get<IUser>(`http://192.168.1.54:3000/users/${registeredUser.user_id}`, {
      headers: {
        'Authorization': `Bearer ${token.accessToken}`
      }
    });

    const auth: IAuthentication = {
      user: fetchUser.data,
      token: token,
      error: null,
      isLoading: false,
      remember: true,
      host: null
    };

    return auth;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response.data);
  }
});

const AuthSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAuth.fulfilled, (state, { payload }: any) => {
      state.isLoading = false;
      state.user = payload.user;
      state.token = payload.token;
      state.host = payload.host;
      state.remember = payload.remember;
      state.error = null;
    });
    builder.addCase(fetchAuth.rejected, (state, { payload }: any) => {
      state.isLoading = false;
      state.error = `${payload.text}`;
    });
    builder.addCase(fetchRefreshAuth.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchRefreshAuth.fulfilled, (state, { payload }: any) => {
      state.isLoading = false;
      state.user = payload.user;
      state.token = payload.token;
      state.error = null;
    });
    builder.addCase(fetchRefreshAuth.rejected, (state) => {
      state.isLoading = false;
      state.error = ``;
    });
    builder.addCase(fetchRegisterUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchRegisterUser.fulfilled, (state, { payload }: any) => {
      state.isLoading = false;
      state.user = payload.user;
      state.token = payload.token;
      state.error = null;
    });
    builder.addCase(fetchRegisterUser.rejected, (state, { payload }: any) => {
      state.isLoading = false;
      state.error = `${payload.text}`;
    });
  }
});

export const { } = AuthSlice.actions
export default AuthSlice.reducer