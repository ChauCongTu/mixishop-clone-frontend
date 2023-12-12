import { z } from 'zod';

export const CommentSchema = z.object({
    name: z.string().min(5, "Họ tên phải có ít nhất 5 kí tự").max(255),
    content: z.string().min(5, "Nội dung phải có ít nhất 5 kí tự").max(500)
});