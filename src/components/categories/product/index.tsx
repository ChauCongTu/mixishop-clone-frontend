import ProductItem from '@/components/product';
import { ProductType } from '@/modules/products/types/type'
import React from 'react'

type Props = {
    products: ProductType[];
}

const CategoryProduct: React.FC<Props> = ({ products }) => {
    return (
        <div className='flex flex-wrap'>
            {
                products.map((value) => {
                    return (
                        <div key={value.id} className="w-2/4 lg:w-2/6 px-2"><ProductItem product={value} /></div>
                    );
                })
            }
        </div>
    )
}

export default CategoryProduct