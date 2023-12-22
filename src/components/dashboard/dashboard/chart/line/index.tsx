'use client'
import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Thống kê doanh thu tháng',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Khoảng Chi',
            data: labels.map(() => faker.datatype.number({ min: -100, max: 10000 })),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Khoảng Thu',
            data: labels.map(() => faker.datatype.number({ min: -100, max: 10000 })),
            borderColor: '#1abc9c',
            backgroundColor: '#16a085',
        }
    ],
    
};

export const ChartComponent = () => {
    return <Line options={options} data={data} />;
}
