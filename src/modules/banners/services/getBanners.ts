import api from '../../../utils/axios';
import { BannerType } from '../types/type';

export const getBanners = async (): Promise<BannerType[]> => {
    try {
        const response = await api.get('/banners');
        return response.data;
    } catch (error) {
        console.error('Get Posts Error:', error);
        throw error;
    }
};
