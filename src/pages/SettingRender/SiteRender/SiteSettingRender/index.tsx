import React, {useEffect, useState} from "react";
import {Form, message, Row, Col, Input, Button} from 'antd';
import UploadOneImage, {ImgState} from "@/components/UploadOneImage";
import {fetchOne, ConfigImgState, update} from "@/services/configs";
import {useDispatch} from "react-redux";

const SiteSettingRender = () => {
  const [init, setInit] = useState<{backLogo: {id: number; url: string}; appName: string}>({
    backLogo: {id: -1, url: ''},
    appName: ''
  });
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const [form] = Form.useForm();
  const [backLogo, setBackLogo] = useState<ConfigImgState | undefined>(undefined);
  const backLogoKey = 'BACK_LOGO'
  const appNameKey = 'APP_NAME';
  useEffect(() => {
    fetchOne(backLogoKey).then((res) => {
      const data = res.data as ConfigImgState;
      setBackLogo(data);
      form.setFieldsValue({
        backLogo: data
      });
      setInit((prev => ({...prev, backLogo: data})));
    })
    fetchOne<{value: string}>(appNameKey).then((res) => {
      form.setFieldsValue({
        appName: res.data.value
      });
      setInit((prev => ({...prev, appName: res.data.value})));
    });
  }, []);
  const dispatch = useDispatch();
  const onChangeBackLogo = (params: ImgState) => {
    form.setFieldsValue({
      backLogo: params
    });
  };
  const onFinish = (params: {backLogo: ImgState; appName: string}) => {
    // 修改图片
    if (params.backLogo !== init.backLogo) {
      update({key: backLogoKey, value: `${params.backLogo.id}`}).then(() => {
        message.success('修改图片成功');
        dispatch({
          type: 'base/updateLogo',
          payload: {backLogo: params.backLogo.url}
        })
      });
    }
    // 修改应用名
    if (init.appName !== params.appName) {
      update({key: appNameKey, value: params.appName}).then(() => {
        message.success('修改应用名成功')
      });
    }
  };

  return (
    <Row justify='center'>
      <Col span={12}>
        <Form
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            {...layout}
            label='后台logo'
            name='backLogo'
            rules={[
              {required: true, message: '请上传logo'}
            ]}
          >
            <UploadOneImage
              {...(backLogo ? {imgUrl: backLogo} : {})}
              aspect={1}
              onChange={onChangeBackLogo}
            />
          </Form.Item>
          <Form.Item
            {...layout}
            label='应用名'
            name='appName'
            rules={[
              {required: true, message: '请输入用户名'}
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            {...tailLayout}
          >
            <Button type='primary' htmlType='submit'>保存</Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default SiteSettingRender;
