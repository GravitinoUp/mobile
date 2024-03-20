import { api } from './'
import { FetchDataInterface } from '../../types/interface/fetch'
import { PermissionsInterface } from '../../types/interface/roles'

const permissionsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllPermissions: builder.query<PermissionsInterface[], void>({
            query: () => 'permissions/all',
            transformResponse: (
                response: FetchDataInterface<PermissionsInterface[]>
            ) => response.data,
        }),
    }),
    overrideExisting: true,
})

export const { useGetAllPermissionsQuery } = permissionsApi
