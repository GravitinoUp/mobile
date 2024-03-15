import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getJWTtokens } from '../../utils/helpers'
import { DEFAULT_HOST } from '@env'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: DEFAULT_HOST,
        prepareHeaders: async (headers) => {
            const { accessToken } = await getJWTtokens()

            if (accessToken) {
                headers.set('Authorization', `Bearer ${accessToken}`)
            }

            return headers
        },
    }),
    tagTypes: [
        'Roles',
        'Branches',
        'Orders',
        'Permissions',
        'Organizations',
        'Priority',
        'OrganizationTypes',
        'Users',
        'Checkpoints',
        'Properties',
        'Groups',
        'NeighboringStates',
        'CheckpointTypes',
        'WorkingHours',
        'OperatingMode',
        'OrderJournal',
        'Reports',
        'OrderStatuses',
    ],
    endpoints: () => ({}),
})
