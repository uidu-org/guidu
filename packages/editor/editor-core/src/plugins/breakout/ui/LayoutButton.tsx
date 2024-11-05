import CollapseIcon from '@atlaskit/icon/glyph/editor/collapse';
import ExpandIcon from '@atlaskit/icon/glyph/editor/expand';
import { Popup } from '@uidu/editor-common';
import { colors } from '@uidu/theme';
import { Node as PMNode } from 'prosemirror-model';
import { findParentDomRefOfType } from 'prosemirror-utils';
import { EditorView } from 'prosemirror-view';
import React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import styled from 'styled-components';
import commonMessages from '../../../messages';
import ToolbarButton from '../../../ui/ToolbarButton';
import { removeBreakout } from '../commands/remove-breakout';
import { BreakoutMode, setBreakoutMode } from '../commands/set-breakout-mode';
import { BreakoutCssClassName } from '../constants';
import { getPluginState } from '../plugin-key';
import { getBreakoutMode } from '../utils/get-breakout-mode';
import { isBreakoutMarkAllowed } from '../utils/is-breakout-mark-allowed';

const { B300, N300, N20A } = colors;

const Wrapper = styled.div`
  button {
    background: ${N20A};
    color: ${N300};
    :hover {
      background: ${B300};
      color: white !important;
    }
  }
`;

interface Props {
  editorView: EditorView;
  mountPoint?: HTMLElement;
  node: PMNode | null;
  boundariesElement?: HTMLElement;
  scrollableElement?: HTMLElement;
  handleClick?: Function;
}

const BREAKOUT_MODE: Record<string, BreakoutMode> = {
  FULL_WIDTH: 'full-width',
  CENTER: 'center',
  WIDE: 'wide',
};

const getNextBreakoutMode = (currentMode?: BreakoutMode): BreakoutMode => {
  if (currentMode === BREAKOUT_MODE.FULL_WIDTH) {
    return BREAKOUT_MODE.CENTER;
  } else if (currentMode === BREAKOUT_MODE.WIDE) {
    return BREAKOUT_MODE.FULL_WIDTH;
  }

  return BREAKOUT_MODE.WIDE;
};

const getTitle = (layout?: BreakoutMode) => {
  switch (layout) {
    case BREAKOUT_MODE.FULL_WIDTH:
      return commonMessages.layoutFixedWidth;
    case BREAKOUT_MODE.WIDE:
      return commonMessages.layoutFullWidth;
    default:
      return commonMessages.layoutWide;
  }
};

class LayoutButton extends React.Component<Props & WrappedComponentProps, {}> {
  static displayName = 'LayoutButton';

  private handleClick = (breakoutMode: BreakoutMode) => () => {
    const { state, dispatch } = this.props.editorView;
    if (
      [BREAKOUT_MODE.WIDE, BREAKOUT_MODE.FULL_WIDTH].indexOf(breakoutMode) !==
      -1
    ) {
      setBreakoutMode(breakoutMode)(state, dispatch);
    } else {
      removeBreakout()(state, dispatch);
    }
  };

  render() {
    const {
      intl: { formatMessage },
      mountPoint,
      boundariesElement,
      scrollableElement,
      editorView,
      node,
    } = this.props;

    const { state } = editorView;

    console.log('state', state);
    console.log('node', node);
    console.log('isBreakoutMarkAllowed(state)', isBreakoutMarkAllowed(state));

    if (!node || !isBreakoutMarkAllowed(state)) {
      return null;
    }

    const breakoutMode = getBreakoutMode(editorView.state);
    const title = formatMessage(getTitle(breakoutMode));
    const nextBreakoutMode = getNextBreakoutMode(breakoutMode);
    const { selection } = state;

    let pluginState = getPluginState(state);

    let element = findParentDomRefOfType(
      pluginState.breakoutNode.type,
      editorView.domAtPos.bind(editorView),
    )(selection) as HTMLElement;

    let closestEl = element.querySelector(
      `.${BreakoutCssClassName.BREAKOUT_MARK_DOM}`,
    ) as HTMLElement;

    if (closestEl && closestEl.firstChild) {
      element = closestEl.firstChild as HTMLElement;
    }

    return (
      <Popup
        ariaLabel={title}
        target={element}
        offset={[5, 0]}
        alignY="start"
        alignX="end"
        mountTo={mountPoint}
        boundariesElement={boundariesElement}
        scrollableElement={scrollableElement}
        stick={true}
        forcePlacement={true}
      >
        <Wrapper>
          <ToolbarButton
            title={title}
            onClick={this.handleClick(nextBreakoutMode)}
            iconBefore={
              breakoutMode === BREAKOUT_MODE.FULL_WIDTH ? (
                <CollapseIcon label={title} />
              ) : (
                <ExpandIcon label={title} />
              )
            }
          />
        </Wrapper>
      </Popup>
    );
  }
}

export default injectIntl(LayoutButton);
