import {ShopInfoState, StoresModelType, UserInfoState} from "@/models/Stores/Type";
import {ConnectState} from "@/models/connect";
import {createUserRequest} from "@/services/user";

export {StateType, ShopInfoState, UserInfoState} from './Type';

const createRestInfo = {
  currentStep: 0,
  createUserInfo: {
    username: '',
    password: '',
    nickname:'',
    phone: '',
    tags: [],
    rate: 0,
    startTime: '',
    endTime: '',
    address: '',
    latitude: 0,
    longitude: 0,
    bannerIds: []
  }
};

const StoresModel: StoresModelType = {
  namespace: 'stores',
  state: {
    ...createRestInfo
  },
  effects: {
    * resetCreate(_, { put, select}) {
      const resetInfo = createRestInfo;
      const storeState = yield select((state: ConnectState) => state.stores);
      yield put({
        type: 'save',
        payload: {
          ...storeState,
          ...resetInfo
        }
      });
    },
    * createStep1({payload}, { put, select }) {
      const createUserInfo = yield select((state: ConnectState) => state.stores.createUserInfo);
      const storeState = yield select((state: ConnectState) => state.stores);
      yield put({
        type: 'save',
        payload: {
          ...storeState,
          createUserInfo: {
            ...createUserInfo,
            username: payload.username,
            password: payload.password
          }
        }
      });
    },
    * createStep2({payload}, { put, select, call }) {
      const createUserInfo = yield select((state: ConnectState) => state.stores.createUserInfo );
      const newCreateUserInfo: ShopInfoState & UserInfoState = {
        ...createUserInfo,
        ...payload
      };
      const newBannerIds = newCreateUserInfo.bannerIds.map(item => item.id);
      const response = yield call(createUserRequest, {
        ...newCreateUserInfo,
        bannerIds: newBannerIds
      });
      if (response.success) {
        yield put({
          type: 'save',
          payload: {
            currentStep: 2,
            createUserInfo: newCreateUserInfo
          }
        });
      }
    },
    * toPrevStep(_, { put, select}) {
      const currentStep =  yield select((state: ConnectState) => state.stores.currentStep);
      yield put({
        type: 'save',
        payload: {
          currentStep: currentStep - 1
        }
      });
    },

    * toNextStep(_, { put, select}) {

       const currentStep =  yield select((state: ConnectState) => state.stores.currentStep);
       yield put({
         type: 'save',
         payload: {
           currentStep: currentStep + 1
         }
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
  }
};
export default StoresModel;
