import request, {ResponseState} from "@/utils/request";

export interface ItemState {
  id: number;
  title: string;
  content: string;
}
export interface FetchListResponse extends ResponseState{
  data: {
    items: Array<ItemState>;
    total:number;
  }
}

export const fetchList = async (params: {result: number; page: number}) : Promise<FetchListResponse>=> {
  return request('/clauses', {
    method: 'GET',
    params
  });
};

export const update = async (params: {id: number; content: string}) => {
  return request(`/clauses/${params.id}`, {
    method: 'POST',
    data: {content: params.content}
  });
}
