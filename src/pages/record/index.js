import React, { useEffect, useState } from 'react';
import { getBillList } from '../../store/modules/billLIst';
import { useDispatch, useSelector } from 'react-redux';
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

export default function Index() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBillList());
  }, [dispatch]);
  const { billList } = useSelector((state) => state.billList);
  const [activeKey, setActiveKey] = useState('income');
  const [visible, setVisible] = useState(false);
  const [time, setTime] = useState('');
  const now = new Date();
  const history = useNavigate();
  const back = () => {
    history(-1);
  };

  const handleSaveBill = () => {
    if (!money)
      return Toast.show({
        icon: 'fail',
        content: '请输入金额'
      });
    // 有数据请求，保存成功后返回上一页
    const payload = {
      type: activeKey,
      money,
      date: time,
      useFor: 'salary'
    };
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
      <CapsuleTabs activeKey={activeKey} onChange={(key) => setActiveKey(key)}>
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
    </div>
  );
}
