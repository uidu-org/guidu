import * as React from 'react';
import { FocusEvent, KeyboardEvent, PureComponent } from 'react';
import { Input } from './styles';

export interface Props {
  autoFocus?: boolean;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onCancel?: () => void;
  placeholder?: string;
  onMouseDown?: Function;
  onKeyDown?: (e: KeyboardEvent<any>) => void;
  onBlur?: Function;
  width?: number;
}

export interface State {
  value?: string;
}

export default class PanelTextInput extends PureComponent<Props, State> {
  private input?: HTMLInputElement;
  private focusTimeoutId: number | undefined;

  constructor(props: Props) {
    super(props);

    this.state = {
      value: props.defaultValue || '',
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    if (nextProps.defaultValue !== this.props.defaultValue) {
      this.setState({
        value: nextProps.defaultValue,
      });
    }
  }

  componentWillUnmount() {
    window.clearTimeout(this.focusTimeoutId);
  }

  onMouseDown = () => {
    const { onMouseDown } = this.props;
    if (onMouseDown) {
      onMouseDown();
    }
  };

  onBlur = (e: FocusEvent<any>) => {
    const { onBlur } = this.props;
    if (onBlur) {
      onBlur(e);
    }
  };

  render() {
    const { placeholder, width } = this.props;
    const { value } = this.state;
    return (
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={this.handleChange}
        onKeyDown={this.handleKeydown}
        onMouseDown={this.onMouseDown}
        onBlur={this.onBlur}
        ref={this.handleRef}
        width={width}
      />
    );
  }

  focus() {
    const { input } = this;
    if (input) {
      input.focus();
    }
  }

  private handleChange = () => {
    const { onChange } = this.props;
    if (this.input) {
      this.setState({
        value: this.input.value,
      });
    }

    if (onChange && this.input) {
      onChange(this.input.value);
    }
  };

  private handleKeydown = (e: KeyboardEvent<any>) => {
    if (e.keyCode === 13 && this.props.onSubmit) {
      e.preventDefault(); // Prevent from submitting if an editor is inside a form.
      this.props.onSubmit(this.input!.value);
    } else if (e.keyCode === 27 && this.props.onCancel) {
      this.props.onCancel();
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }
  };

  private handleRef = (input: HTMLInputElement | null) => {
    if (input instanceof HTMLInputElement) {
      this.input = input;
      if (this.props.autoFocus) {
        // Need this to prevent jumping when we render TextInput inside Portal @see ED-2992
        this.focusTimeoutId = window.setTimeout(() => input.focus());
      }
    } else {
      this.input = undefined;
    }
  };
}
