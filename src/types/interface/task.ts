export interface ITask {
  task_id?: number | null
  task_name?: string | null
  task_description?: string | null
  category?: ICategory | null
  periodicity?: IPeriodicity | null
  period_start?: Date | null
  period_end?: Date | null
  createdAt?: Date | null
  updatedAt?: Date | null
}

export interface ITaskSort {
  task_id?: "ASC" | "DESC" | null
  task_name?: "ASC" | "DESC" | null
  task_description?: "ASC" | "DESC" | null
  category?: ICategorySort | null
  periodicity?: IPeriodicitySort | null
  period_start?: "ASC" | "DESC" | null
  period_end?: "ASC" | "DESC" | null
}

// CATEGORY

export interface ICategory {
  category_id?: number | null
  category_name?: string | null
  createdAt?: Date | null
  updatedAt?: Date | null
}

export interface ICategorySort {
  category_id?: "ASC" | "DESC" | null
  category_name?: "ASC" | "DESC" | null
}

// PERIODICITY

export interface IPeriodicity {
  periodicity_id?: number | null
  periodicity_name?: string | null
  createdAt?: Date | null
  updatedAt?: Date | null
}

export interface IPeriodicitySort {
  periodicity_id?: "ASC" | "DESC" | null
  periodicity_name?: "ASC" | "DESC" | null
}