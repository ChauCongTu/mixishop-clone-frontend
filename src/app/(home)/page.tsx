"use client"
import Banner from '@/components/banners'
import { getCategories } from '@/modules/categories/services/getCategories';
import { CategoryType } from '@/modules/categories/types/type';
import { Button, Card, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import NewProduct from '@/components/product/newProducts';
import TextArea from 'antd/es/input/TextArea';
import { SendOutlined } from '@ant-design/icons';

export default function Home() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  useEffect(() => {
    getCategories()
      .then((res: CategoryType[]) => {
        setCategories(res);
        console.log(res);
      });
  }, []);
  const onFinish = (values: any) => {
    console.log('Received values:', values);
    toast.success("Gửi liên hệ thành công, chúng tôi sẽ liên hệ lại với bạn sớm nhất có thể!");
  };
  return (
    <main>
      <div className='text-center py-20 text-3xl font-bold'>
        <p>SẢN PHẨM MỚI</p>
        <div className='w-ful'></div>
      </div>
      <NewProduct />
      <div className='mt-10 px-3 lg:px-40'>
        <div className="flex">
          <div className='w-full lg:w-3/6 lg:pe-3'>
            <Card title="Địa chỉ cửa hàng" style={{ width: '100%' }}>
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                <iframe
                  title="Google Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.884122636416!2d105.7739298745949!3d10.026420172580412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a089757b6a05bb%3A0x8ac609942925d555!2sMixiShop!5e0!3m2!1svi!2s!4v1702361033687!5m2!1svi!2s"
                  width="100%"
                  height="100%"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                  loading="lazy"
                ></iframe>
              </div>
            </Card>
          </div>
          <div className="w-full lg:w-3/6 lg:ps-3">
            <Card title="Liên hệ với chúng tôi" style={{ width: '100%' }}>
              <Form onFinish={onFinish} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                <Form.Item label={'Họ tên:'} name="name" rules={[{ required: true, message: 'Vui lòng nhập tên của bạn!' }]}>
                  <Input placeholder='Nhập tên của Bạn' />
                </Form.Item>
                <Form.Item label={'Địa chỉ Email:'} name="email" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ Email!' }]}>
                  <Input placeholder='Nhập địa chỉ Email' />
                </Form.Item>
                <Form.Item label={'Tiêu đề:'} name="subject" rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}>
                  <Input placeholder='Nhập tiêu đề' />
                </Form.Item>
                <Form.Item label={'Nội dung:'} name="content" rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}>
                  <TextArea placeholder='Nhập nội dung' rows={4} />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 6 }}>
                  <Button htmlType="submit" icon={<SendOutlined />}>
                    Gửi
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
