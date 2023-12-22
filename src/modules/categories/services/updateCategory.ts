import api from '@/utils/axios';
import { CategoryType } from "../types/type";

export const updateCategory = async (categoryId: number | null | undefined, category: CategoryType): Promise<any> => {
    try {
        const response = await api.put(`/categories/${categoryId}`, category);
        return response.data;
    } catch (error) {
        console.error('Update Post Error:', error);
        throw error;
    }
};