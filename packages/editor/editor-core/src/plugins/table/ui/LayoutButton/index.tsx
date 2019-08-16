import { TableLayout } from '@atlaskit/adf-schema';
import CollapseIcon from '@atlaskit/icon/glyph/editor/collapse';
import ExpandIcon from '@atlaskit/icon/glyph/editor/expand';
import { Popup } from '@uidu/editor-common';
import classnames from 'classnames';
import { findTable } from 'prosemirror-utils';
import { EditorView } from 'prosemirror-view';
import * as React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import ToolbarButton from '../../../../components/ToolbarButton';
import commonMessages from '../../../../messages';
import { toggleTableLayoutWithAnalytics } from '../../commands-with-analytics';
import { TableCssClassName as ClassName } from '../../types';

export interface Props {
  editorView: EditorView;
  targetRef?: HTMLElement;
  mountPoint?: HTMLElement;
  boundariesElement?: HTMLElement;
  scrollableElement?: HTMLElement;
  isResizing?: boolean;
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
  render() {
    const {
      intl: { formatMessage },
      mountPoint,
      boundariesElement,
      scrollableElement,
      targetRef,
      editorView,
      isResizing,
    } = this.props;
    if (!targetRef) {
      return null;
    }
    const table = findTable(editorView.state.selection);
    if (!table) {
      return false;
    }
    const { layout } = table.node.attrs;
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

  private handleClick = () => {
    const { state, dispatch } = this.props.editorView;
    toggleTableLayoutWithAnalytics()(state, dispatch);
  };
}

export default injectIntl(LayoutButton);
