import { PageContainer } from '@ant-design/pro-layout';
import React, {useEffect, useState} from 'react';
import {Card, Col, Row, Steps} from 'antd';
import Step1Render from "@/pages/Stores/CreateRender/Step1Render";
import Step2Render from "@/pages/Stores/CreateRender/Step2Render";
import Step3Render from "@/pages/Stores/CreateRender/Step3Render";
import {useSelector} from "react-redux";
import {ConnectState} from "@/models/connect";

const {Step} = Steps;

export default () => {
  const currentStep = useSelector((state: ConnectState) => state.stores.currentStep)
  const [stepComponent, setStepComponent] = useState<React.ReactNode>(<Step1Render />);

  useEffect(() => {
    switch (currentStep) {
      case 0:
        setStepComponent(<Step1Render />);
        break;
      case 1:
        setStepComponent(<Step2Render />);
        break;
      case 2:
        setStepComponent(<Step3Render />);
        break;
      default:
        setStepComponent(<Step1Render />);
    }
  }, [currentStep])

  return (
    <PageContainer content="添加一个新的门店">
      <Card>
        <Row>
          <Col span={12} offset={6}>
              <Card bordered={false}>
                  <Steps current={currentStep}>
                    <Step title="填写账号信息" />
                    <Step title="填写门店信息" />
                    <Step title="完成" />
                  </Steps>
              </Card>
          </Col>
          <Col span={12} offset={6}>
            {stepComponent}
          </Col>
        </Row>
      </Card>
    </PageContainer>
  );
};
