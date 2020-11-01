import styles from "./index.less";
import React, { useState, useEffect } from "react";
import {create,CreateState } from '@/services/goods';
import {
  Form,
  Input,
  Button,
  Select,
  InputNumber,
  Switch,
  Transfer,
  message
} from "antd";
import { history } from 'umi';
import {FetchCategoreItemState, fetchCategores} from "@/services/categores";
import {fetchBrands, BrandItemState} from "@/services/brands";
import {fetchAll, TagItem} from "@/services/goodsTags";
import { FetchShopNicknamesItem, fetchShopNicknames } from "@/services/user";
import UploadRender from '../../../../components/UploadOneImage';

const {Option} = Select;
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 8 },
};

const DynamicRule = () => {
  const [form] = Form.useForm();
  const [categores, setCatygory] = useState<Array<FetchCategoreItemState>>([]);
  const [brands, setBrands] = useState<Array<BrandItemState>>([]);
  const [tags, setTags] = useState<Array<TagItem>>([]);
  const [status, setStatus] = useState<boolean>(true);
  const [shopNicknames, setShopNicknames] = useState<Array<FetchShopNicknamesItem>>([]);
  const [shopSelectNicknames, setShopSelectNicknames] = useState<Array<string>>([]);

  const switchChange = () => setStatus(!status);
  const onChangeShop = (params: Array<string>) => {
    setShopSelectNicknames(params);
  };

  useEffect(() => {
    fetchCategores().then(newCategores => {
      setCatygory(newCategores.data)
    } );
    fetchBrands().then(res => setBrands(res.data) );
    fetchAll().then(res => {
        setTags(res.data)
      }
    );
    fetchShopNicknames().then(res => {
      setShopNicknames(res.data)
    });
  }, []);

  const onCheck = async () => {
    try {
      const values = await form.validateFields() as CreateState;
      const tagIds = values.tagIds.map(item => tags[item].id);
      create({...values, tagIds}).then(() => {
        message.success('添加成功');
        history.push('/management/online');
      });
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };

  const onUploadChange = (urlInfo: {id: number; url: string}) => {
    form.setFieldsValue({bannerId: urlInfo.id});
  }

  return (
    <Form
      form={form}
      name="dynamic_rule"
      initialValues={{
        status
      }}
    >
      <Form.Item
        {...formItemLayout}
        name="name"
        label="名称"
        rules={[
          {
            required: true,
            message: "请输入车子名称",
          },
        ]}
      >
        <Input placeholder="请输入车子名称" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        label='车型'
        name='categoryId'
        rules={[{required: true, message: '请选择车型'}]}
      >
        <Select
          placeholder='请选择车型'
        >
          {categores.length > 0 ?
            categores.map(item => (<Option value={item.id} key={item.id} >{item.name}</Option>)) :
            []
          }
        </Select>
      </Form.Item>

      <Form.Item
        {...formItemLayout}
        label='品牌'
        name='brandId'
        rules={[{required: true, message: '请选择品牌'}]}
      >
        <Select
          placeholder='请选择品牌'
        >
          {brands.length > 0 ?
            brands.map(item => (<Option value={item.id} key={item.id}>{item.name}</Option>)) :
            []
          }
        </Select>
      </Form.Item>

      <Form.Item
        {...formItemLayout}
        label='标签'
        name='tagIds'
        rules={[{required: true, message: '请选择牌标签'}]}
      >
        <Select
          mode='multiple'
          placeholder='请选择标签'
        >
          {tags.length > 0 ?
            brands.map(item => (<Option value={item.id} key={item.id}>{item.name}</Option>)) :
            []
          }
        </Select>
      </Form.Item>

      <Form.Item
        {...formItemLayout}
        label='数量'
        name='total'
        rules={[
          {required: true, message: '请选择车子数量'},
          { type: 'number', min: 1, message: '车子数量不小于1'}
        ]}
      >
        <InputNumber
          placeholder='请输入库存数量'
          className={styles.inputItemWrapper}
        />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        label='出售状态'
        name='status'
        rules={[{required: true, message: '请选择出售状态'}]}
      >
        <Switch
          checkedChildren="上架"
          unCheckedChildren="下架"
          checked={status}
          onChange={switchChange}
        />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        label='租金'
        name='cost'
        rules={[
          {required: true, message: '请输入租金'},
          {type: 'number', min: 0.01, message: '租金不能小于0.01'}
          ]}
      >
        <InputNumber
          placeholder='请输入车辆租金'
          className={styles.inputItemWrapper}
        />
      </Form.Item>

      <Form.Item
        {...formItemLayout}
        label='驾无忧保险(按天)'
        name='insuranceCost'
        rules={[
          {required: true, message: '请输入保险费'},
          {type: 'number', min: 0, message: '金额不能小于0'}
          ]}
      >
        <InputNumber
          placeholder='请输入保险费'
          className={styles.inputItemWrapper}
        />
      </Form.Item>

      <Form.Item
        {...formItemLayout}
        label='基本服务保障费(按天)'
        name='baseCost'
        rules={[
          {required: true, message: '请输入保障费'},
          { type: 'number', min: 0, message: '金额不能小于0' }
        ]}
      >
        <InputNumber
          className={styles.inputItemWrapper}
          placeholder='请输入基本服务保障费'
        />
      </Form.Item>

      <Form.Item
        {...formItemLayout}
        label='手续费用'
        name='serviceCost'
        rules={[
          {required: true, message: '请输入手续费'},
          { type: 'number', min: 0, message: '金额不能小于0' }
        ]}
      >
        <InputNumber
          className={styles.inputItemWrapper}
          placeholder='请输入基本服务手续费'
        />
      </Form.Item>

      <Form.Item
        {...formItemLayout}
        label='押金'
        name='pledgeCost'
        rules={[
          { required: true, message: '请输入押金' },
          { type: 'number', min: 0, message: '金额不能小于0' }
        ]}
      >
        <InputNumber
          className={styles.inputItemWrapper}
          placeholder='请输入押金'
        />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        label='门店'
        name='shopIds'
        rules={[
          {required: true, message:'请选择车子要出售的门店'}
        ]}
      >
        <Transfer
          dataSource={shopNicknames.map(item => ({key: item.id.toString(10), nickname: item.nickname}))}
          render={item => item.nickname}
          targetKeys={shopSelectNicknames}
          onChange={onChangeShop}
          pagination
        />
      </Form.Item>

      <Form.Item
        {...formItemLayout}
        label='展示图'
        name='bannerId'
        rules={[
          {required: true, message: '请上传图片'}
        ]}
      >
        <UploadRender
          onChange={onUploadChange}
        />
      </Form.Item>

      <Form.Item {...formTailLayout}>
        <Button type="primary" onClick={onCheck}>
          添加
        </Button>
      </Form.Item>
    </Form>
  );
};

const CreateFormRender = () => (
  <div className={styles.container}>
    <div id="components-form-demo-dynamic-rule">
      <DynamicRule />
    </div>
  </div>
);

export default CreateFormRender;
