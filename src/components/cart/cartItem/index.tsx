'use client'
import { CartItemType } from '@/modules/cart/types/type';
import React, { useEffect, useState } from 'react';
import { Button, Image, Space } from 'antd';
import { useCart } from 'cart';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { formatCurrency } from '@/utils/currency';

type Props = {
    cartItem: CartItemType;
};

const CartItem: React.FC<Props> = ({ cartItem }) => {
    const [total, setTotal] = useState(cartItem.price * cartItem.quantity);
    const {
        addToCart,
        decreaseItem,
    } = useCart();
    useEffect(() => {
        setTotal(cartItem.price * cartItem.quantity);
    }, [cartItem.quantity])
    return (
        <div className="flex items-center justify-between border-b-2 pb-2 mb-2">
            <div className="flex items-center space-x-4">
                <Image src={cartItem.image} alt={cartItem.name} width={80} />
                <div>
                    <div className="text-lg font-semibold">{cartItem.name}</div>
                    <div className="text-gray-500">
                        Size: {cartItem.size}, Color: {cartItem.color}
                    </div>
                    <div className="text-blue-600 font-semibold">${cartItem.price}</div>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <Space>
                </Space>
                <div className="font-semibold">{formatCurrency(total)}</div>
            </div>
        </div>
    );
};

export default CartItem;
