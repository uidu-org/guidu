import Item, { ItemGroup } from '@uidu/item';
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
        <ItemGroup>
          {options.map(option => (
            <Item onClick={e => this.onChange(e, option.name)}>
              {option.name}
            </Item>
          ))}
        </ItemGroup>
      </div>
    );
  }
}
