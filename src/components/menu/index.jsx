import React, { useState, useEffect } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { ConfigProvider, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { findParentKeys } from '../../utils/index'
import './index.scss'
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
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemSelectedBg: '#F2F3F5', 
            itemBg: '#00034D',
            itemSelectedColor: '#00034D', 
            itemHoverBg: '#3d27e3ff', 
            itemHoverColor: '#F2F3F5',   
            itemColor: '#F2F3F5',
            subMenuItemSelectedColor:'#831f60ff',
            itemBorderRadius:'40px',
            popupBg:'#00034D'
          },
        },
      }}
    >
      <Menu
        onClick={onClick}
        openKeys={openKeys}
        onOpenChange={e => setOpenKeys(e)}
        selectedKeys={[current]}
        mode="inline"
        items={menuItems}
      />
    </ConfigProvider>

  );
};

