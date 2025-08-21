import React, { useState, useEffect } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { findParentKeys } from '../../utils/index'
const menuItems = [
  {
    key: '/',
    label: 'Dashboard',
    icon: <MailOutlined />
  },
  {
    key: '/setting',
    label: 'Setting',
    icon: <MailOutlined />,
    children: [
      {
        key: '/settings/table',
        label: 'Table',
        icon: <AppstoreOutlined />
      },
      {
        key: '/settings/record',
        label: 'Record',
        icon: <SettingOutlined />
      }
    ]
  },

];

export default function Menus() {
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);


  const [openKeys, setOpenKeys] = useState([]);

  useEffect(() => {
    setCurrent(location.pathname);

    const parentKeys = findParentKeys(menuItems, location.pathname);
    setOpenKeys(parentKeys || []);
  }, [location.pathname]);
  const onClick = e => {

    setCurrent(e.key);
    navigate(e.key)
  };
  return (
    <Menu
      theme='dark'
      onClick={onClick}
      openKeys={openKeys}
      onOpenChange={e => setOpenKeys(e)}
      selectedKeys={[current]}
      mode="inline"
      items={menuItems}
    />


  );
};
