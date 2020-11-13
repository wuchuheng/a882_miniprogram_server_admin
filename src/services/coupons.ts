import request, {ResponseState, PageRequestParamsState} from "@/utils/request";
import {ImgState} from "@/components/UploadOneImage";

export interface Itemstate {
  id: number;
  cost: number;
  name: string;
  des: string;
  expiredDay: number;
  isUse: boolean;
  giveType: 1 | 2;
  banner: ImgState;
  isAlert: boolean;
}

/**
 * 获取优惠卷列表
 */
export  interface FetchListResponseState extends ResponseState{
  data: {
    items: Array<Itemstate>;
    total: number;
  }
}
export interface FetchListParamsState extends PageRequestParamsState{ }
export const fetchList  = (params: FetchListParamsState): Promise<FetchListResponseState>  => {
  return new Promise((resolve) => {
    request('/coupons', {
      method: 'GET',
      params
    }).then((res: any) => {
        const newItems = res.data.items.map((item: any) => {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          const { give_type, is_alert, is_use, ...other } = item;
          return {giveType: give_type, isAlert: is_alert,
            isUse: is_use,
            ...other};
        });
        const newData = {items: newItems, total: res.data.to};
        resolve({...res, data: newData})
    })
  })
}


// 创建
export interface CreateParamsState{
  cost: number;
  name: string;
  des: string;
  expiredDay: number;
  isUse: boolean;
  giveType: 1 | 2;
  banner: ImgState;
  isAlert: boolean;
}
interface CreateResponseState extends ResponseState{
  data: {id: number}
}
export const create = (params: CreateParamsState): Promise<CreateResponseState> => {
  const {
    banner,
    ...other
  } = params;
  return request('/coupons', {
    method: 'POST',
    data: {banner: banner.id, ...other}
  });
};

// 获取全部
interface FetchAllResponseState extends ResponseState{
  data: Array<Itemstate>
}
export const fetchAll = (): Promise<FetchAllResponseState> => {
  return request('/coupons');
}

// 编辑
export const edit = (params: Itemstate): Promise<ResponseState> => {
  const {banner, id, isAlert, isUse, ...other} = params;
  return request(`/coupons/${id}}`, {
    method: 'PATCH',
    params: {...other, banner: banner.id, isAlert: isAlert ? 1 : 0, isUse: isUse ? 1 : 0}
  });
}

// 删除
export const destroy = (id: number): Promise<ResponseState> => {
  return request(`/coupons/${id}`, {
    method: 'DELETE'
  });
}
