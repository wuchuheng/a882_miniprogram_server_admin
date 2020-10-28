import React from 'react';
import {Select} from "antd";

const {Option} = Select;
export default () => {
  const chidren = [];
  for(let i = 0; i < 8; i += 1) {
    chidren.push(<Option key={i} value={i}>{i}</Option>)
  }
  return (
    <>
      <Select>
        {chidren}
      </Select>
    </>
  );
};
