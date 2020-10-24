import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import { Card } from 'antd';
import EditableTable from '../components/TableBasic'
import {fetchBrands, update, create} from '@/services/brands';

// eslint-disable-next-line react/prefer-stateless-function
class Brands extends React.Component<any, any> {
  render() {
    return (
      <PageContainer content="为出售的车辆进行品牌分类">
        <Card>
          <EditableTable
            title='添加品牌'
            columName='品牌名'
            handleFetchAll={fetchBrands}
            handleCreate={create}
            handleEdit={update} />
        </Card>
      </PageContainer>
    );
  }
}

export default Brands;
