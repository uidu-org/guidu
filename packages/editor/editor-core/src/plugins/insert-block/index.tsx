import { WithProviders } from '@uidu/editor-common';
import * as React from 'react';
import { EditorPlugin } from '../../types';
import { ToolbarSize } from '../../ui/Toolbar';
import WithPluginState from '../../ui/WithPluginState';
import { INPUT_METHOD } from '../analytics';
import { insertBlockTypesWithAnalytics } from '../block-type/commands';
import {
  BlockTypeState,
  pluginKey as blockTypeStateKey,
} from '../block-type/pm-plugins/main';
import { DateState, pluginKey as dateStateKey } from '../date/plugin';
import { emojiPluginKey, EmojiPluginState } from '../emoji';
import {
  HyperlinkState,
  stateKey as hyperlinkPluginKey,
} from '../hyperlink/pm-plugins/main';
import { pluginKey as layoutStateKey } from '../layout';
import { LayoutState } from '../layout/pm-plugins/main';
import {
  insertMacroFromMacroBrowser,
  MacroState,
  pluginKey as macroStateKey,
} from '../macro';
import {
  MediaPluginState,
  stateKey as mediaStateKey,
} from '../media/pm-plugins/main';
import { mentionPluginKey, MentionPluginState } from '../mentions';
import {
  pluginKey as placeholderTextStateKey,
  PluginState as PlaceholderPluginState,
} from '../placeholder-text';
import { TablePluginState } from '../table/types';
import { TypeAheadPluginState } from '../type-ahead';
import { pluginKey as typeAheadPluginKey } from '../type-ahead/pm-plugins/main';
import ToolbarInsertBlock from './ui/ToolbarInsertBlock';

const toolbarSizeToButtons = (toolbarSize: ToolbarSize) => {
  switch (toolbarSize) {
    case ToolbarSize.XXL:
    case ToolbarSize.XL:
    case ToolbarSize.L:
    case ToolbarSize.M:
      return 7;

    case ToolbarSize.S:
      return 2;

    default:
      return 0;
  }
};

export interface InsertBlockOptions {
  allowTables?: boolean;
  insertMenuItems?: any;
  horizontalRuleEnabled?: boolean;
  nativeStatusSupported?: boolean;
}

/**
 * Wrapper over insertBlockTypeWithAnalytics to autobind toolbar input method
 * @param name Block name
 */
function handleInsertBlockType(name: string) {
  return insertBlockTypesWithAnalytics(name, INPUT_METHOD.TOOLBAR);
}

const insertBlockPlugin = (options: InsertBlockOptions): EditorPlugin => ({
  name: 'insertBlock',

  primaryToolbarComponent({
    editorView,
    editorActions,
    dispatchAnalyticsEvent,
    providerFactory,
    popupsMountPoint,
    popupsBoundariesElement,
    popupsScrollableElement,
    toolbarSize,
    disabled,
    isToolbarReducedSpacing,
  }) {
    const buttons = toolbarSizeToButtons(toolbarSize);
    const renderNode = (providers: Record<string, Promise<any>>) => {
      return (
        <WithPluginState
          plugins={{
            typeAheadState: typeAheadPluginKey,
            blockTypeState: blockTypeStateKey,
            mediaState: mediaStateKey,
            mentionState: mentionPluginKey,
            macroState: macroStateKey,
            hyperlinkState: hyperlinkPluginKey,
            emojiState: emojiPluginKey,
            dateState: dateStateKey,
            placeholderTextState: placeholderTextStateKey,
            layoutState: layoutStateKey,
          }}
          render={({
            typeAheadState,
            mentionState,
            blockTypeState,
            mediaState,
            macroState = {} as MacroState,
            hyperlinkState,
            emojiState,
            dateState,
            placeholderTextState,
            layoutState,
          }: {
            typeAheadState: TypeAheadPluginState | undefined;
            mentionState: MentionPluginState | undefined;
            blockTypeState: BlockTypeState | undefined;
            mediaState: MediaPluginState | undefined;
            tablesState: TablePluginState | undefined;
            macroState: MacroState | undefined;
            hyperlinkState: HyperlinkState | undefined;
            emojiState: EmojiPluginState | undefined;
            dateState: DateState | undefined;
            placeholderTextState: PlaceholderPluginState | undefined;
            layoutState: LayoutState | undefined;
          }) => (
            <ToolbarInsertBlock
              buttons={buttons}
              isReducedSpacing={isToolbarReducedSpacing}
              isDisabled={disabled}
              isTypeAheadAllowed={typeAheadState && typeAheadState.isAllowed}
              editorView={editorView}
              tableSupported={options.allowTables}
              actionSupported={!!editorView.state.schema.nodes.taskItem}
              mentionsSupported={
                !!(mentionState && mentionState.mentionProvider)
              }
              mentionsEnabled={!!mentionState}
              decisionSupported={!!editorView.state.schema.nodes.decisionItem}
              dateEnabled={!!dateState}
              placeholderTextEnabled={
                placeholderTextState && placeholderTextState.allowInserting
              }
              layoutSectionEnabled={!!layoutState}
              mediaUploadsEnabled={mediaState && mediaState.allowsUploads}
              onShowMediaPicker={mediaState && mediaState.showMediaPicker}
              mediaSupported={!!mediaState}
              availableWrapperBlockTypes={
                blockTypeState && blockTypeState.availableWrapperBlockTypes
              }
              linkSupported={!!hyperlinkState}
              linkDisabled={
                !hyperlinkState ||
                !hyperlinkState.canInsertLink ||
                !!hyperlinkState.activeLinkMark
              }
              emojiDisabled={!emojiState || !emojiState.emojiProvider}
              emojiProvider={providers.emojiProvider}
              nativeStatusSupported={options.nativeStatusSupported}
              horizontalRuleEnabled={options.horizontalRuleEnabled}
              onInsertBlockType={handleInsertBlockType}
              onInsertMacroFromMacroBrowser={insertMacroFromMacroBrowser}
              macroProvider={macroState.macroProvider}
              popupsMountPoint={popupsMountPoint}
              popupsBoundariesElement={popupsBoundariesElement}
              popupsScrollableElement={popupsScrollableElement}
              insertMenuItems={options.insertMenuItems}
              editorActions={editorActions}
              dispatchAnalyticsEvent={dispatchAnalyticsEvent}
            />
          )}
        />
      );
    };

    return (
      <WithProviders
        providerFactory={providerFactory}
        providers={['emojiProvider']}
        renderNode={renderNode}
      />
    );
  },
});

export default insertBlockPlugin;
