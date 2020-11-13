import React, {useEffect, useState} from "react";
import {Form, Input, Select, Button, message} from "antd";
import {PropsState} from './Type';
import {fetchAll} from "@/services/memberRoles";
import {edit} from '@/services/members';
const {Option} = Select;
const EditRender  = (props: PropsState) => {
  const [memberRoles, setMemberRoles] = useState<Array<{id: number; name: string}>>([]);
  const [form] = Form.useForm();
  useEffect(() => {
    fetchAll().then(res => {
      setMemberRoles(res.data);
    });
    form.setFieldsValue({
      phone: props.phone,
      memberRole: props.memberRole.id
    });
  }, []);
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: {span: 24}
  };
  const tailLayout = {
    wrapperCol: {offset: 4}
  }
  const onFinish = (params: {phone: string; memberRole: number}) => {
    if (props.onFinish) {
      edit({id: props.id, memberRoleId: params.memberRole, phone: params.phone}).then(() => {
        message.success('编辑成功');
        const index =  memberRoles.findIndex(item => item.id === params.memberRole );
        const newMemberRoles = memberRoles[index];
        if (props.onFinish) {
          props.onFinish({
            ...props,
            phone: params.phone,
            memberRole: {
              ...newMemberRoles
            }
          });
        }
      });
    }
  }
  return (
    <Form
      form={form}
      onFinish={onFinish}
    >
      <Form.Item
        {...layout}
        label='手机'
        name='phone'
        rules={[
          { required: true, message: '请输入手机号' },
          {
            pattern: /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199)\d{8}$/, message: '请输入正确手机号'
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        {...layout}
        label='角色'
        name='memberRole'
        rules={[
          {
            required: true, message: '请选择角色'
          }
        ]}
      >
        <Select>
          { memberRoles.map(item => (
            <Option
            value={item.id}
            key={item.id}
          >{item.name}</Option> ) ) }
        </Select>
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
  );
};

export default EditRender;
