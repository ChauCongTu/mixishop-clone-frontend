'use client'
import { Form, Input } from 'antd'
import Link from 'next/link'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import './desktop.scss';
import { CategoryType } from '@/modules/categories/types/type';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface DesktopNavProps {
    categories: CategoryType[];
}

const DesktopNav: React.FC<DesktopNavProps> = ({ categories }) => {
    const [isShow, setIsShow] = useState(false);
    const handleToogle = () => {
        setIsShow(!isShow);
    }
    return (
        <nav className='_navbar'>
            <ul className='flex items-center'>
                <Link href={'/'} className='px-5 font-bold'>MIXISHOP</Link>
                <li className='cursor-pointer px-5 font-bold' onClick={handleToogle}>
                    DANH MỤC MUA SẮM
                </li>

                <Link href={'/'} className='px-5 font-bold'>THÔNG BÁO</Link>
                <Form className='px-5'>
                    <Input className='w-max' placeholder='Nhập tìm kiếm' /><SearchIcon />
                </Form>
            </ul>
            <div className={`menu shadow-lg ${isShow ? 'block' : 'hidden'}`}>
                <div className='px-40'>
                    <h2 className='py-7 font-bold'>DANH MỤC SẢN PHẨM</h2>
                    <div className='flex'>
                        <div className='w-2/6'>
                            {
                                categories.map((value, index) => {
                                    if (value.children.length == 0) {
                                        return (
                                            <Link key={value.id} href={`/categories/${value.id}/${value.slug}`} className='block hover:text-cyan-500 font-normal mb-3'>
                                                <NavigateNextIcon fontSize='small' /> {value.name}
                                            </Link>
                                        );
                                    }
                                    else {
                                        return (
                                            <li key={value.id} className='block font-light mb-3 cursor-pointer'>
                                                <NavigateNextIcon fontSize='small' /> {value.name}
                                                <ul className='ms-5'>
                                                    {value.children.map((child: CategoryType, childIndex) => {
                                                        return (
                                                            <Link key={child.id} href={`/categories/${child.id}/${child.slug}`} className='block hover:text-cyan-500'>
                                                                <NavigateNextIcon fontSize='small' /> {child.name}
                                                            </Link>
                                                        );
                                                    }
                                                    )}
                                                </ul>
                                            </li>
                                        );
                                    }
                                })
                            }
                        </div>
                        <div className='w-4/6'>
                            <div className='flex'>
                                <div className='w-2/6'>
                                    Sản Phẩm 1
                                </div>
                                <div className='w-2/6'>
                                    Sản Phẩm 2
                                </div>
                                <div className='w-2/6'>
                                    Sản Phẩm 3
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default DesktopNav;