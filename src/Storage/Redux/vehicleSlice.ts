import { createSlice } from "@reduxjs/toolkit";
import { get } from "http";

const initialState = {
    vehicle: [],
}



export const vehicleSlice = createSlice({
    name: "vehicle",
    initialState: initialState,
    reducers: {
        getVehicle: (state, action) => {
            state.vehicle = action.payload;

        }
    }
})
export const { getVehicle } = vehicleSlice.actions;
export const vehicleReducer = vehicleSlice.reducer;