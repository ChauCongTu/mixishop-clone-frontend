import { UserType } from '@/modules/users/types/type';
import api from '@/utils/axios'
import { LoginResponse, LoginType } from '../types/type';



export const fetchProfile = async (token: string): Promise<UserType> => {
    try {
      const response = await api.get('/token/'+token);
      return response.data;
    } catch (error) {
      console.error('Create Post Error:', error);
      throw error;
    }
  };