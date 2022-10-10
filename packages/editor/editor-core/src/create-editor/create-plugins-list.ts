import { CreateUIAnalyticsEvent } from '@uidu/analytics';
import {
  basePlugin,
  clearMarksOnChangeToEmptyDocumentPlugin,
  editorDisabledPlugin,
  fakeTextCursorPlugin,
  gapCursorPlugin,
  pastePlugin,
  typeAheadPlugin,
  unsupportedContentPlugin,
  widthPlugin
} from '../plugins';
import { ScrollGutterPluginOptions } from '../plugins/base/pm-plugins/scroll-gutter';
import { EditorPlugin, EditorProps } from '../types';
import { isFullPage as fullPageCheck } from '../utils/is-full-page';

function getScrollGutterOptions(
  props: EditorProps,
): ScrollGutterPluginOptions | undefined {
  const { appearance } = props;
  if (fullPageCheck(appearance)) {
    // Full Page appearance uses a scrollable div wrapper
    return {
      getScrollElement: () =>
        document.querySelector('.fabric-editor-popup-scroll-parent'),
    };
  }
  if (appearance === 'mobile') {
    // Mobile appearance uses body scrolling for improved performance on low powered devices.
    return {
      getScrollElement: () => document.body,
      allowCustomScrollHandler: false,
    };
  }
  return undefined;
}

/**
 * Returns list of plugins that are absolutely necessary for editor to work
 */
export function getDefaultPluginsList(props: EditorProps): EditorPlugin[] {
  const { appearance } = props;

  return [
    basePlugin({
      allowInlineCursorTarget: appearance !== 'mobile',
      allowScrollGutter: getScrollGutterOptions(props),
      addRunTimePerformanceCheck: false,
      inputSamplingLimit: props.inputSamplingLimit,
    }),
    pastePlugin({
      cardOptions: props.UNSAFE_cards,
      sanitizePrivateContent: props.sanitizePrivateContent,
    }),
    clearMarksOnChangeToEmptyDocumentPlugin(),
    widthPlugin(),
    typeAheadPlugin(),
    unsupportedContentPlugin(),
    editorDisabledPlugin(),
    gapCursorPlugin(),
    fakeTextCursorPlugin(),
  ];
}

/**
 * Maps EditorProps to EditorPlugins
 */
export default function createPluginsList(
  props: EditorProps,
  prevProps?: EditorProps,
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
): EditorPlugin[] {
  // const isMobile = props.appearance === 'mobile';
  const plugins = [...getDefaultPluginsList(props), ...(props.plugins || [])];

  // if (props.allowAnalyticsGASV3) {
  //   plugins.push(analyticsPlugin(createAnalyticsEvent));
  // }

  // if (props.allowBreakout && isFullPage) {
  //   plugins.push(
  //     breakoutPlugin({ allowBreakoutButton: props.appearance === 'full-page' }),
  //   );
  // }

  // if (props.allowTextAlignment) {
  //   plugins.push(alignmentPlugin());
  // }

  // if (props.allowTextColor) {
  //   plugins.push(textColorPlugin());
  // }

  // plugins.push(listsPlugin());

  // if (props.allowRule) {
  //   plugins.push(rulePlugin());
  // }

  // if (props.media) {
  //   plugins.push(
  //     mediaPlugin({
  //       ...props.media,
  //       allowLazyLoading: !isMobile,
  //       allowBreakoutSnapPoints: isFullPage,
  //       allowAdvancedToolBarOptions: isFullPage,
  //       allowDropzoneDropLine: isFullPage,
  //       allowMediaSingleEditable: !isMobile,
  //       allowRemoteDimensionsFetch: !isMobile,
  //       // This is a wild one. I didnt quite understand what the code was doing
  //       // so a bit of guess for now.
  //       allowMarkingUploadsAsIncomplete: isMobile,
  //       fullWidthEnabled: props.appearance === 'full-width',
  //       uploadErrorHandler: props.uploadErrorHandler,
  //       waitForMediaUpload: props.waitForMediaUpload,
  //       isCopyPasteEnabled: !isMobile,
  //     }),
  //   );
  // }

  // if (props.allowCodeBlocks) {
  //   const options = props.allowCodeBlocks !== true ? props.allowCodeBlocks : {};
  //   plugins.push(codeBlockPlugin(options));
  // }

  // if (props.mentionProvider) {
  //   plugins.push(
  //     mentionsPlugin({
  //       createAnalyticsEvent,
  //       sanitizePrivateContent: props.sanitizePrivateContent,
  //       mentionInsertDisplayName: props.mentionInsertDisplayName,
  //       useInlineWrapper: isMobile,
  //       allowZeroWidthSpaceAfter: !isMobile,
  //     }),
  //   );
  // }

  // if (props.emojiProvider) {
  //   plugins.push(
  //     emojiPlugin({
  //       createAnalyticsEvent,
  //       useInlineWrapper: isMobile,
  //       allowZeroWidthSpaceAfter: !isMobile,
  //     }),
  //   );
  // }

  // if (props.allowTables) {
  //   const tableOptions =
  //     !props.allowTables || typeof props.allowTables === 'boolean'
  //       ? {}
  //       : props.allowTables;
  //   plugins.push(
  //     tablesPlugin({
  //       tableOptions,
  //       breakoutEnabled: props.appearance === 'full-page',
  //       allowContextualMenu: !isMobile,
  //       fullWidthEnabled: props.appearance === 'full-width',
  //       wasFullWidthEnabled: prevProps && prevProps.appearance === 'full-width',
  //       dynamicSizingEnabled: props.allowDynamicTextSizing,
  //     }),
  //   );
  // }

  // if (props.allowTasksAndDecisions || props.taskDecisionProvider) {
  //   plugins.push(tasksAndDecisionsPlugin());
  // }

  // if (props.feedbackInfo) {
  //   plugins.push(feedbackDialogPlugin(props.feedbackInfo));
  // }

  // if (props.allowHelpDialog) {
  //   plugins.push(helpDialogPlugin());
  // }

  // if (props.saveOnEnter) {
  //   plugins.push(saveOnEnterPlugin());
  // }

  // if (props.collabEdit || props.collabEditProvider) {
  //   plugins.push(
  //     collabEditPlugin(props.collabEdit, props.sanitizePrivateContent),
  //   );
  // }

  // if (props.maxContentSize) {
  //   plugins.push(maxContentSizePlugin());
  // }

  // if (props.allowJiraIssue) {
  //   plugins.push(jiraIssuePlugin());
  // }

  // if (props.allowPanel) {
  //   plugins.push(panelPlugin());
  // }

  // if (props.allowExtension) {
  //   const extensionConfig =
  //     typeof props.allowExtension === 'object' ? props.allowExtension : {};
  //   plugins.push(
  //     extensionPlugin({
  //       breakoutEnabled:
  //         props.appearance === 'full-page' &&
  //         extensionConfig.allowBreakout !== false,
  //       stickToolbarToBottom: extensionConfig.stickToolbarToBottom,
  //       allowNewConfigPanel: extensionConfig.allowNewConfigPanel,
  //       extensionHandlers: props.extensionHandlers,
  //     }),
  //   );
  // }

  // if (props.macroProvider) {
  //   plugins.push(macroPlugin());
  // }

  // if (props.annotationProvider || props.allowConfluenceInlineComment) {
  //   plugins.push(annotationPlugin(props.annotationProvider));
  // }

  // if (props.allowDate) {
  //   plugins.push(datePlugin());
  // }

  // if (props.allowTemplatePlaceholders) {
  //   const options =
  //     props.allowTemplatePlaceholders !== true
  //       ? props.allowTemplatePlaceholders
  //       : {};
  //   plugins.push(placeholderTextPlugin(options));
  // }

  // if (props.allowLayouts) {
  //   plugins.push(layoutPlugin());
  // }

  // if (props.UNSAFE_cards) {
  //   plugins.push(cardPlugin());
  // }

  // if (props.autoformattingProvider) {
  //   plugins.push(customAutoformatPlugin());
  // }

  // let statusMenuDisabled = true;
  // if (props.allowStatus) {
  //   statusMenuDisabled =
  //     typeof props.allowStatus === 'object'
  //       ? props.allowStatus.menuDisabled
  //       : false;
  //   plugins.push(
  //     statusPlugin({
  //       menuDisabled: statusMenuDisabled,
  //       useInlineWrapper: isMobile,
  //       allowZeroWidthSpaceAfter: !isMobile,
  //     }),
  //   );
  // }

  // if (props.allowIndentation) {
  //   plugins.push(indentationPlugin());
  // }

  // UI only plugins
  // plugins.push(
  //   insertBlockPlugin({
  //     allowTables: !!props.allowTables,
  //     insertMenuItems: props.insertMenuItems,
  //     horizontalRuleEnabled: props.allowRule,
  //     nativeStatusSupported: !statusMenuDisabled,
  //   }),
  // );

  // if (!isMobile) {
  //   plugins.push(quickInsertPlugin());
  // }

  // if (isMobile) {
  //   plugins.push(historyPlugin());
  // }

  return plugins.flat();
}
