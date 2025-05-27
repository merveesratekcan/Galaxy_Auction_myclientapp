import { createSlice } from "@reduxjs/toolkit";
import UserModel from "../../Interfaces/userModel";

export const initialState : UserModel= {
    id: '',
    fullname: '',
    email: '',
    role: '',
}
    
// slice sayesinde state'i ve action'lari tek bir yerde tutabiliriz

export const authenticationSlice = createSlice({
    name: "authentication",
    initialState: initialState, 
    reducers: {
        setLoggerInUser: (state, action) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.fullname = action.payload.fullname;
        },

    }
    
})

export const { setLoggerInUser } = authenticationSlice.actions;
export const authenticationReducer = authenticationSlice.reducer;