export interface ImgState {
  id: number;
  url: string;
}

export interface PropsState  {
  aspect? : number;
  imgUrl?: ImgState;
  onChange?: (params: ImgState) => void;
}
