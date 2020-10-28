export interface ImgState {
  id: number;
  url: string;
}

export interface PropsState  {
  imgUrl?: ImgState;
  onChange?: (params: ImgState) => void;
}
