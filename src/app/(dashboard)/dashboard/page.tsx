import { Card, Divider } from 'antd';
import {
    UserOutlined,
    AppstoreOutlined,
    ShoppingOutlined,
    DollarCircleOutlined,
} from '@ant-design/icons';
import React from 'react';
import { ChartComponent } from '@/components/dashboard/dashboard/chart/line';

const DashboardPage = () => {
    return (
        <>
            <div className='text-xl font-bold'>BẢNG ĐIỀU KHIỂN</div>
            <Divider />

            <div className='flex flex-wrap'>
                {/* Người dùng Card */}
                <div className='w-full lg:w-1/4'>
                    <Card className='mx-2' title='KHÁCH HÀNG' extra={<UserOutlined />} bordered={false} headStyle={{ borderBottom: '2px solid #FFC312' }} bodyStyle={{ background: '#FFC312' }}>
                        <div className='text-3xl font-bold text-white text-end'>15</div>
                    </Card>
                </div>


                {/* Sản phẩm Card */}
                <div className='w-full lg:w-1/4'>
                    <Card className='mx-2' title='SẢN PHẨM' extra={<AppstoreOutlined />} bordered={false} headStyle={{ borderBottom: '2px solid #1289A7' }} bodyStyle={{ background: '#1289A7' }}>
                        <div className='text-3xl font-bold text-white text-end'>50</div>
                    </Card>
                </div>


                {/* Đơn hàng Card */}
                <div className='w-full lg:w-1/4'>
                    <Card className='mx-2' title='ĐƠN HÀNG' extra={<ShoppingOutlined />} bordered={false} headStyle={{ borderBottom: '2px solid #EA2027' }} bodyStyle={{ background: '#EA2027' }}>
                        <div className='text-3xl font-bold text-white text-end'>20</div>
                    </Card>
                </div>


                {/* Doanh thu Card */}
                <div className='w-full lg:w-1/4'>
                    <Card className='mx-2' title='DOANH THU' extra={<DollarCircleOutlined />} bordered={false} headStyle={{ borderBottom: '2px solid #12CBC4' }} bodyStyle={{ background: '#12CBC4' }}>
                        <div className='text-3xl font-bold text-white text-end'>$10,000</div>
                    </Card>
                </div>
            </div>
            <div className='mt-10 w-1/2'>
                <ChartComponent />
            </div>
        </>
    );
};

export default DashboardPage;
