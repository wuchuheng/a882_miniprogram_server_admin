import { PageContainer } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Card, Tabs} from 'antd';
import styles from './index.less';
import SiteSettingRender from "./SiteSettingRender";

const { TabPane } = Tabs;

export default () => {
  const  callback = (key: any) => {
    console.log(key);
  }
  return (
    <PageContainer content="网站设置">
      <Card>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="网站设置" key="1">
            <SiteSettingRender />
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </Card>
    </PageContainer>
  );
};
