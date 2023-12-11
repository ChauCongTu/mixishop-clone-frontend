import api from '../../../utils/axios';
import { ProductType } from '../types/type';

export const getProducts = async (): Promise<ProductType[]> => {
    try {
        const response = await api.get('/products');
        return response.data;
    } catch (error) {
        console.error('Get Error:', error);
        throw error;
    }
};
