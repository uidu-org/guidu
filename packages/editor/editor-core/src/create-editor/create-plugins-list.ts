// import { CreateUIAnalyticsEventSignature } from '@atlaskit/analytics-next';
import {
  alignment,
  basePlugin,
  blockTypePlugin,
  editorDisabledPlugin,
  fakeTextCursorPlugin,
  floatingToolbarPlugin,
  gapCursorPlugin,
  hyperlinkPlugin,
  insertBlockPlugin,
  listsPlugin,
  pastePlugin,
  placeholderPlugin,
  quickInsertPlugin,
  tablesPlugin,
  textColorPlugin,
  textFormattingPlugin,
  typeAheadPlugin,
  widthPlugin,
} from '../plugins';
import { EditorPlugin, EditorProps } from '../types';

/**
 * Returns list of plugins that are absolutely necessary for editor to work
 */
export function getDefaultPluginsList(
  props: EditorProps,
  // createAnalyticsEvent?: CreateUIAnalyticsEventSignature,
): EditorPlugin[] {
  let defaultPluginList: EditorPlugin[] = [];

  // if (props.allowAnalyticsGASV3) {
  //   defaultPluginList.push(analyticsPlugin(createAnalyticsEvent));
  // }

  return defaultPluginList.concat([
    pastePlugin,
    basePlugin(props.appearance),
    blockTypePlugin,
    placeholderPlugin,
    // clearMarksOnChangeToEmptyDocumentPlugin,
    hyperlinkPlugin,
    textFormattingPlugin(props.textFormatting || {}),
    widthPlugin,
    typeAheadPlugin,
    // unsupportedContentPlugin,
    editorDisabledPlugin,
  ]);
}

/**
 * Maps EditorProps to EditorPlugins
 */
export default function createPluginsList(
  props: EditorProps,
  // createAnalyticsEvent?: CreateUIAnalyticsEventSignature,
): EditorPlugin[] {
  const plugins = getDefaultPluginsList(props);

  // if (props.allowBreakout && isFullPage(props.appearance)) {
  //   plugins.push(breakoutPlugin);
  // }

  if (props.allowTextAlignment) {
    plugins.push(alignment);
  }

  // if (props.allowInlineAction) {
  //   plugins.push(inlineActionPlugin);
  // }

  if (props.allowTextColor) {
    plugins.push(textColorPlugin);
  }

  if (props.allowLists) {
    plugins.push(listsPlugin);
  }

  // if (props.allowRule) {
  //   plugins.push(rulePlugin);
  // }

  // if (props.media || props.mediaProvider) {
  //   plugins.push(mediaPlugin(props.media, props.appearance));
  // }

  // if (props.allowCodeBlocks) {
  //   const options = props.allowCodeBlocks !== true ? props.allowCodeBlocks : {};
  //   plugins.push(codeBlockPlugin(options));
  // }

  // if (props.mentionProvider) {
  //   plugins.push(
  //     mentionsPlugin(createAnalyticsEvent, props.sanitizePrivateContent),
  //   );
  // }

  // if (props.emojiProvider) {
  //   plugins.push(emojiPlugin(createAnalyticsEvent));
  // }

  if (props.allowTables) {
    plugins.push(tablesPlugin(props.appearance === 'full-width'));
  }

  // if (props.allowTasksAndDecisions || props.taskDecisionProvider) {
  //   plugins.push(tasksAndDecisionsPlugin);
  // }

  // if (props.allowHelpDialog) {
  //   plugins.push(helpDialogPlugin);
  // }

  // if (props.saveOnEnter) {
  //   plugins.push(saveOnEnterPlugin);
  // }

  // if (props.legacyImageUploadProvider) {
  //   plugins.push(imageUploadPlugin);

  //   if (!props.media && !props.mediaProvider) {
  //     plugins.push(
  //       mediaPlugin({
  //         allowMediaSingle: { disableLayout: true },
  //         allowMediaGroup: false,
  //       }),
  //     );
  //   }
  // }

  // if (props.collabEdit || props.collabEditProvider) {
  //   plugins.push(
  //     collabEditPlugin(props.collabEdit, props.sanitizePrivateContent),
  //   );
  // }

  // if (props.maxContentSize) {
  //   plugins.push(maxContentSizePlugin);
  // }

  // if (props.allowJiraIssue) {
  //   plugins.push(jiraIssuePlugin);
  // }

  // if (props.allowPanel) {
  //   plugins.push(panelPlugin);
  // }

  // if (props.allowExtension) {
  //   plugins.push(extensionPlugin);
  // }

  // if (props.macroProvider) {
  //   plugins.push(macroPlugin);
  // }

  // if (props.allowConfluenceInlineComment) {
  //   plugins.push(confluenceInlineComment);
  // }

  // if (props.allowDate) {
  //   plugins.push(datePlugin);
  // }

  // if (props.allowTemplatePlaceholders) {
  //   const options =
  //     props.allowTemplatePlaceholders !== true
  //       ? props.allowTemplatePlaceholders
  //       : {};
  //   plugins.push(placeholderTextPlugin(options));
  // }

  // if (props.allowLayouts) {
  //   plugins.push(layoutPlugin);
  // }

  // if (props.UNSAFE_cards) {
  //   plugins.push(cardPlugin);
  // }

  // if (props.autoformattingProvider) {
  //   plugins.push(customAutoformatPlugin);
  // }

  let statusMenuDisabled = true;
  // if (props.allowStatus) {
  //   statusMenuDisabled =
  //     typeof props.allowStatus === 'object'
  //       ? props.allowStatus.menuDisabled
  //       : false;
  //   plugins.push(statusPlugin({ menuDisabled: statusMenuDisabled }));
  // }

  // if (props.allowIndentation) {
  //   plugins.push(indentationPlugin);
  // }

  // // UI only plugins
  plugins.push(
    insertBlockPlugin({
      insertMenuItems: props.insertMenuItems,
      horizontalRuleEnabled: props.allowRule,
      nativeStatusSupported: !statusMenuDisabled,
    }),
  );

  // if (props.allowConfluenceInlineComment) {
  //   plugins.push(annotationPlugin);
  // }

  plugins.push(gapCursorPlugin);
  // plugins.push(gridPlugin);
  // plugins.push(submitEditorPlugin);
  plugins.push(fakeTextCursorPlugin);
  plugins.push(floatingToolbarPlugin);

  if (props.appearance !== 'mobile') {
    plugins.push(quickInsertPlugin);
  }

  return plugins;
}
