import { configureStore } from "@reduxjs/toolkit";
import { vehicleReducer, vehicleSlice } from "./Redux/vehicleSlice";
import vehicleApi from "../Api/vehicleApi";
import { accountApi } from "../Api/accountApi";
import { authenticationReducer } from "./Redux/authenticationSlice";
import bidApi from "../Api/bidApi";

const store = configureStore({
    reducer: {
        vehicleStore:vehicleReducer,
        authentication: authenticationReducer,

        [vehicleApi.reducerPath]: vehicleApi.reducer,
        [accountApi.reducerPath]: accountApi.reducer,
        [bidApi.reducerPath]: bidApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(vehicleApi.middleware, accountApi.middleware, bidApi.middleware),
    
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
