import { getProducts } from '@/modules/products/services/getProducts'
import { ProductType } from '@/modules/products/types/type'
import { Button, Spin } from 'antd'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import ProductItem from '..'

const NewProduct = () => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        getProducts()
            .then((res: any) => setProducts(res.data))
            .catch((e) => toast.error('Có lỗi trong quá trình tải sản phẩm! Hãy thử Reload trang.'))
            .finally(() => setLoading(false));
    }, []);
    const handleSeeAll = () => {
        redirect('/categories');
    }
    return (
        <div className='px-2 lg:px-40'>
            <Spin spinning={loading} tip="Đang Tải...">
                <div className='flex flex-wrap'>
                    {
                        products.map((value, index) => (
                            <div className='w-2/4 lg:w-1/4 p-1' key={value.id}>
                                <ProductItem isLoading={loading} product={value} />
                            </div>
                        ))
                    }
                </div>
            </Spin>

            <div className='mt-5 text-center'>
                <Button onClick={handleSeeAll}>Xem Tất Cả</Button>
            </div>
        </div>
    )
}

export default NewProduct