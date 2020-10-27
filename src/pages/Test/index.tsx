import React from 'react';
import {fetchList} from "@/services/configs";

export default () => {
  // request('https://restapi.amap.com/v3/geocode/regeo?key=b9ec8422cefaed1483796733ed761921&location=116.5477538,23.65652384');
  fetchList().then(res => {
    const  index = res.data.findIndex(item => {
      return item.name === 'AMAP_KEY'
    });

  })
  return <></>;
};
