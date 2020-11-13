import {CreateParamsState} from "@/services/coupons";

export interface PropsState {
  onFinish?: (params: CreateParamsState) => void;
}
