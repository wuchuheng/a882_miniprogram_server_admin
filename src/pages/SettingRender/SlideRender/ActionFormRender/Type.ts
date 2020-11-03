import {ImgState as UploadImgState} from "@/components/UploadOneImage";

import {ItemState } from "@/services/slide";

export {ItemState};

export interface PropsState {
  editItem?:  ItemState
  onChange?: (params:ItemState) => void;
  refresh?: false | number;
}

export interface OnFinishParamsState {
  slide: UploadImgState;
  detail: UploadImgState;
}
