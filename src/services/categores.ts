import request from '@/utils/request';

// 获取车辆分类
export async function fetchCategores() {
  return request('/management/categores', {
    method: 'GET',
  });
}

// 编辑分类
export async function updateCategory(params: { id: number; name: string }) {
  return request(`/management/categores/${params.id}`, {
    method: 'PATCH',
    params,
  });
}

// 添加分类
export async function createCategores(params: { name: string }) {
  return request('/management/categores', {
    method: 'POST',
    params,
  });
}
