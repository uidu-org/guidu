import { styles as alignmentStyles } from '../marks/alignment';
import { styles as codeStyles } from '../marks/code';
import { styles as emStyles } from '../marks/em';
import { styles as indentationStyles } from '../marks/indentation';
import { styles as linkStyles } from '../marks/link';
import { styles as strikeStyles } from '../marks/strike';
import { styles as strongStyles } from '../marks/strong';
import { styles as underlineStyles } from '../marks/underline';
import { styles as blockCardStyles } from '../nodes/block-card';
import { styles as blockquoteStyles } from '../nodes/blockquote';
import { styles as bodiedExtensionStyles } from '../nodes/bodiedExtension';
import { styles as bulletListStyles } from '../nodes/bullet-list';
import { styles as captionStyles } from '../nodes/caption';
import { styles as codeBlockStyles } from '../nodes/code-block';
import { styles as dateStyles } from '../nodes/date';
import { styles as expandStyles } from '../nodes/expand';
import { styles as headingStyles } from '../nodes/heading';
import { styles as inlineCardStyles } from '../nodes/inline-card';
import { styles as inlineExtensionStyles } from '../nodes/inlineExtension';
import { styles as listItemStyles } from '../nodes/list-item';
import { styles as mediaStyles } from '../nodes/media';
import { styles as mediaInlineStyles } from '../nodes/media-inline';
import { styles as mediaSingleStyles } from '../nodes/media-single';
import { styles as mentionStyles } from '../nodes/mention';
import { styles as orderedListStyles } from '../nodes/ordered-list';
import { styles as panelStyles } from '../nodes/panel';
import { styles as paragraphStyles } from '../nodes/paragraph';
import { styles as ruleStyles } from '../nodes/rule';
import { styles as tableStyles } from '../nodes/table';
import { styles as tableCellStyles } from '../nodes/table-cell';
import { styles as tableHeaderStyles } from '../nodes/table-header';
import { styles as tableRowStyles } from '../nodes/table-row';
import { styles as videoStyles } from '../nodes/video';
import { styles as tableUtilStyles } from '../table-util';
import { fontFamily, fontSize, fontWeight, lineHeight } from './common';
import { createClassName } from './util';

const styles = `
  .${createClassName('wrapper')} {
    font-family: ${fontFamily};
    font-size: ${fontSize};
    font-weight: ${fontWeight};
    line-height: ${lineHeight};
    vertical-align: baseline;
  }
  ${paragraphStyles}
  ${codeBlockStyles}
  ${headingStyles}
  ${blockquoteStyles}
  ${bulletListStyles}
  ${orderedListStyles}
  ${listItemStyles}
  ${ruleStyles}
  ${mentionStyles}
  ${tableHeaderStyles}
  ${tableCellStyles}
  ${tableRowStyles}
  ${blockCardStyles}
  ${bodiedExtensionStyles}
  ${inlineExtensionStyles}
  ${dateStyles}
  ${inlineCardStyles}
  ${panelStyles}
  ${mediaStyles}
  ${mediaInlineStyles}
  ${mediaSingleStyles}
  ${captionStyles}
  ${tableStyles}
  ${tableUtilStyles}

  ${alignmentStyles}
  ${codeStyles}
  ${emStyles}
  ${indentationStyles}
  ${linkStyles}
  ${strikeStyles}
  ${strongStyles}
  ${underlineStyles}
  ${expandStyles}
  ${videoStyles}

  /* Hacks to bypass diff styles */

  .${createClassName('panel')} > span.diff-image-container.diff-removed {
    display: none;
  }
  /* Do not display "Image added" or "Image removed" in CS generated content */
  .${createClassName('wrapper')} span.diff-image-overlay {
    display: none;
  }
`;
export default styles;
