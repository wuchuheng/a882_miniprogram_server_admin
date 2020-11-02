import React, {useEffect, useState} from "react";
import {Upload, message} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import config from '@/config';
import {UploadChangeParam} from "antd/es/upload";
import {getToken} from "@/utils/auth";
import {PropsState} from './Type';
import ImgCrop from "antd-img-crop";
import 'antd/es/modal/style';
import 'antd/es/slider/style';

export {ImgState} from './Type';

const UploadOneImage = (props: PropsState) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );

  useEffect(() => {
    if (props.imgUrl) setImageUrl(props.imgUrl.url);
  }, [props.imgUrl])

  const onChange = ({file}: UploadChangeParam) => {
    if (file?.status && file.status === 'uploading') setLoading(true);
    if (file?.status && file.status === 'done') {
      setLoading(false);
      const {url, id} = file.response.data as {url: string; id: number};
      if (props.onChange !== undefined ) props.onChange({id,url});
      setImageUrl(url);
    }
  };

  const  beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('请上传 JPG/PNG 格式的图片!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片不能大于 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  return (
    <ImgCrop
      rotate
      modalTitle='图片裁剪'
      aspect={props.aspect ? props.aspect : 135/72}
      modalCancel='取消'
      modalOk='上传'
    >
      <Upload
        headers={{
          Authorization: `Bearer ${getToken()}`
        }}
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={`${config.baseRequestUrl}/albums`}
        beforeUpload={beforeUpload}
        onChange={onChange}
        name='img'
      >
        {imageUrl.length > 0 ?
          <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
          : uploadButton}
      </Upload>
    </ImgCrop>
  );
};

export default UploadOneImage;
