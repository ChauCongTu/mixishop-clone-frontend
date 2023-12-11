import React from 'react';
import Countdown from 'react-countdown';
import './index.scss'

interface Props {
    discountTo: number;
}

interface RendererProps {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
}

const formatTime = (value: number) => (value < 10 ? `0${value}` : value);

const renderer: React.FC<RendererProps> = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
        return <></>;
    } else {
        const formattedDays = formatTime(days);
        const formattedHours = formatTime(hours);
        const formattedMinutes = formatTime(minutes);
        const formattedSeconds = formatTime(seconds);

        return (
            <>
                <div className='countdown_'>
                    <div className='countdown_title'>
                        <div className="text-white font-bold">ĐẶT HÀNG TRƯỚC</div>
                    </div>
                    <div className='countdown__'>
                        <div className='date-item'>
                            <div className='value'>{formattedDays}</div>
                            <div className='name'>Ngày</div>
                        </div>
                        <div className='date-item'>
                            <div className='value'>{formattedHours}</div>
                            <div className='name'>Giờ</div>
                        </div>
                        <div className='date-item'>
                            <div className='value'>{formattedMinutes}</div>
                            <div className='name'>Phút</div>
                        </div>
                        <div className='date-item'>
                            <div className='value'>{formattedSeconds}</div>
                            <div className='name'>Giây</div>
                        </div>
                    </div>

                </div>
            </>
        );
    }
};

const CountdownComponent: React.FC<Props> = ({ discountTo }) => {
    return (
        <>
            <Countdown date={discountTo * 1000} renderer={renderer} />
        </>
    );
};

export default CountdownComponent;
