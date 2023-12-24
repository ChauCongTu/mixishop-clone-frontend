'use client'
import React from "react";
import { useCart } from "cart";
import { Breadcrumb, Button } from "antd";
import { CartItemType } from "@/modules/cart/types/type";
import CartItem from "@/components/cart/cartItem";
import Link from "next/link";

const item: CartItemType = {
  productId: '5',
  product_id: 5,
  image: 'https://via.placeholder.com/768x1152.png/dc3545',
  name: 'Áo Mixi 2023',
  price: 270000,
  quantity: 1,
  total: 270000,
  size: 'XL',
  color: 'Đen'
};

function Cart() {
  const {
    addToCart,
    cartItems,
    clearCart,
    decreaseItem,
    toggleCart,
    isCartOpen,
  } = useCart();

  return (
    <div className="px-3 lg:px-40">
      <div className='block mt-5'>
        <p className='text-xl font-bold uppercase'>Giỏ hàng của tôi</p>
        <Breadcrumb
          items={[
            { title: <Link href={'/'}>Trang chủ</Link> },
            { title: 'Giỏ hàng của tôi' }
          ]}
        />
      </div>

      <div className="flex mt-5">
        <div className="w-full lg:w-4/6 pe-3">
          {
            (cartItems) ? cartItems.map((value: any) => {
              return (
                <div key={value.product_id}>
                  <CartItem cartItem={value} />
                </div>
              );
            })

              :
              <div className="">Giỏ hàng trống!</div>
          }
        </div>
        <div className="w-full lg:w-2/6 ps-3">
          THANH TOÁN
        </div>
      </div>
    </div>
  );
}

export default Cart;