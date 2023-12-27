import React, { useState, useEffect } from 'react';
import { differenceInSeconds, format } from 'date-fns';
import './index.scss'

const padZero = (num: number) => (num < 10 ? `0${num}` : num);

const CountdownTimer: React.FC<{ timestamp: number; label?: string | 'KHUYẾN MÃI CÒN' }> = ({ timestamp, label }) => {
  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = Date.now();
      const distanceInSeconds = differenceInSeconds(timestamp * 1000, now);

      if (distanceInSeconds > 0) {
        const days = Math.floor(distanceInSeconds / (24 * 3600));
        const hours = Math.floor((distanceInSeconds % (24 * 3600)) / 3600);
        const minutes = Math.floor((distanceInSeconds % 3600) / 60);
        const seconds = distanceInSeconds % 60;

        setRemainingTime({ days, hours, minutes, seconds });
      } else {
        return <></>;
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timestamp]);

  return (
    <div>
      <div className="countdown_">
        <div className="countdown_title">
          <div className="text-white font-bold py-3">{label ? label : 'KẾT THÚC TRONG'}</div>
        </div>
        <div className="countdown__">
          <div className="date-item">
            <div className="value">{padZero(remainingTime.days)}</div>
            <div className="name">Ngày</div>
          </div>
          <div className="date-item">
            <div className="value">{padZero(remainingTime.hours)}</div>
            <div className="name">Giờ</div>
          </div>
          <div className="date-item">
            <div className="value">{padZero(remainingTime.minutes)}</div>
            <div className="name">Phút</div>
          </div>
          <div className="date-item">
            <div className="value">{padZero(remainingTime.seconds)}</div>
            <div className="name">Giây</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
