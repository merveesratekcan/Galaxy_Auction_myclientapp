//https://localhost:7214/api/Bid/getbitsbyvehicle/2
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


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
        
    }),
});


export const { useGetBidsByVehicleIdQuery } = bidApi;
export default bidApi;