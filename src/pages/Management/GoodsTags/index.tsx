import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import {Card} from 'antd';
import EditableTable  from '../components/TableBasic';
import  {fetchAll, edit, create} from '@/services/goodsTags';

export default () => {
  return (
    <PageContainer content="为出售的车辆进行分类" >
      <Card>
        <EditableTable
          title='添加标签'
          handleFetchAll={fetchAll}
          handleCreate={create}
          handleEdit={edit}
          columName='标签名'
        />
      </Card>
    </PageContainer>
  );
};
