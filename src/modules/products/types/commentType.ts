import { UserType } from "@/modules/users/types/type";

export type CommentType = {
    id: number;
    product_id: number;
    user_id: number;
    avatar: string | null;
    name: string;
    content: string;
    reply_id: number | null;
    created_at: string | null;
    updated_at: string | null;
    user: UserType | null
}