import React, { useEffect, useState } from 'react'
import './index.scss'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';


export default function Login() {
  const [form] = Form.useForm();


  const onFinish = (values) => {
    console.log('Finish:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  useEffect(() => {
  }, []);
  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');
  const rules = {
    username: [
      {
        required: true,
        message: 'Please input your username!',
      },
    ], password: [
      {
        required: true,
        message: 'Please input your password!',
      },
    ]
  }
  const conste = (e) => {
    console.log(e.target.value)
  }




  return (
    <div className='continer'>
      <div className='login-container'>
        <div className='login-container-left'>
          <Form form={form} name="horizontal_login" onFinish={onFinish} onFinishFailed={onFinishFailed} initialValues={{ username: userName, password: passWord }}>
            <Form.Item
              name="username"
              rules={rules.username}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" onChange={e => setUserName(e.target.value)} />
            </Form.Item>
            <Form.Item
              name="password"
              rules={rules.password}
            >
              <Input.Password prefix={<LockOutlined />} type="password" placeholder="Password" onChange={e => setPassWord(e.target.value)} />
            </Form.Item>
            <Form.Item >
              <Button block type="primary" htmlType="submit" disabled={!userName || !passWord}  >
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
