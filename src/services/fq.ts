import request, {PageRequestParamsState, ResponseState} from "@/utils/request";

export interface ItemState {
  id: number;
  title: string;
  content: string;
  orderNo: number;
}

export interface FetchListResponseState extends ResponseState{
  data: {
    items: Array<ItemState>;
    total: number;
  }
}

interface TrueFetchListResponse extends ResponseState{
  data: {
    items: Array<{id: number; title: string; content: string; order_no: number;}>
    total: number;
  }
}

export const fetchList = async (params: PageRequestParamsState): Promise<FetchListResponseState> => {
  return new Promise((resolve) => {
    request('/fq', {
      method: 'GET',
      params
    }).then((res: TrueFetchListResponse) => {
        const newItems = res.data.items.map(item => {
          const {id, title, content, order_no} = item;
          return {id, title, content, orderNo: order_no};
        });
        resolve({...res, data: {...res.data, items: newItems}});
    });
  });
}

export interface CreateParamsState{
  title: string;
  content: string;
  orderNo: number;
}

interface CreateResponse extends ResponseState{
  data: {
    id: number
  }
}
export const create = async (params: CreateParamsState): Promise<CreateResponse> => {
  const mapParams = (() => {
    const {title, content} = params;
    return {title, content, order_no: params.orderNo};
  })();
  return request('/fq', {
    method: 'POST',
    data: mapParams
  });
};

export const destroy = async (id: number) => {
  return request(`/fq/${id}`, {
      method: 'DELETE'
  })
}

export const update = async (params: ItemState): Promise<ResponseState> => {
  const {orderNo, id, ...otherParams} = params;
  return request(`/fq/${id}`, {
    method: 'PATCH',
    params: {...otherParams, order_no: orderNo}
  });
};
