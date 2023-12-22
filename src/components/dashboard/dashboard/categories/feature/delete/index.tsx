import React from 'react';
import { Popconfirm } from 'antd';
import toast from 'react-hot-toast';
import { DeleteOutlined } from '@mui/icons-material';
import { deleteCategory } from '@/modules/categories/services/deleteCategory';
import { CategoryType } from '@/modules/categories/types/type';

type Props = {
    category_id: number | null | undefined;
    categories: CategoryType[];
    setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
};

const DeleteCategory: React.FC<Props> = ({ category_id, categories, setCategories }) => {
    const okButtonProps = { className: 'bg-blue-400 hover:bg-white' };
    const handleDelete = () => {
        deleteCategory(category_id)
            .then(() => {
                const updatedCategories = categories.filter((category) => category.id !== category_id);
                setCategories(updatedCategories);
                toast.success('Xóa danh mục thành công');
            })
            .catch((error) => {
                console.error(error);
                toast.error('Có lỗi xảy ra khi xóa danh mục');
            });
    };

    return (
        <Popconfirm
            placement='topLeft'
            title={`Bạn có chắc muốn xóa danh mục ${category_id}?`}
            description={'Lưu ý: Nếu xóa danh mục, hệ thống sẽ tự động xóa tất cả sản phẩm của danh mục này.\nVui lòng cân nhắc kỹ trước khi xóa danh mục.'}
            onConfirm={handleDelete}
            okText="Xác Nhận"
            cancelText="Hủy"
            okType='primary'
            okButtonProps={okButtonProps}
            overlayStyle={{width: '300px'}}
        >
            <a className='flex items-center cursor-pointer'>
                <DeleteOutlined titleAccess='Xóa' />
            </a>
        </Popconfirm>
    );
};

export default DeleteCategory;
