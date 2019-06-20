import { traverse } from '@atlaskit/adf-utils';
import { JSONDocNode } from '@atlaskit/editor-json-transformer';
import {
  isResolvingMentionProvider,
  MentionProvider,
} from '@atlaskit/mention/resource';
import { ProviderFactory } from '@atlaskit/editor-common';

/**
 * Sanitises a document where some content should not be in the document (e.g. mention names).
 *
 * It is expected that these names we be resolved separately (e.g. when rendering
 * a node view).
 */
export function sanitizeNodeForPrivacy(
  json: JSONDocNode,
  providerFactory?: ProviderFactory,
): JSONDocNode {
  const mentionNames = new Map<string, string>();
  let hasCacheableMentions = false;
  const sanitizedJSON = traverse(json as any, {
    mention: node => {
      if (node.attrs && node.attrs.text) {
        hasCacheableMentions = true;
        mentionNames.set(node.attrs.id, node.attrs.text);
      }
      return {
        ...node,
        attrs: {
          ...node.attrs,
          text: '',
        },
      };
    },
  }) as JSONDocNode;

  if (hasCacheableMentions && providerFactory) {
    const handler = (
      _name: string,
      providerPromise?: Promise<MentionProvider>,
    ) => {
      if (providerPromise) {
        providerPromise.then(provider => {
          if (isResolvingMentionProvider(provider)) {
            mentionNames.forEach((name, id) => {
              provider.cacheMentionName(id, name);
            });
            mentionNames.clear();
            providerFactory.unsubscribe('mentionProvider', handler);
          }
        });
      }
    };
    providerFactory.subscribe('mentionProvider', handler);
  }

  return sanitizedJSON;
}
