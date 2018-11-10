// @flow
import { type Node } from 'react';

export type NavGroupItem = {
  to: string,
  title: string,
  isSelected?: (string, string) => boolean,
  icon?: Node,
  items?: Array<NavGroup>,
};

export type NavGroup = {
  title?: string,
  items: Array<NavGroupItem>,
};

export type File = {
  type: 'file',
  id: string,
  exports: () => Promise<Object>,
  contents: () => Promise<string>,
};

export type Directory = {
  type: 'dir',
  id: string,
  children: Array<File | Directory>,
};

export type RouterMatch = {
  params: {
    [key: string]: string,
  },
};
