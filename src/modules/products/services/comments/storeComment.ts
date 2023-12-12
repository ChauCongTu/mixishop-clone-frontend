import api from '@/utils/axios'
import { CommentType } from '../../types/commentType';

export const storeComment = async (newComment: { user_id?: number, avatar?: number, product_id: number, name: string, content: string, reply_id?: number }): Promise<CommentType> => {
    try {
        const response = await api.post('/products-comments', newComment);
        return response.data;
    } catch (error) {
        console.error('Create Error:', error);
        throw error;
    }
};