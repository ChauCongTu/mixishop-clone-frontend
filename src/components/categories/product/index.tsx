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
                products.length > 0 ? 
                    products.map((value) => {
                        return (
                            <div key={value.id} className="w-2/4 lg:w-2/6 px-2"><ProductItem product={value} /></div>
                        );
                    }) :
                    <div className='text-gray-700 text-xl font-light'>Danh mục trống!</div>
            }
        </div>
    )
}

export default CategoryProduct