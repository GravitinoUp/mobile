import { JwtPayload } from "jwt-decode"
import { IUser } from "./user"

export interface IAuthentication {
  user: IUser | null
  token: IToken | null
  error: string | null
  isLoading: boolean | null
  remember: boolean
  host: string | null
}

export interface IExtras {
  isLoading: boolean | null,
  error: string | null
}

export interface IToken {
  refreshToken: string | null,
  accessToken: string | null
}

export interface IAuthPayload {
  email: string | null,
  password: string | null
  remember: boolean
  host: string | null
}

export interface IRegisterPayload {
  last_name: string | null,
  first_name: string | null,
  patronymic: string | null,
  gender_id: number | null,
  phone: string | null,
  organization_id: number | null,
  role_id: number | null,
  group_id?: number | null,
  email: string | null,
  password: string | null
}

export interface JWT extends JwtPayload {
  user_id: number,
  email: string
}