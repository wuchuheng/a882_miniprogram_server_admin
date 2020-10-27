import React, {useEffect} from "react";
import { Form, Input, Button, TimePicker, Rate, Select } from 'antd';
import {PropsState} from './Type';
import moment from "moment";
import MarkerRender from "../../components/MarkerRender";
import { PositionState } from "@/pages/Stores/components/MarkerRender/Type";
import {getAddressByLocation} from "@/utils/common";
import UploadRender from "@/components/UploadRender";
import {HandelImgIdsChangeState} from "@/components/UploadRender/Type";
import {userUpdate} from "@/services/user";
import {tags} from "@/pages/Stores/Type";

const { Option } = Select;
const {RangePicker} = TimePicker;
const EditFormRender = (props: PropsState) => {
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 6, span: 16 },
  };
  const onFinish = (values: any) => {
    const {
      nickname,
      rate,
      phone,
      address,
      location,
      password
    } = values;
    const newTags = (values.tags as Array<string>).join(',');
    const {latitude, longitude} = location;
    const banners = values.banners.map((item: {id: number; url: string}) => item.id).join(',');
    const [startTime, endTime] = values.openingTime.map((item: any) => item.format('h:mm'));
    const params = {
      nickname,
      rate,
      tags: newTags,
      phone,
      address,
      latitude,
      longitude,
      start_time: startTime,
      end_time: endTime,
      banners,
      id: props.id
    };
    userUpdate(
      password ? {...params, password} : params
      ).then(() => {
      props.onSave({
        ...params,
        tags: newTags.split(','),
        banners: values.banners as Array<{id: number; url: string}>
      });
    })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  // 选择坐标地点
  const handleSelectLocation = (location: PositionState) => {
    getAddressByLocation(location).then(address => {
      form.setFieldsValue({address, location});
    });
  };

  // 选择图片
  const handelImgIdsChange = (ids: Array<HandelImgIdsChangeState>) => {
    form.setFieldsValue({banners: ids});
  };
    return (
    <Form
      {...layout}
      form={form}
      name="basic"
      initialValues={{
        password: '',
        nickname: props.nickname,
        address: props.address,
        openingTime: [
          moment(props.start_time, 'h:mm:ss a'),
          moment(props.end_time, 'h:mm:ss a')
        ],
        phone: props.phone,
        rate: props.rate,
        location: [],
        banners: props.banners,
        tags: props.tags
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label='密码'
        name='password'
      >
        <Input
          type='password'
          placeholder='不填不更改'
        />
      </Form.Item>
      <Form.Item
        label='手机'
        name='phone'
        rules={[
          { required: true, message: '请输入手机号' },
          () => ({
            validator(rule, value) {
              const phoneRexg = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199)\d{8}$/;
              return phoneRexg.test(value) ? Promise.resolve() : Promise.reject('手机号码不正确');
            },
          }),
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='标签'
        name='tags'
      >
        <Select
          mode="multiple"
        >
          {tags.map(item => <Option value={item} key={item} >{item}</Option>)}
        </Select>
      </Form.Item>

      <Form.Item
        label="店名"
        name="nickname"
        rules={[{ required: true, message: '请输入店名' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='营业时间'
        name='openingTime'
        rules={[{ required: true, message: '请输入营业时间' }]}
      >
        <RangePicker
          format='HH:mm'
        />
      </Form.Item>

      <Form.Item
        label='评分'
        name='rate'
        rules={[{ required: true, message: '请输入评分' }]}
      >
        <Rate />
      </Form.Item>

      <Form.Item
        label="地址"
        name="address"
        rules={[{ required: true, message: '请输入地址' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='地理坐标'
        name='location'
      >
        <MarkerRender
          handleSelectLocation={handleSelectLocation}
          latitude={props.latitude}
          longitude={props.longitude}
        />
      </Form.Item>

      <Form.Item
        label='店铺图片'
        name='banners'
      >
       <UploadRender
         handelImgIdsChange={handelImgIdsChange}
         banners={props.banners}
       />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          保存
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditFormRender;
