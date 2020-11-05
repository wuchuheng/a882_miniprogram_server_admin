import React, {useEffect} from "react";
import {Alert, Form, Input, Row, Col, Button, message} from "antd";
import {fetchOne, update} from '@/services/configs';

const MapSettingRender = () => {
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const [form] = Form.useForm();
  const amapKey = 'AMAP_KEY';
  useEffect(() => {
    fetchOne<{value: string}>(amapKey).then((res) => {
      const key = res.data.value;
      form.setFieldsValue({amapKey: key});
    });
  }, [])
  const onFinish = (params: {amapKey: string}) => {
    update({key: amapKey, value: params.amapKey}).then(() => {
      message.success('保存成功');
    });
  };
  return (
    <>
      <Row gutter={[0, 16]} >
        <Col span={12} offset={6}>
          <Alert
            message="提示"
            description={
              <span>
            后台添加门店的地图定位功能由高德提供的服务支持,应用key需要到<a target='left' href='https://lbs.amap.com/'>高德地图开放平台</a>申请
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
              label='应用KEY'
              name='amapKey'
              rules={[
                {required: true, message: '请输入应用key'}
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
    </>
  )
};

export default MapSettingRender;
