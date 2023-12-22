import api from '../../../utils/axios';
import { CategoryType } from '../types/type';

export const createCategory = async (category: CategoryType | FormData): Promise<CategoryType> => {
  try {
    const response = await api.post('/categories', category);
    return response.data;
  } catch (error) {
    console.error('Error >>>', error);
    throw error;
  }
};
