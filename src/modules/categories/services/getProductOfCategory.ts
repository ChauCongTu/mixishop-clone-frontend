import { ProductType } from '@/modules/products/types/type';
import { AxiosRequestConfig } from 'axios';
import api from '../../../utils/axios';

export const getCategoryProducts = async (product: number, params?: AxiosRequestConfig['params']): Promise<ProductType[]> => {
    try {
        const response = await api.get('/categories/' + product + '/products', { params });
        return response.data;
    } catch (error) {
        console.error('Error >>>', error);
        throw error;
    }
};
