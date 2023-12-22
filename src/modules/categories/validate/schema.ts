import { z } from 'zod';

const CategorySchema = z.object({
    name: z.string().min(3, 'Tên danh mục ít nhất 3 kí tự').max(255, 'Tên danh mục có nhiều nhất 255 kí tự'),
    desc: z.string().min(5, 'Mô tả có ít nhất 5 kí tự')
});

export default CategorySchema;