import { PageContainer } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import {Table, Card, Modal} from "antd";
import {fetchList, ItemState} from "@/services/clause";
import {PaginationState } from './Type';
import RichTextRender from './RichTextRender';
import {OnFinishState} from "./RichTextRender/Type"

export default () => {
  const [pagination, setPagination] = useState<PaginationState>({
    current: 1,
    pageSize: 10,
    total: 10
  });
  const [dataSource, setDataSource] = useState<Array<ItemState>>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const onChange = (newPagination: PaginationState) => {
    setLoading(true);
    fetchList({result: newPagination.pageSize, page: newPagination.current}).then((res) => {
      setPagination( {...newPagination, total: res.data.total});
      setDataSource(res.data.items);
      setLoading(false);
    });
  };

  useEffect(() => {
    onChange(pagination);
  }, []);
  const [editVisit, setEditVisit] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<ItemState>({id: -1, title: '',  content: '' });
  const onEdit = (params: ItemState) => {
      setEditVisit(true);
      setEditItem(params);
  }
  const onCancelEdit = () => {
    setEditVisit(false);
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: '标题',
      dataIndex: 'title'
    },
    {
      title: '详情',
      dataIndex: 'content',
      render: (_, row: ItemState) => {
        return (
          <a
            onClick={() => onEdit(row)}
          >查看</a>
        );
      }
    },
    {
      title: '操作',
      render: (row: ItemState) => {
        return (
          <a
            onClick={() => onEdit(row)}
          >编辑</a>
        );
      }
    }
  ];
  const onFinishSave = (params: OnFinishState) => {
    const newDataSource = dataSource.map((item) =>
      item.id === params.id ? {...item, content: params.content} : item
    );
    setDataSource(newDataSource);
    setEditVisit(false);
  };

  return (
    <>
      <PageContainer content="条款列表" >
        <Card>
          <Table
            bordered
            columns={columns}
            rowKey={record => record.id}
            dataSource={dataSource}
            loading={loading}
            pagination={pagination}
            onChange={onChange}
          />
        </Card>
      </PageContainer>
      <Modal
        visible={editVisit}
        title='编辑'
        footer={null}
        onCancel={onCancelEdit}
      >
        <RichTextRender
          {...editItem}
          onFinish={onFinishSave}
        />
      </Modal>
    </>
  );
};
