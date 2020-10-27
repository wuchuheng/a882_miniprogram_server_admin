import request from '@/utils/request'

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
