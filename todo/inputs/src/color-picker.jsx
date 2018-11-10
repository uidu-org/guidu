import React, { Component } from 'react';
import { TwitterPicker } from 'react-color';
import ComponentCommon from './component-common';
import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';
import Icon from './icon';

export default class ColorPicker extends Component {
  handleChange = ({ hex }) => {
    const { onSetValue, onChange, name } = this.props;
    onSetValue(hex);
    onChange(name, hex);
  };

  initElementRef = control => {
    this.element = control ? control.element : null;
  };

  render() {
    const inputProps = Object.assign({}, this.props);
    const { value, layout, id, showErrors, help, errorMessages } = this.props;
    Object.keys(ComponentCommon.propTypes).forEach(key => {
      delete inputProps[key];
    });

    const control = (
      <TwitterPicker
        {...inputProps}
        color={value}
        onChangeComplete={this.handleChange}
        ref={this.initElementRef}
      />
    );

    if (layout === 'elementOnly') {
      return control;
    }

    return (
      <Row {...this.props} htmlFor={id} fakeLabel>
        {control}
        {showErrors && (
          <Icon symbol="remove" className="form-control-feedback" />
        )}
        {help && <Help help={help} />}
        {showErrors && <ErrorMessages messages={errorMessages} />}
      </Row>
    );
  }
}

ColorPicker.defaultProps = {
  ...ComponentCommon.defaultProps,
};

ColorPicker.propTypes = {
  ...ComponentCommon.propTypes,
};
