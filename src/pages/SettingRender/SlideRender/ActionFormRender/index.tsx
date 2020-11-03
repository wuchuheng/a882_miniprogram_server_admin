import React from "react";
import {Form, Button, message} from "antd";
import UploadOneImage, {ImgState} from "@/components/UploadOneImage";
import {PropsState, OnFinishParamsState } from './Type';
import {create} from "@/services/slide";

const ActionFormRender = (props: PropsState ) => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const [form] = Form.useForm();
  const onChangeUpdateSlide = (params: ImgState) => {
    form.setFieldsValue({
      slide: params
    });
  }

  const onChangeUpdateDetail = (params: ImgState) => {
    form.setFieldsValue({
      detail: params
    });
  }

  const onFinish = (params:  OnFinishParamsState) => {
    // 编辑
    if (props.editItem) {

    } else {
    // 添加
      create({slide_id: params.slide.id, detail_id: params.detail.id}).then((res) => {
        message.success('添加成功');
        if (props.onChange !== undefined) {
          props.onChange({...params, id: res.data.id});
        }
      })
    }
  }
  return (
    <Form
       form={form}
       onFinish={onFinish}
    >
      <Form.Item
        {...layout}
        label='幻灯片'
        name='slide'
        rules={[
          {required: true, message: '请上传图片'}
        ]}
      >
        <UploadOneImage
          onChange={onChangeUpdateSlide}
          aspect={750/340}
        />
      </Form.Item>
      <Form.Item
        {...layout}
        label='详情图'
        name='detail'
        rules={[
          {required: true, message: '请上传图片'}
        ]}
      >
        <UploadOneImage
          onChange={onChangeUpdateDetail}
          isCut={false}
        />
      </Form.Item>
      <Form.Item
        {...tailLayout }
      >
        <Button
          type='primary'
          htmlType="submit"
        >确定</Button>
      </Form.Item>
    </Form>
  );
};

export default ActionFormRender;

