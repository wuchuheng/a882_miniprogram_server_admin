import {Itemstate} from "@/services/coupons";

export interface PropsState extends Itemstate{
  onFinish?: (params: Itemstate) => void;
}
