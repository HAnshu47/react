import React, { useEffect, useState } from 'react';
import {
  getBillList,
  setColumnLists,
  changeColumnLists
} from '../../store/modules/billLIst';
import { useDispatch, useSelector } from 'react-redux';
import { NavBar,ErrorBlock,Picker, Card  } from 'antd-mobile';
import '../../App.scss';
import { UpOutline, DownOutline } from 'antd-mobile-icons';
import dayjs from 'dayjs';
import {
  formatMoney,
  getMonthBalance,
  filterByYearMonth
} from '../../utils/format';

export default function Index() {
  // 获取当前年份和月份
  const getYearAndMonth = (date) => {
    const year = date.year();
    const month = date.month() + 1;
    return { year, month };
  };
  const getCurrentYearAndMonth = () => {
    return getYearAndMonth(dayjs());
  };
  const { year, month } = getCurrentYearAndMonth();
  const [value, setValue] = useState([year]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setColumnLists(year));
  }, [year, dispatch]);

  useEffect(() => {
    dispatch(getBillList());
  }, [dispatch]);
  const [visible, setVisible] = useState(false);
  const { billList, columnLists } = useSelector((state) => state.billList);

  const handleChangeYear = (value) => {
    dispatch(changeColumnLists(value[0]));
  };
  const { income, pay, balance } = getMonthBalance(
    billList,
    value[0],
    value[1] || month
  );
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

  const monthDetails = filterByYearMonth(billList, value[0], value[1] || month);
  return (
    <div>
      <div className="bill-nav-bar">
        <NavBar backIcon={false}>月度账单</NavBar>
      </div>
      <div className="bill-balance-time">
        {/* 日期选择 */}
        {value[0]}年 ｜ {value[1] || month}月
        <span onClick={() => setVisible(true)}>
          {visible && visible ? <UpOutline /> : <DownOutline />}
        </span>
        {/* 时间选择器 */}
        <Picker
          columns={columnLists}
          visible={visible}
          onClose={() => {
            setVisible(false);
          }}
          onSelect={(v) => {
            handleChangeYear(v);
          }}
          value={value}
          onConfirm={(v) => {
            setValue(v);
          }}
        />
      </div>
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
      {/* 账单详情 */}
      {monthDetails?.length === 0 ? (
         <ErrorBlock status='empty' />
      ) : (
        <div className="month-balance-details">
          {monthDetails &&
            monthDetails.map((item) => {
              return (
                <Card
                  title={
                    <div className="month-balance-card">
                      <div className="month-balance-card-title">
                        {item.date}
                      </div>
                      <div className="month-balance-card-bill">
                        <div
                          className="bill-balance-item-card"
                          style={{ padding: '0' }}
                        >
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
                    </div>
                  }
                  style={{ borderRadius: '16px' }}
                >
                  {item.details &&
                    item.details.map((detail) => {
                      return (
                        <div className="bill-item-details">
                          <span>{detail.useFor}</span>
                          <span>{detail.money}</span>
                        </div>
                      );
                    })}
                </Card>
              );
            })}
        </div>
      )}
    </div>
  );
}
