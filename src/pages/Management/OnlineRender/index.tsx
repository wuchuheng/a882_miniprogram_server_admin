import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import { Card, Button, Row, Col } from 'antd';
import {history} from "umi";

export default () => {
  const onRedirectToCreate = () => {
    history.push('/management/createCar');
  };

  return (
    <PageContainer content="出售中的车辆">
      <div>
        <Card>
          <Row>
            <Col span={1} offset={23}>
              <Button
                type='primary'
                onClick={onRedirectToCreate}
              >添加</Button>
            </Col>
          </Row>
          hello
        </Card>
      </div>
    </PageContainer>
  );
};
