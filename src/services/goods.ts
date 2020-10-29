import request, {ResponseState} from '@/utils/request';

export interface CreateState {
  bannerId: number;
  baseCost: number;
  brandId: number;
  categoryId: number;
  cost: number;
  insuranceCost: number;
  name: string;
  pledgeCost: number;
  serviceCost: number;
  shopIds?: Array<string>;
  status: boolean;
  tagIds: Array<number>;
  total: number;
}
export interface  FetchStatusState {
  total: number;
  onLineTotal: number;
  offLineTotal: number;
}

export interface FetchSTatusResponseState extends ResponseState{
  data: FetchStatusState
}

export interface UserState { id: number; nickname: string }
export interface CategoryState { id:number; name: string; };
export interface BrandState extends CategoryState{};
export type  TagsState = Array<{
  id: number;
  name: string;
}>
export interface BannerState{
  id: number;
  url: string
}

export interface FetchItemState {
  "id": number;
  "name": string;
  "cost": number;
  "total": number;
  "status": boolean;
  "insurance_cost": number;
  "base_cost": number;
  "service_cost": number;
  "pledge_cost": number;
  "created_at": string;
  "tags": TagsState;
  "category": CategoryState;
  "user": UserState;
  "brand": {id: number; name: string};
  "banner": BannerState;
}

export interface FetchResponseState extends ResponseState {
  data: {
    items: Array<FetchItemState>;
    total: number;
  }
}

/**
 * 创建
 * @param params
 */
export const create = async (data: CreateState) => {
  const {
    bannerId,
    baseCost,
    brandId,
    categoryId,
    insuranceCost,
    pledgeCost,
    serviceCost,
    shopIds,
    tagIds,
    ...otherData
  } = data;

  /* eslint-disable */
  const banner_id = bannerId;
  const base_cost = baseCost;
  const category_id =categoryId;
  const insurance_cost = insuranceCost;
  const pledge_cost = pledgeCost;
  const service_cost = serviceCost;
  const shop_ids =  shopIds ? {shop_ids: shopIds.join(',') } : {};
  const tag_ids = tagIds.join(',');
  const brand_id = brandId;
  /* eslint-enable */

  const newData = {
    ...otherData,
    banner_id,
    base_cost,
    category_id,
    insurance_cost,
    pledge_cost,
    service_cost,
    tag_ids,
    brand_id
  };

  return request('/goods', {
    method: 'POST',
    data: shopIds ? {...newData, ...shop_ids}  : newData
  });
};

export const fetch = async (params: {result: number; page: number;}) : Promise<FetchResponseState> => {
  return request('/goods', {
    method: 'GET',
    params
  });
}

export const fetchStatus = async () : Promise<FetchSTatusResponseState> => {
  return request('/goods/status', {
    method: 'GET'
  })
}
