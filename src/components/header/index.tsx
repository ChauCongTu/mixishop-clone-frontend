'use client'
import React, { useEffect, useState } from 'react';
import './index.scss';
import Image from 'next/image';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Divider } from 'antd';
import MobileNav from './nav/mobile';
import DesktopNav from './nav/desktop';
import { CategoryType } from '@/modules/categories/types/type';
import { getCategories } from '@/modules/categories/services/getCategories';
import Link from 'next/link';
import PersonIcon from '@mui/icons-material/Person';
import { formatCurrency } from '@/utils/currency';
import UserAuth from './auth';
import CartNav from './cart';

const Header = () => {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    useEffect(() => {
        getCategories()
            .then((res: CategoryType[]) => {
                setCategories(res);
                console.log(res);
            });
    }, []);
    return (
        <header>
            {/* Mobile Header */}
            <div className='header_mobile'>
                <div className='mx-auto px-2 flex justify-between py-3 items-center shadow-lg'>
                    <MobileNav categories={categories} />
                    <div className="logo font-bold text-lg"><Link href={'/'}><Image src="/logo-600w.png" width={120} height={58} alt="MixiShop" /></Link> </div>
                    <div className='mx-5 flex cursor-pointer'><CartNav /></div>
                </div>
            </div>
            {/* Desktop Header */}
            <div className='header_desktop'>
                <div className='mx-auto px-40 flex justify-between py-3 items-center shadow-lg w-full fixed z-10 bg-white'>
                    <div className="logo font-bold text-lg w-1/6"><Link href={'/'}><Image src="/logo-600w.png" width={90} height={58} alt="MixiShop" /></Link> </div>
                    <div className='w-5/6'><DesktopNav categories={categories} /></div>
                    <div className='mx-5 flex cursor-pointer'><CartNav /></div>
                    |
                    <div className='mx-5 cursor-pointer'>
                        <UserAuth />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header