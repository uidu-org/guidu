import { Color, Status, StatusStyle } from '@atlaskit/status/element';
import { borderRadius, colors } from '@atlaskit/theme';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import * as React from 'react';
import { defineMessages, InjectedIntlProps, injectIntl } from 'react-intl';
import styled from 'styled-components';
import InlineNodeWrapper, {
  createMobileInlineDomRef,
} from '../../../components/InlineNodeWrapper';
import { PortalProviderAPI } from '../../../components/PortalProvider';
import WithPluginState from '../../../components/WithPluginState';
import { EventDispatcher } from '../../../event-dispatcher';
import { getPosHandler, ReactNodeView } from '../../../nodeviews';
import { EditorAppearance } from '../../../types';
import { ZeroWidthSpace } from '../../../utils';
import { pluginKey } from '../plugin';

export const messages = defineMessages({
  placeholder: {
    id: 'fabric.editor.statusPlaceholder',
    defaultMessage: 'Set a status',
    description:
      'Placeholder description for an empty (new) status item in the editor',
  },
});

export interface StyledStatusProps {
  placeholderStyle: boolean;
}

export const StyledStatus = styled.span`
  cursor: pointer;

  display: inline-block;
  opacity: ${(props: StyledStatusProps) => (props.placeholderStyle ? 0.5 : 1)};

  max-width: 100%;

  /* Prevent responsive layouts increasing height of container. */
  line-height: 0;

  * ::selection {
    background-color: transparent;
  }

  .ProseMirror-selectednode & {
    position: relative;
    &::before {
      content: '';
      border: 2px solid ${colors.B200};
      background: transparent;
      border-radius: ${borderRadius()}px;
      box-sizing: border-box;
      position: absolute;
      /* Size selection larger (around) status node */
      top: -1px;
      left: -1px;
      width: calc(100% + 2px);
      height: calc(100% + 2px);
      pointer-events: none;
    }
  }
`;

export interface ContainerProps {
  view: EditorView;
  text?: string;
  color: Color;
  style?: StatusStyle;
  localId?: string;

  eventDispatcher?: EventDispatcher;
}

class StatusContainerView extends React.Component<
  ContainerProps & InjectedIntlProps,
  {}
> {
  constructor(props: ContainerProps & InjectedIntlProps) {
    super(props);
  }

  render() {
    const { eventDispatcher, view } = this.props;
    return (
      <WithPluginState
        plugins={{
          pluginState: pluginKey,
        }}
        editorView={view}
        eventDispatcher={eventDispatcher}
        render={() => {
          const {
            text,
            color,
            localId,
            style,
            intl: { formatMessage },
          } = this.props;

          const statusText = text ? text : formatMessage(messages.placeholder);

          return (
            <StyledStatus placeholderStyle={!text}>
              <Status
                text={statusText}
                color={color}
                localId={localId}
                style={style}
                onClick={this.handleClick}
              />
            </StyledStatus>
          );
        }}
      />
    );
  }

  private handleClick = (event: React.SyntheticEvent<any>) => {
    if (event.nativeEvent.stopImmediatePropagation) {
      event.nativeEvent.stopImmediatePropagation();
    }
    // handling of popup is done in plugin.apply on selection change.
  };
}

export const IntlStatusContainerView = injectIntl(StatusContainerView);

export interface Props {
  editorAppearance?: EditorAppearance;
}

export class StatusNodeView extends ReactNodeView {
  createDomRef() {
    if (this.reactComponentProps.editorAppearance === 'mobile') {
      return createMobileInlineDomRef();
    }

    return super.createDomRef();
  }

  setDomAttrs(node: PMNode, element: HTMLElement) {
    const { color, localId, style } = node.attrs;

    element.dataset.color = color;
    element.dataset.localId = localId;
    element.dataset.style = style;
  }

  render(props: Props) {
    const { editorAppearance } = props;
    const { text, color, localId, style } = this.node.attrs;

    return (
      <InlineNodeWrapper appearance={editorAppearance}>
        <IntlStatusContainerView
          view={this.view}
          text={text}
          color={color}
          style={style}
          localId={localId}
        />
        {editorAppearance !== 'mobile' && ZeroWidthSpace}
      </InlineNodeWrapper>
    );
  }
}

export default function statusNodeView(
  portalProviderAPI: PortalProviderAPI,
  editorAppearance?: EditorAppearance,
) {
  return (node: PMNode, view: EditorView, getPos: getPosHandler): NodeView =>
    new StatusNodeView(node, view, getPos, portalProviderAPI, {
      editorAppearance,
    }).init();
}
