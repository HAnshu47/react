import { Outlet, useLocation } from 'react-router-dom';
import React from 'react';
import { TabBar } from 'antd-mobile';
import {
  AppOutline,
  UnorderedListOutline,
  UserOutline
} from 'antd-mobile-icons';
import { useNavigate } from 'react-router-dom';
import '../../App.scss';

export default function Index() {
  // 获取当前页面路径，制作高亮
  const location = useLocation();
  const tabs = [
    {
      key: '/',
      title: '月账单',
      icon: <AppOutline />
    },
    {
      key: 'record',
      title: '新增',
      icon: <UnorderedListOutline />
    },
    {
      key: 'years',
      title: '年账单',
      icon: <UserOutline />
    }
  ];

  const navigate = useNavigate();
  const setActiveKey = (key) => {
    navigate(`/${key}`);
  };
  return (
    <div className="app">
      <div className="body">
        <Outlet />
      </div>
      <div className="bottom">
        <TabBar
          onChange={(key) => setActiveKey(key)}
          activeKey={location.pathname.slice(1)}
        >
          {tabs.map((item) => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  );
}
