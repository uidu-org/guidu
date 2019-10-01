import EditorDoneIcon from '@atlaskit/icon/glyph/editor/done';
import { colors } from '@uidu/theme';
import * as React from 'react';
import { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { ANALYTICS_HOVER_DELAY } from '../constants';
import { messages } from '../i18n';
import { Color as ColorType } from '../Status';

const Button = styled.button`
  height: 24px;
  width: 24px;
  background: ${colors.N900};
  padding: 0;
  border-radius: 4px;
  border: 1px solid ${colors.N0};
  cursor: pointer;
  display: block;
  box-sizing: border-box;
`;

const ButtonWrapper = styled.span`
  border: 1px solid transparent;
  margin: 0 2px;
  font-size: 0;
  display: flex;
  align-items: center;
  padding: 1px;
  border-radius: 6px;
  &:hover {
    border: 1px solid ${colors.N50};
  }
`;

export interface ColorProps {
  value: ColorType;
  tabIndex?: number;
  isSelected?: boolean;
  onClick: (value: ColorType) => void;
  onHover?: (value: ColorType) => void;
  backgroundColor: string;
  borderColor: string;
}

export default class Color extends PureComponent<ColorProps> {
  private hoverStartTime: number = 0;

  render() {
    const {
      tabIndex,
      backgroundColor,
      isSelected,
      borderColor,
      value,
    } = this.props;
    const borderStyle = `1px solid ${borderColor}`;
    return (
      <ButtonWrapper>
        <FormattedMessage {...messages[`${value}Color`]}>
          {label => (
            <Button
              onClick={this.onClick}
              onMouseEnter={this.onMouseEnter}
              onMouseLeave={this.onMouseLeave}
              onMouseDown={this.onMouseDown}
              tabIndex={tabIndex}
              className={`${isSelected ? 'selected' : ''}`}
              title={label as string}
              style={{
                backgroundColor: backgroundColor || 'transparent',
                border: borderStyle,
              }}
            >
              {isSelected && (
                <EditorDoneIcon
                  primaryColor={borderColor}
                  label={label as string}
                />
              )}
            </Button>
          )}
        </FormattedMessage>
      </ButtonWrapper>
    );
  }

  componentWillUnmount() {
    this.hoverStartTime = 0;
  }

  onMouseEnter = () => {
    this.hoverStartTime = Date.now();
  };

  onMouseLeave = () => {
    const { onHover } = this.props;
    const delay = Date.now() - this.hoverStartTime;

    if (delay >= ANALYTICS_HOVER_DELAY && onHover) {
      onHover(this.props.value);
    }
    this.hoverStartTime = 0;
  };

  onMouseDown: React.MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();
  };

  onClick: React.MouseEventHandler<HTMLButtonElement> = e => {
    const { onClick, value } = this.props;
    e.preventDefault();
    onClick(value);
  };
}
