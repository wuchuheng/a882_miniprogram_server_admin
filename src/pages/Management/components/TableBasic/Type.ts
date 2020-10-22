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

export interface EditableProps {
  title: string;
  columName: string;
  handleFetchAll: () => Promise<{data: Array<{id: number; name: string}>}>;
  handleCreate: (params: {name: string}) => Promise<{success: boolean}>;
  handleEdit: (params: {id: number; name: string}) =>  Promise<{success: boolean}>;

}
