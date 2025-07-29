//https://localhost:7214/api/Bid/getbitsbyvehicle/2
//https://localhost:7214/api/Bid/create
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { bidModel } from '../Interfaces/bidModel';


const bidApi = createApi({
    reducerPath: 'bidApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://localhost:7214/api/Bid/'
    
}),

    endpoints: (builder) => ({
        getBidsByVehicleId: builder.query({
            query: (vehicleId:any) => ({
                url: `getbitsbyvehicle/${vehicleId}`,
                method: 'GET',
                params: vehicleId
            })
        }),
        createBid: builder.mutation({
            query: (bidModel:bidModel) => ({
                url: 'create',
                method: 'POST',
                body: bidModel,
                
            })
        })
        
    }),
});


export const { useGetBidsByVehicleIdQuery, useCreateBidMutation } = bidApi;
export default bidApi;