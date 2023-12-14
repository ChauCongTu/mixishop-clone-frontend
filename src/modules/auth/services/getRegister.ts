import api from '@/utils/axios'
import { LoginResponse, RegisterType } from '../types/type';



export const getRegister = async (registerInfo: RegisterType): Promise<LoginResponse> => {
    try {
        const response = await api.post('/register', registerInfo);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};