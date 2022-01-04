import { Color, Status, StatusStyle } from '@uidu/status/element';
import { borderRadius, colors } from '@uidu/theme';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import React from 'react';
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import styled from 'styled-components';
import { EventDispatcher } from '../../../event-dispatcher';
import { getPosHandler, ReactNodeView } from '../../../nodeviews';
import InlineNodeWrapper, {
  createMobileInlineDomRef,
} from '../../../ui/InlineNodeWrapper';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
import { ZeroWidthSpace } from '../../../utils';
import { StatusPluginOptions } from '../types';

export const messages = defineMessages({
  placeholder: {
    id: 'uidu.editor-core.statusPlaceholder',
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
  ContainerProps & WrappedComponentProps,
  {}
> {
  static displayName = 'StatusContainerView';

  constructor(props: ContainerProps & WrappedComponentProps) {
    super(props);
  }

  render() {
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
  options?: StatusPluginOptions;
}

export class StatusNodeView extends ReactNodeView<Props> {
  createDomRef() {
    if (
      this.reactComponentProps.options &&
      this.reactComponentProps.options.useInlineWrapper
    ) {
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
    const { options } = props;
    const { text, color, localId, style } = this.node.attrs;

    return (
      <InlineNodeWrapper useInlineWrapper={options && options.useInlineWrapper}>
        <IntlStatusContainerView
          view={this.view}
          text={text}
          color={color}
          style={style}
          localId={localId}
        />
        {options && options.allowZeroWidthSpaceAfter && ZeroWidthSpace}
      </InlineNodeWrapper>
    );
  }
}

export default function statusNodeView(
  portalProviderAPI: PortalProviderAPI,
  options?: StatusPluginOptions,
) {
  return (node: PMNode, view: EditorView, getPos: getPosHandler): NodeView =>
    new StatusNodeView(node, view, getPos, portalProviderAPI, {
      options,
    }).init();
}
