import React, { useEffect, useState } from 'react';
import { getBillList } from '../../store/modules/billLIst';
import { useDispatch, useSelector } from 'react-redux';
import { NavBar } from 'antd-mobile';
import '../../App.scss';
import dayjs from 'dayjs';
import { Picker } from 'antd-mobile';
import { DownOutline, UpOutline } from 'antd-mobile-icons';
import {
  formatMoney,
  getAllMonthList,
  getYearBalance,
  getMonthlyBalance
} from '../../utils/format';

export default function Index() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBillList());
  }, [dispatch]);
  const { billList } = useSelector((state) => state.billList);
  const currentYear = dayjs().year(); // 今年
  const getYearList = Array.from({ length: 20 }, (_, i) => currentYear - i);
  const basicColumns = [
    getYearList.map((item) => ({
      label: String(item),
      value: item
    }))
  ];
  const [value, setValue] = useState([currentYear]);
  const [visible, setVisible] = useState(false);

  getYearBalance(billList, value[0]);
  const { income, pay, balance } = getYearBalance(billList, value[0]);

  const balanceList = [
    {
      label: '支出',
      value: pay
    },
    {
      label: '收入',
      value: income
    },
    {
      label: '结余',
      value: balance
    }
  ];
  const handleChangeYear = (year) => {
    setValue(year);
  };

  const monthList = getMonthlyBalance(value[0], billList);

  return (
    <div>
      <div className="bill-nav-bar">
        <NavBar backIcon={false}>
          {value}年度账单
          <span onClick={() => setVisible(true)}>
            {visible && visible ? <UpOutline /> : <DownOutline />}
          </span>
        </NavBar>
      </div>
      {/* 年份下拉 */}
      <Picker
        columns={basicColumns}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        value={value}
        onConfirm={(v) => {
          handleChangeYear(v);
        }}
      />
      {/* 账单结余 */}
      <div className="bill-balance">
        {balanceList &&
          balanceList.map((item) => {
            return (
              <div className="bill-balance-list" key={item.label}>
                <div className="bill-balance-num">
                  {formatMoney(item.value)}
                </div>
                <div className="bill-balance-text">{item.label}</div>
              </div>
            );
          })}
      </div>
      {/* 月账单结余 */}
      {/* <div className="bill-balance-details">
        {getMonthlyBalance.map((item) => {
          return (
            <div className="bill-balance-item">
              <div className="bill-balance-item-title">{item}月</div>
              <div className="bill-balance-item-card">
                {balanceList.map((item) => {
                  return (
                    <div className="bill-balance-item-text">
                      {item.label}:<span>123</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>{' '} */}
      <div className="bill-balance-details">
        {monthList.map((item) => {
          return (
            <div className="bill-balance-item" key={item.month}>
              <div className="bill-balance-item-title">{item.month}月</div>
              <div className="bill-balance-item-card">
                <div className="bill-balance-item-text">
                  支出: <span>{formatMoney(item.pay)}</span>
                </div>
                <div className="bill-balance-item-text">
                  收入: <span>{formatMoney(item.income)}</span>
                </div>
                <div className="bill-balance-item-text">
                  结余: <span>{formatMoney(item.balance)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
