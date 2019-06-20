import { Popup } from '@atlaskit/editor-common';
import ExpandIcon from '@atlaskit/icon/glyph/chevron-down';
import { findDomRefAtPos } from 'prosemirror-utils';
import { EditorView } from 'prosemirror-view';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import styled from 'styled-components';
import ToolbarButton from '../../../../components/ToolbarButton';
import { closestElement } from '../../../../utils';
import { toggleContextualMenu } from '../../commands';
import { TableCssClassName as ClassName } from '../../types';
import messages from '../../ui/messages';
import { tableFloatingCellButtonStyles } from '../styles';

export interface Props {
  editorView: EditorView;
  targetCellPosition: number;
  isContextualMenuOpen?: boolean;
  mountPoint?: HTMLElement;
  boundariesElement?: HTMLElement;
  scrollableElement?: HTMLElement;
}

const ButtonWrapper = styled.div`
  ${tableFloatingCellButtonStyles}
`;

class FloatingContextualButton extends React.Component<
  Props & InjectedIntlProps,
  any
> {
  render() {
    const {
      mountPoint,
      scrollableElement,
      editorView,
      targetCellPosition,
      isContextualMenuOpen,
      intl: { formatMessage },
    } = this.props; //  : Props & InjectedIntlProps

    const domAtPos = editorView.domAtPos.bind(editorView);
    const targetCellRef = findDomRefAtPos(targetCellPosition, domAtPos);
    if (!targetCellRef || !(targetCellRef instanceof HTMLElement)) {
      return null;
    }

    const tableWrapper = closestElement(
      targetCellRef,
      `.${ClassName.TABLE_NODE_WRAPPER}`,
    );

    const labelCellOptions = formatMessage(messages.cellOptions);
    return (
      <Popup
        alignX="right"
        alignY="start"
        target={targetCellRef}
        mountTo={tableWrapper || mountPoint}
        boundariesElement={targetCellRef}
        scrollableElement={scrollableElement}
        forcePlacement={true}
        offset={[3, -3]}
      >
        <ButtonWrapper>
          <ToolbarButton
            className={ClassName.CONTEXTUAL_MENU_BUTTON}
            selected={isContextualMenuOpen}
            title={labelCellOptions}
            onClick={this.handleClick}
            iconBefore={<ExpandIcon label={labelCellOptions} />}
          />
        </ButtonWrapper>
      </Popup>
    );
  }

  handleClick = () => {
    const { state, dispatch } = this.props.editorView;

    toggleContextualMenu()(state, dispatch);
  };
}

export default injectIntl(FloatingContextualButton);
