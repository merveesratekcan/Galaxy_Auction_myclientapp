import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const vehicleApi = createApi({
    reducerPath: 'vehicleApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://localhost:7214/api/Vehicle' 
    }),
    endpoints: (builder) => ({
        getVehicles: builder.query({
            query: () => ({
                url: '/GetVehicle',
                // method: 'GET',
            })
        }),
        getVehicleById: builder.query({
            query: (id) => ({
                url: `${id}`,

            })
        }),
       
    }),
})


export const { useGetVehiclesQuery, useGetVehicleByIdQuery} = vehicleApi;
export default vehicleApi;