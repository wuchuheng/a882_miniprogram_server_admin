import { PageContainer } from '@ant-design/pro-layout';
import React, {useEffect, useState} from 'react';
import styles from './index.less';
import {Table, Button, Modal, Image, message} from 'antd';
import AddFormRender from "./AddFormRender";
import {ItemState, fetcAll, destroy} from "@/services/payNotices";
import {ModelActionMapToTextState, ModelActionState} from "@/pages/SettingRender/PayNoticesPage/type";
import EditFormRender from './EditFormRender';

export default () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [ dataSource, setDataSource ] = useState<Array<ItemState>>([]);
  useEffect(() => {
    setLoading(true);
    fetcAll().then(res => {
      setLoading(false);
      setDataSource(res.data)
    });
  }, [])
  const [currentEditItem, setCurrentEditItem] = useState<ItemState | undefined>(undefined);
  const [modelAction, setModelAction] = useState<ModelActionState>('create');
  const [isShowAddForm,setIsShowAddForm] = useState<boolean>(false);
  const onEdit = (params: ItemState) =>  {
    setIsShowAddForm(true)
    setModelAction('edit');
    setCurrentEditItem(params);
  }
  const onDelete = (recore: ItemState) => {
    destroy(recore.id).then(() => {
      message.success('删除成功');
      setDataSource((prev) => prev.filter(item => item.id !== recore.id) )
    });
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },

    {
      title: '图标',
      dataIndex: 'icon',
      render:(row: {id: number; url: string}) => {
        return (<Image src={row.url} className={styles.imageRender} />);
      }
    },
    {
      title: '标题',
      dataIndex: 'title'
    },
    {
      title: '内容',
      dataIndex: 'content'
    },
    {
      title: '操作',
      render: (row: any, recored: ItemState) => {
        return (
            <div className={styles.actionWrapper}>
              <a onClick={() => onEdit(recored)}>编辑</a>
              <a onClick={() => onDelete(recored)}>删除</a>
            </div>
        );
      }
    }
  ];

  const onAdd = () => {
    setModelAction('create');
    setIsShowAddForm(true);
  };
  const onCancel = () => {
    setIsShowAddForm(false);
  }
  const onFinishAddItem = (params: ItemState) => {
      setDataSource(prev => [...prev, params]);
      setIsShowAddForm(false);
  };

  const modelActionMapToText: ModelActionMapToTextState= {
    edit: '编辑',
    create: '创建'
  }
  const onFinishEdit = (params: ItemState) => {
    setDataSource(prev => prev.map(item => item.id !== params.id ? item : params ));
    setIsShowAddForm(false);
  }
  return (
    <PageContainer content="支付须知用于用户下单的页面，显示出来，用于提示用户的一种跟关于支付的公告" className={styles.main}>
      <>
        <Button
          onClick={onAdd}
        >添加</Button>
        <Table
          bordered
          dataSource={dataSource}
          rowKey={(recored) => recored.id}
          columns={columns}
          loading={loading}
        />
        <Modal
          title={modelActionMapToText[modelAction]}
          visible={isShowAddForm}
          onCancel={onCancel}
          footer={null}
        >
          {modelAction === 'create' && ( <AddFormRender onFinish={onFinishAddItem} /> )}
          {modelAction === 'edit' && (<EditFormRender editItem={currentEditItem as ItemState} onFinish={onFinishEdit} />)}
        </Modal>
      </>
    </PageContainer>
  );
};
