import React, { useEffect } from 'react';
import { Button, notification, Space } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface Props {
    type: NotificationType,
    title: string,
    description?: string
}

const NotificationShow: React.FC<Props> = ({ type, title, description }) => {
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => openNotificationWithIcon, []);

    const openNotificationWithIcon = () => {
        api[type]({
            message: title,
            description: description,
        });
    };

    return (
        <>
            {contextHolder}
        </>
    );
};

export default NotificationShow;