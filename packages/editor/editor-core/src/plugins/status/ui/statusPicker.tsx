import { akEditorFloatingDialogZIndex, Popup } from '@uidu/editor-common';
import {
  ColorType as Color,
  StatusPicker as AkStatusPicker,
} from '@uidu/status/picker';
import { borderRadius, colors, gridSize } from '@uidu/theme';
import React from 'react';
import styled from 'styled-components';
import { dropShadow } from '../../../ui/styles';
import withOuterListeners from '../../../ui/with-outer-listeners';
import { DEFAULT_STATUS } from '../actions';
import { StatusType } from '../plugin';

const PopupWithListeners = withOuterListeners(Popup);

export enum InputMethod {
  blur = 'blur',
  escKey = 'escKey',
  enterKey = 'enterKey',
}

export interface Props {
  target: HTMLElement | null;
  closeStatusPicker: () => void;
  onSelect: (status: StatusType) => void;
  onTextChanged: (status: StatusType, isNew: boolean) => void;
  onEnter: (status: StatusType) => void;
  isNew?: boolean;
  defaultText?: string;
  defaultColor?: Color;
  defaultLocalId?: string;
}

export interface State {
  color: Color;
  text: string;
  localId?: string;
  isNew?: boolean;
}

const PickerContainer = styled.div`
  background: ${colors.N0};
  padding: ${gridSize()}px 0;
  border-radius: ${borderRadius()}px;
  ${dropShadow};
  input {
    text-transform: uppercase;
  }
`;

export class StatusPickerWithoutAnalytcs extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = this.extractStateFromProps(props);
  }

  private reset() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<State>,
    _snapshot?: any,
  ): void {
    const element = this.props.target;

    if (prevProps.target !== element) {
      const newState = this.extractStateFromProps(this.props);
      this.setState(newState);

      this.reset();
    }
  }

  private extractStateFromProps(props: Props): State {
    const { defaultColor, defaultText, defaultLocalId, isNew } = props;
    return {
      color: defaultColor || DEFAULT_STATUS.color,
      text: defaultText || DEFAULT_STATUS.text,
      localId: defaultLocalId,
      isNew,
    } as State;
  }

  handleClickOutside = (event: Event) => {
    event.preventDefault();
    this.props.closeStatusPicker();
  };

  private handleEscapeKeydown = (event: Event) => {
    event.preventDefault();
    this.props.onEnter(this.state);
  };

  render() {
    const { isNew, target } = this.props;
    const { color, text } = this.state;
    return (
      target && (
        <PopupWithListeners
          target={target}
          offset={[0, 8]}
          handleClickOutside={this.handleClickOutside}
          handleEscapeKeydown={this.handleEscapeKeydown}
          zIndex={akEditorFloatingDialogZIndex}
          fitHeight={40}
        >
          <PickerContainer onClick={this.handlePopupClick}>
            <AkStatusPicker
              autoFocus={isNew}
              selectedColor={color}
              text={text}
              onColorClick={this.onColorClick}
              onColorHover={this.onColorHover}
              onTextChanged={this.onTextChanged}
              onEnter={this.onEnter}
            />
          </PickerContainer>
        </PopupWithListeners>
      )
    );
  }

  private onColorHover = (color: Color) => {};

  private onColorClick = (color: Color) => {
    const { text, localId } = this.state;

    if (color === this.state.color) {
      // closes status box and commits colour
      this.onEnter();
    } else {
      this.setState({ color });
      this.props.onSelect({
        text,
        color,
        localId,
      });
    }
  };

  private onTextChanged = (text: string) => {
    const { color, localId } = this.state;
    this.setState({ text });
    this.props.onTextChanged(
      {
        text,
        color,
        localId,
      },
      !!this.props.isNew,
    );
  };

  private onEnter = () => {
    this.props.onEnter(this.state);
  };

  // cancel bubbling to fix clickOutside logic:
  // popup re-renders its content before the click event bubbles up to the document
  // therefore click target element would be different from the popup content
  private handlePopupClick = (event: React.MouseEvent<HTMLElement>) =>
    event.nativeEvent.stopImmediatePropagation();
}

export default StatusPickerWithoutAnalytcs;
