import { IQuery, SortOptionsType } from './fetch'

export interface OrganizationStateInterface {
    organizations: OrganizationInterface[] | null
    error: string | null
    isLoading: boolean | null
}

export interface OrganizationsPayloadInterface extends IQuery {
    sorts: OrganizationSortInterface
    filter: Partial<OrganizationInterface>
}

export interface CreateOrganizationPayloadInterface {
    organization_type_id: string
    full_name: string
    short_name: string
    register_number: string
    phone: string
    email?: string | null
}

export interface OrganizationTypePayloadInterface extends IQuery {
    sorts: OrganizationTypeSortInterface
    filter: Partial<OrganizationTypeInterface>
}

// ORGANIZATION

export interface OrganizationInterface {
    organization_id: number
    organization_type: OrganizationTypeInterface
    full_name: string
    short_name: string
    register_number: string
    phone: string
    email?: string | null
    createdAt?: Date | null
    updatedAt?: Date | null
    property_values?: number[] | null
}

export interface OrganizationSortInterface {
    organization_id?: SortOptionsType
    organization_type?: OrganizationTypeSortInterface | null
    full_name?: SortOptionsType
    short_name?: SortOptionsType
    register_number?: SortOptionsType
    phone?: SortOptionsType
    email?: SortOptionsType
}

// ORGANIZATION TYPE

export interface OrganizationTypeInterface {
    organization_type_id: number
    organization_type_name: string
}

export type OrganizationTypeSortInterface = Partial<
    Record<keyof OrganizationTypeInterface, SortOptionsType>
>
