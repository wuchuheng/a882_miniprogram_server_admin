import React from "react";
import {Form, Input, Button, message} from 'antd';
import UploadOneImage from "@/components/UploadOneImage";
import {CreateParamsState, create} from "@/services/payNotices";
import {PropsState} from './Type';

const {TextArea} = Input;
const AddFormRender = (props: PropsState) => {
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const onFinish = (params: CreateParamsState) => {
    create(params).then((res) => {
      message.success('添加成功');
      if (props.onFinish) props.onFinish({id: res.data.id, ...params});
    });
  }
  const onChangeIcon = (params: {id: number; url: string}) => {
    form.setFieldsValue({
      icon: params
    });
  }

  return (
    <Form
      form={form}
      onFinish={onFinish}
    >
      <Form.Item
        {...layout}
        label='标题'
        name='title'
        rules={[
          {required: true, message: '请输入标题'}
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        {...layout}
        label='图标'
        name='icon'
        rules={[
          {required: true, message: '请上传图标'}
        ]}
      >
        <UploadOneImage
          aspect={1}
          onChange={onChangeIcon}
        />
      </Form.Item>
      <Form.Item
        {...layout}
        label='内容'
        name='content'
        rules={[
          {required: true, message: '请输入内容'}
        ]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item
        {...tailLayout}
      >
        <Button
          type='primary'
          htmlType='submit'
        >保存</Button>
      </Form.Item>
    </Form>
  )
};

export default AddFormRender;
