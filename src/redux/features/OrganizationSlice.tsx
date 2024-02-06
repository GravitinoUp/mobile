import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IOrganization, IOrganizationState } from "../../types/interface/organization";
import axios from "axios";
import getServerHost from "../../utils/getServerHost";

const initialState: IOrganizationState = {
  organizations: null,
  isLoading: false,
  error: null
}

export const fetchOrganizations = createAsyncThunk<IOrganizationState, undefined>('organization/fetchOrganizations', async (params, thunkApi) => {
  try {
    const host = await getServerHost();

    const fetchOrganizations = await axios.get<IOrganization[]>(`${host}/organization/all`);
    const organizations = fetchOrganizations.data;

    const organizationState: IOrganizationState = {
      organizations: organizations,
      isLoading: false,
      error: null,
    }

    return organizationState;
  } catch (error) {
    console.log(error);
    return thunkApi.rejectWithValue(error);
  }
});

const OrganizationSlice = createSlice({
  name: 'organizationSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrganizations.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchOrganizations.fulfilled, (state, action) => {
      state.isLoading = false;
      state.organizations = action.payload.organizations;
    });
    builder.addCase(fetchOrganizations.rejected, (state, action) => {
      state.isLoading = false;
      state.error = 'ERROR';
    });
  },
});

export const { } = OrganizationSlice.actions
export default OrganizationSlice.reducer