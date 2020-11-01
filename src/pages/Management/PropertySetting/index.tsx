import {PageContainer} from '@ant-design/pro-layout';
import React from 'react';
import styles from './index.less';
import {Tabs} from 'antd';
import EditableTable from "@/pages/Management/components/TableBasic";
import {createCategores, fetchCategores, updateCategory} from "@/services/categores";
import {create, edit, fetchAll} from "@/services/goodsTags";
import {fetchBrands, update, create as createBrand} from "@/services/brands";

const { TabPane } = Tabs;
export default () => {
  function callback(key: any) {
    console.log(key);
  }
  return (
    <PageContainer content="设置车辆商品的各种属性" className={styles.main}>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="分类" key="1">
            <EditableTable
              title='添加分类'
              columName='分类名'
              handleFetchAll={fetchCategores}
              handleCreate={createCategores}
              handleEdit={updateCategory}
            />
        </TabPane>
        <TabPane tab="标签" key="2">
          <EditableTable
            title='添加标签'
            handleFetchAll={fetchAll}
            handleCreate={create}
            handleEdit={edit}
            columName='标签名'
          />
        </TabPane>
        <TabPane tab="品牌" key="3">
          <EditableTable
            title='添加品牌'
            columName='品牌名'
            handleFetchAll={fetchBrands}
            handleCreate={ createBrand}
            handleEdit={update} />
        </TabPane>
      </Tabs>
    </PageContainer>
  );
};
