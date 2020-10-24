import {Effect, Reducer} from "@@/plugin-dva/connect";

export interface ShopInfoState {
  nickname: string;
  phone: string;
  tags: Array<string>;
  rate: number;
  startTime: string;
  endTime: string;
  address: string;
  latitude: number;
  longitude: number;
  bannerIds: Array<{
    id: number;
    url: string
  }>;
}

export interface UserInfoState {
  username: string;
  password: string;
}

export interface StateType {
  currentStep: number;
  createUserInfo: UserInfoState & ShopInfoState
}

export interface StoresModelType {
  namespace: string;
  state: StateType;
  effects: {
    resetCreate: Effect;
    toNextStep: Effect;
    toPrevStep: Effect;
    createStep1: Effect;
    createStep2: Effect;
  },
  reducers: {
    save: Reducer<StateType>;
  }
}
