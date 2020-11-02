import React, {useEffect, useState} from "react";
import {
  Image,
  Switch,
  Table,
  Tag,
  Button,
  Modal, message
} from "antd";
import {OnChangeState} from "./EditRender/Type";
import EditRender from "./EditRender";
import {history} from "umi";
import {
  UserState,
  CategoryState,
  BrandState,
  TagsState,
  BannerState,
  FetchItemState,
  fetch,
  updateStatus
} from "@/services/goods";
import {TablePaginationConfig} from "antd/es/table";
import {PropsState } from './Type';

const TableRender = (props: PropsState) => {
  const [dataSource, seTdataSource] = useState<Array<FetchItemState>>([]);
  const [pagination, setPagination ] = useState<TablePaginationConfig>({});
  const [loading, setLoading] = useState<boolean>(false);
  const handleChange = (newPagination: TablePaginationConfig) => {
    setPagination(newPagination);
    setLoading(true);
    const result = newPagination.pageSize as number;
    const page = newPagination.current as number;
    const status = props.status !== undefined ? {status: props.status} : {};
    const name = props.name ? {name : props.name} : {};
    fetch({result , page, ...status, ...name }).then(res => {
      seTdataSource(res.data.items);
      setPagination((prev) => ({
        ...prev,
        total: res.data.total
      }));
      setLoading(false);
    });
  };
  const [ editItem, setEditItem ] = useState<FetchItemState>({
    "id": -1,
    "name": '',
    "cost": -1,
    "total": -1,
    "status": false,
    "insurance_cost": -1,
    "base_cost": -1,
    "service_cost": -1,
    "pledge_cost": -1,
    "created_at": '',
    "tags": [],
    "category": {id: -1, name: ''},
    "user": {id: -1, nickname: ''},
    "brand": {id: -1, name: ''},
    "banner": {id: -1, url: ''}
  });

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const onEdit = (params: OnChangeState) => {
    const newDataSource = dataSource.map((item) => {
      if (item.id === params.id) {
       const a = {...item, ...params};
        return a;
      }
      return item;
    })
    seTdataSource(newDataSource);
    setIsEdit(false);
  };
  const onStatusChange = (params: {status: boolean; id: number}) => {
      updateStatus(params).then(() => {
        message.success('修改成功')
      });
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "2%"
    },
    {
      title: "商品名",
      dataIndex: "name",
      editType: 'text'
    },
    {
      title: '车型',
      dataIndex: 'category',
      editType: 'select',
      render: (item: CategoryState) => item.name,
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      editType: 'select',
      render: (item: BrandState) => item.name
    },
    {
      title: "门店",
      dataIndex: "user",
      render: ((item: UserState) => item.nickname )
    },
    {
      title: '租金',
      dataIndex: 'cost',
      editType: 'number',
      rules: [{required: true, message: '租金不能为空'}, {type: 'number', min: '0.01', message: '不能小于0.01'}]
    },
    {
      title: '押金',
      dataIndex: 'pledge_cost',
      editType: 'number'
    },
    {
      title: '驾无忧保险',
      dataIndex: 'insurance_cost',
      editType: 'number'
    },
    {
      title: '基本保障费',
      dataIndex: 'base_cost',
      editType: 'number'
    },
    {
      title: '手续费',
      dataIndex: 'service_cost',
      editType: 'number'
    },
    {
      title: '标签',
      dataIndex: 'tags',
      width: '10%',
      editType: 'select',
      render: (items: TagsState ) => items.map(item => <Tag color='green' key={item.id}>{item.name}</Tag>)
    },
    {
      title: '图片',
      dataIndex: 'banner',
      editType: 'image',
      render: (item: BannerState) => {
        return (
          <Image
            key={item.id}
            width={20}
            src={item.url}
          />)

      }
    },
    {
      title: '库存',
      dataIndex: 'total',
      editType: 'number'
    },
    {
      title: '上下架',
      dataIndex: 'status',
      render: (status: boolean, row: FetchItemState) => {
        return (<Switch
            size='small'
            checkedChildren="上架"
            unCheckedChildren="下架"
            onChange={(isOnline:  boolean) => onStatusChange({status: isOnline, id: row.id})}
            defaultChecked={status} />
        );
      }
    },
    {
      title: '时间',
      dataIndex: 'created_at'
    },
    {
      title: '操作',
      render: (row: FetchItemState) => {
        return (<a
            onClick={() => {
              setIsEdit(true);
              setEditItem(row)
            }}
          >编辑</a>);
      }
    },
  ];

  useEffect(() => {
    handleChange({...pagination, current: 1, pageSize: 10});
  }, [props.name, props.status]);

  return (
    <>
      <Button
        type="dashed"
        style={{
          width: '100%',
          marginBottom: 8
        }}
        onClick={() => history.push('/management/createCar')}
      >
        添加
      </Button>
        <Table
          bordered
          columns={columns}
          rowKey={record => record.id}
          dataSource={dataSource}
          pagination={pagination}
          loading={loading}
          onChange={handleChange}
        />
      <Modal
        title="编辑"
        visible={isEdit}
        onCancel={() => setIsEdit(false)}
        footer={false}
      >
        <EditRender
          {...editItem}
          onChange={onEdit}
        />
      </Modal>
    </>
  );
};

export default TableRender;
