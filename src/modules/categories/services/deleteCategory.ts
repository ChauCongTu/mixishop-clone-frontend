import api from '@/utils/axios';

export const deleteCategory = async (categoryId: number | null | undefined): Promise<void> => {
    try {
        await api.delete(`/categories/${categoryId}`);
    } catch (error) {
        console.error('Delete Error:', error);
        throw error;
    }
};
