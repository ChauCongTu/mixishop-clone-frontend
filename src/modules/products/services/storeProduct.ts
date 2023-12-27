import api from '@/utils/axios';
import { ImageType } from '../types/imageType';
import { OptionType } from '../types/optionType';
import { ProductType } from '../types/type';

export const storeProduct = async (newProduct: ProductType): Promise<ProductType> => {
    try {
        const response = await api.post('/products', newProduct);
        return response.data;
    } catch (error) {
        console.error('Create Error:', error);
        throw error;
    }
};

export const storeImageProduct = async (image: ImageType): Promise<ImageType> => {
    try {
        const response = await api.post('/products-images', image);
        return response.data;
    } catch (error) {
        console.error('Create Error:', error);
        throw error;
    } 
}

export const storeOptionProduct = async (option: OptionType): Promise<OptionType> => {
    try {
        const response = await api.post('/products-options', option);
        return response.data;
    } catch (error) {
        console.error('Create Error:', error);
        throw error;
    } 
}