import React, {useEffect} from "react";
import { Marker } from 'react-amap';

const DiyMapRender = (props: any) => {

  useEffect(() => {
    const AMap = window.AMap;
    // eslint-disable-next-line no-underscore-dangle
    const map  = props.__map__;
    const  options = {
      'showButton': true,// 是否显示定位按钮
      'buttonPosition': 'LB',// 定位按钮的位置
      'buttonOffset': new AMap.Pixel(10, 20),// 定位按钮距离对应角落的距离
      'showMarker': true,// 是否显示定位点
      'markerOptions':{// 自定义定位点样式，同Marker的Options
        'offset': new AMap.Pixel(-18, -36),
        'content':'<img src="https://a.amap.com/jsapi_demos/static/resource/img/user.png" style="width:36px;height:36px"/>'
      } ,
      'showCircle': true,// 是否显示定位精度圈
      'circleOptions': {// 定位精度圈的样式
        'strokeColor': '#0093FF',
        'noSelect': true,
        'strokeOpacity': 0.5,
        'strokeWeight': 1,
        'fillColor': '#02B0FF',
        'fillOpacity': 0.25
      }
    };
    AMap.plugin(["AMap.Geolocation"], function() {
      const geolocation = new AMap.Geolocation(options);
      map.addControl(geolocation);
    });
  }, [])

  return (
    <Marker {...props} />
  );
};


export default DiyMapRender;
