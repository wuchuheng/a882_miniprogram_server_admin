import React, {ComponentState} from "react";
import styles from "./index.less";
import {
  Table,
  Tag,
  Image,
  Rate,
  Switch,
  message,
  Modal
} from "antd";
import {fetchUsers, ItemState, updateDisable} from "@/services/user";
import EditFormRender from "./EditFormRender";

class App extends React.Component {
  columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "2%"
    },
    {
      title: "账号",
      dataIndex: "username",
      width: "10%"
    },
    {
      title: "店名",
      dataIndex: "nickname"
    },
    {
      title: '手机',
      dataIndex: 'phone'
    },
    {
      title: '地址',
      dataIndex: 'address'
    },
    {
      title: '标签',
      dataIndex: 'tags',
      width: '10%',
      render: (tags: Array<string>) => {
        return tags.map((tag, index) => {
          return <Tag color='green' key={index + tag}>{tag}</Tag>
        });
      }
    },
    {
      title: '评分',
      dataIndex: 'rate',
      render: (rate: number) => {
        return <Rate
          value={rate}
          disabled />
      }
    },
    {
      title: '营业时间',
      dataIndex: 'start_time',
      render: (startTime: string, row: any) => `${startTime}-${row.end_time}`
    },
    {
      title: '店铺图片',
      dataIndex: 'banners',
      render: (banner: Array<{id: number; url: string}>) => {
        return banner.map((item, index) =>
          <Image
            key={index}
            width={20}
            src={item.url}
          />
        );
      }
    },
    {
      title: '禁用',
      dataIndex: 'is_disable',
      render: (isDisable: boolean, row: ItemState) => {
        return (<Switch
            checkedChildren="开启"
            unCheckedChildren="关闭"
            onChange={(isOpen: boolean) => this.handleChangeState(isOpen, row)}
            defaultChecked={isDisable} />
        );
      }
    },
    {
      title: '创建时间',
      dataIndex: 'created_at'
    },
    {
      title: '操作',
      render: (row: ItemState) => {
        return (<a onClick={() => this.handleShowEditForm(row)} >编辑</a>);
      }
    },
  ];

  state = {
    data: [],
    pagination: {},
    loading: false,
    visible: false,
    nickname: '',
    banners: [],
    rate: 0,
    start_time: '',
    end_time: '',
    tags: [],
    phone: '',
    address: '',
    latitude: '',
    longitude: '',
    id: 0
  };

  handleChangeState(isSelect: boolean, row: ItemState)
  {
    updateDisable({id: row.id, isDisable: isSelect}).then(() => {
      message.success('修改成功');
    });
  }

  handleShowEditForm(row: ItemState)
  {
    const visible = ! this.state.visible;
    this.setState(() =>({
      visible
    }));
    this.setState({
      nickname: row.nickname,
      banners: row.banners,
      rate: row.rate,
      start_time: row.start_time,
      end_time: row.end_time,
      tags: row.tags,
      phone: row.phone,
      address: row.address,
      latitude: row.latitude,
      longitude: row.longitude,
      id: row.id
    });
  }

  componentDidMount() {
    this.fetch();
  }

  handleTableChange = (pagination: any, filters: any, sorter: any) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters
    });
  };

  fetch = (params = {}) => {
    this.setState({ loading: true });
    fetchUsers({
      results: 10,
      ...params
    }).then((res) => {
      const data = res.data.items;
      const pagination = { ...this.state.pagination };
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = res.data.count;
      this.setState({
        loading: false,
        data,
        pagination
      });
    });
  };

  handleFormCancel()
  {
    const {visible} = this.state;
    this.setState({
      visible: !visible
    });
  }

  onEditFinshed(newItem: ComponentState)
  {
    const index = this.state.data.findIndex((item: ComponentState) => item.id === newItem.id );
    const items = (this.state.data as Array<ComponentState>).slice();
    items[index] = {...items[index], ...{...newItem}};
    message.success('修改成功');
    this.setState( {data: items} );

    this.setState(() => ({visible: false}));
  }

  render() {
    return (
      <>
        <Table
          columns={this.columns}
          rowKey={record => record.id}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
        />
        <Modal
          title='门店编辑'
          visible={this.state.visible}
          centered
          footer={null}
          onCancel={() => this.handleFormCancel()}
        >
          <EditFormRender
            nickname={this.state.nickname}
            banners={this.state.banners}
            rate={this.state.rate}
            start_time={this.state.start_time}
            end_time={this.state.end_time}
            tags={this.state.tags}
            phone={this.state.phone}
            address={this.state.address}
            latitude={this.state.latitude}
            longitude={this.state.longitude}
            id={this.state.id}
            onSave={(params) => this.onEditFinshed(params)}
          />
        </Modal>
      </>
    );
  }
}

const TableRender  = () => (
  <div className={styles.container}>
    <div id="components-table-demo-ajax">
      <App />
    </div>
  </div>
);

export default TableRender;
