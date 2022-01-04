import { Node as PMNode, Schema } from 'prosemirror-model';
import { AnalyticsProperties, analyticsService } from '../../analytics';

export const traverseNode = (node: PMNode, schema: Schema): void => {
  let cxhtml = '';
  const { unsupportedInline, unsupportedBlock } = schema.nodes;
  if (node.attrs && node.attrs.cxhtml) {
    cxhtml = node.attrs.cxhtml;
  }

  const data: AnalyticsProperties = {
    type: node.type.name,
    cxhtml: cxhtml,
    text: node.text || '',
  };

  if (node.type === unsupportedInline) {
    analyticsService.trackEvent(
      'uidu.editor-core.confluenceUnsupported.inline',
      data,
    );
  } else if (node.type === unsupportedBlock) {
    analyticsService.trackEvent(
      'uidu.editor-core.confluenceUnsupported.block',
      data,
    );
  } else {
    node.content.forEach((node) => traverseNode(node, schema));
  }
};
