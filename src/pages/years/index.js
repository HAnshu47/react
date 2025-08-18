import React, { useEffect, useState } from 'react';
import { getBillList } from '../../store/modules/billLIst';
import { useDispatch, useSelector } from 'react-redux';
import { NavBar } from 'antd-mobile';
import '../../App.scss';
import dayjs from 'dayjs';
import { Picker } from 'antd-mobile';
import { DownOutline, UpOutline } from 'antd-mobile-icons';
import { formatMoney, getAllMonthList } from '../../utils/format';

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

  // 获取当前选中年账单详情
  const currentYearBill = billList.filter((item) => {
    return dayjs(item.date).year() === value[0];
  });

  // 算出账单金额，billList.money字段
  const balanceIncome = currentYearBill.reduce((acc, cur) => {
    if (cur.type === 'income') {
      acc += cur.money;
    }
    return acc;
  }, 0);
  const balancePay = currentYearBill.reduce((acc, cur) => {
    if (cur.type === 'pay') {
      acc -= cur.money;
    }
    return acc;
  }, 0);
  console.log(getAllMonthList(currentYear));

  const balanceList = [
    {
      label: '支出',
      value: balancePay
    },
    {
      label: '收入',
      value: balanceIncome
    },
    {
      label: '结余',
      value: balanceIncome - balancePay
    }
  ];
  const handleChangeYear = (year) => {
    console.log(year, 'year');
    setValue(year);
  };

  return (
    <div>
      <div className="bill-nav-bar">
        {/* <NavBar backIcon={false}>年度账单</NavBar> */}
        <NavBar backIcon={false}>
          {value}年
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
        onChange={(v) => {
          handleChangeYear(v);
        }}
        onConfirm={(v) => {
          handleChangeYear(v);
        }}
      />
      {/* 账单结余 */}
      <div className="bill-balance">
        {balanceList &&
          balanceList.map((item) => {
            return (
              <div className="bill-balance-list">
                <div className="bill-balance-num">
                  {formatMoney(item.value)}
                </div>
                <div className="bill-balance-text">{item.label}</div>
              </div>
            );
          })}
      </div>
      {/* 月账单结余 */}
      <div className="bill-balance-details">
        {getAllMonthList(value[0]).map((item) => {
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
      </div>{' '}
    </div>
  );
}
