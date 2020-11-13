import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import TableRender from './TableRender';

export default () => {
  return (
    <PageContainer content="这里显示的都是用户的信息">
      <TableRender />
    </PageContainer>
  );
};
