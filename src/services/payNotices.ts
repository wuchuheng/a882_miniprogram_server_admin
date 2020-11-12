import request, { ResponseState } from "@/utils/request";

/**
 * 添加相关
 */
export interface CreateParamsState {
  title: string;
  content: number;
  icon: {id: number; url: string}
}
export interface CreateResponseState extends ResponseState{
  id: number
}
export const create = (params: CreateParamsState ): Promise<CreateResponseState> => {
  const {icon, ...other} = params;
  return request('/payNotices', {
    method: 'POST',
    data: {icon: icon.id, ...other}
  });
}

/*
 * 列表单项类型
 */
export interface ItemState extends CreateParamsState{
  id: number;
}
interface FetchAllResponseState  extends  ResponseState{
  data: Array<ItemState>
}
export  const fetcAll = () : Promise<FetchAllResponseState> => {
  return request('/payNotices');
}

// 编辑
export const edit = (params: ItemState) => {
  const {icon, id, ...other} = params;
  return request(`/payNotices/${id}`, {
    method: 'PATCH',
    params: {icon: icon.id, ...other}
  });
};

// 删除
export const destroy = (id: number): Promise<ResponseState> => {
  return request(`/payNotices/${id}`, {
    method: 'DELETE'
  });
}
