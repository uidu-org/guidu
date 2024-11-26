import CollapseIcon from '@atlaskit/icon/glyph/editor/collapse';
import ExpandIcon from '@atlaskit/icon/glyph/editor/expand';
import { TableLayout } from '@uidu/adf-schema';
import { Popup } from '@uidu/editor-common';
import classnames from 'classnames';
import { EditorView } from 'prosemirror-view';
import React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import commonMessages from '../../../../messages';
import ToolbarButton from '../../../../ui/ToolbarButton';
import { toggleTableLayout } from '../../commands';
import { TableCssClassName as ClassName } from '../../types';

export interface Props {
  editorView: EditorView;
  targetRef?: HTMLElement;
  mountPoint?: HTMLElement;
  boundariesElement?: HTMLElement;
  scrollableElement?: HTMLElement;
  isResizing?: boolean;
  layout?: TableLayout;
}

const POPUP_OFFSET = [
  0,
  // -22 pixels to align y position with
  // the columns controls
  -22,
];

const getTitle = (layout: TableLayout) => {
  switch (layout) {
    case 'default':
      return commonMessages.layoutWide;
    case 'wide':
      return commonMessages.layoutFullWidth;
    default:
      return commonMessages.layoutFixedWidth;
  }
};

class LayoutButton extends React.Component<Props & WrappedComponentProps, any> {
  static displayName = 'LayoutButton';

  render() {
    const {
      intl: { formatMessage },
      mountPoint,
      boundariesElement,
      scrollableElement,
      targetRef,
      isResizing,
      layout = 'default',
    } = this.props;
    if (!targetRef) {
      return null;
    }
    const title = formatMessage(getTitle(layout));

    return (
      <Popup
        ariaLabel={title}
        offset={POPUP_OFFSET}
        target={targetRef}
        alignY="start"
        alignX="end"
        stick={true}
        mountTo={mountPoint}
        boundariesElement={boundariesElement}
        scrollableElement={scrollableElement}
        forcePlacement={true}
      >
        <div
          className={classnames(ClassName.LAYOUT_BUTTON, {
            [ClassName.IS_RESIZING]: isResizing,
          })}
        >
          <ToolbarButton
            title={title}
            onClick={this.handleClick}
            iconBefore={
              layout === 'full-width' ? (
                <CollapseIcon label={title} />
              ) : (
                <ExpandIcon label={title} />
              )
            }
          />
        </div>
      </Popup>
    );
  }

  shouldComponentUpdate(nextProps: Props) {
    return (
      this.props.targetRef !== nextProps.targetRef ||
      this.props.layout !== nextProps.layout ||
      this.props.isResizing !== nextProps.isResizing
    );
  }

  private handleClick = () => {
    const { state, dispatch } = this.props.editorView;
    toggleTableLayout(state, dispatch);
  };
}

export default injectIntl(LayoutButton);
