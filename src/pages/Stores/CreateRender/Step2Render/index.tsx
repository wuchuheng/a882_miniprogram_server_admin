import React, {ReactNode} from "react";
import {useDispatch} from 'react-redux';
import {PositionState} from '../../components/MarkerRender/Type';
import {getAddressByLocation} from "@/utils/common";
import {tags} from "@/pages/Stores/Type";
import {Button,
  Form,
  Input,
  Row,
  Col,
  Select,
  Rate,
  TimePicker
} from 'antd';
import MarkerRender from "../../components/MarkerRender";
import UploadRender from "../../../../components/UploadRender";

const { Option } = Select;
const { RangePicker } = TimePicker;

const Step2Render = () => {
  const [form] = Form.useForm();

  const children: Array<ReactNode> = [];
  tags.forEach((item) => {
    children.push(
      <Option key={item} value={item}>
        {item}
      </Option>);
  });

  const handleChange = (value: any) => {
    console.log(`Selected: ${value}`);
  };

  const dispatch = useDispatch();

  const handlePrevStep = () => {
    dispatch({
      type: 'stores/toPrevStep'
    })
  };

  const handelImgIdsChange =  (idsInfo: Array<{id: number; url: string}>) => {
    form.setFieldsValue({
      bannerIds: idsInfo
    });
  };

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
  };

  // 提交
  const onFinish = (values:any)  => {
    const startTime = values.openingTime[0].format('h:mm');
    const endTime = values.openingTime[1].format('h:mm');
    const {
      latitude,
      longitude
    } = values.location;
    const {
      nickname,
      phone,
      tags,
      rate,
      address,
      bannerIds
    } = values;

    const newCreateShopInfo = {
      nickname,
      phone,
      tags,
      rate,
      address,
      bannerIds,
      startTime,
      endTime,
      latitude,
      longitude
    };

    dispatch({
      type: 'stores/createStep2',
      payload: newCreateShopInfo
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleSelectPosition = (location: PositionState) => {
    // 设置坐标
    form.setFieldsValue({location});
    // 设置地址
    getAddressByLocation(location).then(address => {
      form.setFieldsValue({address});
    })
  };

  return (
      <Form
        {...layout}
        name="basic"
        // initialValues={getInitValue()}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
      >
        <Form.Item
          label="门店名"
          name="nickname"
          rules={[{ required: true, message: '请输入店名' }]}
        >
          <Input placeholder="请输入门店" />
        </Form.Item>

        <Form.Item
          label="手机号"
          name="phone"
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
          <Input placeholder="请输入手机" />
        </Form.Item>

        <Form.Item
          label='门店标签'
          name='tags'
        >
          <Select
            mode="tags"
            placeholder="请输入标签"
            onChange={handleChange}
            style={{ width: '100%' }}
          >
            {children}
          </Select>
        </Form.Item>


        <Form.Item
          label='星级评分'
          name='rate'
          rules={[{ required: true, message: '请输入评分' }]}
        >
          <Rate />
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
          label='门店地址'
          name='address'
          rules={[{ required: true, message: '请输入地址' }]}
        >
          <Input
            placeholder='请输入地址'
          />
        </Form.Item>
        <Form.Item
          label='地理坐标'
          name='location'
          rules={[{ required: true, message: '请选择地理坐标' }]}
        >
          <MarkerRender
            handleSelectLocation={handleSelectPosition}
          />
        </Form.Item>

        <Form.Item
          label='店铺图片'
          name='bannerIds'
          rules={[{ required: true, message: '请上传店铺图片' }]}
        >
          <UploadRender
            handelImgIdsChange = {handelImgIdsChange}
          />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Row>
            <Col span={6}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Col>
            <Col span={6}>
              <Button onClick={handlePrevStep}>上一步</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
  );
};

export default Step2Render;
