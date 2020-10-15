import { Redirect } from 'umi';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ConnectState } from '@/models/connect';
import { isExpired } from '@/utils/auth';

export default (props: any) => {
  const loginState = useSelector((state: ConnectState) => state.login.status);

  if (loginState !== 'ok' && !isExpired()) {
    return <Redirect to="user/login" />;
  }
  if (isExpired()) {
    // 有缓存token，从缓存token进行登录
    const dispatch = useDispatch();
    dispatch({
      type: 'login/loginByCacheToken',
    });
    return <>{props.children}</>;
  }
  return <>{props.children}</>;
};
