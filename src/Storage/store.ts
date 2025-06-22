import { configureStore } from "@reduxjs/toolkit";
import { vehicleReducer, vehicleSlice } from "./Redux/vehicleSlice";
import vehicleApi from "../Api/vehicleApi";
import { accountApi } from "../Api/accountApi";
import { authenticationReducer } from "./Redux/authenticationSlice";
import bidApi from "../Api/bidApi";
import paymentHistoryApi from "../Api/paymentHistoryApi";

const store = configureStore({
    reducer: {
        vehicleStore:vehicleReducer,
        authentication: authenticationReducer,

        [vehicleApi.reducerPath]: vehicleApi.reducer,
        [accountApi.reducerPath]: accountApi.reducer,
        [bidApi.reducerPath]: bidApi.reducer,
        [paymentHistoryApi.reducerPath]: paymentHistoryApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(vehicleApi.middleware, accountApi.middleware, bidApi.middleware, paymentHistoryApi.middleware),
    
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
