export interface OnFinishState {
  id: number;
  content: string;
}
export interface PropsState {
  id: number;
  title: string;
  content: string;
  onFinish?: (params: OnFinishState) => void;
}

export interface BaseState {
  editorState: any;
  prevContent: string;
}
