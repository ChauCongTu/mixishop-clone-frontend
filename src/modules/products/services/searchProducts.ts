import { AxiosRequestConfig } from 'axios';
import api from '../../../utils/axios';
import { ProductType } from '../types/type';

export const searchProducts = async (params?: AxiosRequestConfig['params']): Promise<ProductType[]> => {
    try {
        const response = await api.get('/products-search', { params });
        return response.data;
    } catch (error) {
        console.error('Get Error:', error);
        throw error;
    }
};
