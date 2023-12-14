import { UserType } from "@/modules/users/types/type"

export interface LoginType {
    email: string,
    password: string
}

export interface LoginResponse {
    login: UserType,
    token: string
}

export interface RegisterType {
    name: string;
    email: string;
    password: string;
    gender: string;
    address: string;
    phone_number: string;
}
