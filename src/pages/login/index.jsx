import React, { useEffect, useState } from 'react'
import './index.scss'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { postAuth } from '../../store/modules/auth'


export default function Login() {
  const dispatch = useDispatch()
  const [form] = Form.useForm();
  const onFinish = (values) => {
    // 实现登录
    dispatch(postAuth(values))
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  useEffect(() => {
  }, []);
  const [mobile, setMobile] = useState('13800000002');
  const [code, setCode] = useState('246810');
  const rules = {
    mobile: [
      {
        required: true,
        message: 'Please input your mobile!',
      },
    ], code: [
      {
        required: true,
        message: 'Please input your code!',
      },
    ]
  }




  return (
    <div className='continer'>
      <div className='login-container'>
        <div className='login-container-left'>
          <Form form={form} name="horizontal_login" onFinish={onFinish} onFinishFailed={onFinishFailed} initialValues={{ mobile, code }}>
            <Form.Item
              name="mobile"
              rules={rules.mobile}
            >
              <Input prefix={<UserOutlined />} placeholder="Mobile" onChange={e => setMobile(e.target.value)} />
            </Form.Item>
            <Form.Item
              name="code"
              rules={rules.code}
            >
              <Input.Password prefix={<LockOutlined />} type="code" placeholder="Code" onChange={e => setCode(e.target.value)} />
            </Form.Item>
            <Form.Item >
              <Button block type="primary" htmlType="submit" disabled={!mobile || !code}  >
                Login
              </Button>
            </Form.Item>
          </Form>

        </div>
        <div className='login-container-right' />


      </div>

    </div>
  )
}
