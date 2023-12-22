import api from '../../utils/axios';

export const uploadFile = async (data: FormData): Promise<String> => {
    try {
        const response = await api.post('/upload', data);
        return response.data;
    } catch (error) {
        console.error('Error >>>', error);
        throw error;
    }
};
