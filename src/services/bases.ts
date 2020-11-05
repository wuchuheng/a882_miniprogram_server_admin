import request, {ResponseState} from "@/utils/request";

/**
 * 获取对外公开的信息
 */
export interface FetchAllDataState {
  backLogo: string;
}
export interface FetchAllResponseState extends ResponseState{
  data: FetchAllDataState;
}
interface TrueFetchAllResponseState extends ResponseState {
  data: {
    back_logo: string;
  }
}
export const fetchAll = async (): Promise<FetchAllResponseState> => {
  return new Promise((resolve) => {
    request('/bases', {
      method: 'GET'
    }).then((res: TrueFetchAllResponseState) => {
      const {back_logo, ...other} = res.data;
      resolve({...res, data:{...other, backLogo: back_logo}})
    })
  });
};
