import { UserType } from "@/modules/users/types/type";

export interface AuthState {
    isAuthenticated?: boolean;
    isInitialized?: boolean;
    isAdmin?: boolean;
    user: UserType;
}