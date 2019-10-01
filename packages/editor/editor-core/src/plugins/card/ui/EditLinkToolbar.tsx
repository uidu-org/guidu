import { ProviderFactory } from '@uidu/editor-common';
import { Node } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import * as React from 'react';
import { Command } from '../../../types';
import {
  RECENT_SEARCH_HEIGHT_IN_PX,
  RECENT_SEARCH_WIDTH_IN_PX,
} from '../../../ui/RecentSearch/ToolbarComponents';
import {
  FloatingToolbarConfig,
  FloatingToolbarItem,
} from '../../floating-toolbar/types';
import HyperlinkToolbar from '../../hyperlink/ui/HyperlinkAddToolbar';
import { hideLinkToolbar, showLinkToolbar } from '../pm-plugins/actions';
import { changeSelectedCardToLink } from '../pm-plugins/doc';
import { displayInfoForCard, findCardInfo } from '../utils';

export type EditLinkToolbarProps = {
  view: EditorView;
  providerFactory: ProviderFactory;
  url: string | undefined;
  text: string;
  node: Node;
  onSubmit?: (href: string, text: string) => void;
};

export class EditLinkToolbar extends React.Component<EditLinkToolbarProps> {
  componentDidUpdate(prevProps: EditLinkToolbarProps) {
    if (prevProps.node !== this.props.node) {
      this.hideLinkToolbar();
    }
  }

  componentWillUnmount() {
    this.hideLinkToolbar();
  }

  private hideLinkToolbar() {
    const { view } = this.props;
    view.dispatch(hideLinkToolbar(view.state.tr));
  }

  render() {
    const { providerFactory, url, text, onSubmit } = this.props;

    return (
      <HyperlinkToolbar
        providerFactory={providerFactory}
        displayUrl={url}
        displayText={text}
        onSubmit={(href, text) => {
          this.hideLinkToolbar();
          if (onSubmit) {
            onSubmit(href, text);
          }
        }}
      />
    );
  }
}

export const editLink: Command = (state, dispatch) => {
  if (dispatch) {
    dispatch(showLinkToolbar(state.tr));
    return true;
  }

  return false;
};

export const buildEditLinkToolbar = ({
  providerFactory,
  node,
}: {
  providerFactory: ProviderFactory;
  node: Node;
}): FloatingToolbarItem<Command> => {
  return {
    type: 'custom',
    render: (view, idx) => {
      if (!view || !providerFactory) {
        return null;
      }

      const displayInfo = displayInfoForCard(node, findCardInfo(view.state));

      return (
        <EditLinkToolbar
          key={idx}
          view={view}
          providerFactory={providerFactory}
          url={displayInfo.url}
          text={displayInfo.title || ''}
          node={node}
          onSubmit={(newHref: string, newText: string) => {
            if (newText !== displayInfo.title || newHref !== displayInfo.url) {
              // we don't support changing link text or href on a smart link,
              // downgrade to hyperlink
              return changeSelectedCardToLink(newText, newHref)(
                view.state,
                view.dispatch,
              );
            }

            return undefined;
          }}
        />
      );
    },
  };
};

export const editLinkToolbarConfig: Partial<FloatingToolbarConfig> = {
  height: RECENT_SEARCH_HEIGHT_IN_PX,
  width: RECENT_SEARCH_WIDTH_IN_PX,
  forcePlacement: true,
};
