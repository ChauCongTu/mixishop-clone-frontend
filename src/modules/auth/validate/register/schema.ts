import { z } from 'zod';

export const RegisterSchema = z.object({
    name: z.string().min(5, "Họ tên phải có ít nhất 5 kí tự").max(255),
});