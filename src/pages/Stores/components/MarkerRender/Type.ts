export interface PropsState {
  handleSelectLocation:  (params: PositionState) => void;
  latitude?: string;
  longitude?: string;
}

export interface PositionState {
  latitude: number;
  longitude: number;
}

export interface BaseState {
  markerProp: {
    position?: PositionState
  };
  AMAP_KEY: string;
}
