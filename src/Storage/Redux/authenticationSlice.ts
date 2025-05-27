import { createSlice } from "@reduxjs/toolkit";
import UserModel from "../../Interfaces/userModel";

export const initialState : UserModel= {
    nameid: '',
    fullName: '',
    email: '',
    role: '',
}
    
// slice sayesinde state'i ve action'lari tek bir yerde tutabiliriz

export const authenticationSlice = createSlice({
    name: "authentication",
    initialState: initialState, 
    reducers: {
        setLoggerInUser: (state, action) => {
            
            
            state.email = action.payload.email;
            state.fullName = action.payload.fullName;
            state.nameid = action.payload.nameid; 
            state.role = action.payload.role;
            
        },

    }
    
})

export const { setLoggerInUser } = authenticationSlice.actions;
export const authenticationReducer = authenticationSlice.reducer;