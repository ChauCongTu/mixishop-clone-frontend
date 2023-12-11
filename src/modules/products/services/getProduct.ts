import api from '../../../utils/axios';
import { ProductFullInfo } from '../types/fullProduct';

export const getProduct = async (product_id : number): Promise<ProductFullInfo> => {
    try {
      const response = await api.get('/products/'+product_id);
      return response.data;
    } catch (error) {
      console.error('Get Posts Error:', error);
      throw error;
    }
  };