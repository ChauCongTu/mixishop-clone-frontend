import { getComment } from '@/modules/products/services/comments/getComments';
import { CommentType } from '@/modules/products/types/commentType'
import { Avatar, Button, Divider, Form, Input, List, Pagination } from 'antd';
import React, { useEffect, useState } from 'react'
import CommentEditor from './editor';
import CommentItem from './item';
import toast, { Toaster } from 'react-hot-toast';
import { CommentSchema } from '@/modules/products/validates/comments/schema';
import { storeComment } from '@/modules/products/services/comments/storeComment';

type Props = {
    product_id: number
}

const { TextArea } = Input;


const ProductComment: React.FC<Props> = ({ product_id }) => {
    const [comments, setComments] = useState<CommentType[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [current, setCurrent] = useState(1);
    const [total, setTotal] = useState(0);
    const fetchComments = (id: number, page?: number) => {
        getComment(id)
            .then((res: any) => {
                setComments(res.data);
                setCurrent(res.current_page);
                setTotal(res.total)
            })
            .catch((e) => {
                toast.error('Something went wrong!');
            })
    }

    useEffect(() => {
        fetchComments(product_id);
    }, []);

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    const handleSubmit = () => {
        try {
            CommentSchema.parse({ name, content });
            const loadingToast = toast.loading('Đang thêm bình luận...');

            storeComment({ product_id: product_id, name: name, content: content })
                .then((res: CommentType) => {
                    toast.dismiss(loadingToast);
                    setComments((prevComments) => [res, ...prevComments]);
                    setContent('');

                    toast.success('Thêm bình luận thành công!');
                })
                .catch((error) => {
                    console.log(error);
                    toast.dismiss(loadingToast);
                    toast.error('Có lỗi xảy ra khi thêm bình luận. Vui lòng thử lại sau.');
                });
        } catch (error: any) {
            error.errors.forEach((value: any) => {
                toast.error(value.message);
            });
        }
    };
    const handleChangePage = (page: number) => {
        const i_page = page ? page : 1;
        fetchComments(product_id, page);
    }
    return (
        <div className='flex flex-wrap'>
            <div className='w-full lg:w-3/6'>
                {
                    comments?.map((value, index) => {
                        return (
                            <div key={value.id}>
                                <CommentItem comment={value} />
                            </div>
                        );
                    })
                }
                <Pagination pageSize={5} defaultCurrent={1} current={current} total={total} onChange={handleChangePage} showSizeChanger={false} />

            </div>
            <div className='w-full mt-10 border-t-2 lg:mt-0 lg:border-t-0 pt-5 lg:w-3/6'>
                <CommentEditor
                    onContentChange={handleContentChange}
                    onNameChange={handleNameChange}
                    onSubmit={handleSubmit}
                    submitting={submitting}
                    name={name}
                    content={content} />
            </div>
            <Toaster />
        </div>
    )
}

export default ProductComment