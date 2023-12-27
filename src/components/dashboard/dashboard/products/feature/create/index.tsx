import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, Spin, Upload } from 'antd';
import { UploadOutlined } from '@mui/icons-material';
import { ProductType } from '@/modules/products/types/type';
import SelectCategoryComponent from './category';
import AddOptionComponent from '../options/create';
import { OptionType } from '@/modules/products/types/optionType';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import AddImageComponent from '../images';
import toast from 'react-hot-toast';
import { storeImageProduct, storeOptionProduct, storeProduct } from '@/modules/products/services/storeProduct';
import NotificationShow from '@/utils/noti';
import { uploadFile } from '@/modules/uploads/uploadImage';
import { UploadImage } from '@/utils/image';
import { ImageType } from '@/modules/products/types/imageType';
import { ProductSchema } from '@/modules/products/validates/schema';

const { Option } = Select;

const CreateProduct: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState<OptionType[]>([]);
    const [images, setImages] = useState<[]>([]);
    const [product, setProduct] = useState<ProductType>({
        product_code: 'MIXI-',
        name: '',
        summary: '',
        desc: '',
        total_quantity: 0,
        price: 0,
        category_id: 0,
        images: [],
    });
    const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
    const handleInputChange = (fieldName: keyof ProductType, value: string | number | null) => {
        setProduct((prevCategory) => ({
            ...prevCategory,
            [fieldName]: value,
        }));
    };
    useEffect(() => {
        const totalQuantity = options.reduce((total, option) => total + option.quantity, 0);
        handleInputChange('total_quantity', totalQuantity);
    }, [options.length]);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    const handleSubmit = () => {
        setLoading(true);
        // Sau khi validate
        if (images.length <= 0) {
            toast.error('Vui lòng tải lên hình ảnh sản phẩm!');
            setLoading(false);
            return;
        }
        storeProduct(product)
            .then((res: ProductType) => {
                let success = 1;
                images.map(async (value: any) => {
                    try {
                        const image_url = await UploadImage(value.originFileObj);
                        const newImage: ImageType = { product_id: res.id, images: image_url };
                        storeImageProduct(newImage)
                            .then(() => success++);
                    }
                    catch (e) {
                        toast.error('Hình ảnh không hợp lệ!');
                        setLoading(false);
                        return;
                    }
                });
                if (options.length > 0) {
                    options.map((value) => {
                        const newOptions: OptionType = { product_id: res.id, color: value.color, size: value.size, quantity: value.quantity };
                        storeOptionProduct(newOptions)
                            .then(() => success++);
                    });
                }
                if (success > 0) toast.success('Thêm sản phẩm thành công!');
            })
            .catch((e) => toast.error('Có lỗi xảy ra, vui lòng thử lại'));

        setLoading(false);
    }
    return (
        <>
            <Spin spinning={loading}>
                <Button onClick={showDrawer} icon={<PlusOutlined />}>
                    Thêm Sản Phẩm
                </Button>
                <Drawer
                    title="THÊM SẢN PHẨM"
                    width={720}
                    onClose={onClose}
                    open={open}
                    styles={{
                        body: {
                            paddingBottom: 20,
                        },
                    }}
                >
                    <Form
                        layout="vertical"
                        hideRequiredMark
                    >
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="product_code"
                                    label="Mã Sản Phẩm"
                                    help={validationErrors.product_code} validateStatus={validationErrors.product_code ? 'error' : ''}
                                >
                                    <Input placeholder="Mã sản phẩm" value={product.product_code} onChange={(e) => handleInputChange('product_code', e.target.value)} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="name"
                                    label="Tên Sản Phẩm"
                                    help={validationErrors.name} validateStatus={validationErrors.name ? 'error' : ''}
                                >
                                    <Input placeholder="Tên sản phẩm" value={product.name} onChange={(e) => handleInputChange('name', e.target.value)} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="summary"
                                    label="Mô Tả"
                                    help={validationErrors.summary} validateStatus={validationErrors.summary ? 'error' : ''}
                                >
                                    <Input placeholder="Mô tả" value={product.summary} onChange={(e) => handleInputChange('summary', e.target.value)} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="category_id"
                                    label="Danh Mục"
                                >
                                    <SelectCategoryComponent setProduct={setProduct} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="total_quantity"
                                    label="Số Lượng Sản Phẩm"
                                    help={validationErrors.total_quantity} validateStatus={validationErrors.total_quantity ? 'error' : ''}
                                >
                                    <Input disabled={options.length > 0} type="number" placeholder="Số lượng sản phẩm" value={product.total_quantity} onChange={(e) => handleInputChange('total_quantity', e.target.value)} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="price"
                                    label="Giá Bán"
                                    help={validationErrors.price} validateStatus={validationErrors.price ? 'error' : ''}
                                >
                                    <Input type="number" placeholder="Giá sản phẩm" value={product.price} onChange={(e) => handleInputChange('price', e.target.value)} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="images"
                                    label={`Hình Ảnh (${images.length})`}
                                >
                                    <AddImageComponent images={images} setImages={setImages} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="options"
                                    label={`Các Lựa Chọn (${options.length})`}
                                >
                                    <AddOptionComponent options={options} setOptions={setOptions} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    name="desc"
                                    label="Thông Tin Sản Phẩm"
                                    help={validationErrors.desc} validateStatus={validationErrors.desc ? 'error' : ''}
                                >
                                    <Input.TextArea rows={4} value={product.desc} onChange={(e) => handleInputChange('desc', e.target.value)} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item>
                            <Space>
                                <Button className='bg-blue-400 text-white hover:bg-white' onClick={handleSubmit}>
                                    Thêm Sản Phẩm
                                </Button>
                                <Button>Nhập lại</Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Drawer>
            </Spin>
        </>
    );
};

export default CreateProduct;