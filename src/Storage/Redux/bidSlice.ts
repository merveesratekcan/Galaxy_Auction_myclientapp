import { createSlice } from "@reduxjs/toolkit";


export const initialSatete:any={
  auctionBid:Number
}


export const bidSlice = createSlice({
   name: 'bid',
   initialState: initialSatete,
   reducers: {
      setBidsChange: (state, action) => {
        state.auctionBid = action.payload;
      },

   },
});

export const { setBidsChange } = bidSlice.actions;
export const bidReducer = bidSlice.reducer;

