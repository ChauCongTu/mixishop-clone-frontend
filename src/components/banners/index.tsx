'use client'
import { getBanners } from '@/modules/banners/services/getBanners';
import { BannerType } from '@/modules/banners/types/type'
import { Carousel, Skeleton, Spin } from 'antd';
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
        <>
            {loading ? <Skeleton.Image style={{ width: '19747px', height:'80vh' }} active={loading}/> :
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
                </Carousel>}
        </>
    )
}

export default Banner