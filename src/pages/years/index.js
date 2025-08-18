import React, { useEffect, useState } from 'react';
import { getBillList } from '../../store/modules/billLIst';
import { useDispatch, useSelector } from 'react-redux';
import { NavBar } from 'antd-mobile';
import '../../App.scss';
import dayjs from 'dayjs';
import { Picker } from 'antd-mobile';
import { DownOutline, UpOutline } from 'antd-mobile-icons';

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
        onConfirm={(v) => {
          setValue(v);
        }}
      />

      {/* 账单结余 */}
      {/* 月账单结余 */}
    </div>
  );
}
