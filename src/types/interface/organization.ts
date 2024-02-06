import { IFetchState } from "./fetch"

export interface IOrganizationState extends IFetchState {
  organizations: IOrganization[] | null
}

// ORGANIZATION

export interface IOrganization {
  organization_id?: number | null
  organization_type?: IOrganizationType | null
  full_name?: string | null
  short_name?: string | null
  register_number?: string | null
  phone?: string | null
  email?: string | null
  property_values?: number[] | null
  createdAt?: Date;
  updatedAt?: Date | null
}

export interface IOrganizationSort {
  organization_id?: "ASC" | "DESC" | null
  organization_type?: IOrganizationTypeSort | null
  full_name?: "ASC" | "DESC" | null
  short_name?: "ASC" | "DESC" | null
  register_number?: "ASC" | "DESC" | null
  phone?: "ASC" | "DESC" | null
  email?: "ASC" | "DESC" | null
}

// ORGANIZATION TYPE

export interface IOrganizationType {
  organization_type_id?: number | null
  organization_type_name?: string | null
  createdAt?: Date | null
  updatedAt?: Date | null
}

export interface IOrganizationTypeSort {
  organization_type_id?: "ASC" | "DESC" | null
  organization_type_name?: "ASC" | "DESC" | null
}