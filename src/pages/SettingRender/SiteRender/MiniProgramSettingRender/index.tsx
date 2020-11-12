import React, {useEffect} from "react";
import {Alert, Button, Col, Form, Input, message, Row} from "antd";
import {fetchOne, update} from "@/services/configs";
import {KeyState, OnFinishPramsState} from "@/pages/SettingRender/SiteRender/MiniProgramSettingRender/Type";


const MiniProgramSettingRender = () => {
  const layout = {
    wrapperCol: { offset: 0, span: 24 },
    labelCol: { offset: 0, span: 4 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
  };
  const [form] = Form.useForm();

  const appIDKey: KeyState = 'MINI_PROGRAM_APP_ID';
  const appSecretKey:KeyState  = 'MINI_PROGRAM_APP_SECRET';
  useEffect(() => {
    fetchOne<{value: string}>(appIDKey).then((res) => {
      const key = res.data.value;
      form.setFieldsValue({appId: key});
    });
    fetchOne<{value: string}>(appSecretKey).then((res) => {
      const key = res.data.value;
      form.setFieldsValue({appSecret: key});
    });
  }, [])

  const onFinish = (params: {appId: string; appSecret: string}) => {
    update({key: appSecretKey, value: params.appSecret}).then(() => {
      return update({key:appIDKey, value: params.appId})
    }).then(() => {
      message.success('保存成功');
    });
  }

  return (
    <Row gutter={[0, 16]} >
      <Col span={12} offset={6}>
        <Alert
          message="提示"
          description={
            <span>
            这是小程序相关配置，是整个小程序能否正常使用的前提，谨慎配置,如没有的相关的配置，请到<a target='left' href='https://mp.weixin.qq.com/'>微信小程序</a>以企业的名义进行申请并认证
          </span>
          }
          type="warning"
          showIcon
          closable
        />
      </Col>
      <Col span={12} offset={6}>
        <Form
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            {...layout}
            label='AppID'
            name='appId'
            rules={[
              {required: true, message: '请输入小程序应用ID(AppId)'}
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            {...layout}
            label='AppSecret'
            name='appSecret'
            rules={[
              {required: true, message: '请输入小程序应用密钥(AppSecret)'}
            ]}
          >
            <Input />
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
    </Row>
  );
};

export default MiniProgramSettingRender;
