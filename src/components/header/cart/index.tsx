import React, { useState } from 'react';
import { Badge, Drawer, Button, Divider, List, Avatar } from 'antd';
import {
    ShoppingCartOutlined,
    CloseOutlined,
    CheckOutlined,
} from '@ant-design/icons';
import { formatCurrency } from '@/utils/currency';

const CartNav = () => {
    const [cartVisible, setCartVisible] = useState(false);

    const showCartDrawer = () => {
        setCartVisible(true);
    };

    const closeCartDrawer = () => {
        setCartVisible(false);
    };

    // Mock data for cart items
    const cartItems = [
        { id: 1, name: 'Product 1', price: 12000, quantity: 2 },
        { id: 2, name: 'Product 2', price: 30000, quantity: 1 },
    ];

    // Calculate total price
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <>
            <div className="relative">
                <Button type="link" onClick={showCartDrawer} className='flex text-black'>
                    <ShoppingCartOutlined style={{ fontSize: '1.5rem' }} /> ({cartItems.length})
                </Button>
            </div>

            <Drawer
                title="Giỏ hàng của bạn"
                placement="right"
                closable={false}
                onClose={closeCartDrawer}
                visible={cartVisible}
                width={350}
            >
                <List
                    itemLayout="horizontal"
                    dataSource={cartItems}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src="https://via.placeholder.com/50" />}
                                title={item.name}
                                description={`${formatCurrency(item.price)} x ${item.quantity}`}
                            />
                        </List.Item>
                    )}
                />

                <Divider />

                <div className="flex justify-between items-center">
                    <span>Tạm tính:</span>
                    <strong>{formatCurrency(total)}</strong>
                </div>

                <Divider />

                <div className="flex justify-between">
                    <Button icon={<CloseOutlined />} onClick={closeCartDrawer} style={{ width: '100%' }}>
                        Đóng
                    </Button>
                    <Button className='bg-blue-400 text-white hover:bg-white' style={{ width: '100%' }} icon={<CheckOutlined />}>
                        Thanh toán
                    </Button>
                </div>
            </Drawer>
        </>
    );
};

export default CartNav;
