import { UIAEP, TrackAEP } from './events';
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  INPUT_METHOD,
} from './enums';

export enum PLATFORMS {
  NATIVE = 'mobileNative',
  HYBRID = 'mobileHybrid',
  WEB = 'web',
}

export enum FULL_WIDTH_MODE {
  FIXED_WIDTH = 'fixedWidth',
  FULL_WIDTH = 'fullWidth',
}

type ButtonAEP<ActionSubjectID, Attributes> = UIAEP<
  ACTION.CLICKED,
  ACTION_SUBJECT.BUTTON,
  ActionSubjectID,
  Attributes
>;

type PickerAEP<ActionSubjectID, Attributes> = UIAEP<
  ACTION.OPENED,
  ACTION_SUBJECT.PICKER,
  ActionSubjectID,
  Attributes
>;

type TypeAheadAEP<ActionSubjectID, Attributes> = UIAEP<
  ACTION.INVOKED,
  ACTION_SUBJECT.TYPEAHEAD,
  ActionSubjectID,
  Attributes
>;

type EditorStartAEP = UIAEP<
  ACTION.STARTED,
  ACTION_SUBJECT.EDITOR,
  undefined,
  { platform: PLATFORMS.NATIVE | PLATFORMS.HYBRID | PLATFORMS.WEB }
>;

type EditorStopAEP = UIAEP<
  ACTION.STOPPED,
  ACTION_SUBJECT.EDITOR,
  ACTION_SUBJECT_ID.SAVE | ACTION_SUBJECT_ID.CANCEL,
  {
    inputMethod: INPUT_METHOD.TOOLBAR | INPUT_METHOD.SHORTCUT;
    documentSize: number;
    nodeCount?: {
      tables: number;
      headings: number;
      lists: number;
      mediaSingles: number;
      mediaGroups: number;
      panels: number;
      extensions: number;
      decisions: number;
      actions: number;
      codeBlocks: number;
    };
  }
>;

type AnnotateButtonAEP = UIAEP<
  ACTION.CLICKED,
  ACTION_SUBJECT.MEDIA,
  ACTION_SUBJECT_ID.ANNOTATE_BUTTON,
  undefined
>;

type ButtonHelpAEP = ButtonAEP<
  ACTION_SUBJECT_ID.BUTTON_HELP,
  { inputMethod: INPUT_METHOD.SHORTCUT | INPUT_METHOD.TOOLBAR }
>;

type ButtonFeedbackAEP = ButtonAEP<
  ACTION_SUBJECT_ID.BUTTON_FEEDBACK,
  undefined
>;

type PickerEmojiAEP = PickerAEP<
  ACTION_SUBJECT_ID.PICKER_EMOJI,
  { inputMethod: INPUT_METHOD.TOOLBAR | INPUT_METHOD.INSERT_MENU }
>;

type PickerImageAEP = PickerAEP<
  ACTION_SUBJECT_ID.PICKER_CLOUD,
  {
    inputMethod:
      | INPUT_METHOD.TOOLBAR
      | INPUT_METHOD.QUICK_INSERT
      | INPUT_METHOD.INSERT_MENU;
  }
>;

type TypeAheadQuickInsertAEP = TypeAheadAEP<
  ACTION_SUBJECT_ID.TYPEAHEAD_QUICK_INSERT,
  { inputMethod: INPUT_METHOD.KEYBOARD }
>;

type TypeAheadEmojiAEP = TypeAheadAEP<
  ACTION_SUBJECT_ID.TYPEAHEAD_EMOJI,
  { inputMethod: INPUT_METHOD.QUICK_INSERT | INPUT_METHOD.KEYBOARD }
>;

type TypeAheadLinkAEP = TypeAheadAEP<
  ACTION_SUBJECT_ID.TYPEAHEAD_LINK,
  {
    inputMethod:
      | INPUT_METHOD.TOOLBAR
      | INPUT_METHOD.INSERT_MENU
      | INPUT_METHOD.QUICK_INSERT
      | INPUT_METHOD.SHORTCUT;
  }
>;

type TypeAheadMentionAEP = TypeAheadAEP<
  ACTION_SUBJECT_ID.TYPEAHEAD_MENTION,
  {
    inputMethod:
      | INPUT_METHOD.TOOLBAR
      | INPUT_METHOD.INSERT_MENU
      | INPUT_METHOD.QUICK_INSERT
      | INPUT_METHOD.KEYBOARD;
  }
>;

type FullWidthModeAEP = TrackAEP<
  ACTION.CHANGED_FULL_WIDTH_MODE,
  ACTION_SUBJECT.EDITOR,
  undefined,
  {
    previousMode: FULL_WIDTH_MODE;
    newMode: FULL_WIDTH_MODE;
  }
>;

export type GeneralEventPayload =
  | EditorStartAEP
  | EditorStopAEP
  | AnnotateButtonAEP
  | ButtonHelpAEP
  | ButtonFeedbackAEP
  | PickerEmojiAEP
  | PickerImageAEP
  | TypeAheadQuickInsertAEP
  | TypeAheadEmojiAEP
  | TypeAheadLinkAEP
  | TypeAheadMentionAEP
  | FullWidthModeAEP;
