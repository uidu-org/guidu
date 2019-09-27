import ExpandIcon from '@atlaskit/icon/glyph/chevron-down';
import EditorAlignCenterIcon from '@atlaskit/icon/glyph/editor/align-center';
import EditorAlignLeftIcon from '@atlaskit/icon/glyph/editor/align-left';
import EditorAlignRightIcon from '@atlaskit/icon/glyph/editor/align-right';
import * as React from 'react';
import { defineMessages } from 'react-intl';
import Alignment from '../../../../ui/Alignment';
import Dropdown from '../../../../ui/Dropdown';
import ToolbarButton from '../../../../ui/ToolbarButton';
import { AlignmentPluginState, AlignmentState } from '../../pm-plugins/main';
import {
  ExpandIconWrapper,
  Separator,
  TriggerWrapper,
  Wrapper,
} from './styles';

export const iconMap = {
  start: <EditorAlignLeftIcon label="Align left" />,
  end: <EditorAlignRightIcon label="Align right" />,
  center: <EditorAlignCenterIcon label="Align center" />,
};

export const messages = defineMessages({
  alignment: {
    id: 'fabric.editor.alignment',
    defaultMessage: 'Alignment',
    description: 'Aligns text',
  },
});

export interface State {
  isOpen: boolean;
}

export interface Props {
  pluginState: AlignmentPluginState;
  changeAlignment: (align: AlignmentState) => void;
  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
  popupsScrollableElement?: HTMLElement;
  isReducedSpacing?: boolean;
  disabled?: boolean;
}

class AlignmentToolbar extends React.Component<Props, State> {
  state: State = {
    isOpen: false,
  };

  render() {
    const { isOpen } = this.state;
    const {
      popupsMountPoint,
      popupsBoundariesElement,
      popupsScrollableElement,
      isReducedSpacing,
      pluginState,
      disabled,
    } = this.props;

    return (
      <Wrapper>
        <Dropdown
          mountTo={popupsMountPoint}
          boundariesElement={popupsBoundariesElement}
          scrollableElement={popupsScrollableElement}
          isOpen={this.state.isOpen}
          handleClickOutside={this.hide}
          handleEscapeKeydown={this.hide}
          fitWidth={242}
          fitHeight={80}
          trigger={
            <ToolbarButton
              spacing={isReducedSpacing ? 'none' : 'default'}
              disabled={disabled}
              selected={isOpen}
              title="Text alignment"
              aria-label="Text alignment"
              className="align-btn"
              onClick={this.toggleOpen}
              iconBefore={
                <TriggerWrapper>
                  {iconMap[pluginState.align]}
                  <ExpandIconWrapper>
                    <ExpandIcon label={'Alignment'} />
                  </ExpandIconWrapper>
                </TriggerWrapper>
              }
            />
          }
        >
          <Alignment
            onClick={align => this.changeAlignment(align)}
            selectedAlignment={pluginState.align}
          />
        </Dropdown>
        <Separator />
      </Wrapper>
    );
  }

  private changeAlignment = (align: AlignmentState) => {
    this.toggleOpen();
    return this.props.changeAlignment(align);
  };

  private toggleOpen = () => {
    this.handleOpenChange({ isOpen: !this.state.isOpen });
  };

  private handleOpenChange = ({ isOpen }: { isOpen: boolean }) => {
    this.setState({ isOpen });
  };

  private hide = () => {
    if (this.state.isOpen === true) {
      this.setState({ isOpen: false });
    }
  };
}

export default AlignmentToolbar;
