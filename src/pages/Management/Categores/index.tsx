import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import { Card } from 'antd';
import TableBasic from './TableBasic';

export default () => {
  return (
    <PageHeaderWrapper content="为出售的车辆进行分类">
      <Card>
        <TableBasic />
      </Card>
    </PageHeaderWrapper>
  );
};
