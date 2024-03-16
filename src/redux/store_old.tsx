import { configureStore } from "@reduxjs/toolkit";
import persistStore from "redux-persist/es/persistStore";
import AuthSlice from "./features/AuthSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBlacklistFilter } from "redux-persist-transform-filter";
import { persistCombineReducers } from "redux-persist";
import OrganizationSlice from "./features/OrganizationSlice";
import OrderSlice from "./features/OrderSlice";

const reducers = {
    auth: AuthSlice,
    organization: OrganizationSlice,
    order: OrderSlice,
};

const extrasFilter = createBlacklistFilter('auth', ['error', 'isLoading']);

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['organization', 'order'],
    transforms: [extrasFilter]
};

const persistedReducer = persistCombineReducers(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);
export { store, persistor };

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch