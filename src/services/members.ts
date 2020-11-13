import request, {PageRequestParamsState, ResponseState} from '@/utils/request'
import ex from "umi/dist";

export interface ItemState {
  id: number;
  city: string;
  country: string;
  gender: {
    id: number;
    name: string;
  },
  nickName: string;
  province: string;
  phone: string;
  platform: 'wechat' | 'alipay';
  memberRole: {
    id: number;
    name: string;
  },
  avatarUrl: string;
  createdAt: string;
}

/**
 * 获取会员列表
 */
export interface FetchListResponse extends ResponseState{
  data: {
    items: Array<ItemState>;
    total: number;
  }
}
export const fetchList = (params: PageRequestParamsState): Promise<FetchListResponse> => {
  return request('/members', {
    method: 'GET',
    params
  });
};

/**
 * 编辑
 * @param params
 */
export const edit = (params: {memberRoleId: number; phone: string, id: number}) => {
  const {id, ...other} = params;
  return request(`/members/${id}`, {
    method: 'PATCH',
    params: other
  });
};

