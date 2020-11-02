import {ItemState} from "@/services/slide";
import {ImgState as UploadImgState} from "@/components/UploadOneImage";


export interface PropsState {
  editItem?: ItemState
  onChange?: (params: ItemState) => void;
}

export interface OnFinishParamsState {
  slide: UploadImgState;
  detail: UploadImgState;
}
