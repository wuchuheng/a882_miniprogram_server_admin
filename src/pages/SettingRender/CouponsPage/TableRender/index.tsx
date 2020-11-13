import React, {useEffect, useState} from "react";
import {Table, Modal, Button, message, Popconfirm} from "antd";
import UploadOneImage, {ImgState} from "@/components/UploadOneImage";
import AddRender from "./AddRender";
import {ModalTitleState, ModalTitleStateMapToTextState} from './Type';
import {
  create,
  fetchAll,
  Itemstate,
  CreateParamsState,
  edit,
  destroy
} from '@/services/coupons';
import styles from './index.less';
import EditRender from './EditRender';

const TableRender = () => {
  const [dataSource, setDataSource] = useState<Array<Itemstate>>([])
  const [loading, setLoading] = useState<boolean>(false);
  const [isVisitModal, setIsVisitModal] = useState<boolean>(false);
  const [modalTitle, setModalTitle ] = useState<ModalTitleState>('add');
  const modalTitleStateMapToText: ModalTitleStateMapToTextState = {
    add: '添加',
    edit: '编辑'
  }
  const onAdd = () => {
    setIsVisitModal(true);
    setModalTitle('add');
  }
  const onCancel = () => {
    setIsVisitModal(false);
  }
  const onAddFinish = (params: CreateParamsState) => {
    create(params).then((res) => {
      const { id }= res.data;
      setDataSource((prev) => [{id, ...params}, ...prev]);
      message.success('添加成功');
      setIsVisitModal(false);
    });
  };
  useEffect(() => {
    setLoading(true)
    fetchAll().then(res => {
      setDataSource(res.data);
      setLoading(false);
    });
  }, [])
  const [editItem, setEditItem ] = useState<Itemstate>({
    id: -1,
    cost: -1,
    name: '',
    des: '',
    expiredDay: -1,
    isUse: false,
    giveType: 1,
    banner: {id: -1, url: ''},
    isAlert: false
  });
  const onEdit = (params: Itemstate) => {
    setModalTitle('edit');
    setIsVisitModal(true);
    setEditItem(params);
  };
  const onFinishEdit = (params: Itemstate) => {
    edit(params).then(() => {
      message.success('编辑成功');
      setIsVisitModal(false);
      setDataSource((prev) => prev.map(item => item.id === params.id ? params : item ));
    });
  }
  const onDelete = (id: number) => {
    destroy(id).then(() => {
      setDataSource((prev) => prev.filter(item => item.id !== id));
      message.success('删除成功');
    })
  }
  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: '名称', dataIndex: 'name' },
    { title: '说明', dataIndex: 'des' },
    { title: '金额', dataIndex: 'cost' },
    {
      title: '有效期',
      dataIndex: 'expiredDay',
      render: (params: number) => `${params}天`
    },
    {
      title: '状态',
      dataIndex: 'isUse',
      render: (params: boolean) => {
        return params ? '使用中' : '禁用';
      }
    },
    {
      title: '发放方式',
      dataIndex: 'giveType',
      render: (params: 1 | 2) => {
        const statusMapDes = {
          1: '新用户注册',
          2: '手动'
        };
        return statusMapDes[params];
      }
    },
    {
      title: '封面',
      dataIndex: 'banner',
      render: (params: ImgState) => {
        return (
          <UploadOneImage imgUrl={params} />
        );
      }
    },
    {
      title: '是否提醒',
      dataIndex: 'isAlert',
      render: (isAlert: 0 | 1) =>  isAlert ? '是' : '否'
    },
    {
      title: '操作',
      render: (_, recored: Itemstate) => {
        return (
          <div className={styles.actionWrapper}>
            <a onClick={() => onEdit(recored)}>编辑</a>
            <Popconfirm
              title="你确定要删除优惠卷吗?"
              onConfirm={() => onDelete(recored.id)}
              okText="确认"
              cancelText="取消"
            >
              <a> 删除 </a>
            </Popconfirm>
          </div>
        )
      }
    }
  ];
  return (
    <>
      <Button
        onClick={onAdd}
        className={styles.addButtonRender}
      >添加优惠卷</Button>
      <Table
        loading={loading}
        bordered
        rowKey={record => record.id}
        columns={columns}
        dataSource={dataSource}
      />
      <Modal
        title={modalTitleStateMapToText[modalTitle]}
        visible={isVisitModal}
        footer={null}
        onCancel={onCancel}
      >
        { modalTitle === 'add' && (<AddRender
          onFinish={onAddFinish}
        />) }

        { modalTitle === 'edit' && (<EditRender
          {...editItem}
          onFinish={onFinishEdit}
        />) }
      </Modal>
    </>
  );
};

export default TableRender;
