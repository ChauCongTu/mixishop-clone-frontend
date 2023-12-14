import React, { useState } from 'react';
import { Button, Form, Input, Drawer, Avatar } from 'antd';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { CategoryType } from '@/modules/categories/types/type';
import Link from 'next/link';

interface MobileNavProps {
    categories: CategoryType[];
}

const MobileNav: React.FC<MobileNavProps> = ({ categories }) => {
    const [key, setKey] = useState('');
    const [isShow, setIsShow] = useState(false);

    const handleToggle = () => {
        setIsShow(!isShow);
    };

    return (
        <>
            <div onClick={handleToggle}>
                <MenuIcon fontSize='large' />
            </div>

            <Drawer
                title="Menu"
                placement="left"
                closable={false}
                onClose={handleToggle}
                visible={isShow}
                width={300}
            >
                <Form className='flex p-3'>
                    <Input
                        placeholder="Tìm kiếm"
                        value={key}
                        onChange={(event) => setKey(event.target.value)}
                        style={{ flex: '1' }}
                    />
                    <Button type="primary" icon={<SearchIcon />} />
                </Form>

                <div className='font-bold p-3'>
                    <Link href={'/'} className="block mt-3 pb-2 border-b-2">
                        Mixi Shop
                    </Link>
                    {categories.map((value, index) => (
                        <Link
                            key={value.id}
                            href={'/categories/' + value.id + '/' + value.slug}
                            className='block mt-3 pb-2 border-b-2'
                        >
                            {value.name}
                        </Link>
                    ))}
                    <Link href={'/news'} className="block mt-3">
                        Thông Báo
                    </Link>
                </div>

                <div className='fixed bottom-0 left-0 right-0 p-3 bg-white border-t'>
                    <div className='flex items-center'>
                        <Avatar
                            src='https://via.placeholder.com/30'
                            size='small'
                            className='mr-2'
                        />
                        <span className='text-gray-800'>Tên Người Dùng</span>
                    </div>
                    <Button
                        type='primary'
                        block
                        className='mt-2'
                        onClick={() => console.log('Logout')}
                    >
                        Đăng Xuất
                    </Button>
                </div>
            </Drawer>

            {/* Blur background when the drawer is open */}
            {isShow && <div className='_blur' onClick={handleToggle}></div>}
        </>
    );
};

export default MobileNav;
