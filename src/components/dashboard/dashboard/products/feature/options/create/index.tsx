import { OptionType } from '@/modules/products/types/optionType'
import { Button, Modal, Form, Input, Select, List, Row, Col, Space, Table } from 'antd'
import React, { useState } from 'react'
import { DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

type Props = {
    options: OptionType[];
    setOptions: React.Dispatch<React.SetStateAction<OptionType[]>>;
}

const AddOptionComponent: React.FC<Props> = ({ options, setOptions }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        form
            .validateFields()
            .then(values => {
                const newOption: OptionType = {
                    color: values.color,
                    size: values.size,
                    quantity: values.quantity,
                };
                setOptions([...options, newOption]);
                form.resetFields();
            })
            .catch(errorInfo => {
                console.log('Failed:', errorInfo);
            });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const handleDeleteOption = (index: number) => {
        const newOptions = [...options];
        newOptions.splice(index, 1);
        setOptions(newOptions);
    };
    const columns = [
        {
            title: 'Màu sắc',
            dataIndex: 'color',
            key: 'color',
        },
        {
            title: 'Kích thước',
            dataIndex: 'size',
            key: 'size',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text: any, record: OptionType, index: number) => (
                <Space size="middle">
                    <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeleteOption(index)}
                    />
                </Space>
            ),
        },
    ];

    return (
        <>
            <Button style={{ width: '100%' }} onClick={showModal}>
                Thêm lựa chọn
            </Button>
            <Modal title="THÊM LỰA CHỌN" visible={isModalOpen} okText='Thêm' okType={'danger'} cancelText='Đóng' onOk={handleOk} onCancel={handleCancel}>
                <Form
                    form={form}
                    name="addOptionForm"
                    layout="vertical"
                >
                    <Row>
                        <Col span={8}>
                            <Form.Item
                                name="color"
                                label="Màu sắc"
                                rules={[{ required: true, message: 'Vui lòng nhập màu sắc!' }]}
                                className='me-3'
                            >
                                <Input placeholder='Nhập màu sản phẩm' />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="size"
                                label="Kích thước"
                                className='mx-3'
                            >
                                <Input placeholder='Nhập kích thước sản phẩm' />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="quantity"
                                label="Số lượng"
                                rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
                                className='ms-3'
                            >
                                <Input type="number" placeholder='Nhập số lượng' />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <Table
                    dataSource={options}
                    columns={columns}
                    pagination={false}
                />
            </Modal>
        </>
    )
}

export default AddOptionComponent;
