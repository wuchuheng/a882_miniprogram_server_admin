export interface HandelImgIdsChangeState{
  id: number; url: string
}

export interface PropsState {
  handelImgIdsChange: (params: Array<HandelImgIdsChangeState> ) => void;
  banners?: Array<HandelImgIdsChangeState>
  handelImgDelete?: (id: number) => void;
}

export interface  ImgItemState {
  uid: string;
  name: string;
  status: string;
  url: string
}
