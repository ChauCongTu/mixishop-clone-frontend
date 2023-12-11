import api from '../../../../utils/axios';
import { ProductType } from '../../types/type';

export const getOptions = async (product_id : number): Promise<any[]> => {
    try {
        const response = await api.get('/products/' + product_id + '/color-size');
        return response.data;
    } catch (error) {
        console.error('Get Error:', error);
        throw error;
    }
};
