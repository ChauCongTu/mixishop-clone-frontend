import { CommentType } from '@/modules/products/types/commentType';
import { formatDate } from '@/utils/time';
import { Avatar, Button, Divider } from 'antd';
import React from 'react';

type Props = {
    comment: CommentType | null;
};

const getRoleBadge = (role: string) => {
    if (role === 'Admin') {
        return <span className='bg-gray-100 p-2 text-xs rounded-md'>QUẢN TRỊ VIÊN</span>;
    } else {
        return <span className='bg-gray-100 p-2 text-xs rounded-md'>ĐÃ XÁC THỰC</span>;
    }
};

const CommentItem: React.FC<Props> = ({ comment }) => {
    return (
        <div className='pe-4'>
            <div className='flex'>
                {(comment?.user) ? (
                    <>
                        <Avatar src={comment.user.avatar} alt={comment.name} />
                        <div className='ps-5'>
                            <div className='font-bold'>
                                {comment?.name} {getRoleBadge(comment?.user.role)}
                            </div>
                            <div className='text-xs font-light'>{formatDate(comment.created_at)}</div>
                            <div className='mt-2 italic text-md'>{comment.content}</div>
                            {/* <div className='mt-2'>
                                <button className='text-md hover:text-sky-800'>Trả lời</button>
                            </div> */}
                        </div>
                    </>
                ) : (
                    <>
                        <Avatar src='https://joeschmoe.io/api/v1/random' alt='Han Solo' />
                        <div className='ps-5'>
                        <div className='font-bold'>
                                {comment?.name}
                            </div>
                            <div className='text-xs font-light'>{formatDate('')}</div>
                            <div className='mt-2 italic text-md'>{comment?.content}</div>
                        </div>
                    </>
                )}
            </div>
            <Divider />
        </div>
    );
};

export default CommentItem;
