//https://localhost:7214/api/PaymentHistory/CheckIsStatusForAuction

import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const paymentHistoryApi = createApi({
   reducerPath: 'paymentHistoryApi',
   baseQuery: fetchBaseQuery({
      baseUrl: 'https://localhost:7214/api/PaymentHistory/',     
   }),
   endpoints: (builder) => ({
      checkStatusForAuctionPrice: builder.mutation({
         query: ({statusDetail}) => ({
            url: `CheckIsStatusForAuction`,
            method: 'POST',
            body: statusDetail,
         }),
      }),
   }),
});