import React, { useEffect, useState } from 'react';
import {
  getBillList,
  setColumnLists,
  changeColumnLists
} from '../../store/modules/billLIst';
import { useDispatch, useSelector } from 'react-redux';
import { NavBar } from 'antd-mobile';
import '../../App.scss';
import { UpOutline, DownOutline } from 'antd-mobile-icons';
import dayjs from 'dayjs';
import { Picker } from 'antd-mobile';

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
      {/* 账单详情 */}
    </div>
  );
}
