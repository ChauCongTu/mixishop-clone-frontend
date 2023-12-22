import Link from 'next/link';
import React from 'react'; // Import Link from react-router-dom for navigation

type Props = {};

function ForbiddenComponent({ }: Props) {
  return (
    <div className='bg-black bg-opacity-50 h-screen flex items-center justify-center'>
      <div className="bg-white p-8 rounded-lg text-center">
        <h1 className="text-black font-bold mb-4">MixiShop</h1>
        <p className="text-black text-3xl font-bold mb-8">KHÔNG ĐỦ THẨM QUYỀN</p>
        <Link href="/" className="text-blue-500 hover:underline">Quay lại trang chủ</Link>
      </div>
    </div>
  );
}

export default ForbiddenComponent;
