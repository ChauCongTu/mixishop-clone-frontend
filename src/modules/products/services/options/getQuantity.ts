import { AxiosRequestConfig } from 'axios';
import api from '../../../../utils/axios';
import { ProductType } from '../../types/type';

export const getQuantity = async (product_id : number, params?: AxiosRequestConfig['params']): Promise<any[]> => {
    try {
        const response = await api.get('/products/' + product_id + '/find-option', {params});
        return response.data;
    } catch (error) {
        console.error('Get Error:', error);
        throw error;
    }
};
