import { ProductType } from '@/modules/products/types/type'
import Link from 'next/link'
import React from 'react'
import ProductPrice from './price/price'

interface Props {
    product: ProductType
}

const ProductItem: React.FC<Props> = ({ product }) => {
    return (
        <>
            <div className="img">
                <img src={product.images[0].url_image} className='w-full' alt='' />
            </div>
            <div className='text-center mt-2'>
                <div className='block text-light text-sm'>ÁO MIXI</div>
                <div className='block text-cyan-400 font-bold'>
                    <Link href={'/products/' + product.id + '/' + product.slug} className='block text-cyan-400 font-bold hover:text-sky-500'>
                        {product.name}
                    </Link>
                </div>
                <div className='block font-bold'><ProductPrice product={product} /></div>
            </div>
        </>
    )
}

export default ProductItem