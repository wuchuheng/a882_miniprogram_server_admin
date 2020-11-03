import React, {useEffect, useState} from "react";
import { PageContainer } from '@ant-design/pro-layout';
import {Table, Image, Card, Button, Modal, Popconfirm, message} from "antd";
import {fetchList, ItemState, destroy} from '@/services/slide'
import styles from './index.less';
import ActionFormRender from "./ActionFormRender";
import {PaginationState} from "@/pages/SettingRender/SlideRender/Type";

const SlideRender = () => {
  const [actionMode, setActionMode ] = useState<null | 'add' | 'edit'>(null);
  let title = '';
  const actionModelMapTitle =  () => {
    if (actionMode === 'add') title = '添加';
    else if (actionMode === 'edit') title = '编辑';
    return title;
  }
  const [dataSource, setDataSource] = useState<Array<ItemState>>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    current: 1,
    pageSize: 7,
    total: 0
  });
  const [loading, setLoading] = useState<boolean>(false);
  const onChange = (changeParams: PaginationState) => {
    setLoading(true);
    fetchList({result: changeParams.pageSize, page: changeParams.current}).then(res => {
      setDataSource(res.data.items);
      setPagination(changeParams)
      setLoading(false);
      setPagination((prev) => ({
        ...prev,
        total: res.data.total
      }))
    });
  };
  const onDelete = (params: ItemState) => {
      destroy(params.id).then(() => {
        message.success('删除成功');
        onChange(pagination);
      });
  };
  const onChangeAdd = (params: ItemState) => {
    //  编辑
    if (actionMode === 'edit') {
      const newDataSource = dataSource.map(item => item.id === params.id ? params : item );
      setDataSource(newDataSource)
    } else if (actionMode === 'add') {
      if (dataSource.length === pagination.pageSize) {
        setDataSource((prev) => {
          prev.pop();
          return [params, ...prev];
        })
      } else {
        setDataSource((prev) => {
          return [params, ...prev];
        })
      }
    }
    setActionMode(null);
  };

  useEffect(() => {
    onChange(pagination)
  }, [])
  const [editItem, setEditItem] = useState<ItemState | undefined>(undefined);
  const onEdit = (params: ItemState) => {
    setActionMode('edit');
    setEditItem(params);
  };
  const [refresh, setRefresh] = useState<false | number>(false);
  const onShowAdd = () => {
    setActionMode('add');
    setEditItem(undefined);
    setRefresh(Date.now());
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: "id"
    },
    {
      title: '幻灯片',
      dataIndex: "slide",
      render : (item: {id: number; url: string}) =>(<Image src={item.url} width='40px' />)
    },
    {
      title: '详情图',
      dataIndex: "detail",
      render : (item: {id: number; url: string}) =>(<Image src={item.url} width='40px' />)
    },
    {
      width: '10%',
      title: '操作',
      render: (row: ItemState) => {
        return (
          <>
            <div className={styles.actionWrapper}>
              <a onClick={() => onEdit(row)}>编辑</a>
              <Popconfirm
                placement="topRight"
                title='确实定删除?'
                onConfirm={() => onDelete(row)}
                okText="是"
                cancelText="否"
              >
                <a>删除</a>
              </Popconfirm>
            </div>
          </>
        );
      }
    }
  ];

  return (
    <>
      <PageContainer content="为首页设置幻灯片">
        <Card>
          <Button
            className={styles.addButtonRender}
            onClick={() => onShowAdd()}
          >添加</Button>
          <Table
            bordered
            dataSource={dataSource}
            columns={columns}
            loading={loading}
            rowKey={record => record.id}
            onChange={onChange}
            pagination={pagination}
          />
        </Card>
      </PageContainer >
      <Modal
        title={actionModelMapTitle()}
        visible={actionMode !== null}
        footer={null}
        onCancel={() => setActionMode(null)}
      >
        <ActionFormRender
          editItem={editItem !== undefined ? editItem : undefined}
          onChange={onChangeAdd}
          refresh={refresh}
        />
      </Modal>
    </>
  );
};

export default SlideRender;
