import React, { useEffect, useState } from 'react'
import { Space, Table, Tag, Image, Pagination, Form, Radio, Select, DatePicker, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getDocsList } from '../../store/modules/docs';
import { useChannel } from '../../utils/hooks/useChannel';

export default function Tables() {
  const dispatch = useDispatch();
  const channelList = useChannel();
  const { docsList, docsPage } = useSelector((state) => state.docs);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;


  // columns 配置
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      key: 'cover',
      render: text => <Image width={40} height={40} src={text?.images ?? [0]} />,
    },
    { title: '标题', dataIndex: 'title', key: 'title' },
    { title: '发布时间', dataIndex: 'pubdate', key: 'pubdate' },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      render: (_, { status }) => <Tag>{status === 1 ? '草稿' : '审核通过'}</Tag>,
    },
    { title: '阅读数', dataIndex: 'read_count', key: 'read_count' },
    { title: '评论数', dataIndex: 'comment_count', key: 'comment_count' },
    { title: '点赞数', dataIndex: 'like_count', key: 'like_count' },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleAction(record, 'edit')}>编辑</a>
          <a onClick={() => handleAction(record, 'delete')}>删除</a>
        </Space>
      ),
    },
  ];

  const statusOptions = [
    { label: '全部', value: 0 },
    { label: '草稿', value: 1 },
    { label: '审核通过', value: 2 },
  ];

  // 初始请求
  useEffect(() => {
    dispatch(getDocsList({ page, per_page: pageSize }));
  }, [page, pageSize, dispatch]);

  // 分页处理
  const handleChange = (current, changePageSize) => {
    const sizeChanged = changePageSize !== pageSize;
    setPage(sizeChanged ? 1 : current);
    setPageSize(changePageSize);
  };
  // 更新表单的默认选中
  useEffect(() => {
    if (channelList.length > 0) {
      form.setFieldsValue({
        channel: channelList[0].id,
        status: 0,
      });
    }
  }, [channelList, form]);



  // 表单提交
  const onFinish = (values) => {
    dispatch(getDocsList({ ...values, page, per_page: pageSize }));
  };

  // 表单重置
  const onReset = () => {
    form.resetFields();
    dispatch(getDocsList({ page: 1, per_page: pageSize }));
    setPage(1);
    form.setFieldsValue({
      channel: channelList[0].id,
    });
  };

  // 操作
  const handleAction = (record, type) => {
    console.log(record, type);
  };


  return (
    <>
      {/* 表单 */}
      <Form
        form={form}
        layout="inline"
        onFinish={onFinish}
        onReset={onReset}
        initialValues={{
          status: 0,
          channel: channelList[0]?.id || undefined,
        }}
        autoComplete="off"
      >
        <Form.Item name="status" label="状态">
          <Radio.Group options={statusOptions} />
        </Form.Item>

        <Form.Item name="channel" label="频道">
          <Select
            style={{ width: 120 }}
            options={channelList.map(item => ({ value: item.id, label: item.name }))}
          />
        </Form.Item>

        <Form.Item name="time" label="日期">
          <RangePicker />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">搜索</Button>
          <Button htmlType="reset" style={{ marginLeft: 8 }}>重置</Button>
        </Form.Item>
      </Form>

      {/* 数据统计 */}
      <div style={{ margin: '20px 0' }}>本次共查询到 {docsPage.total_count || 0} 条数据</div>

      {/* 表格 */}
      <Table
        columns={columns}
        dataSource={docsList}
        pagination={false}
        rowKey="id"
      />

      {/* 分页 */}
      <Pagination
        style={{ marginTop: '20px' }}
        pageSize={pageSize}
        current={page}
        onChange={handleChange}
        showSizeChanger
        total={docsPage.total_count}
      />
    </>
  );
}
