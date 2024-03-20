import { api } from '.'
import {
    FacilityInterface,
    FacilityPayloadInterface,
} from '../../types/interface/facility'
import { FetchDataInterface } from '../../types/interface/fetch'

const facilityApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getFacilities: builder.query<FacilityInterface[], unknown>({
            query: (body) => ({
                url: 'facility/all',
                method: 'POST',
                body,
            }),
            transformResponse: (
                response: FetchDataInterface<FacilityInterface[]>
            ) => response.data,
        }),
        getFacilitiesByCheckpoint: builder.query<
            FacilityInterface[],
            { body: FacilityPayloadInterface; checkpointIDS: number[] }
        >({
            query: ({ body, checkpointIDS }) => {
                const queryParams = checkpointIDS
                    .map((id) => `checkpoint_ids=${id}`)
                    .join('&')
                return {
                    url: `facility/all-by-checkpoint?${queryParams}`,
                    method: 'POST',
                    body,
                }
            },
            transformResponse: (
                response: FetchDataInterface<FacilityInterface[]>
            ) => response.data,
        }),
        getFacilitiesByBranch: builder.query<
            FacilityInterface[],
            { body: FacilityPayloadInterface; branchIDS: number[] }
        >({
            query: ({ body, branchIDS }) => {
                const queryParams = branchIDS
                    .map((id) => `branch_ids=${id}`)
                    .join('&')
                return {
                    url: `facility/all-by-branch?${queryParams}`,
                    method: 'POST',
                    body,
                }
            },
            transformResponse: (
                response: FetchDataInterface<FacilityInterface[]>
            ) => response.data,
        }),
    }),
    overrideExisting: true,
})

export const {
    useGetFacilitiesQuery,
    useGetFacilitiesByCheckpointQuery,
    useGetFacilitiesByBranchQuery,
} = facilityApi
