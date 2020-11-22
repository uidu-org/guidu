import { ButtonItem, MenuGroup } from '@uidu/menu';
import React, { Component } from 'react';

export default class Members extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.value,
    };
  }

  getValue() {
    return this.state.selected;
  }

  isPopup() {
    return true;
  }

  onChange = (e, selected) => {
    e.preventDefault();
    this.setState(
      {
        selected,
      },
      () => this.props.api.stopEditing(),
    );
  };

  render() {
    const {
      value,
      colDef: { cellEditorParams: params },
      column: { actualWidth },
    } = this.props;
    const { options } = params;

    return (
      <div
        tabIndex={1} // important - without this the keypresses wont be caught
        style={{ width: actualWidth }}
      >
        <MenuGroup>
          {options.map((option) => (
            <ButtonItem onClick={(e) => this.onChange(e, option.name)}>
              {option.name}
            </ButtonItem>
          ))}
        </MenuGroup>
      </div>
    );
  }
}
