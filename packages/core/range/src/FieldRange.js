// @flow
import React, { Component } from 'react';
import { Input } from './styled';

type Props = {
  /** if the field range needs to be disabled */
  disabled?: boolean,
  /** Maximum value of the range */
  max: number,
  /** Minimum value of the range */
  min: number,
  /** Hook to be invoked on change of the range */
  onChange?: (value: number) => mixed,
  /** Step value for the range */
  step?: number,
  /** Value of the range */
  value: number,
};

type State = {
  value: number,
  valuePercent: string,
};

export default class Slider extends Component<Props, State> {
  props: Props;

  static defaultProps = {
    disabled: false,
    value: 0,
    min: 0,
    max: 100,
    step: 0.1,
    onChange: () => {},
  };

  // eslint-disable-next-line
  inputElement: any;

  constructor(props: Props) {
    super(props);

    this.inputElement = null;
    this.state = {
      value: props.value,
      valuePercent: this.getPercentValue(props.value, props.min, props.max),
    };
  }

  state: State;

  componentWillReceiveProps({ value: nextValue, min, max }: Props) {
    const { value: currentValue } = this.props;

    if (currentValue !== nextValue) {
      const valuePercent = this.getPercentValue(nextValue, min, max);
      this.setState({ value: nextValue, valuePercent });
    }
  }

  getPercentValue = (value: number, min: number, max: number): string => {
    let percent = '0';
    if (min < max && value > min) {
      percent = (((value - min) / (max - min)) * 100).toFixed(2);
    }
    return percent;
  };

  handleChange = (e: Event) => {
    // Event.target is typed as an EventTarget but we need to access properties on it which are
    // specific to HTMLInputElement. Due limitations of the HTML spec flow doesn't know that an
    // EventTarget can have these properties, so we cast it to Element through Object. This is
    // the safest thing we can do in this situation.
    // https://flow.org/en/docs/types/casting/#toc-type-casting-through-any
    const target: HTMLInputElement = (e.target: Object);
    const value = parseFloat(target.value);
    const { max, onChange, min } = this.props;
    const valuePercent = this.getPercentValue(value, min, max);

    this.setState({ value, valuePercent });

    if (onChange) {
      onChange(value);
    }
  };

  render() {
    const { min, max, step, disabled } = this.props;
    const { value, valuePercent } = this.state;

    return (
      <Input
        type="range"
        value={value.toString()}
        min={min}
        max={max}
        step={step}
        onChange={this.handleChange}
        disabled={disabled}
        valuePercent={valuePercent}
      />
    );
  }
}
