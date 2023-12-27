import { ProductFullInfo } from '@/modules/products/types/fullProduct'
import { ProductType } from '@/modules/products/types/type'
import { formatCurrency } from '@/utils/currency'
import { getCurrentTime } from '@/utils/time'
import React from 'react'

type Props = {
    product: ProductFullInfo | ProductType
}

const ProductPrice: React.FC<Props> = ({ product }) => {
    const currentTimestamp = getCurrentTime();
    return (
        <div>
            {
                (product.discount_to && product.discount_to >= currentTimestamp) ?
                    <><span className='font-bold text-red-500'>{formatCurrency(product.discount_price)}</span> <del className='italic font-light text-sm'>{formatCurrency(product.price)}</del></> :
                    <span className='font-bold'>{formatCurrency(product.price)}</span>
            }
        </div>
    )
}

export default ProductPrice