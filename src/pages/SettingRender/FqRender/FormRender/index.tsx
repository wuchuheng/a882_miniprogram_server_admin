import React from "react";
import {Form, Input, InputNumber, Button, message} from "antd";
import RichEdit from "@/components/RichEdit";
import { FormInstance } from 'antd/lib/form';
import {BaseState, PropsState} from './Type';
import {create} from '@/services/fq';

// eslint-disable-next-line react/prefer-stateless-function
class FormRender extends React.Component<PropsState, any>{
  state: BaseState = {
    mode: 'add'
  }

  formRef = React.createRef<FormInstance>();

  constructor(props: PropsState) {
    super(props);
    this.handleChangeContent = this.handleChangeContent.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
  }

  layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  handleChangeContent = (params: string) => {
    try {
      this.formRef.current.setFieldsValue({
        content: params
      });
    } catch(e) {
      console.log(e);
    }
  }

  handleFinish = (params: {id?: number; title: string; orderNo: number; content: string }) => {
    // 添加
    if (this.state.mode === 'add') {
      create({...params}).then((res) => {
        message.success('添加成功');
        if (this.props.onFinish) {
          this.props.onFinish({
            id: res.data.id,
            title: params.title,
            content: params.content,
            orderNo: params.orderNo
          });
        }
      })
    } else if (this.state.mode === 'edit') {
      debugger
    }
  }

  render() {
    return (
      <Form
        ref={this.formRef}
        onFinish={this.handleFinish}
        initialValues={{...(this.props.id ? this.props : {})}}
      >
        <Form.Item
          {...this.layout}
          label='标题'
          name='title'
          rules={[
            {required: true, message: '请输入标题'}
          ]}
        >
          <Input placeholder='请输入标题'/>
        </Form.Item>
        <Form.Item
          {...this.layout}
          label='排序'
          name='orderNo'
          rules={[
            {required: true, message: '请输入编号'},
            {type: 'number', min: 0, message: '数字不能小于0'}
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          {...this.layout}
          name='content'
          label='内容'
          rules={[
            {required: true, message: '请输入内容'}
          ]}
        >
          <RichEdit
            {...(this.props.content ? {content:this.props.content} : {})}
            onChange={this.handleChangeContent}
          />
        </Form.Item>
        <Form.Item
          {...this.tailLayout}
        >
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default FormRender;
