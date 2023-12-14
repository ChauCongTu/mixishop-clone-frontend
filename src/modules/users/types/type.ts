export type UserType = {
    id?: number;
    name: string;
    email: string;
    email_verified_at?: string | null;
    role: string;
    gender: string;
    address: string;
    created_at?: string | null;
    updated_at?: string | null;
    phone_number: string;
    avatar?: string | null;
}