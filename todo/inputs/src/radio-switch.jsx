import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-switch';
import { Check, X } from 'react-feather';
import ComponentCommon from './component-common';

export default class RadioSwitch extends Component {
  handleChange = value => {
    this.props.onSetValue(value);
    this.props.onChange(this.props.name, value);
  };

  render() {
    const { value, id, className } = this.props;
    return (
      <label htmlFor={id} className={className}>
        <Switch {...this.props} onChange={this.handleChange} checked={value} />
      </label>
    );
  }
}

RadioSwitch.propTypes = {
  ...ComponentCommon.propTypes,
  onColor: PropTypes.string,
  offColor: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  uncheckedIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  checkedIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

RadioSwitch.defaultProps = {
  ...ComponentCommon.defaultProps,
  onColor: '#080',
  // offColor="#f1f3f5"
  uncheckedIcon: <X size={16} />,
  checkedIcon: <Check size={16} color="#fff" />,
  height: 32,
  width: 64,
  value: false,
};
