import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import './mobile.scss'
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import { CategoryType } from '@/modules/categories/types/type';

interface DesktopNavProps {
    categories: CategoryType[];
}

const MobileNav: React.FC<DesktopNavProps> = ({ categories }) => {
    const [key, setKey] = useState('');
    const [isShow, setIsShow] = useState(false);
    const handleToggle = () => {
        setIsShow(!isShow);
        console.log('Click');
    };
    return (
        <>
            <div onClick={handleToggle}><MenuIcon fontSize='large' /></div>
            {
                (isShow ?
                    <>
                        <div className='_blur' onClick={handleToggle}></div>
                        <div className='nav'>
                            <div className='py-10 px-5'>
                                <Form className='flex'>
                                    <Input placeholder="input search text" value={key} onChange={(event) => setKey(event.target.value)} style={{ width: 200 }} />
                                    <button><SearchIcon /></button>
                                </Form>
                                <div className='font-bold mt-10 text-gray-800'>
                                    <Link href={'/'} className="block mt-5 pb-5 border-b-2">Mixi Shop</Link>
                                    {
                                        categories.map((value, index) => {
                                            return (
                                                <Link key={value.id} href={'/categories/' + value.id + '/' + value.slug} className='block mt-5 pb-5 border-b-2'>{value.name}</Link>
                                            );
                                        })
                                    }
                                    <Link href={'/news'} className="block mt-5">Thông Báo</Link>
                                </div>
                            </div>
                        </div>
                    </> :
                    console.log("hide nav menu"))
            }
        </>
    )
}

export default MobileNav