import request from "@/utils/request";

interface FetchIPState {
  success: boolean;
  data: {ip: string}
}

/**
 * 获取本地外网IP
 */
export async function fetchIP() {
  const response = request('/ip',
    {
      method: 'GET'
    }
  ) as Promise<FetchIPState>;
  return response;
}
