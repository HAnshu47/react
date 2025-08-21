import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useChannel } from '../../utils/hooks/useChannel';
import { getRecordDetails } from '../../store/modules/docs';
import { Button, Radio, Form, Input, Select, Image, Spin } from 'antd';

export default function Record() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const channelList = useChannel();
  const { recordDetails } = useSelector(state => state.docs);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

  const plainOptions = [
    { label: '单图', value: 1 },
    { label: '三图', value: 2 },
    { label: '无图', value: 0 },
  ];

  useEffect(() => {
    if (id) {
      setLoading(true);
      dispatch(getRecordDetails(id)).finally(() => setLoading(false));



    } else {
      setLoading(false);
    }
  }, [id, dispatch]);

  // 异步填充表单
  useEffect(() => {
    if (recordDetails && channelList.length > 0) {
      const { channel_id, title, content, cover } = recordDetails;
      form.setFieldsValue({
        channel: channel_id ?? channelList[0]?.id,
        title: title ?? '',
        content: content ?? '',
        type: cover?.type ?? 1,
        images: cover?.images ?? [],
      });
    } else if (!id && channelList.length > 0) {
      // 新增表单默认值
      form.setFieldsValue({
        channel: channelList[0]?.id,
        type: 1,
      });
    }
  }, [recordDetails, channelList, form, id]);

  const onFinish = (values) => {
    console.log('提交表单:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('表单验证失败:', errorInfo);
  };

  return (
    <Spin spinning={loading}>
      <Form
        form={form} // ✅ 确保 form 实例绑定
        name="recordForm"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="标题"
          name="title"
          rules={[{ required: true, message: '请输入标题' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="频道"
          name="channel"
          rules={[{ required: true, message: '请选择频道' }]}
        >
          <Select
            options={channelList.map(item => ({ value: item.id, label: item.name }))}
          />
        </Form.Item>

        <Form.Item name="type" label="封面">
          <Radio.Group options={plainOptions} />
        </Form.Item>

        <Form.Item name="images" label="封面图片">
          <Image.PreviewGroup>
            {(form.getFieldValue('images') || []).map((item, index) => (
              <Image key={index} width={100} src={item} />
            ))}
          </Image.PreviewGroup>
        </Form.Item>

        <Form.Item name="content" label="内容">
          <Input.TextArea />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
}
