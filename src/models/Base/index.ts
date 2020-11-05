import {BaseModelType} from './Type';
import {fetchAll} from "@/services/bases";
import {ConnectState} from '@/models/connect';

export {StateType} from './Type';

const BaseModel:BaseModelType = {
  namespace: 'base',
  state: {
    backLogo: '',
  },
  effects: {
     * updateLogo({payload}, { put, select}) {
        const base = yield select((state: ConnectState) => state.base);
        yield put({
          type: 'save',
          payload: {...base, backLogo: payload.backLogo}
        });
     }
  },
  reducers: {
    save(state, {payload}) {
      return {
        ...state,
        ...payload
      };
    }
  },
  subscriptions: {
    setup({dispatch}): void {
      fetchAll().then((res) => {
        dispatch({
          type: 'updateLogo',
          payload: {...res.data}
        })
      })
    },
  }
}


export default BaseModel;
