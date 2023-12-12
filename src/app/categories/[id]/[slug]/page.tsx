'use client'
import CategoriesFilter from '@/components/categories/filter'
import { Breadcrumb, Form, Slider } from 'antd'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast';
import React, { useEffect, useState } from 'react'
import { ProductFullInfo } from '@/modules/products/types/fullProduct';
import { ProductType } from '@/modules/products/types/type';
import { getCategoryProducts } from '@/modules/categories/services/getProductOfCategory';
import CategoryProduct from '@/components/categories/product';
import { CategoryType } from '@/modules/categories/types/type';
import { getCategory } from '@/modules/categories/services/getCategory';

const CategoriesPage = ({ params }: { params: { id: number, slug: string } }) => {
  const [category, setCategory] = useState<CategoryType>()
  const [products, setProducts] = useState<ProductType[]>([]);
  const [price, setPrice] = useState([10000, 5000000]);
  const fetchProduct = (price_min?: number, price_max?: number, sort?: string) => {
    getCategoryProducts(params.id, { price_min: price_min, price_max: price_max, sort: sort })
      .then((res: any) => setProducts(res.data))
      .catch((e) => console.log('Lỗi : ' + e))
  }
  useEffect(() => {
    fetchProduct();
    getCategory(params.id)
      .then((res: CategoryType) => setCategory(res))
      .catch((e) => toast.error("Lỗi: " + e))
  }, [])
  if (!products) {
    return <></>
  }
  const onPriceClick = () => {
    toast.success("Lọc")
  }
  return (
    <>
      <div className='px-3 lg:px-40'>
        <div className='block mt-5'>
          <p className='text-xl font-bold uppercase'>{category?.name}</p>
          <Breadcrumb
            items={[
              { title: <Link href={'/'}>Trang chủ</Link> },
              { title: <Link href={'/'}>Mua Sắm</Link> }
            ]}
          />
        </div>
        <div className='flex mt-5'>
          <div className='w-full sm:order-2 lg:order-1 lg:w-2/6'>
            <CategoriesFilter onPriceClick={onPriceClick} setPrice={setPrice} price={price} />
          </div>
          <div className='w-full sm:order-1 lg:order-2 lg:ps-5 lg:w-4/6'>
            <CategoryProduct products={products} />
          </div>
        </div>
      </div>
    </>

  )
}

export default CategoriesPage