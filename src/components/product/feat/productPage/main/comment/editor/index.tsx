import { Button, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { HTMLInputTypeAttribute } from 'react'

type Props = {}

interface EditorProps {
    onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
    submitting: boolean;
    name: string;
    content: string;
}

const CommentEditor = ({ onContentChange, onNameChange, onSubmit, submitting, name, content }: EditorProps) => (
    <>
        <div className='text-lg'>
            ĐỂ LẠI BÌNH LUẬN CỦA BẠN
        </div>
        <Form.Item>
            <Input style={{ width: '100%' }} onChange={onNameChange} value={name} placeholder="Họ tên" />
        </Form.Item>
        <Form.Item>
            <TextArea rows={4} onChange={onContentChange} value={content} />
        </Form.Item>
        <Form.Item>
            <Button loading={submitting} onClick={onSubmit}>
                THÊM BÌNH LUẬN
            </Button>
        </Form.Item>
    </>
);
export default CommentEditor