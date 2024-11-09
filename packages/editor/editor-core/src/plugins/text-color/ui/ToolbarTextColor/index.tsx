import ExpandIcon from '@atlaskit/icon/glyph/chevron-down';
import EditorBackgroundColorIcon from '@atlaskit/icon/glyph/editor/background-color';
import Button from '@uidu/button';
import { ColorPalette } from '@uidu/editor-common/ui-color';
import Popup from '@uidu/popup';
import { EditorView } from 'prosemirror-view';
import React, { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
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

export interface Props {
  pluginState: TextColorPluginState;
  editorView: EditorView;
  isReducedSpacing?: boolean;
  showMoreColorsToggle?: boolean;
  disabled?: boolean;
}

function ToolbarTextColor(props: Props) {
  const {
    pluginState: { paletteExpanded, defaultColor },
    editorView: { state, dispatch },
  } = props;
  const intl = useIntl();
  const [isOpen, setIsOpen] = useState(false);
  const [isShowingMoreColors, setIsShowingMoreColors] = useState(false);

  const changeColor = (color: string) =>
    commands.changeColor(color)(state, dispatch);

  const changeTextColor = (color: string, disabled: boolean) => {
    if (!disabled) {
      setIsOpen(false);

      return changeColor(color);
    }

    return false;
  };

  const hide = () => {
    setIsOpen(false);
  };

  const handleShowMoreToggle = () => {
    setIsShowingMoreColors((prev) => !prev);
  };

  const { isReducedSpacing, pluginState, showMoreColorsToggle, disabled } =
    props;

  const labelTextColor = intl.formatMessage(messages.textColor);

  const palette =
    isShowingMoreColors && paletteExpanded
      ? paletteExpanded
      : pluginState.palette;

  return (
    <MenuWrapper>
      <Popup
        isOpen={isOpen}
        onClose={hide}
        trigger={(triggerProps) => (
          <ToolbarButton
            {...triggerProps}
            onClick={() => setIsOpen((prev) => !prev)}
            spacing={isReducedSpacing ? 'none' : 'default'}
            disabled={disabled || pluginState.disabled}
            selected={isOpen}
            aria-label={labelTextColor}
            title={labelTextColor}
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
        )}
        content={() => (
          <>
            <ColorPalette
              palette={palette}
              onClick={(color) => changeTextColor(color, pluginState.disabled)}
              selectedColor={pluginState.color}
            />
            {showMoreColorsToggle && (
              <ShowMoreWrapper>
                <Button
                  appearance="subtle"
                  onClick={handleShowMoreToggle}
                  iconBefore={<EditorBackgroundColorIcon label="" />}
                >
                  {intl.formatMessage(
                    isShowingMoreColors
                      ? messages.lessColors
                      : messages.moreColors,
                  )}
                </Button>
              </ShowMoreWrapper>
            )}
          </>
        )}
      />
      {/* <Dropdown
        mountTo={popupsMountPoint}
        boundariesElement={popupsBoundariesElement}
        scrollableElement={popupsScrollableElement}
        isOpen={isOpen && !pluginState.disabled}
        handleClickOutside={hide}
        handleEscapeKeydown={hide}
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
            onClick={toggleOpen}
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
          onClick={(color) => changeTextColor(color, pluginState.disabled)}
          selectedColor={pluginState.color}
        />
        {showMoreColorsToggle && (
          <ShowMoreWrapper>
            <Button
              appearance="subtle"
              onClick={handleShowMoreToggle}
              iconBefore={<EditorBackgroundColorIcon label="" />}
            >
              {intl.formatMessage(
                isShowingMoreColors ? messages.lessColors : messages.moreColors,
              )}
            </Button>
          </ShowMoreWrapper>
        )}
      </Dropdown> */}
      <Separator />
    </MenuWrapper>
  );
}

export default ToolbarTextColor;
