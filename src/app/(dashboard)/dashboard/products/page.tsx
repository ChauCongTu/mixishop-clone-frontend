'use client'
import CreateProduct from '@/components/dashboard/dashboard/products/feature/create';
import ProductTable from '@/components/dashboard/dashboard/products/feature/table';
import { getProducts } from '@/modules/products/services/getProducts';
import { ProductType } from '@/modules/products/types/type';
import { Button, Divider } from 'antd';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

type Props = {}

const ProductAdmin = (props: Props) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  useEffect(() => {
    getProducts({ select: 'all' })
      .then((res: ProductType[]) => setProducts(res))
      .catch((e) => toast.error('Có lỗi xảy ra, check Console Log!'))
  }, []);
  return (
    <>
      <div className='flex flex-wrap items-center justify-between pt-3'>
        <div className='text-xl font-bold'>QUẢN LÝ SẢN PHẨM</div>
        <div>
          <CreateProduct />
        </div>
      </div>
      <Divider />
      <ProductTable products={products} />
    </>
  )
}

export default ProductAdmin