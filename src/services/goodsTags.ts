import request from  '@/utils/request';
// 获取标签列表
export async function fetchAll()
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
