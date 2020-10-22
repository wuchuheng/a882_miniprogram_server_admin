import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import { Card } from 'antd';
import EditableTable from '../components/TableBasic';
import {fetchCategores, updateCategory, createCategores} from '@/services/categores';

export default () => {
  return (
    <PageHeaderWrapper content="为出售的车辆进行分类">
      <Card>
        <EditableTable
          title='添加分类'
          columName='分类名'
          handleFetchAll={fetchCategores}
          handleCreate={createCategores}
          handleEdit={updateCategory}
        />
      </Card>
    </PageHeaderWrapper>
  );
};
