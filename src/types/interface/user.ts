import { IOrganization } from "./organization"

export interface IUser {
  user_id?: number | null
  is_active?: boolean | null
  email?: string | null
  createdAt?: Date | null
  updatedAt?: Date | null
  role?: IRole | null
  organization?: IOrganization | null
  person?: IPerson | null
  group?: IGroup | null
}

export interface IPerson {
  person_id?: number | null
  last_name?: string | null
  first_name?: string | null
  patronymic?: string | null
  phone?: string | null
  property_values?: null | null
  createdAt?: Date | null
  updatedAt?: Date | null
}

// ROLE

export interface IRole {
  role_id?: number | null
  role_name?: string | null
  createdAt?: Date | null
  updatedAt?: Date | null
}

export interface IRoleSort {
  role_id?: "ASC" | "DESC" | null
  role_name?: "ASC" | "DESC" | null
}

// GROUP

export interface IGroup {
  group_id?: number | null
  group_name?: string | null
  branch_id?: null | null
  checkpoint_id?: null | null
  facility_id?: null | null
  createdAt?: Date | null
  updatedAt?: Date | null
}

export interface IGroupSort {
  group_id?: "ASC" | "DESC" | null
  group_name?: "ASC" | "DESC" | null
  branch_id?: "ASC" | "DESC" | null
  checkpoint_id?: "ASC" | "DESC" | null
  facility_id?: "ASC" | "DESC" | null
}