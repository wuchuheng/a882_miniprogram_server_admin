import { Map } from 'react-amap';
import React from "react";
import DiyMapRender from "@/pages/Stores/CreateRender/Step2Render/MarkerRender/DiyMapRender";
import {PropsState, BaseState} from './Type';

class MarkerRender extends React.Component<PropsState, any> {
  amapEvents: any;

  markerEvents: any;

  state: BaseState = {
    markerProp: {},
  };

  constructor(props: any) {
    super(props);
    this.amapEvents = {
      click: (e: any) => this.handlePickerLocation(e),
    };
    this.markerEvents = {
    }
  }

  handlePickerLocation(e: any)
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
            amapkey='b9ec8422cefaed1483796733ed761921'
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
