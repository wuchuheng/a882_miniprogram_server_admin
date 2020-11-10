import React, {useEffect} from "react";
import {Form, Input, Button, message} from 'antd';
import UploadOneImage from "@/components/UploadOneImage";
import {edit, ItemState, CreateParamsState} from "@/services/payNotices";
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
    const newParams = {id: props.editItem.id, ...params};
    edit(newParams).then(() => {
      message.success('编辑成功');
      if (props.onFinish) props.onFinish(newParams);
    })
  }
  const onChangeIcon = (params: {id: number; url: string}) => {
    form.setFieldsValue({
      icon: params
    });
  }
  // 初始化数据
  useEffect(() => {
    form.setFieldsValue(props.editItem );
  }, [])

  return (
    <Form
      form={form}
      onFinish={onFinish}
    >
      <Form.Item
        {...layout}
        label='标题'
        name='title'
        rules={[{required: true, message: '请输入标题'}]}
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
          imgUrl={props.editItem.icon}
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
        >确认</Button>
      </Form.Item>
    </Form>
  )
};

export default AddFormRender;
