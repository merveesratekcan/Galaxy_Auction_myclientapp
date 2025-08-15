import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BidState {
  auctionBid: number;
}

export const initialState: BidState = {
  auctionBid: 0,
};

export const bidSlice = createSlice({
  name: "bid",
  initialState,
  reducers: {
    setBidsChange: (state, action: PayloadAction<number>) => {
      state.auctionBid = action.payload;
    },
  },
});

export const { setBidsChange } = bidSlice.actions;
export const bidReducer = bidSlice.reducer;

