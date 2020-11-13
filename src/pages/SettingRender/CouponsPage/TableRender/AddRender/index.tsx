import React, {useState} from "react";
import {
  Form,
  Input,
  InputNumber,
  Switch,
  Select,
  Button
} from 'antd';
import { PropsState } from "./Type";
import {CreateParamsState} from "@/services/coupons";
import UploadOneImage, {ImgState} from "@/components/UploadOneImage";

const {TextArea} = Input;
const {Option} = Select;
const AddRender = (props: PropsState) => {
  const layout = {
    wrapperCol: {span: 24},
    labelCol: {span: 8}
  };
  const tailLayout = {
    wrapperCol: {offset: 8, span: 16}
  }
  const [form] = Form.useForm();
  const onFinish = (params: CreateParamsState ) => {
    if (props.onFinish) props.onFinish(params);
  };
  const onUpload = (params: ImgState) => {
    form.setFieldsValue({
      banner: params
    });
  }
  const [switchValue, setSwitchValue] = useState<boolean>(false);
  const onSwitch = (params: boolean) => {
    setSwitchValue(params)
    form.setFieldsValue({
      isUse: params
    });
  }
  const [isAlertValue, setIsAlertValue] = useState<boolean>(false);
  const onSwitchIsAlert = (params: boolean) => {
    setIsAlertValue(params)
    form.setFieldsValue({
      isAlert: params
    });
  }
  return (
    <Form
      form={form}
      onFinish={onFinish}
    >
      <Form.Item
        {...layout}
        label='优惠卷名'
        name='name'
        rules={[
          {required: true, message: '请输入优惠卷名'}
        ]}
      >
        <Input placeholder='请输入优惠卷名' />
      </Form.Item>
      <Form.Item
        {...layout}
        label='说明'
        name='des'
        rules={[
          {required: true, message: '请输入说明'}
        ]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item
        {...layout}
        label='金额(¥)'
        name='cost'
        rules={[
          {required: true, message: '请输入金额'},
          {type: 'number', min: 0.01, message: '金额不能小于0.01元' }
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        {...layout}
        label='有效期(天)'
        name='expiredDay'
        rules={[
          {required: true, message: '请输入有效期'},
          {type: 'number', min: 1, message: '金额不能小于1天' }
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        {...layout}
        label='是否使用'
        name='isUse'
      >
        <Switch
          checked={switchValue}
          onChange={onSwitch}
        />
      </Form.Item>
      <Form.Item
        {...layout}
        label='派送方式'
        name='giveType'
        rules={[
          {required: true, message: '请输入派送方式'}
        ]}
      >
        <Select>
          <Option value='1' >新用户注册</Option>
          <Option value='2' >后台手动派送</Option>
        </Select>
      </Form.Item>
      <Form.Item
        {...layout}
        label='是否主动提醒'
        name='isAlert'

      >
        <Switch
          onChange={onSwitchIsAlert}
          checked={isAlertValue}
        />
      </Form.Item>
      <Form.Item
        {...layout}
        label='封面'
        name='banner'
        rules={[
          {required: true, message: '请上传封面'}
        ]}
      >
        <UploadOneImage
          isCut={false}
          onChange={onUpload}
        />
      </Form.Item>

      <Form.Item
        {...tailLayout}
      >
        <Button
          htmlType='submit'
          type='primary'
        >
          添加
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddRender;
