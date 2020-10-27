import React, {useEffect, useState} from "react";
import {message, Upload} from 'antd';
import ImgCrop from 'antd-img-crop';
import {getToken} from "@/utils/auth";
import config from "@/config";
import 'antd/es/modal/style';
import 'antd/es/slider/style';
import {UploadChangeParam} from "antd/lib/upload";
import {PropsState, ImgItemState} from './Type';
import {UploadFile} from "antd/es/upload/interface";
import {deleteUserBanner} from "@/services/user";

const UploadRender = (props: PropsState) => {

  const [fileList, setFileList] = useState<Array<ImgItemState>>([
  ]);

  useEffect(() => {
    if (props.banners && props.banners.length > 0) {
      const banners = props.banners.map((item) : ImgItemState => {
        return {
          uid: `${item.id}`,
          name: item.url,
          status: 'done',
          url: item.url
        }
      });
      setFileList(banners)
    }
  }, props.banners)

  const onRemove = (file: UploadFile<any>) => {
    const id =  parseInt(file.uid, 10);
    return new Promise((resolve) => {
      // deleteUserBanner(id).then(() => {
        message.success('删除成功');
        const index = fileList.findIndex(item => parseInt(item.uid, 10)  === id);
        const newFileList = fileList.filter((item, itemIndex) =>  itemIndex !== index);
        const bannerUrl = newFileList.map(item => {return {id: parseInt(item.uid, 10), url: item.url}});
        props.handelImgIdsChange(bannerUrl);
        resolve();
      // }).catch(() => reject());
    });
  };

  const onChange = ({file: currentUploading, fileList: newFileList }: UploadChangeParam) => {
    const {status} = currentUploading;
    if (status === 'done') {
      newFileList[newFileList.length - 1].uid = currentUploading.response.data.id;
      newFileList[newFileList.length - 1].url = currentUploading.response.data.url;
      const bannerUrl = newFileList.map(item => {return {id: parseInt(item.uid, 10), url: item.url}} );
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
        onRemove={onRemove}
      >
        {fileList.length < 5 && '+ 上传'}
      </Upload>
    </ImgCrop>
  );
};

export default UploadRender;
