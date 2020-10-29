import request, {ResponseState} from '@/utils/request';

export interface UpdateParamsState {
  id: number;
  nickname: string;
  rate: number;
  tags?: string;
  phone: string;
  address: string;
  latitude: string;
  longitude: string;
  start_time: string;
  end_time: string;
  banners: string;
  password?: string;
}

export interface FetchShopNicknamesItem {
  id: number;
  nickname: string;
}

export interface FetchShopNicknamesState extends ResponseState{
  data: Array<FetchShopNicknamesItem>
}

export async function query(): Promise<any> {
  return request('/api/users');
}
export async function queryCurrent(): Promise<any> {
  return request('/users/me');
}
export interface ItemState{
  address: string;
  created_at: string;
  start_time: string;
  end_time: string;
  id: number;
  is_disable: number;
  latitude: string;
  longitude: string;
  nickname: string;
  phone: string;
  rate: number;
  tags: Array<string>;
  username: string;
  banners: Array<{id: number; url: string}>
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}


// 添加门店
export async function createUserRequest(data: any) {
  const response = request('/users', {
    method: 'POST',
    data
  });
  return response;
}

// 门店列表
export async function fetchUsers(params: any)
{
  return request('/users', {
    method: 'GET',
    params
  });
}

export const updateDisable = async (params: {id: number; isDisable: boolean}) => {
  return request(
    `/users/${params.id}/isDisable`,
    {
      method: 'PUT',
      params: {isDisable: params.isDisable ? 1 : 0}
    }
  );
};

// 删除门店图片
export const deleteUserBanner = async (id: number) => {
  return request(
    `/userBanners/${id}`,
    {
      method: 'DELETE'
    }
  );
}

// 更新门店
export const userUpdate = async (params: UpdateParamsState ) => {
  return request(`/users/${params.id}`, {
    method: 'PATCH',
    params
  });
}

// 获取门店列表
export const fetchShopNicknames = async () : Promise<FetchShopNicknamesState> => {
  return request('/users/shopNames', {
    method: 'GET'
  });
};

