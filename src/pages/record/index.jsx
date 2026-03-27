import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useChannel } from '../../utils/hooks/useChannel';
import { Button, Radio, Form, Input, Select, Spin, Upload, message } from 'antd';
import { recordDetailsAPI, putDocsAPI } from '../../api/docs';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const baseURl = import.meta.env.VITE_BASE_URL;

export default function Record() {
  const { id } = useParams();
  const channelList = useChannel();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);


  const plainOptions = [
    { label: '单图', value: 1 },
    { label: '三图', value: 3 },
    { label: '无图', value: 0 },
  ];
  // 修改回显图片的格式
  const formattedFileList = (images) => {
    return images?.map((url, index) => ({
      uid: String(index),
      url,
    }))
  }


  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setLoading(true);
        try {
          const res = await recordDetailsAPI(id);
          const { channel_id, title, content, cover } = res?.data;


          form.setFieldsValue({
            channel: channel_id ?? channelList[0]?.id,
            title: title ?? '',
            content: content ?? '',
            type: cover?.type ?? 1,
            images: cover?.images ?? [],
          });
          setFileList(formattedFileList(cover?.images ?? []));
        } catch (error) {
          console.error("获取详情失败:", error);
        } finally {
          setLoading(false);
        }
      } else {
        // 新增
        setLoading(false);
        form.setFieldsValue({
          channel: channelList[0]?.id,
          type: 1,
        });
      }
    };

    fetchData();
  }, [id, form, channelList]);



const navigate = useNavigate();
  const onFinish = (values) => {
    const images = fileList.map((file) => file.url || file.response.data.url);
    const { title, content, channel, type } = values;
    const payload = {
      title: title,
      content: content,
      channel_id: channel,
      cover: {
        type: type,
        images
      }
    };
    putDocsAPI(payload, id);

    message.success('操作成功');
    navigate('/settings/table')

  };

  const onFinishFailed = (errorInfo) => {
    console.log('表单验证失败:', errorInfo);
  };
  const handleChangeType = (value) => {
    // 切换类型修改图片显示
    setFileList([])


  }
  // 显示上传按钮
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  const [fileList, setFileList] = useState([
  ]);

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
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
          <Radio.Group options={plainOptions} onChange={(e) => { handleChangeType(e.target.value) }} />
        </Form.Item>

        {form.getFieldValue('type') === 0 ? (null) : (
          <Form.Item name="images" label="封面图片" >
            <>

              <Upload
                action={`${baseURl}/upload`}
                listType="picture-card"
                fileList={fileList}
                onChange={handleChange}
                name="image"
              >
                {fileList?.length >= form.getFieldValue('type') ? null : uploadButton}
              </Upload>


            </>
          </Form.Item>
        )}
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
