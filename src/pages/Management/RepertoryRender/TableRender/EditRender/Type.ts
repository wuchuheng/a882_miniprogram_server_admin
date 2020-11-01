import {
  BannerState,
  CategoryState,
  FetchItemState,
  TagsState
} from "@/services/goods";

export interface OnChangeState {
  "id": number;
  "name": string;
  "cost": number;
  "total": number;
  "insurance_cost": number;
  "base_cost": number;
  "service_cost": number;
  "pledge_cost": number;
  "tags": TagsState;
  "category": CategoryState;
  "brand": {id: number; name: string};
  "banner": BannerState;
}

export interface PropsState extends FetchItemState{
  onChange?: (params: OnChangeState) => void;
}
