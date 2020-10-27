import { Map } from 'react-amap';
import React from "react";
import DiyMapRender from "@/pages/Stores/components/MarkerRender/DiyMapRender";
import {PropsState, BaseState} from './Type';
import {fetchList} from "@/services/configs";
import {request} from "umi";
import {fetchIP} from "@/services/ip";

class MarkerRender extends React.Component<PropsState, any> {
  amapEvents: any;

  markerEvents: any;

  state: BaseState = {
    markerProp: {},
    AMAP_KEY: ''
  };

  // 自动定位
  authLocation()
  {
    fetchList().then(res => {
      const  index = res.data.findIndex(item => {
        return item.name === 'AMAP_KEY'
      });
      const AMAP_KEY = res.data[index].value;
      this.setState({
        AMAP_KEY
      })
      return Promise.resolve(AMAP_KEY);
    }).then(AMAP_KEY => {
      return fetchIP().then(res => {
        return Promise.resolve(res.data.ip);
      }).then(ip => {
        const res = request('https://restapi.amap.com/v3/ip', {
          method: 'GET',
          params: {
            key: AMAP_KEY,
            ip
          }
        });
        return res;
      });
    }).then((res: any)  => {
      const [location, ] = res.rectangle.split(';');
      const[lng, lat]  = location.split(',');
      this.handlePickerLocation({lnglat: {lng, lat}});
    });
  }

  componentDidMount() {
    if (this.props.latitude && this.props.longitude) {
      this.handlePickerLocation({lnglat: {lng: this.props.longitude, lat: this.props.latitude}});
    } else {
      this.authLocation();
    }
  }

  constructor(props: any) {
    super(props);
    this.amapEvents = {
      click: (e: any) => this.handlePickerLocation(e),
    };
    this.markerEvents = {
    }
  }

  handlePickerLocation(e: {lnglat: {lat: string; lng: string;}})
  {
    const latitude = e.lnglat.lat;
    const longitude = e.lnglat.lng;
    this.setState({markerProp: {
        position: {
          latitude,
          longitude
        }
      }});
    this.props.handleSelectLocation({
      latitude,
      longitude
    });
  }

  render() {
    return (
      <>
        <div style={{
          width: '100%',
          height: '250px'
        }}>
          <Map
            events={this.amapEvents}
            amapkey={this.state.AMAP_KEY}
          >
            <DiyMapRender
              {...this.state.markerProp}
              events={this.markerEvents}
            />
          </Map>
        </div>
      </>
    );
  }
}

export default MarkerRender;
