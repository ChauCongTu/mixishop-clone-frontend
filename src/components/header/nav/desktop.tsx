'use client'
import { Divider, Form, Input } from 'antd'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import './desktop.scss';
import { CategoryType } from '@/modules/categories/types/type';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { searchProducts } from '@/modules/products/services/searchProducts';
import { ProductType } from '@/modules/products/types/type';
import ProductPrice from '@/components/product/price/price';
import { CloseCircleOutlined } from '@ant-design/icons';

interface DesktopNavProps {
    categories: CategoryType[];
}

const DesktopNav: React.FC<DesktopNavProps> =  ({ categories }) => {
    const [resProducts, setResProducts] = useState<ProductType[]>([])
    const [keyWord, setKeyWord] = useState('');
    useEffect(() => {
        searchProducts({ key_word: keyWord })
            .then((res: any) => setResProducts(res.data))
            .catch((e) => console.error(e))
    }, [keyWord]);
    return (
        <nav className='_navbar'>
            <ul className='flex items-center'>
                <Link href={'/'} className='px-5 font-bold'>MIXISHOP</Link>
                <li className='nav_item'>
                    DANH MỤC SẢN PHẨM <ExpandMoreIcon />
                    <div className='w-2/4 absolute shadow-lg z-10 bg-white pt-5 ps-5'>
                        <Divider />
                        {
                            categories.map((value, index) => {
                                if (value.children.length == 0) {
                                    return (
                                        <>
                                            <Link key={value.id} href={`/categories/${value.id}/${value.slug}`} className='block hover:text-cyan-500 font-normal'>
                                                <NavigateNextIcon fontSize='small' /> {value.name}
                                            </Link>
                                            <Divider />
                                        </>
                                    );
                                }
                                else {
                                    return (
                                        <>
                                            <li key={value.id} className='block font-light cursor-pointer font-normal'>
                                                <NavigateNextIcon fontSize='small' /> {value.name}
                                                <ul className='ms-5'>
                                                    {value.children.map((child: CategoryType, childIndex) => {
                                                        return (
                                                            <Link key={child.id} href={`/categories/${child.id}/${child.slug}`} className='font-light block hover:text-cyan-500 mt-3'>
                                                                <NavigateNextIcon fontSize='small' /> {child.name}
                                                            </Link>
                                                        );
                                                    }
                                                    )}
                                                </ul>
                                            </li>
                                            <Divider />
                                        </>
                                    );
                                }
                            })
                        }
                    </div>
                </li>

                <Link href={'/'} className='px-5 font-bold'>THÔNG BÁO</Link>
                <Form className='px-5'>
                    <Input className='w-max' allowClear={<CloseCircleOutlined />} placeholder='Nhập tìm kiếm' value={keyWord} onChange={(e) => setKeyWord(e.target.value)} /><SearchIcon />
                    {
                        (keyWord) ?
                            <div className='bg-white p-3 absolute top-14 w-2/4 shadow-lg'>
                                <div className=''>
                                    Tìm Kiếm: {keyWord} ({resProducts.length} kết quả)
                                    <Divider />
                                    {
                                        resProducts.map((value) => {
                                            return (
                                                <>
                                                    <div className='flex items-center' key={value.id}>
                                                        <div className='w-1/6'>
                                                            <img src='img' className='w-full' />
                                                        </div>
                                                        <div className="ms-5">
                                                            <div className='font-bold hover:text-red-700'><Link href={'/products/' + value.id + '/' + value.slug}>{value.name}</Link></div>
                                                            <div><ProductPrice product={value} /></div>
                                                        </div>
                                                    </div>
                                                    <Divider />
                                                </>
                                            );
                                        })
                                    }
                                </div>
                            </div> :
                            <></>
                    }

                </Form>

            </ul>
        </nav>
    );
};

export default DesktopNav;