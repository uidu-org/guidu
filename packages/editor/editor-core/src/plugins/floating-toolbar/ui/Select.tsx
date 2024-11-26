import React, { Component } from 'react';
import Select from 'react-select';
import styled from 'styled-components';

export interface RenderOptionsPropsT<T> {
  hide: () => void;
  dispatchCommand: (command: T) => void;
}

export interface SelectOption {
  value: string;
  label: string;
  selected?: boolean;
  disabled?: boolean;
  hidden?: boolean;
}

export interface Props {
  hideExpandIcon?: boolean;
  options: SelectOption[];
  dispatchCommand: (command: Function) => void;
  mountPoint?: HTMLElement;
  boundariesElement?: HTMLElement;
  scrollableElement?: HTMLElement;
  defaultValue?: SelectOption;
  placeholder?: string;
  // onChange?: (change: ValueType<SelectOption>) => void;
  onChange?: (change: any) => void;
  width?: number;
}

export interface State {
  isOpen: boolean;
}

const SelectWrapper = styled.div<{
  width: number;
}>`
  width: ${(props) => props.width}px;
`;

export default class Search extends Component<Props, State> {
  state: State = { isOpen: false };
  render() {
    const {
      options,
      onChange,
      defaultValue,
      placeholder,
      width = 200,
    } = this.props;
    return (
      <SelectWrapper width={width}>
        <Select
          options={options}
          value={defaultValue}
          onChange={onChange}
          placeholder={placeholder}
          spacing={'compact'}
          // menuPlacement="auto"
        />
      </SelectWrapper>
    );
  }
}
