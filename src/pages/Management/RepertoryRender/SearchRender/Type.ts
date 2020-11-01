export interface QueryState {
  status?: boolean;
  name?: string
}
export interface PropsState {
  onChange?: (params: QueryState) => void;
}

export type StatusState = 'all' | boolean;
