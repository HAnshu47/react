import NavBar from './components/NavBar';
import Menu from './components/Menu';
import Cart from './components/Cart';
import FoodsCategory from './components/FoodsCategory';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenu } from './store/modules/takeaway'; // 菜单数据
import './App.scss';
import { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    //监听变化
    dispatch(fetchMenu());
  }, [dispatch]); //只有dispatch变化时才重新渲染
  const { menu } = useSelector((state) => state.menu); //这里的state.menu需要和store/index.js中定义的reducer的key一致
  return (
    <div className="home">
      {/* 导航 */}
      <NavBar />

      {/* 内容 */}
      <div className="content-wrap">
        <div className="content">
          <Menu menuList={menu} />

          <div className="list-content">
            <div className="goods-list">
              {/* 外卖商品列表 */}
              {menu &&
                menu.map((item) => {
                  return (
                    <FoodsCategory
                      key={item.tag}
                      // 列表标题
                      name={item.name}
                      // 列表商品
                      foods={item.foods}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      {/* 购物车 */}
      <Cart />
    </div>
  );
};

export default App;
