import React, {useEffect, useState} from "react";
import {Form, Button, message} from "antd";
import UploadOneImage, {ImgState} from "@/components/UploadOneImage";
import {PropsState, OnFinishParamsState, ItemState } from './Type';
import {create, update} from "@/services/slide";

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
      update({id: props.editItem.id , slide_id: params.slide.id, detail_id: params.detail.id}).then(() => {
          message.success('修改成功');
          if (props.onChange !== undefined) {
            const item = props.editItem as ItemState;
            props.onChange({...params, id: item.id});
          }
      });
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
  const [detail, setDetail] = useState<ImgState | undefined>(undefined);
  const [slide, setSlide] = useState<ImgState | undefined>(undefined);
  useEffect(() => {
    if (props.editItem !== undefined) {
      setDetail(props.editItem.detail);
      setSlide(props.editItem.slide);
      form.setFieldsValue({
        slide: props.editItem.slide,
        detail: props.editItem.detail
      });
    }else {
      setDetail(undefined);
      setSlide(undefined);
      // setActionMode(Date.now());
    }
  });
  useEffect(() => {
    form.setFieldsValue({
      slide: undefined,
      detail: undefined
    })
  }, [props.refresh])

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
          {...(slide !== undefined ? {imgUrl: slide} : {})}
          onChange={onChangeUpdateSlide}
          aspect={750/340}
          {...(props.refresh !== undefined ? {isRefresh: props.refresh} : {})}
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
          {...(detail !== undefined ? {imgUrl: detail} : {})}
          onChange={onChangeUpdateDetail}
          isCut={false}
          {...(props.refresh !== undefined ? {isRefresh: props.refresh} : {})}
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

