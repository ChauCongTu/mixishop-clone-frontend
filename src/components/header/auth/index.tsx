'use client'
import React, { useEffect } from 'react';
import { Avatar, Menu, Dropdown } from 'antd';
import {
    UserOutlined,
    SettingOutlined,
    ShoppingCartOutlined,
    DashboardOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { useAuth } from '@/providers/auth';
import Link from 'next/link';
import toast from 'react-hot-toast';

const UserAuth = () => {
    const { isLoggedIn, profile, logout } = useAuth();

    useEffect(() => {
        console.log('info:', profile);
    }, []);

    const handleLogout = () => {
        logout();
        toast.success('Đăng xuất thành công');
    };

    const menu = (
        <Menu>
            <Menu.Item key='profile'>
                <Link href='/profile'>

                    <UserOutlined /> Cá nhân

                </Link>
            </Menu.Item>
            <Menu.Item key='settings'>
                <Link href='/settings'>

                    <SettingOutlined /> Thiết lập

                </Link>
            </Menu.Item>
            <Menu.Item key='orders'>
                <Link href='/orders'>

                    <ShoppingCartOutlined /> Đơn hàng của tôi

                </Link>
            </Menu.Item>
            {profile?.role === 'Admin' && (
                <Menu.Item key='dashboard'>
                    <Link href='/dashboard'>

                        <DashboardOutlined /> Dashboard

                    </Link>
                </Menu.Item>
            )}
            <Menu.Item key='logout' onClick={handleLogout}>
                <LogoutOutlined /> Đăng xuất
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            {isLoggedIn ? (
                <Dropdown overlay={menu} placement='bottomRight'>
                    <Link href='#' className='ant-dropdown-link' onClick={(e) => e.preventDefault()}>
                        <Avatar src={profile?.avatar} />
                    </Link>
                </Dropdown>
            ) : (
                <Link href='/login'>
                    <UserOutlined />
                </Link>
            )}
        </>
    );
};

export default UserAuth;
