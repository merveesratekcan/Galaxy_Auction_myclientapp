import { configureStore } from "@reduxjs/toolkit";
import { vehicleReducer, vehicleSlice } from "./Redux/vehicleSlice";
import vehicleApi from "../Api/vehicleApi";
import { accountApi } from "../Api/accountApi";

const store = configureStore({
    reducer: {
        vehicleStore:vehicleReducer,

        [vehicleApi.reducerPath]: vehicleApi.reducer,
        [accountApi.reducerPath]: accountApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(vehicleApi.middleware, accountApi.middleware),
    
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
