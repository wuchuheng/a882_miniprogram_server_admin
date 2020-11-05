import {Effect, Reducer, Subscription} from "@@/plugin-dva/connect";

export interface StateType {
  backLogo: string;
}

export interface BaseModelType {
  namespace: string;
  state: StateType;
  effects: {
    updateLogo: Effect;
  },
  reducers: {
    save: Reducer<StateType>;
  },
  subscriptions: { setup: Subscription };
}
