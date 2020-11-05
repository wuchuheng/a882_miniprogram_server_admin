import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import { Card, Tabs} from 'antd';
import SiteSettingRender from "./SiteSettingRender";
import MapSettingRender from "@/pages/SettingRender/SiteRender/MapSettingRender";

const { TabPane } = Tabs;

export default () => {
  return (
    <PageContainer content="网站设置">
      <Card>
        <Tabs defaultActiveKey="1" defaultValue={2}>
          <TabPane tab="网站设置" key="1">
            <SiteSettingRender />
          </TabPane>
          <TabPane tab="地图设置" key="2">
            <MapSettingRender />
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </Card>
    </PageContainer>
  );
};
