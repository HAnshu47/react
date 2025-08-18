import React, { useEffect } from 'react';
import { getBillList } from '../../store/modules/billLIst';
import { useDispatch, useSelector } from 'react-redux';
import { NavBar } from 'antd-mobile';
import '../../App.scss'

export default function Index() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBillList());
  }, [dispatch]);
  const { billList } = useSelector((state) => state.billList);
  return (
    <div>
      <div className="bill-nav-bar">
        <NavBar backIcon={false}>年度账单</NavBar>
      </div>

      {/* 账单结余 */}

      {/* 账单详情 */}
    </div>
  );
}
