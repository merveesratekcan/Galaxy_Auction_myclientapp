import { createSlice } from "@reduxjs/toolkit";
import { get } from "http";

const initialState = {
    vehicle: [],
    vehicleId: "",
    search: "",
}



export const vehicleSlice = createSlice({
    name: "vehicle",
    initialState: initialState,
    reducers: {
        getVehicle: (state, action) => {
            state.vehicle = action.payload;

        },
        getVehicles: (state, action) => {
            state.vehicleId = action.payload;
        },
        setSearchItem: (state, action) => {
            state.search = action.payload;
        }
    }
})
export const { getVehicle,getVehicles,setSearchItem } = vehicleSlice.actions;
export const vehicleReducer = vehicleSlice.reducer;