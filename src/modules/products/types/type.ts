import { ImageType } from "./imageType";

export type ProductType = {
    id?: number | null;
    name: string;
    slug?: string | null;
    summary: string;
    desc: string;
    status?: string;
    category_id: number;
    product_code: string;
    total_quantity: number;
    price: number;
    discount_price?: number;
    discount_to?: number;
    views_count?: number | null;
    search_count?: number | null;
    buy_count?: number | null;
    created_at?: string | null;
    updated_at?: string | null;
    images: ImageType[];
    comments?: [] | null;
    reviews?: [] | null;
    options?: [] | null;
}
