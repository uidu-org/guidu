import {
  faExternalLink,
  faPenAlt,
  faUnlink,
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isSafeUrl, LinkAttributes } from '@uidu/adf-schema';
import { Mark } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import React from 'react';
import {
  linkMessages,
  linkToolbarMessages as linkToolbarCommonMessages,
} from '../../messages';
import {
  RECENT_SEARCH_HEIGHT_IN_PX,
  RECENT_SEARCH_WIDTH_IN_PX,
} from '../../ui/RecentSearch/ToolbarComponents';
import { AlignType, FloatingToolbarHandler } from '../floating-toolbar/types';
import {
  editInsertedLink,
  hideLinkToolbar,
  insertLink,
  removeLink,
  setLinkHref,
  setLinkText,
  updateLink,
} from './commands';
import {
  EditInsertedState,
  HyperlinkState,
  InsertState,
  stateKey,
} from './pm-plugins/main';
import RecentList from './ui/HyperlinkAddToolbar';
import { normalizeUrl } from './utils';

/* type guard for edit links */
function isEditLink(
  linkMark: EditInsertedState | InsertState,
): linkMark is EditInsertedState {
  return (linkMark as EditInsertedState).pos !== undefined;
}

function getLinkText(
  activeLinkMark: EditInsertedState,
  state: EditorState,
): string | undefined | null {
  if (!activeLinkMark.node) {
    return undefined;
  }

  const textToUrl = normalizeUrl(activeLinkMark.node.text);
  const linkMark = activeLinkMark.node.marks.find(
    (mark: Mark) => mark.type === state.schema.marks.link,
  );
  const linkHref = linkMark && linkMark.attrs.href;

  if (textToUrl === linkHref) {
    return undefined;
  }
  return activeLinkMark.node.text;
}

const handleBlur =
  (activeLinkMark: EditInsertedState | InsertState, view: EditorView) =>
  (type: string, url: string, text: string, isTabPressed?: boolean) => {
    switch (type) {
      case 'url': {
        if (url) {
          return setLinkHref(
            url,
            isEditLink(activeLinkMark)
              ? activeLinkMark.pos
              : activeLinkMark.from,
            isEditLink(activeLinkMark) ? undefined : activeLinkMark.to,
            isTabPressed,
          )(view.state, view.dispatch);
        }
        if (isEditLink(activeLinkMark) && activeLinkMark.node && !url) {
          removeLink(activeLinkMark.pos)(view.state, view.dispatch);
        }
        return hideLinkToolbar()(view.state, view.dispatch);
      }
      case 'text': {
        if (text && url) {
          return activeLinkMark.type === 'INSERT'
            ? insertLink(
                activeLinkMark.from,
                activeLinkMark.to,
                url,
                text,
              )(view.state, view.dispatch)
            : setLinkText(text, (activeLinkMark as EditInsertedState).pos)(
                view.state,
                view.dispatch,
              );
        }
        return hideLinkToolbar()(view.state, view.dispatch);
      }
      default: {
        return hideLinkToolbar()(view.state, view.dispatch);
      }
    }
  };

// eslint-disable-next-line import/prefer-default-export
export const getToolbarConfig: FloatingToolbarHandler = (
  state,
  { formatMessage },
  providerFactory,
) => {
  const linkState: HyperlinkState | undefined = stateKey.getState(state);

  if (linkState && linkState.activeLinkMark) {
    const { activeLinkMark } = linkState;

    const hyperLinkToolbar = {
      title: 'Hyperlink floating controls',
      nodeType: [
        state.schema.nodes.text,
        state.schema.nodes.paragraph,
        state.schema.nodes.heading,
        state.schema.nodes.taskItem,
        state.schema.nodes.decisionItem,
      ].filter((nodeType) => !!nodeType), // Use only the node types existing in the schema ED-6745
      align: 'left' as AlignType,
      className: activeLinkMark.type.match('INSERT|EDIT_INSERTED')
        ? 'hyperlink-floating-toolbar'
        : '',
    };

    switch (activeLinkMark.type) {
      case 'EDIT': {
        const { pos, node } = activeLinkMark;
        const linkMark = node.marks.filter(
          (mark) => mark.type === state.schema.marks.link,
        );
        const link = linkMark[0] && (linkMark[0].attrs as LinkAttributes).href;
        const isValidUrl = isSafeUrl(link);

        const labelOpenLink = formatMessage(
          isValidUrl
            ? linkMessages.openLink
            : linkToolbarCommonMessages.unableToOpenLink,
        );
        const labelUnlink = formatMessage(linkToolbarCommonMessages.unlink);

        const editLink = formatMessage(linkToolbarCommonMessages.editLink);

        return {
          ...hyperLinkToolbar,
          height: 32,
          width: 250,
          items: [
            {
              type: 'button',
              disabled: !isValidUrl,
              target: '_blank',
              href: isValidUrl ? link : null,
              onClick: () => true,
              selected: false,
              title: labelOpenLink,
              showTitle: true,
              appearance: 'link',
              icon: () => (
                <FontAwesomeIcon tw="h-4 w-4" icon={faExternalLink} />
              ),
              // className: 'hyperlink-open-link',
            },
            {
              type: 'separator',
            },
            {
              type: 'button',
              onClick: editInsertedLink(),
              selected: false,
              title: editLink,
              showTitle: true,
              icon: () => <FontAwesomeIcon tw="h-4 w-4" icon={faPenAlt} />,
            },
            {
              type: 'separator',
            },
            {
              type: 'button',
              onClick: removeLink(pos),
              selected: false,
              title: labelUnlink,
              icon: () => <FontAwesomeIcon tw="h-4 w-4" icon={faUnlink} />,
            },
          ],
        };
      }

      case 'EDIT_INSERTED':
      case 'INSERT': {
        let link: string;

        if (isEditLink(activeLinkMark) && activeLinkMark.node) {
          const linkMark = activeLinkMark.node.marks.filter(
            (mark: Mark) => mark.type === state.schema.marks.link,
          );
          link = linkMark[0] && linkMark[0].attrs.href;
        }
        const displayText = isEditLink(activeLinkMark)
          ? getLinkText(activeLinkMark, state)
          : linkState.activeText;

        return {
          ...hyperLinkToolbar,
          height: RECENT_SEARCH_HEIGHT_IN_PX,
          width: RECENT_SEARCH_WIDTH_IN_PX,
          items: [
            {
              type: 'custom',
              render: (
                view?: EditorView,
                idx?: number,
              ):
                | React.ComponentClass
                | React.FC
                | React.ReactElement<any>
                | null => {
                if (!view) {
                  return null;
                }
                return (
                  <RecentList
                    key={idx}
                    displayUrl={link}
                    displayText={displayText || ''}
                    providerFactory={providerFactory}
                    onSubmit={(href, text) => {
                      isEditLink(activeLinkMark)
                        ? updateLink(
                            href,
                            text,
                            activeLinkMark.pos,
                          )(view.state, view.dispatch)
                        : insertLink(
                            activeLinkMark.from,
                            activeLinkMark.to,
                            href,
                            text,
                          )(view.state, view.dispatch);
                      view.focus();
                    }}
                    onBlur={handleBlur(activeLinkMark, view)}
                  />
                );
              },
            },
          ],
        };
      }
      default:
        return undefined;
    }
  }
  return undefined;
};
