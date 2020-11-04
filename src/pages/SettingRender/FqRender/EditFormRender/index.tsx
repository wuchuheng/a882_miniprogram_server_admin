import React, {useEffect} from "react";
import {PropsState} from './Type';
import {Form, InputNumber, Input, Button, message} from "antd";
import RichEdit from "@/components/RichEdit";
import {ItemState, update} from '@/services/fq';

const EditFormRender = (props: PropsState) => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const [form] = Form.useForm();
  useEffect(() => {
      form.setFieldsValue({
        ...props
      });
  }, [props.id, props.content, props.title, props.orderNo])
  const onchangeContent = (params: string) => {
    form.setFieldsValue({
      constent: params
    });
  };
  const onFinish = (params: ItemState) => {
    const newParams = {...params, id: props.id};
    update(newParams).then(() => {
      message.success('修改成功');
      if (props.onFinish) {
        props.onFinish(newParams);
      }
    });
  };
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
          {required: true, message: '请选择排序'}
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        {...layout}
        label='排序'
        name='orderNo'
        rules={[
          {required: true, message: '请选择排序'},
          {type: 'number', min: 0, message: '不能小于0'}
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        {...layout}
        label='内容'
        name='content'
      >
        <RichEdit
          content={props.content}
          onChange={onchangeContent}
        />
      </Form.Item>
      <Form.Item
        {...tailLayout}
      >
        <Button type='primary' htmlType='submit'>保存</Button>
      </Form.Item>

    </Form>

  );
};

export default EditFormRender;
