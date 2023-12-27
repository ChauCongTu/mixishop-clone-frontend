'use client'
import { Divider, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import CreateCategory from '../../../../components/dashboard/dashboard/categories/feature/create';
import { CategoryType } from '@/modules/categories/types/type';
import CategoriesTable from '@/components/dashboard/dashboard/categories/feature/table';
import { getCategories } from '@/modules/categories/services/getCategories';

type Props = {}

const CategoriesDashboard = (props: Props) => {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    useEffect(() => {
        getCategories()
            .then((res) => setCategories(res))
    }, []);
    return (
        <>
            <div className='flex flex-wrap items-center justify-between pt-3'>
                <div className='text-xl font-bold'>QUẢN LÝ DANH MỤC</div>
                <div>
                    <CreateCategory categories={categories} setCategories={setCategories} />
                </div>
            </div>
            <Divider />
            <CategoriesTable setCategories={setCategories} categories={categories} />
        </>
    )
}

export default CategoriesDashboard