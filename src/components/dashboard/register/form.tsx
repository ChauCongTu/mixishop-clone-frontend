'use client'
import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Link from 'next/link';
import { LoginResponse, RegisterType } from '@/modules/auth/types/type';
import toast from 'react-hot-toast';
import { useAuth } from '@/providers/auth'
import { getRegister } from '@/modules/auth/services/getRegister';
const { Option } = Select;



const RegisterForm = () => {
    const { login } = useAuth();
    const onFinish = (values: RegisterType) => {
        console.log(values);
        getRegister(values)
            .then((res: LoginResponse) => {
                if (res) {
                    login(res);
                    toast.success('Đăng ký thành công!');
                } else {
                    toast.error('Có lỗi xảy ra!');
                }
            })
            .catch((e) => toast.error("Có lỗi xảy ra!"));
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-200">
            <div className="w-96 p-8 bg-white rounded-md shadow-md">
                <div className="text-center mb-4">
                    <div className="text-xl font-bold">Đăng ký</div>
                </div>

                <Form
                    name="register"
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        name="name"
                        label="Họ tên"
                        rules={[{ required: true, message: 'Please input your full name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'Invalid email address!' },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Mật khẩu"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="gender"
                        label="Giới tính"
                        rules={[{ required: true, message: 'Please select your gender!' }]}
                    >
                        <Select placeholder="Select gender">
                            <Option value="Nam">Nam</Option>
                            <Option value="Nữ">Nữ</Option>
                            <Option value="Khác">Khác</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="address"
                        label="Địa chỉ"
                        rules={[{ required: true, message: 'Please input your address!' }]}
                    >
                        <TextArea />
                    </Form.Item>

                    <Form.Item
                        name="phone_number"
                        label="Số điện thoại"
                        rules={[
                            { required: true, message: 'Please input your phone number!' },
                            { pattern: /^\d{10,11}$/, message: 'Invalid phone number!' },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item className="mb-4">
                        <Button className="w-full bg-blue-400 text-white hover:bg-blue-500" htmlType="submit">
                            Đăng ký
                        </Button>
                    </Form.Item>

                    <div className="text-center">
                        Quay lại <Link href="/login">Đăng nhập</Link>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default RegisterForm;
