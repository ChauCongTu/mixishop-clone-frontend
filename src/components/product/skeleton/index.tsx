import React from 'react';
import { Card, Skeleton } from 'antd';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const { Meta } = Card;

const ProductItemSkeleton: React.FC = () => {
    return (
        <Card hoverable>
            <Skeleton.Image style={{ height: '300px', objectFit: 'cover' }} />
            <div className="absolute top-2 right-2 space-x-2">
                <HeartOutlined className="text-red-500 cursor-pointer hover:text-red-700" />
                <ShoppingCartOutlined className="text-blue-500 cursor-pointer hover:text-blue-700" />
            </div>
            <div className="text-center mt-4">
                <Skeleton active paragraph={{ rows: 1 }} />
                <Skeleton active paragraph={{ rows: 1 }} />
            </div>
        </Card>
    );
};

export default ProductItemSkeleton;
