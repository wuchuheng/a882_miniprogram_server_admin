import { PageContainer } from '@ant-design/pro-layout';
import React, {FC, useEffect, useState} from 'react';
import { Card, Button, Row, Col } from 'antd';
import {history} from "umi";
import TableRender from './TableRender';
import styles from './index.less';
import {fetchStatus, FetchStatusState} from '@/services/goods'

export default () => {
  const [status, setStatus] = useState<FetchStatusState>({total: 0, offLineTotal: 0, onLineTotal: 0});
  useEffect(() => {
    fetchStatus().then(res => setStatus(res.data));
  });
  const onRedirectToCreate = () => {
    history.push('/management/createCar');
  };
  const Info: FC<{
    title: React.ReactNode;
    value: React.ReactNode;
    bordered?: boolean;
  }> = ({ title, value, bordered }) => (
    <div className={styles.headerInfo}>
      <span>{title}</span>
      <p>{value}</p>
      {bordered && <em />}
    </div>
  );


  return (
    <PageContainer content="出售中的车辆">
      <Row gutter={[0, 24]}>
        <Col span={24}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="总库存" value={`${status.total}辆`} bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="已上架" value={`${status.onLineTotal}辆`} bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="已下架" value={`${status.offLineTotal}辆`} bordered />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card>
            <Row>
              <Col span={1} offset={23}>
                <Button
                  type='primary'
                  onClick={onRedirectToCreate}
                >添加</Button>
              </Col>
              <Col span='24'>
                <TableRender />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

    </PageContainer>
  );
};
