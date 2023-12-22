import { getCategories } from '@/modules/categories/services/getCategories';
import { updateCategory } from '@/modules/categories/services/updateCategory';
import { CategoryType } from '@/modules/categories/types/type';
import { UploadImage } from '@/utils/image';
import { EditOutlined, UploadOutlined } from '@mui/icons-material'
import { Button, Drawer, Form, Input, Select, Spin, Upload } from 'antd';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

type Props = {
    pr_category: CategoryType;
    categories: CategoryType[];
    setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
};
const UpdateCategory: React.FC<Props> = ({ pr_category, categories, setCategories }) => {
    const [category, setCategory] = useState<CategoryType>(pr_category);
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [parentCategories, setParentCategories] = useState<CategoryType[]>([]);
    const [categoryOptions, setCategoryOptions] = useState<Array<{ value: number; label: string }>>([]);
    const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const resetForm = () => setCategory(pr_category);
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
        resetForm();
    };
    useEffect(() => {
        if (category.is_parent === 1) {
            getCategories()
                .then((res: CategoryType[]) => setParentCategories(res))
                .catch(() => toast.error('Something went wrong!'));
        }
    }, [category.is_parent]);

    useEffect(() => {
        const transformedOptions = parentCategories.map((cat) => ({
            value: cat.id || 0,
            label: cat.name,
        }));
        setCategoryOptions(transformedOptions);
    }, [parentCategories]);

    const handleImageChange = (info: any) => {
        if (info.fileList[0]) {
            setImage(info.fileList[0].originFileObj);
        }
        else {
            setImage(null);
        }
    };
    const handleInputChange = (fieldName: keyof CategoryType, value: string | number | null) => {
        setCategory((prevCategory) => ({
            ...prevCategory,
            [fieldName]: value,
        }));
    };

    const fetchCategories = () => {
        getCategories()
            .then((res) => setCategories(res))
            .catch((e) => toast.error('Có lỗi xảy ra, vui lòng thử lại'));
    }

    const update = () => {
        updateCategory(category.id, category)
            .then((res) => toast.success('Cập nhật thông tin danh mục thành công!'))
            .catch((e) => toast.error('Có lỗi xảy ra, vui lòng thử lại!'))
    }

    const onFinish = async () => {
        setLoading(true);
        try {
            if (image) {
                try {
                    // Lưu với image mới
                    const image_url = await UploadImage(image);
                    setCategory((prevCategory) => ({
                        ...prevCategory,
                        ['thumb']: image_url,
                    }));
                    update();
                }
                catch (e) { toast.error('Có lỗi xảy ra, vui lòng thử lại!') };
            }
            else update();
        }
        catch (error: any) {
            if (error.errors && error.errors.length > 0) {
                const errors: { [key: string]: string } = {};
                error.errors.forEach((e: any) => {
                    errors[e.path[0]] = e.message;
                });
                setValidationErrors(errors);
            }
        }
        setLoading(false);
        fetchCategories();
        onClose();
    }
    return (
        <>
            <a onClick={showDrawer} ><EditOutlined titleAccess='Chỉnh sửa' /></a>
            <Drawer title="CHỈNH SỬA DANH MỤC" placement="right" onClose={onClose} visible={open}>
                <Spin spinning={loading} tip='Đang cập nhật danh mục ...'>
                    <div className='font-bold pb-3'>ID Danh Mục: {category.id}</div>
                    <Form layout="vertical">
                        <Form.Item
                            label="Tên Danh Mục" help={validationErrors.name} validateStatus={validationErrors.name ? 'error' : ''}
                        >
                            <Input value={category.name} onChange={(e) => handleInputChange('name', e.target.value)} />
                        </Form.Item>

                        <Form.Item
                            label="Mô Tả" help={validationErrors.desc} validateStatus={validationErrors.desc ? 'error' : ''}
                        >
                            <Input.TextArea value={category.desc} onChange={(e) => handleInputChange('desc', e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Ảnh Thumbnail">
                            <Upload
                                beforeUpload={() => false}
                                onChange={handleImageChange}
                                listType="picture-card"
                                showUploadList={true}
                                maxCount={1}
                            >
                                {
                                    image ?
                                        <div>
                                            <UploadOutlined />
                                            <div style={{ marginTop: 8 }}>Chọn hoặc kéo thả ảnh vào đây.</div>
                                        </div> :
                                        <div>
                                            <img src={category.thumb} />
                                        </div>
                                }

                            </Upload>
                        </Form.Item>

                        <Form.Item
                            label="Là Danh Mục Cha"
                        >
                            <Select
                                style={{ width: '100%' }}
                                value={category.is_parent}
                                onChange={(value) => handleInputChange('is_parent', value)}
                                options={[{ value: 1, label: 'Có' }, { value: 0, label: 'Không' }]}
                            />
                        </Form.Item>

                        {category.is_parent === 0 && (
                            <Form.Item label="Danh Mục Cha">
                                <Select
                                    style={{ width: '100%' }}
                                    placeholder='Chọn danh mục cha'
                                    value={category.parent_id}
                                    onChange={(value) => handleInputChange('parent_id', value)}
                                    options={categoryOptions}
                                />
                            </Form.Item>
                        )}
                        <div className='flex'>
                            <Form.Item>
                                <Button className='bg-blue-400 text-white hover:bg-white' onClick={onFinish}>
                                    Cập Nhật
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Button className='mx-2' onClick={onClose}>
                                    Đóng
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </Spin>
            </Drawer>
        </>

    )
}

export default UpdateCategory