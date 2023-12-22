'use client'
import React, { useState, useEffect } from 'react';
import { Layout, Menu, Avatar, Dropdown, Spin, Divider, Breadcrumb } from 'antd';
import {
    UserOutlined,
    SettingOutlined,
    PoweroffOutlined,
    NotificationOutlined,
    AppstoreOutlined,
    ShoppingOutlined,
    BarsOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons';
import ForbiddenComponent from '@/components/errors/403';
import { useAuth } from '@/providers/auth';
import DashboardConfig from '@/components/dashboard/layout/menu';
import DashboardMenu from '@/components/dashboard/layout/menu';
import Link from 'next/link';

const { Header, Content, Sider } = Layout;

export default function DashboardLayouts({ children }: { children: React.ReactNode }) {
    const { profile } = useAuth();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const isLoading = profile ? false : true;
        setLoading(isLoading);
    }, [profile]);

    const menu = (
        <Menu>
            <div className='py-3 px-5 border-b-1'>
                Xin chào, {profile?.name}
            </div>
            <Menu.Item key="1" icon={<UserOutlined />}>
                Cá nhân
            </Menu.Item>
            <Menu.Item key="2" icon={<SettingOutlined />}>
                Thiết lập
            </Menu.Item>
            <Menu.Item key="3" icon={<PoweroffOutlined />}>
                Đăng xuất
            </Menu.Item>
        </Menu>
    );

    return (
        <Spin spinning={loading} tip="Loading...">
            {profile && profile.role && profile.role === 'Admin' ? (
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider width={240} theme="light" breakpoint="md" collapsedWidth="0">
                        <div className="flex items-center justify-center h-16">
                            <img
                                src="/logo-600w.png"
                                alt="Logo"
                                className="h-[50px] object-contain"
                            />
                        </div>
                        {/* Menu */}
                        <DashboardMenu />
                    </Sider>
                    <Layout className="site-layout">
                        <Header className="site-layout-background bg-white" style={{ padding: 0 }}>
                            <div className='flex items-center justify-between px-5 pt-2'>
                                <div className="h-full">
                                    <img
                                        src="/logo-600w.png"
                                        alt="Logo"
                                        className="h-[50px] object-contain"
                                    />
                                </div>
                                <div className="h-full pr-4">
                                    <Dropdown overlay={menu} placement="bottomRight" arrow>
                                        <div className="flex items-center cursor-pointer">
                                            <NotificationOutlined className="text-xl mx-3" />
                                            <Avatar size="large" src={profile.avatar} alt="Avatar" />
                                        </div>
                                    </Dropdown>
                                </div>
                            </div>

                        </Header>
                        <Content style={{ margin: '16px', background: 'white', padding: '15px' }}>
                            {/* Your main content */}
                            {children}
                        </Content>
                        <div className='text-gray-400 text-center pb-5'>2024 &copy; Copyright - Dev by <Link href={'https://facebook.com/xoxvp'}>NhonCQ</Link></div>
                    </Layout>
                </Layout>
            ) : (
                <ForbiddenComponent />
            )}
        </Spin>
    );
}
