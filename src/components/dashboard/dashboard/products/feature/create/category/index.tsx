import { getCategories } from '@/modules/categories/services/getCategories'
import { ProductType } from '@/modules/products/types/type'
import { Select } from 'antd'
import React, { useEffect, useState } from 'react'

type Props = {
    setProduct: Function
}

const SelectCategoryComponent: React.FC<Props> = ({ setProduct }) => {
    const [options, setOptions] = useState<{ value: number | null | undefined; label: string }[]>([]);

    useEffect(() => {
        fetchAPI();
    }, []);

    const setCategory = (value: any) => {
        setProduct((prevCategory: ProductType) => ({
            ...prevCategory,
            ['category_id']: value,
        }));
    }

    const fetchAPI = () => {
        getCategories()
            .then((res) => {
                const categoryOptions = res.map((category) => ({
                    value: category.id,
                    label: category.name,
                }));
                setOptions(categoryOptions);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    }

    return (
        <>
            <Select
                style={{ width: '100%' }}
                onChange={setCategory}
                options={options}
                placeholder='Chọn danh mục'
            />
        </>
    )
}

export default SelectCategoryComponent
