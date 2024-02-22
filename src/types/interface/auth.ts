import { JwtPayload } from 'jwt-decode'
import { UserInterface } from './user'

export interface AuthInterface {
    user: UserInterface | null
    token: TokenInterface | null
    error: string | null
    isLoading: boolean | null
    remember: boolean
    host: string | null
}

export interface TokenInterface {
    refreshToken: string | null
    accessToken: string | null
}

export interface AuthPayloadInterface {
    email: string
    password: string
    remember: boolean
    host: string | null
}

export interface RefreshPayloadInterface {
    refresh_token: string
}

export interface JWT extends JwtPayload {
    user_id: number
    email: string
}
