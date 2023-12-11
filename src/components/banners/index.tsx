'use client'
import { getBanners } from '@/modules/banners/services/getBanners';
import { BannerType } from '@/modules/banners/types/type'
import { Carousel } from 'antd';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const Banner = () => {
    const [banners, setBanners] = useState<BannerType[]>([]);
    useEffect(() => {
        getBanners()
            .then((res: any) => {
                setBanners(res.data);
            })
    }, [])
    return (
        <Carousel autoplay autoplaySpeed={1000}>
            {
                banners.map((value : BannerType, index) => {
                    return (
                        <div key={value.id}>
                            <img src={value.url_image} className='w-full h-5/6' />
                        </div>
                    );
                })
            }
        </Carousel>
    )
}

export default Banner