import React, {useState} from "react";
import styles from "@/pages/Management/OnlineRender/index.less";
import {Input, Radio} from "antd";
import {PropsState, StatusState} from './Type';
import {RadioChangeEvent} from "antd/es/radio";

const SearchRender = (props: PropsState) => {
  const [queryStatus, setQueryStatus] = useState<StatusState>('all');
  const onSearch = (name: string) => {
    if (props.onChange) {
      const status = queryStatus !== 'all' ? {status: queryStatus}  : {};
      props.onChange({
        name,
        ...status
      });
    }
  };
  const onChangeStatus = (status: RadioChangeEvent) => {
    const value = status.target.value as StatusState;
    setQueryStatus(value);
  };
  return (
    <div className={styles.extraContent}>
      <Radio.Group
        defaultValue={queryStatus}
        onChange={onChangeStatus}
      >
        <Radio.Button value="all">全部</Radio.Button>
        <Radio.Button value>上架</Radio.Button>
        <Radio.Button
          value={false}
        >下架</Radio.Button>
      </Radio.Group>
      <Input.Search
        className={styles.extraContentSearch}
        placeholder="请输入商品名"
        onSearch={onSearch} />
    </div>
  );
};

export default SearchRender;
