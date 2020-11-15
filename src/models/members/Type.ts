import {Effect, Reducer} from "@@/plugin-dva/connect";
import {ItemState} from '@/services/members'

export {ItemState};

export interface StateType {
  currentMember: ItemState | undefined
}

export interface MembersModelType {
  namespace: string;
  state: StateType;
  effects: {
    showOneMember: Effect;
  },
  reducers: {
    save: Reducer<StateType>;
  }
}
