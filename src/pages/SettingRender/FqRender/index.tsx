import { PageContainer } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import {Table, Card, Button, Modal, message} from 'antd';
import {ItemState, fetchList, destroy} from "@/services/fq";
import {PaginationState} from "./Type";
import FormRender from "@/pages/SettingRender/FqRender/FormRender";
import styles from './index.less';
import EditFormRender from './EditFormRender';

export default () => {
  const [dataSource, setDataSource] = useState<Array<ItemState>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<PaginationState>({current: 1, pageSize: 10, total: 0})
  const onChange  = (newPagination: PaginationState) => {
      setLoading(true);
      fetchList({result: newPagination.pageSize, page: newPagination.current}).then(res => {
        setLoading(false);
        setDataSource(res.data.items);
        setPagination({...newPagination, total: res.data.total});
      });
  };
  useEffect(() => {
    onChange(pagination);
  }, []);
  const onDel = (params: ItemState) => {
    destroy(params.id).then(() => {
      message.success('删除成功');
      onChange(pagination);
    })
  };
  const [visitModal, setVisitModal] = useState<false | 'add' | 'edit'>(false);
  const [editItem, setEditItem] = useState<ItemState>({
    id:  -1,
    title: '',
    orderNo: 0,
    content: ''
  });
  const onEdit = (params: ItemState) => {
    setEditItem(params);
    setVisitModal('edit');
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '内容',
      dataIndex: 'content',
      render: (_, row: ItemState) => {
        return <a onClick={() => onEdit(row)}>查看</a>;
      }
    },
    {
      title: '排序',
      dataIndex: 'orderNo'
    },
    {
      title: '操作',
      render: (row: any) => {
        return (
          <div className={styles.actionWrapper}>
            <a onClick={() => onEdit(row)}>编辑</a>
            <a onClick={() => onDel(row)}>删除</a>
          </div>
        );
      }
    }
  ];
  const onCancelModal = () => {
    setVisitModal(false);
  };
  const onAdd = () => {
    setVisitModal('add');
  };
  const mapModelTitle = {'add': '添加', 'edit': '编辑'};
  const onFinish = () => {
    setVisitModal(false);
  };
  const onFinishEdit = (params: ItemState) => {
    const newDataSource = dataSource.map((item) => item.id === params.id ? {...item, ...params} : item );
    setDataSource(newDataSource);
    setVisitModal(false);
  }
  return(
    <>
      <PageContainer content="用于设置常见问题">
        <Card
          extra={(<Button onClick={onAdd}>添加</Button>)}
        >
          <Table
            columns={columns}
            rowKey={record => record.id}
            dataSource={dataSource}
            loading={loading}
            pagination={pagination}
            onChange={onChange}
            bordered
          />
        </Card>
      </PageContainer>
      <Modal
        visible={visitModal !== false}
        title={visitModal !== false ? mapModelTitle[visitModal] : ''}
        footer={null}
        width={700}
        onCancel={onCancelModal}
      >
        { visitModal === 'edit' && ( <EditFormRender
          onFinish={onFinishEdit}
          {...editItem}
        />  ) }
        { visitModal === 'add' && ( <FormRender onFinish={onFinish} /> ) }
      </Modal>
    </>
  );
};
