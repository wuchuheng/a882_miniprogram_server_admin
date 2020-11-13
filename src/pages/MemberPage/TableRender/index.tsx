import React, {useEffect, useState} from "react";
import {Table, Image, Modal} from "antd";
import {ItemState, fetchList} from '@/services/members';
import styles from './index.less';
import {TablePaginationState} from '@/utils/request';
import {WechatIcon, AlipayIcon} from "@/components/Icons";
import EditRender from './EditRender'

export const TableRender = () => {
  const [editItem, setEditItem] = useState<ItemState>({
    id: -1,
    city: '',
    country: '',
    gender: {
      id: -1,
      name: ''
    },
    nickName: '',
    province: '',
    phone: '',
    platform: 'wechat',
    memberRole: {
      id: -1,
      name: ''
    },
    avatarUrl: '',
    createdAt: ''
  });
  const [modalVisit, setModalVisit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<Array<ItemState>>([]);
  const [pagination, setPagination] = useState<TablePaginationState>({
    total: 0,
    current: 0,
    pageSize: 10
  });
  const onGoToNextPage = (params: { current: number; pageSize: number; }) => {
      const newCurrent = params.current;
      setLoading(true);
      fetchList({page: newCurrent, result: params.pageSize}).then(res => {
        setLoading(false);
        const {items, total} = res.data;
        setPagination((prev) => ( {...prev, total, current: newCurrent} ));
        setDataSource(items);
      });
  }
  useEffect(() => {
    onGoToNextPage({current: 1, pageSize: 10});
  }, [])
  const onEdit = (params: ItemState) => {
    setModalVisit(true);
    setEditItem(params);
  }
  const onCancel = () => {
    setModalVisit(false);
  }
  // const onChange
  const onChangeTable = (newPagination: {pageSize: number; current: number; total: number}) => {
    const {pageSize, current} = newPagination;
    onGoToNextPage({current, pageSize});
  }
  const onFinishEdit = (params: ItemState) => {
    setModalVisit(false);
    setDataSource(prev => prev.map(item => item.id === params.id ? params : item));
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: '昵称',
      dataIndex: 'nickName'
    },
    {
      title: '头像',
      dataIndex: 'avatarUrl',
      render: (avatarUrl: string) => {
          return <Image src={avatarUrl} width='50px' height='50px' />
      }
    },
    {
      title: '手机',
      dataIndex: 'phone'
    },
    {
      title: '来自',
      dataIndex: 'city',
      render: (city: string, record: ItemState) => {
        return `${record.country} ${record.province} ${city}`;
      }
    },
    {
      title: '性别',
      dataIndex: 'gender',
      render: (gender: {id: 0 | 1 | 2; name: string} ) => {
        const genderMapText = {
          0: '纯娘们',
          1: '纯爷们',
          2: '未知'
        };
        return genderMapText[gender.id];
      }
    },
    {
      title: '角色',
      dataIndex: 'memberRole',
      render: (memberRole: {id: number; name: string}) => memberRole.name
    },
    {
      title: '平台',
      dataIndex: 'platform',
      render: (platform: 'wechat' | 'alipay') => {
        const mapPlatformToText = {
          wechat: ( <WechatIcon className={styles.iconRender} /> ),
          alipay: (<AlipayIcon className={styles.iconRender} />)
        }
        return mapPlatformToText[platform];
      }
    },
    {
      title: '个人中心',
      render: (_, record: ItemState) => {
        return (
          <a>查看</a>
        );
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt'
    },
    {
      title: '操作',
      render: (_, record: ItemState) => {
        return (
          <div className={styles.actionWrapper}>
            <a
              onClick={() => onEdit(record)}
            >编辑</a>
          </div>
        );
      }
    }
  ];
  return (
    <>
      <Table
        columns={columns}
        pagination={pagination}
        dataSource={dataSource}
        loading={loading}
        rowKey={record => record.id}
        bordered
        onChange={onChangeTable}
      />
      <Modal
        title='编辑'
        visible={modalVisit}
        onCancel={onCancel}
        footer={null}
      >
        <EditRender
          {...editItem}
          onFinish={onFinishEdit}
        />
      </Modal>
    </>
  );
}

export default TableRender;
