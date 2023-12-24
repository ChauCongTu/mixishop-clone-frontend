'use client'
import React, { useEffect, useState } from 'react';
import { Space, Spin, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CategoryType } from '@/modules/categories/types/type';
import DeleteCategory from '../delete';
import UpdateCategory from '../update';

interface Type {
    categories: CategoryType[],
    setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
}


const CategoriesTable: React.FC<Type> = ({ categories, setCategories }) => {
    const [loading, setLoading] = useState(false);
    const columns: ColumnsType<CategoryType> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: true,
        },
        {
            title: 'TÊN DANH MỤC',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'MÔ TẢ',
            dataIndex: 'desc',
            key: 'desc',
        },
        {
            title: 'THUMB',
            dataIndex: 'thumb',
            key: 'thumb',
            render: (text) => <img src={text} width={40} />

        },
        {
            title: '',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <><UpdateCategory setCategories={setCategories} categories={categories} pr_category={record} /></>
                    <>|</>
                    <><DeleteCategory setCategories={setCategories} categories={categories} category_id={record.id} /></>
                </Space>
            ),
        },
    ];
    return (
        <Table bordered columns={columns} dataSource={categories} />

    );
};

export default CategoriesTable;