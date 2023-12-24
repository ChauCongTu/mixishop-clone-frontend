import { AxiosRequestConfig } from 'axios';
import api from '../../../utils/axios';
import { ProductType } from '../types/type';

export const getProducts = async (params?: AxiosRequestConfig['params']): Promise<ProductType[]> => {
    try {
        const response = await api.get('/products', { params });
        return response.data;
    } catch (error) {
        console.error('Get Error:', error);
        throw error;
    }
};
