export type ImageType = {
    id?: number | null,
    product_id: number | null | undefined,
    images: string | File | null,
    url_image?: string
}