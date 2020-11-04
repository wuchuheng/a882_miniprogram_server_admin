import {ItemState} from "@/services/fq";

export interface PropsState extends ItemState{
  onFinish?: (params: ItemState) => void;
}
