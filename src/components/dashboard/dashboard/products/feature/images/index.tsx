import { OptionType } from '@/modules/products/types/optionType'
import { Button, Modal, Form, Input, Select, List, Row, Col, Space, Table, Upload } from 'antd'
import React, { useState } from 'react'
import { DeleteOutlined } from '@ant-design/icons';
import { ImageOutlined, UploadOutlined } from '@mui/icons-material';
import toast from 'react-hot-toast';

const { Option } = Select;

type Props = {
    images: [];
    setImages: Function;
}

const AddImageComponent: React.FC<Props> = ({ images, setImages }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };
    const handleOk = () => {
        setIsModalOpen(false);
        form.resetFields();
    }
    const handleUploadImage = (info: any) => {
        console.log('Image Changed ======================================NHON>>>>>');
        setImages([]);
        if (info.fileList.length > 0) {
            setImages(info.fileList);
        }
    }
    const beforeUpload = (file: File) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            toast.error('Chỉ chấp nhận file ảnh!');
            return true;
        }
        return false;
    };

    return (
        <>
            <Button style={{ width: '100%' }} onClick={showModal}>
                Thêm hình ảnh
            </Button>
            <Modal title="THÊM HÌNH ẢNH" visible={isModalOpen} okType={'danger'} cancelText='Đóng' onOk={handleOk} onCancel={handleCancel}>
                <Form
                    form={form}
                    name="addOptionForm"
                    layout="vertical"
                >
                    <Space>
                        <Col span={24}>
                            <Upload
                                beforeUpload={beforeUpload}
                                onChange={handleUploadImage}
                                listType={'picture'}
                                showUploadList={true}
                                multiple
                            >
                                <div className='w-full text-center border-gray-400 border-2 rounded-xl p-2 border-dashed hover:border-blue-400 hover:text-blue-400'>
                                    <p className="ant-upload-drag-icon text-6xl">
                                        <ImageOutlined style={{ width: '200px' }} />
                                    </p>
                                    <p className="text-xl">Click hoặc kéo thả file vào đây để upload</p>
                                    <p className="mt-2">
                                        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                                        banned files.
                                    </p>
                                </div>
                            </Upload>
                        </Col>
                    </Space>
                </Form>

            </Modal>
        </>
    )
}

export default AddImageComponent;
