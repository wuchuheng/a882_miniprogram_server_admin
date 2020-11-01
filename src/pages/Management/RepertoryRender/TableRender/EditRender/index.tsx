import React, {useEffect, useState} from "react";
import { update, UpdateParamsState } from "@/services/goods";
import {Form, Input, Select, InputNumber, Button, message} from 'antd';
import {fetchCategores, FetchCategoreItemState} from "@/services/categores";
import {fetchBrands, BrandItemState} from "@/services/brands";
import {fetchAll, TagItem} from '@/services/goodsTags'
import UploadOneImage from "@/components/UploadOneImage";
import {ImgState} from "@/components/UploadOneImage/Type";
import styles from './index.less';
import {PropsState} from './Type';

const EditRender: React.FC<PropsState> = ({
  id,
  name,
  category,
  brand,
  tags,
  total,
  cost,
  insurance_cost,
  base_cost,
  service_cost,
  pledge_cost,
  banner,
  onChange
                                              }) => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const {Option} = Select;
  const [categores, setCategores] = useState<Array<FetchCategoreItemState>>([]);
  const [brands, setBrands] = useState<Array<BrandItemState>>([]);
  const [form]  = Form.useForm();
  const [goodTags, setGoodTags] = useState<Array<TagItem>>([]);
  const [newbanner, setNewBanner] = useState<ImgState>(banner);
  const onUploadBanner = (params: {id: number; url: string }) => {
    setNewBanner(params);
    form.setFieldsValue({
      bannerId: params.id
    });
  };
  const onFinsh = (params: UpdateParamsState) => {
      update({...params, id}).then(() => {
        const newCategory = categores.filter(item => item.id === params.categoryId)[0];
        const newBrand  = brands[brands.findIndex(item => item.id === params.brandId)];
        if (onChange) {
            onChange({
            id,
            name: params.name,
            cost: params.cost,
            total:params.total,
            insurance_cost: params.insuranceCost,
            base_cost: params.baseCost,
            service_cost: params.serviceCost,
            pledge_cost: params.pledgeCost,
            tags: goodTags.filter((item, index) => params.tagIds.includes(index)),
            category: newCategory,
            brand: newBrand,
            banner: newbanner
          });
        }
        message.success('修改成功')
      });
  };
  useEffect(() => {
    form.setFieldsValue({
      name,
      categoryId: category.id,
      brandId: brand.id,
      tagIds: [],
      insuranceCost: insurance_cost,
      baseCost: base_cost,
      serviceCost: service_cost,
      pledgeCost: pledge_cost,
      bannerId: banner.id,
      total: parseInt(`${total}`, 10)
    });
    fetchCategores().then(res => setCategores(res.data));
    fetchBrands().then(res => setBrands(res.data));
    fetchAll().then(res => {
      setGoodTags(res.data);
      const newSelectTags = res.data.filter((item) => tags.findIndex(tagItem => tagItem.id === item.id) >= 0 )
        .map((item ) => item.id);
      form.setFieldsValue({tagIds: newSelectTags});
    });
  }, [
    id,
    name,
    category,
    brand,
    tags,
    total,
    cost,
    insurance_cost,
    base_cost,
    service_cost,
    pledge_cost,
    banner
  ]);
  return (
    <Form
      onFinish={onFinsh}
      form={form}
      initialValues={{
        total,
        cost: parseFloat(`${cost}`),
      }}
    >
      <Form.Item
        {...layout}
        label='商品'
        name='name'
        rules={[{required: true, message: '商品名不能为空'}]}
      >
        <Input placeholder='请输入商品名' />
      </Form.Item>
      <Form.Item
        {...layout}
        label='车型'
        name='categoryId'
        rules={[{required: true, message: '请选择车型'}]}
      >
        <Select>
          {categores.length > 0 ?  categores.map(item => (<Option value={item.id} key={item.id}>{item.name}</Option>)) : []}
        </Select>
      </Form.Item>
      <Form.Item
        {...layout}
        name='brandId'
        label='品牌'
        rules={[{required: true, message: '请选择品牌'}]}
      >
        <Select>
          {brands.length > 0 ?  brands.map(item => <Option value={item.id} key={item.id}>{item.name}</Option>)  : []}
        </Select>
      </Form.Item>
      <Form.Item
        {...layout}
        label='标签'
        name='tagIds'
        rules={[{required: true, message: '请选择标签'}]}
      >
        <Select
          mode='multiple'
        >
          {tags.length > 0 ?  goodTags.map(item => (<Option value={item.id} key={item.id} >{item.name}</Option>)) : []}
        </Select>
      </Form.Item>
      <Form.Item
        {...layout}
        label='数量'
        name='total'
        rules={[
          {required: true, message: '请输入数量'},
          {type: 'number', min: 1, message: '数量不能小于1'}
        ]}
      >
        <InputNumber className={styles.inputRenderWrapper}/>
      </Form.Item>
      <Form.Item
        {...layout}
        label='租金'
        name='cost'
        rules={[
          {required: true, message: '请输入租金'},
          {type: 'number', min: 0.01, message: '金额不能小于0.01'}
        ]}
      >
        <InputNumber className={styles.inputRenderWrapper}/>
      </Form.Item>
      <Form.Item
        {...layout}
        label='驾无忧保险(按天)'
        name='insuranceCost'
        rules={[
          {required: true, message: '请输入保险费'},
          {type: 'number', min: 0, message: '金额不能小于0'}
        ]}
      >
        <InputNumber className={styles.inputRenderWrapper}/>
      </Form.Item>
      <Form.Item
        {...layout}
        label='基本服务保障费(按天)'
        name='baseCost'
        rules={[
          {required: true, message: '请输入服务保障费'}
        ]}
      >
        <InputNumber className={styles.inputRenderWrapper}/>
      </Form.Item>
      <Form.Item
        {...layout}
        label='手续费'
        name='serviceCost'
        rules={[
          {required: true, message: '请输入手续费'}
        ]}
      >
        <InputNumber className={styles.inputRenderWrapper}/>
      </Form.Item>
      <Form.Item
        {...layout}
        label='押金'
        name='pledgeCost'
        rules={[
          {required: true, message: '请输入押金'}
        ]}
      >
          <InputNumber className={styles.inputRenderWrapper}/>
      </Form.Item>
      <Form.Item
        {...layout}
        label='展示图'
        name='bannerId'
        rules={[{
          required: true, message: '请上传图片'
        }]}
      >
        <UploadOneImage
          onChange={onUploadBanner}
          imgUrl={{
            id: banner.id,
            url: banner.url
          }} />
        </Form.Item>
      <Form.Item
        {...tailLayout}
      >
        <Button type="primary" htmlType="submit">
          保存
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditRender;
