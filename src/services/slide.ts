import request, {ResponseState} from '@/utils/request';

export interface ItemState{
  id: number;
  slide: {
    id: number;
    url: string;
  }
  detail: {
    id: number;
    url: string;
  }
}

export interface CreatePrams{
  slide_id: number;
  detail_id: number;
}

export interface CreateResponse extends ResponseState{
  data: {id: number}
}

export interface FetchListResponse extends ResponseState{
  data: {
    items: Array<ItemState>;
    total: number;
  }
}

/**
 * 创建
 * @param data
 */
export const create = async (data: CreatePrams): Promise<CreateResponse> => {
  return request('/slides', {
    method: 'POST',
    data
  });
}

export interface FetchListState {
   result: number;
   page: number;
}
export const fetchList = async (params: FetchListState): Promise<FetchListResponse> => {
  return request('/slides', {
    method: 'GET',
    params
  });
}

export const destroy = async (id: number): Promise<ResponseState> => {
  return request(`/slides/${id}`, {
    method: 'DELETE'
  });
}
