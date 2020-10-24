import request from '@/utils/request';


export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return request('/users/me');
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}

// 添加门店
export async function createUserRequest(data: any) {
  const response = request('/users', {
    method: 'POST',
    data
  });
  return response;
}
