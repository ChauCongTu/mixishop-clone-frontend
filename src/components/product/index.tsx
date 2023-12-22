import React from 'react';
import Link from 'next/link';
import { ProductType } from '@/modules/products/types/type';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import ProductPrice from './price/price';

const { Meta } = Card;

interface Props {
  product: ProductType;
  isLoading: boolean;
}

const ProductItemSkeleton: React.FC = () => {
  return (
    <Card hoverable>
      <div className="skeleton-image" />
      <div className="skeleton-text" />
    </Card>
  );
};

const ProductItem: React.FC<Props> = ({ product, isLoading }) => {
  const productNameStyle = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  if (isLoading) {
    return <ProductItemSkeleton />;
  }

  return (
    <Card
      hoverable
      cover={
        <div className="relative overflow-hidden h-80 aspect-w-3 aspect-h-4 transition-transform transform">
          <div className="overflow-hidden h-full">
            <img
              src={product.images[0].url_image}
              className="object-cover w-full h-full"
              alt={product.name}
            />
          </div>

          <div className="absolute top-2 right-2 space-x-2">
            <HeartOutlined className="text-red-500 cursor-pointer hover:text-red-700" />
            <ShoppingCartOutlined className="text-blue-500 cursor-pointer hover:text-blue-700" />
          </div>
        </div>
      }
    >
      <div className="text-center mt-4">
        <div style={productNameStyle}>
          <Link
            href={`/products/${product.id}/${product.slug}`}
            className="block text-blue-900 text-lg hover:text-black"
          >
            {product.name}
          </Link>
        </div>
        <div className="font-bold mt-2">
          <ProductPrice product={product} />
        </div>
      </div>
    </Card>
  );
};

export default ProductItem;
