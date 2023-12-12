import api from '@/utils/axios';
import { CategoryType } from '../types/type';

export const getCategory = async (category_id: number): Promise<CategoryType> => {
    try {
        const response = await api.get('/categories/' + category_id);
        return response.data;
    } catch (error) {
        console.error('Error >>>', error);
        throw error;
    }
};
