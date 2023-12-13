import { SortCategories } from '@/configs/categories/sort';
import { formatCurrency } from '@/utils/currency';
import { Button, Card, Divider, Form, Input, Select, Slider } from 'antd';
import React, { useState } from 'react';

type Props = {
    price: number[];
    setPrice: React.Dispatch<React.SetStateAction<number[]>>;
    sortBy: any;
    setSortBy: React.Dispatch<React.SetStateAction<any>>;
    onPriceClick: () => void;
    onSortChange: () => void
};

const CategoriesFilter: React.FC<Props> = ({ price, setPrice, sortBy, setSortBy, onPriceClick, onSortChange }) => {
    
    const onChange = (newValue: number[]) => {
        setPrice(newValue);
    };

    const onFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrice([+e.target.value, price[1]]);
    };

    const onToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrice([price[0], +e.target.value]);
    };

    return (
        <>
            <Card title="LỌC SẢN PHẨM">
                <div className="mt-3">
                    <Form.Item>
                        <label className="blocks">Lọc theo giá</label>
                        <Slider style={{ color: 'red' }} range value={price} min={10000} max={5000000} onChange={onChange} />
                    </Form.Item>
                    <div className="flex">
                        <div className="pe-3">
                            <Input placeholder="Từ" onChange={onFromChange} value={price[0]} />
                        </div>
                        <div className="ps-3">
                            <Input placeholder="Đến" onChange={onToChange} value={price[1]} />
                        </div>
                    </div>
                    <div className="flex items-center mt-5">
                        <Button onClick={onPriceClick}>Lọc</Button>
                        <div className="font-light ms-5">Giá từ: {formatCurrency(price[0])} - {formatCurrency(price[1])}</div>
                    </div>
                </div>
                <Divider />
                <div className='mt-3'>
                    <p className='mb-5'>Hiển thị theo</p>
                    <Select style={{ width: '100%' }} placeholder='Mới Nhất' onChange={(selectedOption) => {
                        setSortBy(selectedOption);
                        onSortChange
                    }} options={SortCategories} />
                </div>
            </Card>
        </>

    );
};

export default CategoriesFilter;
