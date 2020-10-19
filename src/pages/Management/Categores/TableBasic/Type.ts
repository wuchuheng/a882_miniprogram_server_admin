import React from 'react';

export interface ItemState {
  key: string;
  name: string;
  id: number;
}

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: ItemState;
  index: number;
  children: React.ReactNode;
}
