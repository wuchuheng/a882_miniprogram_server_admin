import React, {useEffect, useState} from "react";
import {
  Form,
  Input,
  Row,
  Col,
  Select,
  InputNumber,
  Button, message,
} from 'antd';
import {fetchAll, Itemstate} from "@/services/memberRoles";
import styles from './index.less';
import {useSelector} from "react-redux";
import {ConnectState} from "@/models/connect";
import {edit} from "@/services/members";

const {Option} = Select;
const BaseRender = () => {
  const layout = {
    wrapperCol: { span: 16 },
    labelCol: {span: 8}
  }
  const tailLayout = {
    wrapperCol: { offset: 8 },
  };
  const [form] = Form.useForm();
  const [memberRoles, setMemberRoles] = useState<Array<Itemstate>>([]);
  useEffect(() => {
    fetchAll().then(res => {
        setMemberRoles(res.data);
    });
  }, []);
  const currentMember = useSelector((state:ConnectState) => {
      return state.members.currentMember
  });
  const initValue = currentMember ?  {
    id: currentMember.id,
    nickName: currentMember.nickName,
    genderId: currentMember?.gender.id,
    city: currentMember.city,
    province: currentMember.province,
    phone: currentMember.phone,
    platform: currentMember.platform,
    avatarUrl: currentMember.avatarUrl,
    createdAt: currentMember.createdAt,
    memberRoleId: currentMember.memberRole.id
  } : {};
  const onfinish = (params: { memberRoleId: number; phone: string; }) => {
    edit({id:currentMember.id, memberRoleId: params.memberRoleId, phone: params.phone  }).then(() => {
      message.success('保存成功');
    });
  };
  return (
    <Row>
      <Col span={12}>
        <Form
          className={styles.formWrapper}
          form={form}
          initialValues={{...initValue}}
          onFinish={onfinish}
        >
          <Form.Item
            {...layout}
            label='昵称'
            name='nickName'
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            {...layout}
            label='城市'
            name='city'
          >
            <input
              disabled
              style={{width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            {...layout}
            label='性别'
            name='genderId'
          >
            <Select
              disabled
            >
              <Option value={0}>纯娘们</Option>
              <Option value={1}>纯爷们</Option>
              <Option value={2}>未知</Option>
            </Select>
          </Form.Item>
          <Form.Item
            {...layout}
            label='手机'
            name='phone'
            rules={[
              {required: true, message: '请输入手机号'},
              {
                pattern: /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199)\d{8}$/,
                message: '手机号不正确'
              }
            ]}
          >
            <InputNumber
              style={{width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            {...layout}
            label='平台'
            name='platform'
          >
            <Select disabled>
              <Option value='wechat'>微信</Option>
              <Option value='alipay'>支付宝</Option>
            </Select>
          </Form.Item>
          <Form.Item
            {...layout}
            label='角色'
            name='memberRoleId'
          >
            <Select>
              { memberRoles&&memberRoles.map(item => (<Option
                value={item.id}
                key={item.id}
              >{item.name}</Option>)) }
            </Select>
          </Form.Item>
          <Form.Item
            {...layout}
            label='注册时间'
            name='createdAt'
          >
            <Input disabled />
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

      </Col>
      <Col span={12}>
        <Row justify='center' >
          <Col>
            <div className={styles.avatarWrapper}>
                <img
                  className={styles.avatarRender}
                  src={currentMember?.avatarUrl}
                />
              <div>头像</div>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default  BaseRender;


