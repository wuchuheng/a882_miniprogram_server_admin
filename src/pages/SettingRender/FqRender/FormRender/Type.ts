import {ItemState} from '@/services/fq';

export interface BaseState {
  mode: 'edit' | 'add';
}

export interface PropsState {
  id?: number;
  orderNo?: number;
  title?: string;
  content?: string;
  onFinish?: (params: ItemState) => void;
}
