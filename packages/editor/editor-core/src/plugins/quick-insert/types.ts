import { Node } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';
import { IntlShape } from 'react-intl';
import { TypeAheadItem } from '../type-ahead/types';

export type QuickInsertActionInsert = (
  node?: Node | Record<string, any> | string,
  opts?: { selectInlineNode?: boolean },
) => Transaction;

export type QuickInsertItem = TypeAheadItem & {
  keywords?: Array<string>;
  priority?: number;
  action: (
    insert: QuickInsertActionInsert,
    state: EditorState,
  ) => Transaction | false;
};

export type QuickInsertProvider = {
  getItems: () => Promise<Array<QuickInsertItem>>;
};

export type QuickInsertOptions =
  | boolean
  | {
      provider: Promise<QuickInsertProvider>;
    };

export type QuickInsertHandler =
  | Array<QuickInsertItem>
  | ((intl: IntlShape) => Array<QuickInsertItem>);

export type IconProps = {
  label?: string;
};
