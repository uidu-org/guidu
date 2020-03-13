import { FieldTextStateless } from '@uidu/field-text';
import { gridSize } from '@uidu/theme';
import * as React from 'react';
import { FormEvent, PureComponent } from 'react';
import styled from 'styled-components';
import ColorPalette from './internal/color-palette';
import { Color } from './Status';

export type ColorType = Color;

const FieldTextWrapper = styled.div`
  margin: 0 ${gridSize()}px;
`;

export interface Props {
  selectedColor: ColorType;
  text: string;
  onEnter: () => void;
  onColorClick: (value: ColorType) => void;
  onColorHover?: (value: ColorType) => void;
  onTextChanged: (value: string) => void;
  autoFocus?: boolean;
}

export class StatusPicker extends PureComponent<Props, any> {
  private fieldTextWrapperKey = Math.random().toString();
  private colorPaletteKey = Math.random().toString();

  static defaultProps = {
    autoFocus: true,
  };

  render() {
    const { text, selectedColor, onColorClick, onColorHover } = this.props;

    // Using <React.Fragment> instead of [] to workaround Enzyme
    // (https://github.com/airbnb/enzyme/issues/1149)
    return (
      <>
        <FieldTextWrapper key={this.fieldTextWrapperKey}>
          <FieldTextStateless
            value={text}
            onChange={this.onChange}
            onKeyPress={this.onKeyPress}
            ref={this.handleInputRef}
            autoComplete="off"
            isSpellCheckEnabled={false}
          />
        </FieldTextWrapper>
        <ColorPalette
          key={this.colorPaletteKey}
          onClick={onColorClick}
          onHover={onColorHover}
          selectedColor={selectedColor}
        />
      </>
    );
  }

  private onChange = (evt: FormEvent<HTMLInputElement>) => {
    // @ts-ignore
    this.props.onTextChanged(evt.target.value);
  };

  private onKeyPress = (event: React.KeyboardEvent<Element>) => {
    if (event.key === 'Enter') {
      this.props.onEnter();
    }
  };

  private handleInputRef = (ref?: HTMLInputElement) => {
    if (ref && this.props.autoFocus) {
      // Defer to prevent editor scrolling to top (See FS-3227, also ED-2992)
      setTimeout(() => {
        ref.focus();
      });
    }
  };
}
