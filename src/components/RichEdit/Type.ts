export interface PropsState {
  content?: string;
  onChange?: (params: string) => void;
}

export interface BaseState {
  editorState: any;
  prevContent: string;
}
