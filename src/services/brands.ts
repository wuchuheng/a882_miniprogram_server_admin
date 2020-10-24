import request from '@/utils/request';

// 品牌列表
export async function fetchBrands() {
  return request('/management/brands', {
    method: 'GET',
  });
}

// 编辑
export async function update(params: { name: string; id: number }) {
  return request(`/management/brands/${params.id}`, {
    method: 'PATCH',
    params: { name: params.name },
  });
}

// 创建
export async function create(params: { name: string }) {
  return request('/management/brands',
    {
    method: 'POST',
    params: { name: params.name },
  });
}
