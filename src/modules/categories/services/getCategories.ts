import api from '../../../utils/axios';
import { CategoryType } from '../types/type';

export const getCategories = async (): Promise<CategoryType[]> => {
    try {
      const response = await api.get('/categories');
      return response.data;
    } catch (error) {
      console.error('Error >>>', error);
      throw error;
    }
  };
  