import {ItemState} from "@/services/members";

export interface PropsState extends ItemState{
  onFinish?: (params: ItemState) => void;
}
