import React, { useEffect, useState } from 'react';
import { getBillList, addBill } from '../../store/modules/billLIst';
import { useDispatch } from 'react-redux';
import {
  NavBar,
  CapsuleTabs,
  Form,
  Input,
  Button,
  Toast,
  DatePicker
} from 'antd-mobile';
import '../../App.scss';
import { useNavigate } from 'react-router-dom';
import { ClockCircleOutline } from 'antd-mobile-icons';
import dayjs from 'dayjs';
import { pay, income } from './json/index.json';

export default function Index() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBillList());
  }, [dispatch]);
  const [activeKey, setActiveKey] = useState('income');
  const [visible, setVisible] = useState(false);
  const [time, setTime] = useState('');
  const [selectType, setSelectType] = useState('');
  const now = new Date();
  const history = useNavigate();
  const back = () => {
    history(-1);
  };

  const handleSaveBill = () => {
    const msg = {
      money: '请输入金额',
      selectType: '请选择类型',
      time: '请选择时间'
    };
    const validators = { money, selectType, time };

    for (const key in validators) {
      if (!validators[key]) {
        Toast.show(msg[key]);
        return;
      }
    }
    // 有数据请求，保存成功后返回上一页
    const payload = {
      type: activeKey,
      money,
      date: time,
      useFor: selectType
    };
    dispatch(addBill(payload));
    history('/');
  };
  const handleConfirmTime = (val) => {
    // 选择时间
    setVisible(false);
    setTime(dayjs(val).format('YYYY-MM-DD'));
  };
  const [money, setMoney] = useState('');
  return (
    <div>
      <div className="bill-nav-bar">
        <NavBar onBack={back}>新增账单</NavBar>
      </div>
      {/* 收入 / 支出按钮 */}
      <CapsuleTabs
        activeKey={activeKey}
        onChange={(key) => (setActiveKey(key), setSelectType(''))}
      >
        <CapsuleTabs.Tab title="收入" key="income" />
        <CapsuleTabs.Tab title="支出" key="pay" />
      </CapsuleTabs>
      {/* 输入框 */}
      <Form layout="horizontal">
        <Form.Item
          label={<ClockCircleOutline onClick={() => setVisible(true)} />}
          extra={
            <div>
              <Button type="primary" onClick={() => handleSaveBill()}>
                保存
              </Button>
            </div>
          }
        >
          <Input
            placeholder="请输入金额"
            type="number"
            clearable
            value={money}
            onChange={(val) => setMoney(val)}
          />
        </Form.Item>
      </Form>
      {/* 时间选择器 */}
      <DatePicker
        title="时间选择"
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        max={now}
        onConfirm={(val) => {
          handleConfirmTime(val);
        }}
      />

      {/* 类别显示 */}
      {(activeKey === 'income' ? income : pay).map((item) => {
        return (
          <div className="bill-type">
            <div className="bill-type-title" key={item.type}>
              {item.name}
            </div>
            <div className="bill-type-item">
              {item.list.map((items) => {
                return (
                  <div
                    className={
                      selectType === items.type
                        ? 'active bill-type-items'
                        : 'bill-type-items'
                    }
                    key={items.type}
                    onClick={() => setSelectType(items.type)}
                  >
                    {items.name}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
