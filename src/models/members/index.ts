import {MembersModelType} from "./Type";
import { ConnectState } from "@/models/connect";
import {history} from "@@/core/history";

export {StateType} from './Type';

const MembersModel: MembersModelType = {
  namespace: 'members',
  state: {
    currentMember: undefined
  },
  effects: {
    * showOneMember({payload}, {put, select}) {
        const members = yield select((state: ConnectState) => state.members );
        yield put({
          type: 'save',
          payload: {...members, currentMember: payload}
        });
    }
  },
  reducers: {
    save(state, {payload}) {
      return {...state, ...payload};
    }
  }
};

export default MembersModel;
