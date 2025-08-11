import classNames from 'classnames';
import './index.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenu, setActiveIndex } from '../../store/modules/takeaway';
const Menu = (props) => {
  //// 使用redux获取数据
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);
  const { menu, activeIndex } = useSelector((state) => state.menu); // const { menu }  定义和解构都需要和store/index.js中定义的reducer的key一致
  //使用父子组件传值
  const { menuList } = props;

  const menus =
    menuList && menuList.map((item) => ({ tag: item.tag, name: item.name }));

  return (
    <nav className="list-menu">
      {/* 添加active类名会变成激活状态 */}
      {menus.map((item, index) => {
        return (
          <div
            onClick={() => dispatch(setActiveIndex(index))}
            key={item.tag}
            className={classNames('list-menu-item', activeIndex === index && 'active')}
          >
            {item.name}
          </div>
        );
      })}
    </nav>
  );
};

export default Menu;
