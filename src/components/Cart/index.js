import classNames from 'classnames';
import Count from '../Count';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';

const Cart = () => {
  const cart = [];
  // const dispatch = useDispatch();
  const { cardList } = useSelector((state) => state.menu);
  const totalPirce =
    cardList &&
    cardList
      .map((item) => item.price * item.count)
      .reduce((sum, cur) => sum + cur, 0);
  console.log(cardList, 'cardList');
  const totalCount =
    cardList &&
    cardList.map((item) => item.count).reduce((sum, cur) => sum + cur, 0);

  /**
   * sum 累加器
   * cur 当前项
   * 0 初始值
   * 这里告诉 reduce，在第一次循环前，sum 的初始值为 0
   * 如果不写，sum 会默认是数组的第一个元素（但求和通常我们希望从 0 开始）
   */
  return (
    <div className="cartContainer">
      {/* 遮罩层 添加visible类名可以显示出来 */}
      <div className={classNames('cartOverlay')} />
      <div className="cart">
        {/* fill 添加fill类名可以切换购物车状态*/}
        {/* 购物车数量 */}
        <div className={classNames('icon')}>
          {totalCount > 0 && <div className="cartCornerMark">{totalCount}</div>}
        </div>
        {/* 购物车价格 */}
        <div className="main">
          <div className="price">
            <span className="payableAmount">
              <span className="payableAmountUnit">¥</span>
              {totalPirce}
            </span>
          </div>
          <span className="text">预估另需配送费 ¥5</span>
        </div>
        {/* 结算 or 起送 */}
        {totalPirce && totalPirce >= 20 ? (
          <div className="goToPreview">去结算</div>
        ) : (
          <div className="minFee">¥20起送</div>
        )}
      </div>
      {/* 添加visible类名 div会显示出来 */}
      <div className={classNames('cartPanel')}>
        <div className="header">
          <span className="text">购物车</span>
          <span className="clearCart">清空购物车</span>
        </div>

        {/* 购物车列表 */}
        <div className="scrollArea">
          {cart.map((item) => {
            return (
              <div className="cartItem" key={item.id}>
                <img className="shopPic" src={item.picture} alt="" />
                <div className="main">
                  <div className="skuInfo">
                    <div className="name">{item.name}</div>
                  </div>
                  <div className="payableAmount">
                    <span className="yuan">¥</span>
                    <span className="price">{item.price}</span>
                  </div>
                </div>
                <div className="skuBtnWrapper btnGroup">
                  <Count count={item.count} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Cart;
