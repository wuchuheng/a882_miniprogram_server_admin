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
    setDataSource((prev) => {
      prev.pop();
      return [params, ...prev];
    })
    setActionMode(null);
  };

  useEffect(() => {
    onChange(pagination)
  }, [])

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
              <a>编辑</a>
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
            onClick={() => setActionMode('add')}
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
          onChange={onChangeAdd}
        />
      </Modal>
    </>
  );
};

export default SlideRender;
