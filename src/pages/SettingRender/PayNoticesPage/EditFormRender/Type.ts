import {ItemState} from "@/services/payNotices";

export interface  PropsState  {
  onFinish?: (params: ItemState) => void;
  editItem: ItemState;
}
