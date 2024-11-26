import { MacroProvider } from '@uidu/editor-common/provider-factory';
import { EmojiProvider } from '@uidu/emoji';
import { Node as PMNode } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import EditorActions from '../../../../actions';
import { Command, CommandDispatch } from '../../../../types/command';
import { MenuItem } from '../../../../ui/DropdownMenu/types';
import { INPUT_METHOD } from '../../../analytics/types';
import { BlockType } from '../../../block-type/types';

export interface Props {
  buttons: number;
  isReducedSpacing: boolean;
  isDisabled?: boolean;
  isTypeAheadAllowed?: boolean;
  editorView: EditorView;
  editorActions?: EditorActions;
  tableSupported?: boolean;
  actionSupported?: boolean;
  decisionSupported?: boolean;
  insertMentionQuery?: () => void;
  mediaUploadsEnabled?: boolean;
  mediaSupported?: boolean;
  imageUploadSupported?: boolean;
  imageUploadEnabled?: boolean;
  handleImageUpload?: (event?: Event) => Command;
  dateEnabled?: boolean;
  horizontalRuleEnabled?: boolean;
  placeholderTextEnabled?: boolean;
  layoutSectionEnabled?: boolean;
  expandEnabled?: boolean;
  emojiProvider?: Promise<EmojiProvider>;
  availableWrapperBlockTypes?: BlockType[];
  linkSupported?: boolean;
  linkDisabled?: boolean;
  videoEnabled?: boolean;
  emojiDisabled?: boolean;
  nativeStatusSupported?: boolean;
  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
  popupsScrollableElement?: HTMLElement;
  macroProvider?: MacroProvider | null;
  insertMenuItems?: MenuItem[];
  onShowMediaPicker?: () => void;
  onInsertBlockType?: (name: string) => Command;
  onInsertMacroFromMacroBrowser?: (
    macroProvider: MacroProvider,
    node?: PMNode,
    isEditing?: boolean,
  ) => (state: EditorState, dispatch: CommandDispatch) => void;
}

export interface State {
  isOpen: boolean;
  emojiPickerOpen: boolean;
}

export type TOOLBAR_MENU_TYPE = INPUT_METHOD.TOOLBAR | INPUT_METHOD.INSERT_MENU;
