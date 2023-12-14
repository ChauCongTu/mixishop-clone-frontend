import api from '@/utils/axios'
import { LoginResponse, LoginType } from '../types/type';



export const getLogin = async (loginInfo: LoginType): Promise<LoginResponse> => {
    try {
      const response = await api.post('/login', loginInfo);
      return response.data;
    } catch (error) {
      console.error('Create Post Error:', error);
      throw error;
    }
  };