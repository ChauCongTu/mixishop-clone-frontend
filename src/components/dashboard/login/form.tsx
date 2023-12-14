import { Form, Input, Button, Row, Col } from 'antd';
import {
    UserOutlined,
    LockOutlined,
    GoogleOutlined,
} from '@ant-design/icons';
import React from 'react';
import Link from 'next/link';

interface Props {
    email: string,
    password: string,
    setEmail: Function,
    setPassword: Function,
    handleLogin: () => void
}

const LoginForm:React.FC<Props> = ({email, setEmail, password, setPassword, handleLogin}) => {
    const onFinish = (values: any) => {
        console.log('Received values:', values);
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-slate-300'>
            <div className='bg-white p-8 rounded shadow-md w-96'>
                <div className='text-center mb-4'>
                    <img
                        src='/logo-600w.png' // Thay đổi đường dẫn logo tùy theo dự án của bạn
                        alt='Logo'
                        className='mb-2 mx-auto'
                        style={{ maxWidth: '80px' }}
                    />
                    <div className='text-2xl'>ĐĂNG NHẬP</div>
                </div>

                <Form
                    name='loginForm'
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name='email'
                        rules={[
                            { required: true, message: 'Vui lòng nhập địa chỉ email!' },
                            { type: 'email', message: 'Địa chỉ email không hợp lệ!' },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className='site-form-item-icon' />}
                            placeholder='Email'
                            className='mb-4'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        name='password'
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className='site-form-item-icon' />}
                            
                            placeholder='Mật khẩu'
                            className='mb-4'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button onClick={handleLogin} className='w-full bg-blue-400 text-white hover:bg-white'>
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>

                <Row justify='space-between' className='mb-4'>
                    <Col>
                        <a href='#'>Quên mật khẩu?</a>
                    </Col>
                    <Col>
                        <Link href={'/register'}>Đăng ký ngay</Link>
                    </Col>
                </Row>

                <div className='flex items-center justify-center'>
                    <Button
                        icon={<GoogleOutlined />}
                        size='large'
                        className='w-full bg-red-500 text-white hover:bg-red-600'
                        onClick={() => {
                            // Xử lý đăng nhập bằng Google ở đây
                            console.log('Đăng nhập bằng Google');
                        }}
                    >
                        Đăng nhập bằng Google
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
