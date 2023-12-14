'use client'
import CategoriesFilter from '@/components/categories/filter'
import { Breadcrumb, Form, Pagination, Slider, Spin } from 'antd'
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
  const [sortBy, setSortBy] = useState<{ value: string, label: string }>({ value: 'created_at', label: 'Mới Nhất' });
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const fetchProduct = (price_min?: number, price_max?: number, sort?: string, page?: number) => {
    setLoading(true);
    getCategoryProducts(params.id, { price_min: price_min, price_max: price_max, sort: sort, page: page })
      .then((res: any) => {
        setProducts(res.data);
        setCurrent(res.current_page);
        setTotal(res.total);
      })
      .catch((e) => console.log('Lỗi : ' + e))
      .finally(() => setLoading(false));
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
    fetchProduct(price[0], price[1]);
    toast.success("Lọc Thành Công!")
  }
  const onSortChange = () => {
    toast.success("Thay đổi")
  }
  const handleChangePage = (page: number) => {
    const i_page = page ? page : 1;
    fetchProduct(price[0], price[1], sortBy.value, i_page);
  }
  return (
    <>
      <Spin spinning={loading} tip='Đang tải sản phẩm'>
        <div className='px-3 lg:px-40'>
          <div className='block mt-5'>
            <p className='text-xl font-bold uppercase'>{category?.name}</p>
            <Breadcrumb
              items={[
                { title: <Link href={'/'}>Trang chủ</Link> },
                { title: <Link href={'/'}>Mua Sắm</Link> }
              ]}
            />
            ({products.length} sản phẩm)
          </div>
          <div className='flex mt-5'>
            <div className='w-full sm:order-2 lg:order-1 lg:w-2/6'>
              <CategoriesFilter onPriceClick={onPriceClick} onSortChange={onSortChange} setPrice={setPrice} price={price} sortBy={sortBy} setSortBy={setSortBy} />
            </div>
            <div className='w-full sm:order-1 lg:order-2 lg:ps-5 lg:w-4/6'>
              <CategoryProduct products={products} />
              <div className='mt-5'>
                <Pagination pageSize={6} defaultCurrent={1} current={current} total={total} onChange={handleChangePage} showSizeChanger={false} />
              </div>
            </div>
          </div>
        </div>
      </Spin>

    </>

  )
}

export default CategoriesPage