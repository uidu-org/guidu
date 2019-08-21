import { MarkdownTransformer } from '@atlaskit/editor-markdown-transformer';
import MarkdownIt from 'markdown-it';
import { Fragment, Node, Schema, Slice } from 'prosemirror-model';
import { EditorState, Plugin, PluginKey } from 'prosemirror-state';
// @ts-ignore
import { handlePaste as handlePasteTable } from 'prosemirror-tables';
import { insideTable } from '../../../utils';
import * as clipboard from '../../../utils/clipboard';
import { PasteTypes } from '../../analytics';
import { CardOptions } from '../../card';
import {
  transformSingleLineCodeBlockToCodeMark,
  transformSliceToJoinAdjacentCodeBlocks,
} from '../../code-block/utils';
import { transformSliceToRemoveOpenBodiedExtension } from '../../extension/actions';
import { linkifyContent } from '../../hyperlink/utils';
import { transformSliceToRemoveOpenLayoutNodes } from '../../layout/utils';
import {
  transformSliceToCorrectMediaWrapper,
  unwrapNestedMediaElements,
} from '../../media/utils/media-common';
import { transformSliceForMedia } from '../../media/utils/media-single';
import { transformSliceToAddTableHeaders } from '../../table/commands';
import { pluginKey as tableStateKey } from '../../table/pm-plugins/main';
import {
  transformSliceToCorrectEmptyTableCells,
  transformSliceToFixHardBreakProblemOnCopyFromCell,
  transformSliceToRemoveOpenTable,
} from '../../table/utils';
import { handleMacroAutoConvert, handleMention } from '../handlers';
import linkify from '../linkify-md-plugin';
import { escapeLinks } from '../util';
import {
  handleCodeBlockWithAnalytics,
  handleMarkdownWithAnalytics,
  handleMediaSingleWithAnalytics,
  handlePasteAsPlainTextWithAnalytics,
  handlePasteIntoTaskAndDecisionWithAnalytics,
  handlePastePreservingMarksWithAnalytics,
  handleRichTextWithAnalytics,
  sendPasteAnalyticsEvent,
} from './analytics';
export const stateKey = new PluginKey('pastePlugin');

export const md = MarkdownIt('zero', { html: false });

md.enable([
  // Process html entity - &#123;, &#xAF;, &quot;, ...
  'entity',
  // Process escaped chars and hardbreaks
  'escape',

  'newline',
]);

// enable modified version of linkify plugin
// @see https://product-fabric.atlassian.net/browse/ED-3097
md.use(linkify);

function isHeaderRowRequired(state: EditorState) {
  const tableState = tableStateKey.getState(state);
  return tableState && tableState.pluginConfig.isHeaderRowRequired;
}

export function createPlugin(
  schema: Schema,
  cardOptions?: CardOptions,
  sanitizePrivateContent?: boolean,
) {
  const atlassianMarkDownParser = new MarkdownTransformer(schema, md);

  function getMarkdownSlice(
    text: string,
    openStart: number,
    openEnd: number,
  ): Slice | undefined {
    const doc = atlassianMarkDownParser.parse(escapeLinks(text));
    if (doc && doc.content) {
      return new Slice(doc.content, openStart, openEnd);
    }
    return undefined;
  }

  return new Plugin({
    key: stateKey,
    props: {
      handlePaste(view, rawEvent, slice) {
        const event = rawEvent as ClipboardEvent;
        if (!event.clipboardData) {
          return false;
        }

        const text = event.clipboardData.getData('text/plain');
        const html = event.clipboardData.getData('text/html');

        const isPastedFile = clipboard.isPastedFile(event);
        const isPlainText = text && !html;
        const isRichText = !!html;

        // Bail if copied content has files
        if (isPastedFile) {
          if (!html) {
            return true;
          }
          /**
           * Microsoft Office, Number, Pages, etc. adds an image to clipboard
           * with other mime-types so we don't let the event reach media
           */
          event.stopPropagation();
        }

        const { state, dispatch } = view;

        if (
          handlePasteAsPlainTextWithAnalytics(view, event, slice)(
            state,
            dispatch,
            view,
          )
        ) {
          return true;
        }

        // transform slices based on destination
        slice = transformSliceForMedia(slice, schema)(state.selection);

        let markdownSlice: Slice | undefined;
        if (isPlainText) {
          markdownSlice = getMarkdownSlice(
            text,
            slice.openStart,
            slice.openEnd,
          );

          // run macro autoconvert prior to other conversions
          if (
            markdownSlice &&
            handleMacroAutoConvert(text, markdownSlice, cardOptions)(
              state,
              dispatch,
              view,
            )
          ) {
            // TODO: handleMacroAutoConvert dispatch twice, so we can't use the helper
            sendPasteAnalyticsEvent(view, event, markdownSlice, {
              type: PasteTypes.markdown,
            });
            return true;
          }
        }

        if (
          handlePasteIntoTaskAndDecisionWithAnalytics(
            view,
            event,
            slice,
            isPlainText ? PasteTypes.plain : PasteTypes.richText,
          )(state, dispatch)
        ) {
          return true;
        }

        // If we're in a code block, append the text contents of clipboard inside it
        if (
          handleCodeBlockWithAnalytics(view, event, slice, text)(
            state,
            dispatch,
          )
        ) {
          return true;
        }

        if (
          handleMediaSingleWithAnalytics(
            view,
            event,
            slice,
            isPastedFile ? PasteTypes.binary : PasteTypes.richText,
          )(state, dispatch, view)
        ) {
          return true;
        }

        // If the clipboard only contains plain text, attempt to parse it as Markdown
        if (isPlainText && markdownSlice) {
          if (
            handlePastePreservingMarksWithAnalytics(
              view,
              event,
              markdownSlice,
              PasteTypes.markdown,
            )(state, dispatch)
          ) {
            return true;
          }

          return handleMarkdownWithAnalytics(view, event, markdownSlice)(
            state,
            dispatch,
          );
        }

        // finally, handle rich-text copy-paste
        if (isRichText) {
          // linkify the text where possible
          slice = linkifyContent(state.schema)(slice);
          // run macro autoconvert prior to other conversions
          if (
            handleMacroAutoConvert(text, slice, cardOptions)(
              state,
              dispatch,
              view,
            )
          ) {
            // TODO: handleMacroAutoConvert dispatch twice, so we can't use the helper
            sendPasteAnalyticsEvent(view, event, slice, {
              type: PasteTypes.richText,
            });
            return true;
          }

          // if we're pasting to outside a table or outside a table
          // header, ensure that we apply any table headers to the first
          // row of content we see, if required
          if (!insideTable(state) && isHeaderRowRequired(state)) {
            slice = transformSliceToAddTableHeaders(slice, state.schema);
          }

          // get prosemirror-tables to handle pasting tables if it can
          // otherwise, just the replace the selection with the content
          if (handlePasteTable(view, null, slice)) {
            sendPasteAnalyticsEvent(view, event, slice, {
              type: PasteTypes.richText,
            });
            return true;
          }

          // ED-4732
          if (
            handlePastePreservingMarksWithAnalytics(
              view,
              event,
              slice,
              PasteTypes.richText,
            )(state, dispatch)
          ) {
            return true;
          }

          return handleRichTextWithAnalytics(view, event, slice)(
            state,
            dispatch,
          );
        }

        return false;
      },
      transformPasted(slice) {
        if (sanitizePrivateContent) {
          slice = handleMention(slice, schema);
        }

        slice = transformSliceToFixHardBreakProblemOnCopyFromCell(
          slice,
          schema,
        );
        /** If a partial paste of table, paste only table's content */
        slice = transformSliceToRemoveOpenTable(slice, schema);

        // We do this separately so it also applies to drag/drop events
        slice = transformSliceToRemoveOpenLayoutNodes(slice, schema);

        /** If a partial paste of bodied extension, paste only text */
        slice = transformSliceToRemoveOpenBodiedExtension(slice, schema);

        /* Bitbucket copies diffs as multiple adjacent code blocks
         * so we merge ALL adjacent code blocks to support paste here */
        slice = transformSliceToJoinAdjacentCodeBlocks(slice);

        slice = transformSingleLineCodeBlockToCodeMark(slice, schema);

        slice = transformSliceToCorrectMediaWrapper(slice, schema);

        slice = transformSliceToCorrectEmptyTableCells(slice, schema);

        if (
          slice.content.childCount &&
          slice.content.lastChild!.type === schema.nodes.codeBlock
        ) {
          slice = new Slice(
            slice.content.append(
              Fragment.from(schema.nodes.paragraph.createAndFill() as Node),
            ),
            slice.openStart,
            1,
          );
        }
        return slice;
      },
      transformPastedHTML(html) {
        // Fix for issue ED-4438
        // text from google docs should not be pasted as inline code
        if (html.indexOf('id="docs-internal-guid-') >= 0) {
          html = html.replace(/white-space:pre/g, '');
          html = html.replace(/white-space:pre-wrap/g, '');
        }

        if (html.indexOf('<img ') >= 0) {
          html = unwrapNestedMediaElements(html);
        }

        return html;
      },
    },
  });
}
