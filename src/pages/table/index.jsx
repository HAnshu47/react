import React, { useEffect, useState } from 'react'
import { Space, Table, Tag, Image, Pagination, Form, Radio, Select, DatePicker, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { getDocsList } from '../../store/modules/docs'
import { useSelector } from 'react-redux'
import { useChannel } from '../../utils/hooks/useChannel'

export default function Tables() {

  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      key: 'cover',
      render: text => <Image
        width={40}
        height={40}
        src={text?.images ?? [0]}
      />,
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate',
      key: 'pubdate',
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      render: (_, { status }) => (
        <>
          <Tag key={status}>{status === 1 ? '草稿' : '审核通过'}</Tag>
        </>
      ),
    },
    {
      title: '阅读数',
      dataIndex: 'read_count',
      key: 'read_count',
    }, {
      title: '评论数',
      dataIndex: 'comment_count',
      key: 'comment_count',
    }, {
      title: '点赞数',
      dataIndex: 'like_count',
      key: 'like_count',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => { handleAction(record, 'edit') }}>编辑</a>
          <a onClick={() => { handleAction(record, 'delete') }}>删除</a>
        </Space>
      ),
    },
  ];
  const options = [
    { label: '全部', value: 0, },
    { label: '草稿', value: 1, },
    { label: '审核通过', value: 2, },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDocsList());

  }, [dispatch]);
  const channelList = useChannel();
  const { docsList, docsPage } = useSelector((state) => state.docs);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleChange = (changePage, changePageSize,) => {
    const sizeChanged = changePageSize !== pageSize;
    setPage(sizeChanged ? 1 : changePage);
    setPageSize(changePageSize);
  };
  useEffect(() => {
    dispatch(getDocsList({ page, per_page: pageSize }));
  }, [page, pageSize, dispatch]);

  const handleAction = (record, type) => {
    console.log(record, type)
  }
  const onFinish = () => {

  }
  const { RangePicker } = DatePicker;
  const [status, setStatus] = useState(0);
  const [channel, setChannel] = useState(channelList[0]?.id);
  const [form] = Form.useForm();
  useEffect(() => {
    if (channelList.length > 0) {
      setChannel(channelList[0]?.id);
      console.log(channelList[0]?.id, 'channelList')
    }
  }, [channelList]);
  useEffect(() => {
    form.setFieldsValue({ channel });
  }, [channel, form]);

  return (
    <>
      {/* form */}
      <Form
        name="basic"
        form={form}
        initialValues={{ status, channel }}
        onFinish={onFinish}
        layout="inline"
        autoComplete="off"
      >
        <Form.Item
          label="状态"
          name="status"
        >
          <Radio.Group options={options} value={status} onChange={(e) => setStatus(e.target.value)} />
        </Form.Item>  <Form.Item
          label="频道"
          name="channel"
        >
          <Select
            style={{ width: 120 }}
            onChange={(value) => setChannel(value)}
            value={channel}
            options={channelList.map(item => ({ value: item.id, label: item.name })) || []}
          />
        </Form.Item>  <Form.Item
          label="日期"
          name="time"
        >
          <RangePicker />
        </Form.Item>
        <Form.Item  >
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
          <Button htmlType="reset" style={{ marginLeft: 8 }}>
            重置
          </Button>
        </Form.Item>
      </Form>
      {/* table  */}
      <div style={{ margin: '20px 0' }}>本次共查询到{docsPage.total_count | 0}条数据</div>
      <Table columns={columns} dataSource={docsList} pagination={false} />
      <Pagination
        style={{ marginTop: '20px' }}
        pageSize={pageSize}
        current={page}
        onChange={handleChange}
        showSizeChanger
        total={docsPage.total_count}
      />


    </>
  )
}
