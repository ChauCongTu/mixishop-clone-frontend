export type CategoryType = {
    id: number|null;
    name: string;
    slug: string|null;
    is_parent: number;
    parent_id: number | null;
    thumb: string|null;
    desc: string;
    created_at: string|null;
    updated_at: string|null;
    children: [];
}