import { getProducts } from '@/modules/products/services/getProducts'
import { ProductType } from '@/modules/products/types/type'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ProductItem from '..'

type Props = {}

const NewProduct = (props: Props) => {
    const [products, setProducts] = useState<ProductType[]>([]);
    useEffect(() => {
        getProducts().then((res: any) => setProducts(res.data));
    }, []);
    return (
        <div className='px-2 lg:px-40'>
            <div className='flex flex-wrap'>
                {
                    products.map((value, index) => (
                        <ProductItem product={value} />
                    ))
                }
            </div>
            <div className='mt-5 text-center'>
                <Link href={'/'} className='p-3 bg-cyan-400 text-white hover:bg-cyan-500'>Xem Tất Cả</Link>
            </div>
        </div>
    )
}

export default NewProduct