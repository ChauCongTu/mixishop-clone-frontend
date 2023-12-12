import { ProductFullInfo } from '@/modules/products/types/fullProduct'
import React from 'react'
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import ProductDesc from './desc';
import ProductComment from './comment';

interface Props {
    product: ProductFullInfo,
    id: number
}

const MainProductPage: React.FC<Props> = ({ product, id }) => {
    const onChange = (key: string) => {
        console.log(key);
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: <span className='font-bold'>THÔNG TIN SẢN PHẨM</span>,
            children: <ProductDesc desc={product.desc} />,
        },
        {
            key: '2',
            label: <span className='font-bold'>BÌNH LUẬN ({product.comments?.length})</span>,
            children: <ProductComment product_id={id} />,
        },
        {
            key: '3',
            label: <span className='font-bold'>ĐÁNH GIÁ ({product.reviews?.length})</span>,
            children: 'Content of Tab Pane 3',
        },
    ];
    return (
        <div>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
    )
}

export default MainProductPage