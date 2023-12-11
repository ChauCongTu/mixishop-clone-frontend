import ProductPrice from '@/components/product/price/price'
import { getQuantity } from '@/modules/products/services/options/getQuantity'
import { ProductFullInfo } from '@/modules/products/types/fullProduct'
import { Divider, InputNumber, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import CountdownComponent from '../countdown'

type Props = {
    id: number,
    product: ProductFullInfo,
    quantity: number,
    size: string,
    color: string,
    setSize: Function,
    setColor: Function,
    setQuantity: Function,
    sizes: [],
    colors: []
}

const ProductInfo: React.FC<Props> = ({ id, product, quantity, size, color, sizes, colors, setColor, setSize, setQuantity }) => {
    const [totalQuantity, setTotalQuantity] = useState(product.total_quantity);
    useEffect(() => {
        handleChangeOption();
    }, [color, size])
    const handleChangeOption = () => {
        if (size.length > 0 && color.length > 0) {
            getQuantity(id, { color: size, size: color })
                .then((res: any) => {
                    console.log(res);
                    setTotalQuantity(res.quantity);
                })
        }
        else {
            setTotalQuantity(product.total_quantity);
        }
    }
    return (
        <>
            <div className='text-3xl font-bold'>{product.name}</div>
            <Divider />
            <div className="text-xl mt-5"><ProductPrice product={product} /></div>
            <div className='mt-5'>
                <CountdownComponent discountTo={product.discount_to} />
            </div>
            <div className="mt-5 flex">
                <Select
                    placeholder='Chọn Size'
                    style={{ width: '50%' }}
                    options={sizes}
                    onChange={(selectedOption) => setSize(selectedOption)
                    }
                />

                <Select
                    placeholder='Chọn Màu'
                    style={{ width: '50%' }}
                    options={colors}
                    onChange={(selectedOption) => setColor(selectedOption)
                    }
                />
            </div>
            <div className="mt-3">
                <InputNumber placeholder='Nhập số lượng' value={quantity} onChange={(event) => setQuantity(event)} min={0} max={totalQuantity} style={{ width: '100%' }} />
            </div>
            <div className="mt-5">
                <button className="py-2 px-6 bg-red-600 text-white rounded-3xl font-bold hover:bg-red-400">THÊM VÀO GIỎ HÀNG</button>
                {
                    totalQuantity > 0 ?
                        <span className='ms-5 text-green-500'>Còn {totalQuantity} Sản Phẩm</span> :
                        <span className='ms-5 text-red-600'>Hết Hàng</span>
                }
            </div>
        </>
    )
}

export default ProductInfo