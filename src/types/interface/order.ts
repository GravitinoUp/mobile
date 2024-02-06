import { IFetchState, IQuery } from "./fetch"
import { IOrganization, IOrganizationSort } from "./organization"
import { ITask, ITaskSort } from "./task"
import { IGroupSort, IRoleSort, IUser } from "./user"

export interface IOrderState extends IFetchState {
  orders: IOrder[] | null
  orderStatuses: IOrderStatus[] | null
  error: string | null
  isLoading: boolean | null
}

export interface IMyOrdersPayload extends IQuery {
  sorts: IOrderSort
  filter: IOrder
  period: {
    date_start: Date
    date_end: Date
  }
}

// ORDER

export interface IOrder {
  order_id?: number | null
  order_name?: string | null
  order_description?: string | null
  facility?: IFacility | null
  executor?: IOrganization | null
  completed_by?: IUser | null
  creator?: IUser | null
  planned_datetime?: Date | null
  task_end_datetime?: Date | null
  ended_at_datetime?: Date | null
  task?: ITask | null
  order_status?: IOrderStatus | null
  priority?: IPriority | null
  createdAt?: Date | null
  updatedAt?: Date | null
  property_values?: number[] | null
}

export interface IOrderSort {
  order_id?: "ASC" | "DESC" | null
  order_name?: "ASC" | "DESC" | null
  order_description?: "ASC" | "DESC" | null
  completed_by?: IOrderUserSort | null
  creator?: IOrderUserSort | null
  planned_datetime?: "ASC" | "DESC" | null
  task_end_datetime?: "ASC" | "DESC" | null
  ended_at_datetime?: "ASC" | "DESC" | null
  facility?: IFacilitySort | null
  task?: ITaskSort | null
  executor?: IOrganizationSort | null
  priority?: IPrioritySort | null
  order_status?: IOrderStatusSort | null
}

export interface IOrderUserSort {
  user_id: "ASC" | "DESC" | null
  is_active: "ASC" | "DESC" | null
  email: "ASC" | "DESC" | null
  role: IRoleSort | null
  group_id: IGroupSort | null
  organization: IOrganizationSort | null
  last_name: "ASC" | "DESC" | null
  first_name: "ASC" | "DESC" | null
  patronymic: "ASC" | "DESC" | null
  phone: "ASC" | "DESC" | null
}

// FACILITY

export interface IFacility {
  facility_id?: number | null
  facility_name?: string | null
  organization?: IOrganization | null
  checkpoint?: ICheckpoint | null
  createdAt?: Date | null
  updatedAt?: Date | null
}

export interface IFacilitySort {
  facility_id?: "ASC" | "DESC" | null
  facility_name?: "ASC" | "DESC" | null
  organization?: IOrganizationSort
  checkpoint?: ICheckpointSort
}

// CHECKPOINT

export interface ICheckpoint {
  checkpoint_id?: number | null
  checkpoint_name?: string | null
  address?: string | null
  branch?: IBranch | null
  neighboring_state?: string | null
  district?: string | null
  region?: string | null
  checkpoint_type?: ICheckpointType | null
  working_hours?: string | null
  operating_mode?: string | null
  property_values?: number[] | null
  createdAt?: Date | null
  updatedAt?: Date | null
}

export interface ICheckpointSort {
  checkpoint_id?: "ASC" | "DESC" | null
  checkpoint_name?: "ASC" | "DESC" | null
  checkpoint_type?: ICheckpointTypeSort | null
  address?: "ASC" | "DESC" | null
  branch?: IBranchSort | null
  neighboring_state?: "ASC" | "DESC" | null
  district?: "ASC" | "DESC" | null
  region?: "ASC" | "DESC" | null
  working_hours?: "ASC" | "DESC" | null
  operating_mode?: "ASC" | "DESC" | null
}

// CHECKPOINT TYPE

export interface ICheckpointType {
  checkpoint_type_id?: number | null
  checkpoint_type_name?: string | null
  createdAt?: Date | null
  updatedAt?: Date | null
}

export interface ICheckpointTypeSort {
  checkpoint_type_id?: "ASC" | "DESC" | null
  checkpoint_type_name?: "ASC" | "DESC" | null
}

// BRANCH

export interface IBranch {
  branch_id?: number | null
  branch_name?: string | null
  address?: string | null
  createdAt?: Date | null
  updatedAt?: Date | null
}

export interface IBranchSort {
  branch_id?: "ASC" | "DESC" | null
  branch_name?: "ASC" | "DESC" | null
  address?: "ASC" | "DESC" | null
}

// ORDER STATUS

export interface IOrderStatusPayload extends IQuery {
  sorts: IOrderStatusSort
  filter: IOrderStatus
}

export interface IOrderStatus {
  order_status_id?: number | null
  order_status_name?: string | null
  createdAt?: Date | null
  updatedAt?: Date | null
}

export interface IOrderStatusSort {
  order_status_id?: "ASC" | "DESC" | null
  order_status_name?: "ASC" | "DESC" | null
}

// PRIORITY

export interface IPriority {
  priority_id?: number | null
  priority_name?: string | null
  createdAt?: Date | null
  updatedAt?: Date | null
}

export interface IPrioritySort {
  priority_id?: "ASC" | "DESC" | null
  priority_name?: "ASC" | "DESC" | null
}