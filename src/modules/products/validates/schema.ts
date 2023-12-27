import { z } from 'zod';

export const ProductSchema = z.object({
    product_code: z.string().refine((value) => value.trim().length > 0, {
        message: 'Mã sản phẩm là bắt buộc và không thể để trống',
    }).refine(async (value) => {
        const isUnique = await checkProductCodeUniqueness(value);
        return isUnique;
    }, {
        message: 'Mã sản phẩm phải là duy nhất',
    }),

    name: z.string().min(3, {
        message: 'Tên sản phẩm là bắt buộc và phải có ít nhất 3 ký tự',
    }),

    summary: z.string().min(5, {
        message: 'Tóm tắt là bắt buộc và phải có ít nhất 5 ký tự',
    }),

    desc: z.string(),

    total_quantity: z.number().refine((value) => value >= 0, {
        message: 'Số lượng tổng phải là một số không âm',
    }),

    price: z.number().refine((value) => value >= 0, {
        message: 'Giá phải là một số không âm',
    }),

    category_id: z.number().refine((value) => value >= 0, {
        message: 'ID danh mục phải là một số không âm',
    }),
});

async function checkProductCodeUniqueness(productCode: string) {
    // Thực hiện kiểm tra sự duy nhất của product_code trong cơ sở dữ liệu
    // và trả về true nếu product_code là duy nhất, ngược lại trả về false
    // (điều này có thể thay đổi tùy thuộc vào loại cơ sở dữ liệu bạn đang sử dụng)
    return true;
}
