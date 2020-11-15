import React, {ReactNode, useState} from 'react';
import { Menu, Card , Row, Col, Breadcrumb} from 'antd';
import styles from './index.less';
import BaseRender from './BaseRender';
import {Link, useSelector} from 'umi';
import {CurrentShowState, CurrentShowMapToNameState} from "./Type";
import CouponsRender from "./CouponsRender";
import OrdersRender from "./OrdersRender";
import VioloationsRender from "./VioloationsRender";
import PromotionRender from "./PromotionRender";
import {ConnectState} from "@/models/connect";

const AccountPage = (props: any) => {
  const { id } = props.match.params as string;
  const [currentShow, setCurrentShow] = useState<CurrentShowState>('base');
  const currentShowMapToComponent: Record<CurrentShowState, ReactNode> = {
    base: <BaseRender/>,
    coupons: <CouponsRender />,
    orders: <OrdersRender />,
    violations: <VioloationsRender />,
    promotion: <PromotionRender />
  };
  const currentShowMapToName: CurrentShowMapToNameState = {
      base: '基本信息',
      coupons: '我的优惠卷',
      orders: '我的订单',
      violations: '我的违章',
      promotion: '我的推广'
  }
  const onChangeNav = (params: {key: CurrentShowState}) => {
      setCurrentShow(params.key);
  };
  const currentMember = useSelector((state: ConnectState) => state.members.currentMember);
  return (
    <>
      <Breadcrumb
        className={styles.breadcrumb}
      >
        <Breadcrumb.Item>后台</Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/members">会员管理</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>个人中心</Breadcrumb.Item>
      </Breadcrumb>
      <Card
        className={styles.mainWrapper}
      >
        <Row>
          <Col span={6}>
            <Menu
              onClick={onChangeNav}
              style={{ width: 256 }}
              defaultSelectedKeys={[currentShow]}
              defaultOpenKeys={['sub1']}
              mode="inline"
            >
              <Menu.Item key="base">{currentShowMapToName.base}</Menu.Item>
              <Menu.Item key="coupons">{currentShowMapToName.coupons}</Menu.Item>
              <Menu.Item key="orders">{currentShowMapToName.orders}</Menu.Item>
              <Menu.Item key="violations">{currentShowMapToName.violations}</Menu.Item>
              {[2, 3].includes(currentMember?.memberRole.id) &&
              ( <Menu.Item key="promotion">{currentShowMapToName.promotion}</Menu.Item> )
              }
            </Menu>
          </Col>
          <Col span={16}>
            <Card
              title={currentShowMapToName[currentShow]}
              bordered={false}
            >
              {currentShowMapToComponent[currentShow]}
            </Card>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default AccountPage;
