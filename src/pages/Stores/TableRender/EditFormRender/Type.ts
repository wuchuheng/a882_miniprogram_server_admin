export interface  ComponentProps {
  nickname: string;
  banners: Array<{id: number; url: string}>;
  rate: number;
  start_time: string;
  end_time: string;
  tags: Array<string>;
  phone: string;
  address: string;
  latitude: string;
  longitude: string;
  id: number;
}

export interface PropsState extends ComponentProps{
  onSave: (parsms: ComponentProps) => void;
}
