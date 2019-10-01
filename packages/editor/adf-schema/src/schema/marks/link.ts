import { MarkSpec, Mark } from 'prosemirror-model';
import { LINK, COLOR } from '../groups';
import { isSafeUrl, normalizeUrl } from '../../utils/url';

export interface ConfluenceLinkMetadata {
  linkType: string;
  versionAtSave?: string | null;
  fileName?: string | null;
  spaceKey?: string | null;
  contentTitle?: string | null;
  isRenamedTitle?: boolean;
  anchorName?: string | null;
  contentId?: string | null;
  container?: ConfluenceLinkMetadata;
}

export interface LinkAttributes {
  href: string;
  title?: string;
  id?: string;
  collection?: string;
  occurrenceKey?: string;

  __confluenceMetadata?: ConfluenceLinkMetadata;
}

/**
 * @name link_mark
 */
export interface LinkDefinition {
  type: 'link';
  attrs: LinkAttributes;
}

export const link: MarkSpec = {
  excludes: `${LINK} ${COLOR}`, // ED-5844 No multiple links in media node
  group: LINK,
  attrs: {
    href: {},
    __confluenceMetadata: {
      default: null,
    },
  },
  inclusive: false,
  parseDOM: [
    {
      tag: 'a[href]',
      getAttrs: domNode => {
        const dom = domNode as HTMLLinkElement;
        let href = dom.getAttribute('href') || '';
        const attrs: { __confluenceMetadata: string; href?: string } = {
          __confluenceMetadata: dom.hasAttribute('__confluenceMetadata')
            ? JSON.parse(dom.getAttribute('__confluenceMetadata') || '')
            : undefined,
        };

        if (isSafeUrl(href)) {
          attrs.href = normalizeUrl(href);
        } else {
          return false;
        }

        return attrs;
      },
    },
  ],
  toDOM(node, isInline) {
    const attrs = Object.keys(node.attrs).reduce<any>((attrs, key) => {
      if (key === '__confluenceMetadata') {
        if (node.attrs[key] !== null) {
          attrs[key] = JSON.stringify(node.attrs[key]);
        }
      } else {
        attrs[key] = node.attrs[key];
      }

      return attrs;
    }, {});

    if (isInline) {
      return ['a', attrs];
    }

    return [
      'a',
      {
        ...attrs,
        class: 'blockLink',
      },
      0,
    ];
  },
};

const OPTIONAL_ATTRS = [
  'title',
  'id',
  'collection',
  'occurrenceKey',
  '__confluenceMetadata',
];

export const toJSON = (mark: Mark) => ({
  type: mark.type.name,
  attrs: Object.keys(mark.attrs).reduce<Record<string, string>>(
    (attrs, key) => {
      if (OPTIONAL_ATTRS.indexOf(key) === -1 || mark.attrs[key] !== null) {
        attrs[key] = mark.attrs[key];
      }
      return attrs;
    },
    {},
  ),
});
