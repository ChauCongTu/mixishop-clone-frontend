import ProductPrice from '@/components/product/price/price';
import { ProductFullInfo } from '@/modules/products/types/fullProduct'
import { ProductType } from '@/modules/products/types/type'
import { getProductPrice } from '@/utils/currency';
import { getCurrentTime } from '@/utils/time';
import { Space } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import React from 'react'

type Props = {
    products: ProductType[];
}

const ProductTable = (props: Props) => {
    const { products } = props;
    const columns: ColumnsType<ProductType> = [
        {
            title: 'ID',
            dataIndex: 'id'
        },
        {
            title: 'TÊN SẢN PHẨM',
            dataIndex: 'name',
            render: (text) => (
                <Link href={'/'}>{text}</Link>
            ),
        },
        {
            title: 'DANH MỤC',
            dataIndex: 'category_id'
        },
        {
            title: 'GIÁ',
            dataIndex: 'price',
            render: (_, record: ProductType) => (
                <><ProductPrice product={record} /></>
            )
        },
        {
            title: 'TỒN KHO',
            dataIndex: 'total_quantity',
            sorter: (a, b) => a.total_quantity - b.total_quantity
        },
        {
            dataIndex: 'action',
            render: (_,record) => (
                <Space>
                    <a>SỬA</a>
                    <>|</>
                    <a>KM</a>
                    <>|</>
                    <a>XÓA</a>
                </Space>
            )
        }
    ]
    return (
        <><Table dataSource={products} columns={columns} /></>
    )
}

export default ProductTable