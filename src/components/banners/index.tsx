'use client'
import { getBanners } from '@/modules/banners/services/getBanners';
import { BannerType } from '@/modules/banners/types/type'
import { Carousel, Spin } from 'antd';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const Banner = () => {
    const [banners, setBanners] = useState<BannerType[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        getBanners()
            .then((res: any) => {
                setBanners(res.data);
            })
            .catch((e) => toast.error('Có lỗi xảy ra, hãy thử Reload trang'))
            .finally(() => setLoading(false));
    }, [])
    return (
        <Spin spinning={loading} style={{ height: '300px' }} tip='Đang tải Banner ...'>
            <Carousel autoplay autoplaySpeed={1000}>
                {
                    banners.map((value: BannerType, index) => {
                        return (
                            <div key={value.id}>
                                <img src={value.url_image} className='w-full h-5/6' />
                            </div>
                        );
                    })
                }
            </Carousel>
        </Spin>
    )
}

export default Banner