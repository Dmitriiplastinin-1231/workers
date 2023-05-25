import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { retry } from '@reduxjs/toolkit/dist/query';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api',
    // prepareHeaders: (headers, { getState }) => {
    //     const token = (getState() as RootState)
    // }
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 })

const api = createApi({
    reducerPath: 'splitApi',
    baseQuery: baseQueryWithRetry,
    refetchOnMountOrArgChange: true,
    endpoints: () => ({}),
})


export default api;