export type File = {
  type: 'file',
  id: string,
  path: string,
};

export type Directory = {
  type: 'dir',
  id: string,
  path: string,
  children: Array<File | Directory>,
};

export type LoaderOptions = {
  include: Array<string>,
  exclude: Array<string>,
  configProps: Array<string>,
  debug: boolean,
};
