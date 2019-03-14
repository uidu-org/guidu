import { InlineCardResolvedViewProps } from '@uidu/media-ui';
import { extractInlineViewPropsFromObject } from './extractPropsFromObject';

export const extractInlineViewPropsFromSourceCodeRepository = (
  json: any,
): InlineCardResolvedViewProps => extractInlineViewPropsFromObject(json);
