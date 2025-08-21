import { Outlet } from 'react-router-dom';
import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, ConfigProvider, Layout, theme } from 'antd';
import '../../App.scss';
import './index.scss'
import Menus from '../../components/menu/index';

const { Header, Sider, Content } = Layout;


export default function Index() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            siderBg: '#00034D',
          },
        },
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        {/* 00034D */}
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" >LOGO-TITLE</div>
          <Menus />
        </Sider>

        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />

          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>

  );
}


