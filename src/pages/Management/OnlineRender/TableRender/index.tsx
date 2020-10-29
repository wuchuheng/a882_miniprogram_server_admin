import React, {useEffect, useState} from "react";
import {Image,
  Switch,
  Table,
  Tag,
} from "antd";
import {ItemState} from "@/services/user";
import {
  UserState, CategoryState, BrandState, TagsState, BannerState, FetchItemState,
  fetch
} from "@/services/goods";
import {TablePaginationConfig} from "antd/es/table";
import {PropsState} from './Type';

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

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "2%"
    },
    {
      title: "商品名",
      dataIndex: "name"
    },
    {
      title: '车型',
      dataIndex: 'category',
      render: (item: CategoryState) => item.name
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      render: (item: BrandState) => item.name
    },
    {
      title: "门店",
      dataIndex: "user",
      render: ((item: UserState) => item.nickname )
    },
    {
      title: '租金',
      dataIndex: 'cost'
    },
    {
      title: '押金',
      dataIndex: 'pledge_cost'
    },
    {
      title: '驾无忧保险',
      dataIndex: 'insurance_cost'
    },
    {
      title: '基本保障费',
      dataIndex: 'base_cost'
    },
    {
      title: '手续费',
      dataIndex: 'service_cost'
    },
    {
      title: '标签',
      dataIndex: 'tags',
      width: '10%',
      render: (items: TagsState ) => items.map(item => <Tag color='green' key={item.id}>{item.name}</Tag>)
    },
    {
      title: '图片',
      dataIndex: 'banner',
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
      dataIndex: 'total'
    },
    {
      title: '上下架',
      dataIndex: 'status',
      render: (status: boolean) => {
        return (<Switch
            size='small'
            checkedChildren="上架"
            unCheckedChildren="下架"
            onChange={(isOpen: boolean) => {}}
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
      render: (row: ItemState) => {
        return (<a>编辑</a>);
      }
    },
  ];

  useEffect(() => {
    handleChange({...pagination, current: 1, pageSize: 10});
  }, [props.name, props.status]);

  return (
    <Table
      bordered
      columns={columns}
      rowKey={record => record.id}
      dataSource={dataSource}
      pagination={pagination}
      loading={loading}
      onChange={handleChange}
    />
  );
};

export default TableRender;
