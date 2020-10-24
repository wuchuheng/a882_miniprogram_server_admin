import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import {Button, Form, Input} from 'antd';
import {FormState} from "./Type";
import {ConnectState} from "@/models/connect";

const Step1Render = () => {

  const dispatch = useDispatch();
  const createUserInfo = useSelector((state: ConnectState) => state.stores.createUserInfo);
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
  };
  const onFinish = (values: FormState) => {
    dispatch({
      type: 'stores/createStep1',
      payload: values
    });
    dispatch({
      type: 'stores/toNextStep'
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{
        username: createUserInfo.username,
        password: createUserInfo.password
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="账号"
        name="username"
        rules={[{ required: true, message: '请输入账号' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button
          htmlType="submit"
          type='primary'
        >
          下一步
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Step1Render;
