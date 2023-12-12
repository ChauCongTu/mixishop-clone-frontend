import { AxiosRequestConfig } from 'axios';
import api from '../../../../utils/axios';
import { ProductFullInfo } from '../../types/fullProduct';

export const getComment = async (product_id: number, params?: AxiosRequestConfig['params']): Promise<ProductFullInfo[]> => {
    try {
        const response = await api.get('/products/' + product_id + '/comments', { params });
        return response.data;
    } catch (error) {
        console.error('Get Posts Error:', error);
        throw error;
    }
};