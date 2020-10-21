import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import { Card } from 'antd';
import TableBasic from './TableBasic';

// eslint-disable-next-line react/prefer-stateless-function
class Brands extends React.Component<any, any> {
  render() {
    return (
      <PageContainer content="为出售的车辆进行分类">
        <Card>
          <TableBasic />
        </Card>
      </PageContainer>
    );
  }
}

export default Brands;
