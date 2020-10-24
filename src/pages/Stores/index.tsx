import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import {Card, Button} from 'antd';
import {history} from "umi";

export default () => {
  const handleRedirect = () => {
    history.push('/stores/create');
  };

  return (
    <PageContainer content="门店的管理列表，用于门店的修改，添加，删除等">
      <Card>
        <Button onClick={handleRedirect}>创建</Button>
      </Card>
    </PageContainer>
  );
};
