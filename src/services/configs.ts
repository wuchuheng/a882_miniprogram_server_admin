import request, {ResponseState} from '@/utils/request'

interface FetchListState {
  success: boolean;
  data: Array<{
    id: number;
    name: string;
    value: string;
  }>
}

/**
 * 配置列表
 */
export async function fetchList()
{
  const response = request('/configs') as Promise<FetchListState>
  return response;
}

/**
 * 获取单个配置
 */
export interface ConfigImgState {
  id: number;
  url: string
}

export interface  FetchOneDiyResponseState<T> extends ResponseState {
  data: T
}
export const fetchOne = async <T = ConfigImgState>(key: string): Promise<FetchOneDiyResponseState<T> > => {
  return request(`/configs/${key}`);
};

/**
 *  更新
 * @param params
 */
export const update = async (params: {key: string; value: string}) => {
  return request(`/configs/${params.key}`, {
    method: 'PATCH',
    params: {value: params.value}
  });
};
