"use client"
import Banner from '@/components/banners'
import { getCategories } from '@/modules/categories/services/getCategories';
import { CategoryType } from '@/modules/categories/types/type';
import { Divider } from 'antd';
import { useEffect, useState } from 'react';
import '../../node_modules/video-react/styles/scss/video-react.scss';
import ReactPlayer from 'react-player';

import { Player } from 'video-react';
import NewProduct from '@/components/product/newProducts';

export default function Home() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  useEffect(() => {
    getCategories()
      .then((res: CategoryType[]) => {
        setCategories(res);
        console.log(res);
      });
  }, []);
  return (
    <main>
      <Banner />
      <div className='text-center py-20 text-3xl font-bold'>
        <p className=''>SẢN PHẨM MỚI</p>
      </div>
      {/* Best Seller Component */}
      <NewProduct />
      {/* Component */}
      <div className='px-3 lg:px-40'>
        {
          categories.map((value, index) => {
            if (value.children.length == 0) {
              return (
                <div key={value.id}>
                  <div className='py-10 text-xl font-bold'>
                    {value.name}
                    <Divider />
                  </div>
                  <div>
                    {/* Component */}
                    List SP
                  </div>
                </div>
              );
            }
          })
        }
      </div>

      <div className='px-3 lg:px-40'>
        
      </div>
    </main>
  )
}
