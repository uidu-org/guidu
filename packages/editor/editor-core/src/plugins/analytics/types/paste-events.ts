import { TrackAEP } from '@uidu/editor-common';
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  INPUT_METHOD,
} from './enums';

export const PasteTypes: { [type: string]: PasteType } = {
  richText: 'richText',
  plain: 'plain',
  markdown: 'markdown',
  binary: 'binary',
};

export type PasteType = 'richText' | 'plain' | 'markdown' | 'binary';

export const PasteSources: { [type: string]: PasteSource } = {
  fabricEditor: 'fabric-editor',
  applePages: 'apple-pages',
  googleSpreadsheets: 'google-spreadsheets',
  googleDocs: 'google-docs',
  microsoftExcel: 'microsoft-excel',
  microsoftWord: 'microsoft-word',
  dropboxPaper: 'dropbox-paper',
  uncategorized: 'uncategorized',
};

export type PasteSource =
  | 'fabric-editor'
  | 'apple-pages'
  | 'google-spreadsheets'
  | 'google-docs'
  | 'microsoft-excel'
  | 'microsoft-word'
  | 'dropbox-paper'
  | 'uncategorized';

export const PasteContents: { [P in PasteContent]: P } = {
  text: 'text',
  url: 'url',
  code: 'code',
  mediaSingle: 'mediaSingle',
  mediaCard: 'mediaCard',
  tableCells: 'tableCells',
  table: 'table',
  expand: 'expand',
  nestedExpand: 'nestedExpand',
  mixed: 'mixed',
  blockquote: 'blockquote',
  blockCard: 'blockCard',
  bodiedExtension: 'bodiedExtension',
  bulletList: 'bulletList',
  codeBlock: 'codeBlock',
  extension: 'extension',
  heading: 'heading',
  orderedList: 'orderedList',
  panel: 'panel',
  rule: 'rule',
  tableHeader: 'tableHeader',
  tableRow: 'tableRow',
  uncategorized: 'uncategorized',
};

export type PasteContent =
  | 'text'
  | 'url'
  | 'code'
  | 'mediaSingle'
  | 'blockquote'
  | 'blockCard'
  | 'bodiedExtension'
  | 'bulletList'
  | 'codeBlock'
  | 'extension'
  | 'heading'
  | 'mediaCard'
  | 'tableCells'
  | 'table'
  | 'expand'
  | 'nestedExpand'
  | 'orderedList'
  | 'panel'
  | 'rule'
  | 'tableHeader'
  | 'tableRow'
  | 'uncategorized'
  | 'mixed';

export type PASTE_ACTION_SUBJECT_ID =
  | ACTION_SUBJECT_ID.PASTE_BLOCKQUOTE
  | ACTION_SUBJECT_ID.PASTE_BLOCK_CARD
  | ACTION_SUBJECT_ID.PASTE_BODIED_EXTENSION
  | ACTION_SUBJECT_ID.PASTE_BULLET_LIST
  | ACTION_SUBJECT_ID.PASTE_CODE_BLOCK
  | ACTION_SUBJECT_ID.PASTE_DECISION_LIST
  | ACTION_SUBJECT_ID.PASTE_EXTENSION
  | ACTION_SUBJECT_ID.PASTE_HEADING
  | ACTION_SUBJECT_ID.PASTE_MEDIA_GROUP
  | ACTION_SUBJECT_ID.PASTE_MEDIA_SINGLE
  | ACTION_SUBJECT_ID.PASTE_ORDERED_LIST
  | ACTION_SUBJECT_ID.PASTE_PANEL
  | ACTION_SUBJECT_ID.PASTE_PARAGRAPH
  | ACTION_SUBJECT_ID.PASTE_RULE
  | ACTION_SUBJECT_ID.PASTE_TABLE
  | ACTION_SUBJECT_ID.PASTE_TABLE_CELL
  | ACTION_SUBJECT_ID.PASTE_TABLE_HEADER
  | ACTION_SUBJECT_ID.PASTE_TABLE_ROW
  | ACTION_SUBJECT_ID.PASTE_TASK_LIST
  | ACTION_SUBJECT_ID.PASTE_EXPAND
  | ACTION_SUBJECT_ID.PASTE_NESTED_EXPAND;

type PasteBaseAEP<Action, Attributes, NonPrivacySafeAttributes> = TrackAEP<
  Action,
  ACTION_SUBJECT.DOCUMENT,
  PASTE_ACTION_SUBJECT_ID,
  Attributes,
  NonPrivacySafeAttributes
>;

type PasteAEP = PasteBaseAEP<
  ACTION.PASTED,
  {
    inputMethod: INPUT_METHOD.KEYBOARD;
    type: PasteType;
    content: PasteContent;
    source?: PasteSource;
    pasteSize: number;
  },
  | {
      linkDomain?: string[];
    }
  | undefined
>;

type PasteAsPlainAEP = PasteBaseAEP<
  ACTION.PASTED_AS_PLAIN,
  {
    inputMethod: string;
    pasteSize: number;
  },
  undefined
>;

export type PasteEventPayload = PasteAEP | PasteAsPlainAEP;
