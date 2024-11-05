import ExpandIcon from '@atlaskit/icon/glyph/chevron-down';
import EditorBackgroundColorIcon from '@atlaskit/icon/glyph/editor/background-color';
import Button from '@uidu/button';
import { akEditorMenuZIndex } from '@uidu/editor-common';
import {
  ColorPalette,
  textColorPalette as originalTextColors,
} from '@uidu/editor-common/ui-color';
import { EditorView } from 'prosemirror-view';
import React from 'react';
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import { withAnalytics } from '../../../../analytics';
import Dropdown from '../../../../ui/Dropdown';
import {
  ExpandIconWrapper,
  MenuWrapper,
  Separator,
  TriggerWrapper,
} from '../../../../ui/styles';
import ToolbarButton from '../../../../ui/ToolbarButton';
import * as commands from '../../commands/change-color';
import type { TextColorPluginState } from '../../pm-plugins/main';
import { EditorTextColorIcon } from './icon';
import {
  disabledRainbow,
  rainbow,
  ShowMoreWrapper,
  TextColorIconBar,
  TextColorIconWrapper,
} from './styles';
const EXPERIMENT_NAME: string = 'editor.toolbarTextColor.moreColors';
const EXPERIMENT_GROUP_CONTROL: string = 'control';
const EXPERIMENT_GROUP_SUBJECT: string = 'subject';

export const messages = defineMessages({
  textColor: {
    id: 'uidu.editor-core.textColor',
    defaultMessage: 'Text color',
    description: '',
  },
  moreColors: {
    id: 'uidu.editor-core.textColor.moreColors',
    defaultMessage: 'More colors',
    description: 'More colors',
  },
  lessColors: {
    id: 'uidu.editor-core.textColor.lessColors',
    defaultMessage: 'Fewer colors',
    description: 'Fewer colors',
  },
});

export interface State {
  isOpen: boolean;
  isShowingMoreColors: boolean;
}

export interface Props {
  pluginState: TextColorPluginState;
  editorView: EditorView;
  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
  popupsScrollableElement?: HTMLElement;
  isReducedSpacing?: boolean;
  showMoreColorsToggle?: boolean;
  disabled?: boolean;
}

interface HandleOpenChangeData {
  isOpen: boolean;
  logCloseEvent: boolean;
}

class ToolbarTextColor extends React.Component<
  Props & WrappedComponentProps,
  State
> {
  state: State = {
    isOpen: false,
    isShowingMoreColors: false,
  };

  changeColor = (color: string) =>
    commands.changeColor(color)(
      this.props.editorView.state,
      this.props.editorView.dispatch,
    );

  render() {
    const { isOpen, isShowingMoreColors } = this.state;
    const {
      popupsMountPoint,
      popupsBoundariesElement,
      popupsScrollableElement,
      isReducedSpacing,
      pluginState,
      pluginState: { paletteExpanded },
      intl: { formatMessage },
      showMoreColorsToggle,
      disabled,
    } = this.props;

    const labelTextColor = formatMessage(messages.textColor);

    const palette =
      isShowingMoreColors && paletteExpanded
        ? paletteExpanded
        : pluginState.palette;

    return (
      <MenuWrapper>
        <Dropdown
          mountTo={popupsMountPoint}
          boundariesElement={popupsBoundariesElement}
          scrollableElement={popupsScrollableElement}
          isOpen={isOpen && !pluginState.disabled}
          handleClickOutside={this.hide}
          handleEscapeKeydown={this.hide}
          fitWidth={242}
          fitHeight={80}
          zIndex={akEditorMenuZIndex}
          trigger={
            <ToolbarButton
              spacing={isReducedSpacing ? 'none' : 'default'}
              disabled={disabled || pluginState.disabled}
              selected={isOpen}
              aria-label={labelTextColor}
              title={labelTextColor}
              onClick={this.toggleOpen}
              iconBefore={
                <TriggerWrapper>
                  <TextColorIconWrapper>
                    <EditorTextColorIcon />
                    <TextColorIconBar
                      selectedColor={
                        pluginState.color !== pluginState.defaultColor &&
                        pluginState.color
                      }
                      gradientColors={
                        pluginState.disabled ? disabledRainbow : rainbow
                      }
                    />
                  </TextColorIconWrapper>
                  <ExpandIconWrapper>
                    <ExpandIcon label={labelTextColor} />
                  </ExpandIconWrapper>
                </TriggerWrapper>
              }
            />
          }
        >
          <ColorPalette
            palette={palette}
            onClick={(color) =>
              this.changeTextColor(color, pluginState.disabled)
            }
            selectedColor={pluginState.color}
          />
          {showMoreColorsToggle && (
            <ShowMoreWrapper>
              <Button
                appearance="subtle"
                onClick={this.handleShowMoreToggle}
                iconBefore={<EditorBackgroundColorIcon label="" />}
              >
                {formatMessage(
                  isShowingMoreColors
                    ? messages.lessColors
                    : messages.moreColors,
                )}
              </Button>
            </ShowMoreWrapper>
          )}
        </Dropdown>
        <Separator />
      </MenuWrapper>
    );
  }

  private changeTextColor = withAnalytics(
    'uidu.editor-core.format.textcolor.button',
    (color: string, disabled: boolean) => {
      if (!disabled) {
        const {
          pluginState: { palette, paletteExpanded, defaultColor },
        } = this.props;
        const { isShowingMoreColors } = this.state;

        // we store color names in analytics
        const swatch = (paletteExpanded || palette).find(
          (sw) => sw.value === color,
        );
        const isNewColor =
          color !== defaultColor &&
          !originalTextColors.some((col) => col.value === color);

        this.handleOpenChange({
          isOpen: false,
          logCloseEvent: false,
        });
        return this.changeColor(color);
      }

      return false;
    },
  );

  private toggleOpen = () => {
    this.handleOpenChange({ isOpen: !this.state.isOpen, logCloseEvent: true });
  };

  private handleOpenChange = ({
    isOpen,
    logCloseEvent,
  }: HandleOpenChangeData) => {
    const {
      pluginState: { palette, color },
    } = this.props;
    const { isShowingMoreColors } = this.state;

    // pre-expand if a non-standard colour has been selected
    const isExtendedPaletteSelected: boolean = !palette.find(
      (swatch) => swatch.value === color,
    );

    this.setState({
      isOpen,
      isShowingMoreColors: isExtendedPaletteSelected || isShowingMoreColors,
    });

    if (logCloseEvent) {
    }
  };

  private hide = () => {
    const { isOpen, isShowingMoreColors } = this.state;

    if (isOpen === true) {
      this.setState({ isOpen: false });
    }
  };

  private handleShowMoreToggle = () => {
    this.setState((state) => {
      return {
        isShowingMoreColors: !state.isShowingMoreColors,
      };
    });
  };
}

export default injectIntl(ToolbarTextColor);
