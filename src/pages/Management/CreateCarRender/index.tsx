import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import { Card } from 'antd';
import CreateFormRender from  './CreateFormRender';

export default () => {
  return (
    <PageContainer content="在这里添加新的车子供客户下单">
      <Card>
        <CreateFormRender />
      </Card>
    </PageContainer>
  );
};
