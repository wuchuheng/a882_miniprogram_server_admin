export interface FormState {
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
