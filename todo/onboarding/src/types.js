// @flow
import { type Node } from 'react';

export type ActionsType = Array<{
  onClick?: any => void,
  key?: string,
  text?: Node,
}>;
