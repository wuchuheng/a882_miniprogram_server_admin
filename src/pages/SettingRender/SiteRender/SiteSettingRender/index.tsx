import React, {useEffect, useState} from "react";
import {Form, message} from 'antd';
import UploadOneImage, {ImgState} from "@/components/UploadOneImage";
import {fetchOne, ConfigImgState, update} from "@/services/configs";
import {useDispatch} from "react-redux";


const SiteSettingRender = () => {
  const [form] = Form.useForm();
  const [backLogo, setBackLogo] = useState<ConfigImgState | undefined>(undefined);
  const backLogoKey = 'BACK_LOGO'
  useEffect(() => {
    fetchOne(backLogoKey).then((res) => {
      const data = res.data as ConfigImgState;
      setBackLogo(data);
    })
  }, []);
  const dispatch = useDispatch();
  const onChangeBackLogo = (params: ImgState) => {
    update({key: backLogoKey, value: `${params.id}`}).then(() => {
      message.success('修改成功');
      dispatch({
        type: 'base/updateLogo',
        payload: {backLogo: params.url}
      })
    });
  };

  return (
    <Form
      form={form}
    >
      <Form.Item
        label='后台logo'
        name='backLogo'
      >
        <UploadOneImage
          {...(backLogo ? {imgUrl: backLogo} : {})}
          aspect={1}
          onChange={onChangeBackLogo}
        />
      </Form.Item>
    </Form>
  );
};

export default SiteSettingRender;
