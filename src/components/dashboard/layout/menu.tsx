import { DashboardOutlined, MenuOutlined, ShoppingBagOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import Link from 'next/link';
import React from 'react';
import './menu.scss';
import PersonIcon from '@mui/icons-material/Person';
import { usePathname } from 'next/navigation';

const DashboardMenu = () => {
    const currentRoute = usePathname();

    return (
        <>
            <nav className='dash_nav'>
                <label className='dash_label'>Bảng điều khiểu</label>
                <ul className='dash_ul'>
                    <li>
                        <Link href='/dashboard' className={`dash_item ${currentRoute === '/dashboard' ? 'active' : ''}`}>
                            <DashboardOutlined /> Dashboard
                        </Link>
                    </li>
                </ul>
                <label className='dash_label'>Sản phẩm</label>
                <ul className='dash_ul'>
                    <li>
                        <Link href='/dashboard/categories' className={`dash_item ${currentRoute === '/dashboard/categories' ? 'active' : ''}`}>
                            <MenuOutlined /> Quản Lý Danh Mục
                        </Link>
                    </li>
                    <li>
                        <Link href='/dashboard/products' className={`dash_item ${currentRoute === '/dashboard/products' ? 'active' : ''}`}>
                            <ShoppingBagOutlined /> Quản Lý Sản Phẩm
                        </Link>
                    </li>
                    <li>
                        <Link href='/dashboard/coupons' className={`dash_item ${currentRoute === '/dashboard/coupons' ? 'active' : ''}`}>
                            <ShoppingCartOutlined /> Quản Lý Coupon
                        </Link>
                    </li>
                </ul>

                <label className='dash_label'>Khác</label>
                <ul className='dash_ul'>
                    <li>
                        <Link href='/dashboard/orders' className={`dash_item ${currentRoute === '/dashboard/orders' ? 'active' : ''}`}>
                            <MenuOutlined /> Quản Lý Đơn Hàng
                        </Link>
                    </li>
                    <li>
                        <Link href='/dashboard/users' className={`dash_item ${currentRoute === '/dashboard/users' ? 'active' : ''}`}>
                            <PersonIcon /> Quản Lý Người Dùng
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default DashboardMenu;
