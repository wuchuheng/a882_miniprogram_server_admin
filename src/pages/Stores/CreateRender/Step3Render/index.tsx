import React from "react";
import {history} from "umi";
import {
  Result,
  Button,
  Descriptions,
  Rate,
  Card,
  Row,
  Col
} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {ConnectState} from "@/models/connect";

const Step3Render = () => {
  const dispatch = useDispatch();
  const onAddNewShop = () => {
    dispatch({
      type: 'stores/resetCreate'
    });
  };

  const handleRedirectToList = () => {
   onAddNewShop();
   history.push('/stores');
  };
  const createShopInfo = useSelector((state: ConnectState) => state.stores.createUserInfo );
  const extra = (
    <>
      <Button type="primary" onClick={onAddNewShop}>
        再添加新门店
      </Button>
      <Button onClick={handleRedirectToList}>查看门店列表</Button>
    </>
  );
  const information = (
    <div >
      <Descriptions column={1}>
        <Descriptions.Item label="账号"> {createShopInfo.username}</Descriptions.Item>
        <Descriptions.Item label="密码"> {createShopInfo.password}</Descriptions.Item>
        <Descriptions.Item label="门店名"> {createShopInfo.nickname}</Descriptions.Item>
        <Descriptions.Item label="手机号"> {createShopInfo.phone}</Descriptions.Item>
        <Descriptions.Item label="门店标签"> {createShopInfo.tags.map(item => `${item} `)}</Descriptions.Item>
        <Descriptions.Item label="评分">
          <Rate value={createShopInfo.rate} />
        </Descriptions.Item>
        <Descriptions.Item label="营业时间">
          {createShopInfo.startTime}-{createShopInfo.endTime}
        </Descriptions.Item>
        <Descriptions.Item label="地址">
          {createShopInfo.address}
        </Descriptions.Item>
        <Descriptions.Item label="地理坐标">
          {createShopInfo.latitude},{createShopInfo.longitude}
        </Descriptions.Item>
        <Descriptions.Item label="店铺图片">
          <Row>
            {createShopInfo.bannerIds.map(item => {
            return (
                <Col span={8} key={item.id}>
                  <Card>
                    <img alt={item.url} src={item.url} style={{width: '80px'}} />
                  </Card>
                </Col>
            );
          })}
          </Row>
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
  return (
      <Result
        status="success"
        title="操作成功"
        subTitle="新门店已添加加"
        extra={extra}
      >
        {information}
      </Result>
  );
};

export default Step3Render;
