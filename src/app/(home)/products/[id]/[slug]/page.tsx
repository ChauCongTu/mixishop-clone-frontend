'use client'
import { getProduct } from '@/modules/products/services/getProduct'
import { ProductFullInfo } from '@/modules/products/types/fullProduct'
import { Breadcrumb, Spin } from 'antd'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ImageGallery from "react-image-gallery";
import '../../../../../../node_modules/react-image-gallery/styles/scss/image-gallery.scss';
import { getOptions } from '@/modules/products/services/options/getOptions'
import ProductInfo from '@/components/product/feat/productPage/productInfo'
import MainProductPage from '@/components/product/feat/productPage/main'


const ProductPage = ({ params }: { params: { id: number, slug: string } }) => {
    const [product, setProduct] = useState<ProductFullInfo>();
    const [loading, setLoading] = useState(false);
    const [sizes, setSizes] = useState<any>([]);
    const [colors, setColors] = useState<any>([]);
    // Form State
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');
    const [quantity, setQuantity] = useState(0);
    useEffect(() => {
        setLoading(true);
        getProduct(params.id)
            .then((res) => {
                setProduct(res);
            })
            .catch((e) => {throw e})
            .finally(() => setLoading(false));
        getOptions(params.id)
            .then((res: any) => {
                setSizes(res.colors);
                setColors(res.sizes);
            });
    }, []);
    if (!product) {
        return <></>
    }


    const imagesList = product.images.map((element) => ({
        original: element.url_image,
        thumbnail: element.url_image,
    }));
    return (
        <div className='px-3 lg:px-40'>
            <Spin spinning={loading} size="large" tip="Loading...">
                <div className='block mt-5'>
                    <Breadcrumb
                        items={[
                            { title: <Link href={'/'}>Trang chủ</Link> },
                            { title: <Link href={'/'}>Mua Sắm</Link> },
                            { title: <Link href={'/'}>Danh Mục</Link> },
                            { title: product.name }
                        ]}
                    />
                </div>
                <div className='flex flex-wrap mt-5 bg-white-500'>
                    <div className='w-full lg:w-2/6'>
                        {/* Image Slider */}
                        <ImageGallery items={imagesList} autoPlay showPlayButton={false} thumbnailPosition={'left'} />
                    </div>
                    <div className='w-full lg:w-2/6 lg:px-5'>
                        <ProductInfo
                            id={params.id}
                            product={product}
                            size={size}
                            setSize={setSize}
                            color={color}
                            setColor={setColor}
                            sizes={sizes}
                            colors={colors}
                            quantity={quantity}
                            setQuantity={setQuantity}
                        />
                    </div>
                    <div className='w-full mt-5 lg:mt-0 lg:w-2/6 lg:px-5'>
                        <div className='font-bold text-xl'>THÔNG TIN SẢN PHẨM</div>
                        <div className='mt-5'>
                            {product.summary}
                        </div>
                    </div>
                </div>
                <div className='mt-10'>
                    <MainProductPage product={product} id={params.id}/>
                </div>
                <div className='mt-10'>
                    {/* Relative Product */}
                </div>
            </Spin>
        </div>
    )
}

export default ProductPage