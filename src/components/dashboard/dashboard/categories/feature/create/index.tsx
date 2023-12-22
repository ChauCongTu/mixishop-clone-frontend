'use client'
import React, { useEffect, useState } from 'react';
import { Button, Drawer, Form, Input, Upload, Select, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CategoryType } from '@/modules/categories/types/type';
import { getCategories } from '@/modules/categories/services/getCategories';
import toast from 'react-hot-toast';
import CategorySchema from '@/modules/categories/validate/schema';
import { createCategory } from '@/modules/categories/services/createCategory';
import { UploadOutlined } from '@mui/icons-material';
import { uploadFile } from '@/modules/uploads/uploadImage';
import axios from 'axios';
import { UploadImage } from '@/utils/image';

interface Type {
  categories: CategoryType[],
  setCategories: Function
}

const CreateCategory: React.FC<Type> = ({ categories, setCategories }) => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<CategoryType>({
    name: '',
    is_parent: 1,
    parent_id: null,
    thumb: 'ÂGAG',
    desc: '',
  });
  const [image, setImage] = useState(null);
  const [parentCategories, setParentCategories] = useState<CategoryType[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<Array<{ value: number; label: string }>>([]);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

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

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const resetForm = () => {
    setCategory({
      name: '',
      is_parent: 1,
      parent_id: null,
      thumb: '',
      desc: '',
    });
    setImage(null);
  }

  const onFinish = async () => {
    setLoading(true);
    try {
      CategorySchema.parse(category);
      setValidationErrors({});
      if (image) {
        try {
          const image_url = await UploadImage(image);
          setCategory((prevCategory) => ({
            ...prevCategory,
            ['thumb']: image_url,
          }));

          createCategory(category)
            .then((res) => {
              const updatedCategories = [...categories, res];
              setCategories(updatedCategories);
              toast.success('Thêm danh mục thành công');
              resetForm();
              onClose();
            })
            .catch((e) => {
              console.log(e);
              toast.error('Có lỗi xảy ra!');
            })
        }
        catch (e) {
          toast.error('Hình ảnh không hợp lệ!')
        };
      }
      else {
        toast.error('Vui lòng tải lên thumbnail');
      }
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
  };


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

  return (
    <>
      <Button onClick={showDrawer} icon={<PlusOutlined />}>
        Thêm Danh Mục
      </Button>
      <Drawer title="THÊM DANH MỤC" placement="right" onClose={onClose} visible={open}>
        <Spin spinning={loading} tip='Đang thêm danh mục ...'>
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
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Chọn hoặc kéo thả ảnh vào đây.</div>
                </div>
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
                  Tạo danh mục
                </Button>
              </Form.Item>
              <Form.Item>
                <Button onClick={resetForm} className='mx-1'>
                  Reset
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Spin>
      </Drawer>
    </>
  );
};

export default CreateCategory;
