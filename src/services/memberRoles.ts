import request, {ResponseState} from "@/utils/request";

export interface Itemstate {
  id: number;
  name: string;
}
interface FetchAllResponseState extends ResponseState{
  data: Array<Itemstate>
}
export const fetchAll = (): Promise<FetchAllResponseState> => {
  return request('/memberRoles');
};
