export interface PropsState {
  handleSelectLocation:  (params: {
    latitude: number;
    longitude: number;
  }) => void;
}

export interface PositionState {
  latitude: number;
  longitude: number;
}

export interface BaseState {
  markerProp: {
    position?: PositionState
  }
}
