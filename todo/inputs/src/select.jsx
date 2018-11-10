import React, { Component } from 'react';
import ComponentCommon from './component-common';
import SelectControl from './controls/select';

import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';

export default class Select extends Component {
  handleChange = (option, actionMeta) => {
    const { multi, name, onSetValue, onChange } = this.props;
    if (multi) {
      if (option.length > 0) {
        onSetValue(option);
        onChange(name, option, actionMeta);
      } else {
        onSetValue('');
        onChange(name, '');
      }
    } else if (option) {
      onSetValue(option);
      onChange(name, option, actionMeta);
    } else {
      onSetValue('');
      onChange(name, '');
    }
  };

  initElementRef = control => {
    this.element = control ? control.element : null;
  };

  render() {
    const { value, layout, id, help, showErrors, errorMessages } = this.props;
    const inputProps = Object.assign({}, this.props);
    Object.keys(ComponentCommon.propTypes).forEach(key => {
      delete inputProps[key];
    });

    const control = (
      <SelectControl
        {...inputProps}
        defaultValue={value}
        onChange={this.handleChange}
        ref={this.initElementRef}
      />
    );

    if (layout === 'elementOnly') {
      return control;
    }

    return (
      <Row {...this.props} htmlFor={id}>
        {control}
        {help && <Help help={help} />}
        {showErrors && <ErrorMessages messages={errorMessages} />}
      </Row>
    );
  }
}

Select.propTypes = {
  ...ComponentCommon.propTypes,
};

Select.defaultProps = {
  ...ComponentCommon.defaultProps,
  valueField: 'id',
  labelField: 'name',
  optgroupField: 'optgroup',
  disabledField: 'disabled',
  optgroupLabelField: 'label',
  optgroupValueField: 'value',
  preload: false,
  create: false,
  options: [],
  filter: null,
  queryParams: null,
  url: '',
  closeAfterSelect: true,
  external: false,
  placeholder: undefined,
  max: 100,
  optgroups: [],
  onTyped: () => {},
};
