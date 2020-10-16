import { Alert, Checkbox } from 'antd';
import React, { useState } from 'react';
import { connect, Dispatch } from 'umi';
import { StateType } from '@/models/login';
import { LoginParamsType } from '@/services/login';
import { ConnectState } from '@/models/connect';
import LoginForm from './components/Login';
import styles from './style.less';

const { Tab, UserName, Password, Submit } = LoginForm;
interface LoginProps {
  dispatch: Dispatch;
  userLogin: StateType;
  submitting?: boolean;
}

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC<LoginProps> = (props) => {
  const { submitting } = props;
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState<string>('account');
  const [errorMessage, setMessage] = useState<string>('');

  const handleSubmit = (values: LoginParamsType) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values, type },
    }).catch((e: string) => {
      setMessage(e);
    });
  };
  return (
    <div className={styles.main}>
      <LoginForm activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        <Tab key="account" tab="">
          {errorMessage && <LoginMessage content={errorMessage} />}
          <UserName
            name="username"
            placeholder="请输入登录账号"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <Password
            name="password"
            placeholder="请输入密码"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
        </Tab>
        <div>
          <Checkbox checked={autoLogin} onChange={(e) => setAutoLogin(e.target.checked)}>
            自动登录
          </Checkbox>
          <a
            style={{
              float: 'right',
            }}
          >
            忘记密码
          </a>
        </div>
        <Submit loading={submitting}>登录</Submit>
      </LoginForm>
    </div>
  );
};

export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
