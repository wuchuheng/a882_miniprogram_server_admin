import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import { Card} from 'antd';
import TableRender from './TableRender'

export default () => {
  return (
    <>
      <PageContainer content="用于发放给用户的优惠券模板">
        <Card>
          <TableRender />
        </Card>
      </PageContainer>
    </>
  );
};
