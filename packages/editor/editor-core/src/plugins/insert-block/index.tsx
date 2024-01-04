import { Providers, WithProviders } from '@uidu/editor-common';
import React from 'react';
import { MentionPluginState } from '../..';
import { EditorPlugin } from '../../types';
import { ToolbarSize } from '../../ui/Toolbar/types';
import WithPluginState from '../../ui/WithPluginState';
import { INPUT_METHOD } from '../analytics';
import { insertBlockTypesWithAnalytics } from '../block-type/commands';
import {
  BlockTypeState,
  pluginKey as blockTypeStateKey,
} from '../block-type/pm-plugins/main';
import { pluginKey as dateStateKey } from '../date/pm-plugins/plugin-key';
import { DateState } from '../date/pm-plugins/types';
import { emojiPluginKey } from '../emoji';
import { EmojiPluginState } from '../emoji/types';
import {
  HyperlinkState,
  stateKey as hyperlinkPluginKey,
} from '../hyperlink/pm-plugins/main';
import { pluginKey as layoutStateKey } from '../layout';
import { LayoutState } from '../layout/pm-plugins/types';
import { insertMacroFromMacroBrowser, MacroState } from '../macro';
import { pluginKey as macroStateKey } from '../macro/plugin-key';
import { stateKey as mediaStateKey } from '../media/pm-plugins/plugin-key';
import { MediaPluginState } from '../media/pm-plugins/types';
import { mentionPluginKey } from '../mentions';
import { pluginKey as placeholderTextStateKey } from '../placeholder-text/plugin-key';
import { PluginState as PlaceholderPluginState } from '../placeholder-text/types';
import { pluginKey as tableStateKey } from '../table/pm-plugins/plugin-factory';
import { TablePluginState } from '../table/types';
import { TypeAheadPluginState } from '../type-ahead';
import { pluginKey as typeAheadPluginKey } from '../type-ahead/pm-plugins/main';
import { pluginKey as videoPluginKey } from '../video/pm-plugins/plugin-key';
import { VideoState } from '../video/pm-plugins/types';
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
  allowExpand?: boolean;
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

const insertBlockPlugin = (options: InsertBlockOptions = {}): EditorPlugin => ({
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

    const renderNode = (providers: Providers) => (
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
          videoState: videoPluginKey,
          placeholderTextState: placeholderTextStateKey,
          layoutState: layoutStateKey,
          tablesState: tableStateKey,
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
          videoState,
          placeholderTextState,
          layoutState,
          tablesState,
        }: {
          typeAheadState: TypeAheadPluginState | undefined;
          mentionState: MentionPluginState | undefined;
          blockTypeState: BlockTypeState | undefined;
          mediaState: MediaPluginState | undefined;
          tablesState: TablePluginState | undefined;
          macroState: MacroState | undefined;
          hyperlinkState: HyperlinkState | undefined;
          emojiState: EmojiPluginState | undefined;
          videoState: VideoState | undefined;
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
            tableSupported={!!tablesState}
            actionSupported={!!editorView.state.schema.nodes.taskItem}
            // mentionsSupported={!!(mentionState && mentionState.mentionProvider)}
            // mentionsEnabled={!!mentionState}
            decisionSupported={!!editorView.state.schema.nodes.decisionItem}
            dateEnabled={!!dateState}
            videoEnabled={!!videoState}
            placeholderTextEnabled={
              placeholderTextState && placeholderTextState.allowInserting
            }
            layoutSectionEnabled={!!layoutState}
            expandEnabled={!!options.allowExpand}
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
            emojiDisabled={!emojiState}
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
