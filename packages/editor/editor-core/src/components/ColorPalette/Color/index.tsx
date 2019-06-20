import * as React from 'react';
import { PureComponent } from 'react';
import { defineMessages, injectIntl, InjectedIntlProps } from 'react-intl';
import EditorDoneIcon from '@atlaskit/icon/glyph/editor/done';
import { colors } from '@atlaskit/theme';
import { Button, ButtonWrapper } from './styles';

// IMO these should live inside @atlaskit/theme
const messages = defineMessages({
  '#172b4d': {
    id: 'fabric.theme.#172b4d',
    defaultMessage: 'Dark gray',
    description: 'Name of a color.',
  },
  '#97a0af': {
    id: 'fabric.theme.#97a0af',
    defaultMessage: 'Light grey',
    description: 'Name of a color.',
  },
  '#6554c0': {
    id: 'fabric.theme.#6554c0',
    defaultMessage: 'Purple',
    description: 'Name of a color.',
  },
  '#00b8d9': {
    id: 'fabric.theme.#00b8d9',
    defaultMessage: 'Teal',
    description: 'Name of a color.',
  },
  '#36b37e': {
    id: 'fabric.theme.#36b37e',
    defaultMessage: 'Green',
    description: 'Name of a color.',
  },
  '#ff5630': {
    id: 'fabric.theme.#ff5630',
    defaultMessage: 'Red',
    description: 'Name of a color.',
  },
  '#ff991f': {
    id: 'fabric.theme.#ff991f',
    defaultMessage: 'Orange',
    description: 'Name of a color.',
  },
  selected: {
    id: 'fabric.editor.selected',
    defaultMessage: 'Selected',
    description: 'If the item is selected or not.',
  },
});

export interface Props {
  value: string;
  label: string;
  tabIndex?: number;
  isSelected?: boolean;
  onClick: (value: string) => void;
  borderColor: string;
  checkMarkColor?: string;
}

class Color extends PureComponent<Props & InjectedIntlProps> {
  render() {
    const {
      tabIndex,
      value,
      label,
      isSelected,
      borderColor,
      checkMarkColor = colors.N0,
      intl: { formatMessage },
    } = this.props;
    const borderStyle = `1px solid ${borderColor}`;
    return (
      <ButtonWrapper>
        <Button
          onClick={this.onClick}
          onMouseDown={this.onMouseDown}
          tabIndex={tabIndex}
          className={`${isSelected ? 'selected' : ''}`}
          title={
            value && messages[value as keyof typeof messages]
              ? formatMessage(messages[value as keyof typeof messages])
              : label
          }
          style={{
            backgroundColor: value || 'transparent',
            border: borderStyle,
          }}
        >
          {isSelected && (
            <EditorDoneIcon
              primaryColor={checkMarkColor}
              label={formatMessage(messages.selected)}
            />
          )}
        </Button>
      </ButtonWrapper>
    );
  }

  onMouseDown = (e: React.MouseEvent<{}>) => {
    e.preventDefault();
  };

  onClick = (e: React.MouseEvent<{}>) => {
    const { onClick, value } = this.props;
    e.preventDefault();
    onClick(value);
  };
}

export default injectIntl(Color);
