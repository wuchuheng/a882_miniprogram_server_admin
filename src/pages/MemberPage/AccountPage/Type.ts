export type CurrentShowState = "base" | "coupons" | "orders" | "violations" | "promotion" ;

export interface CurrentShowMapToNameState extends Record<CurrentShowState, string> {};
