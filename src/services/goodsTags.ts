import request, {ResponseState} from  '@/utils/request';


export interface TagItem {
  id: number;
  name: string;
}

export interface FetchAllState extends ResponseState{
  data: Array<TagItem>
}

// 获取标签列表
export async function fetchAll(): Promise<FetchAllState>
{
  return request(
    '/management/goodsTags',
    {method: 'GET'}
  );
}

// 编辑
export async function edit(params: {name: string; id: number})
{
  return request(
    `/management/goodsTags/${params.id}`,
    {
      method: 'PATCH',
      params: {name: params.name}
    }
  );
}

// 创建
export async function create(params: {name: string;})
{
  return request(
    `/management/goodsTags`,
    {
      method: 'POST',
      params: {...params}
    }
  );
}
