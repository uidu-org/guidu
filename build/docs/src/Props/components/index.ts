import { FC } from 'react';
import { default as Description } from './Description';
import { default as Indent } from './Indent';
import { default as Outline } from './Outline';
import { default as Required } from './Required';
import { default as Type, StringType, TypeMeta } from './Type';

const components = {
  Indent,
  Outline,
  Required,
  Type,
  StringType,
  TypeMeta,
  Description,
};

export default components;

export type Components = {
  Indent: FC<any>;
  Outline: FC<any>;
  Required: FC<any>;
  Type: FC<any>;
  StringType: FC<any>;
  TypeMeta: FC<any>;
  Description: FC<any>;
};
