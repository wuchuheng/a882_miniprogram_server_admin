import React, {useState} from "react";
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import {getToken} from "@/utils/auth";
import config from "@/config";
import 'antd/es/modal/style';
import 'antd/es/slider/style';
import {UploadChangeParam} from "antd/lib/upload";
import {PropsState} from './Type';

const UploadRender = (props: PropsState) => {
  const [fileList, setFileList] = useState([
  ]);

  const onChange = ({file: currentUploading, fileList: newFileList }: UploadChangeParam) => {
    const {status} = currentUploading;
    if (status === 'done') {
      newFileList[newFileList.length - 1].uid = currentUploading.response.data.id;
      const bannerUrl = newFileList.map(item => {return {id: parseInt(item.uid, 10), url: item.response.data.url}} );
      props.handelImgIdsChange(bannerUrl);
    }
    setFileList(newFileList);
  };

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <ImgCrop
      rotate
      modalTitle='图片裁剪'
      aspect={135/72}
      modalCancel='取消'
      modalOk='上传'
    >
      <Upload
        headers={{
          Authorization: `Bearer ${getToken()}`
        }}
        action={config.baseRequestUrl + '/albums'}
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
        name='img'
      >
        {fileList.length < 5 && '+ 上传'}
      </Upload>
    </ImgCrop>
  );
};

export default UploadRender;
