import React, { PureComponent } from 'react';
import { SwatchesPicker } from 'react-color';
import ComponentCommon from './component-common';
import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';
import Icon from './icon';

export default class ColorPickerDropdown extends PureComponent {
  handleChange = ({ hex }) => {
    const { onSetValue, onChange, name } = this.props;
    onSetValue(hex);
    onChange(name, hex);
  };

  initElementRef = control => {
    this.element = control ? control.element : null;
  };

  previewRenderer = () => {
    const { previewRenderer, value } = this.props;
    if (previewRenderer) {
      return previewRenderer(value);
    }
    return (
      <button
        className="btn btn-sm border"
        type="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <div
          style={{
            backgroundColor: value,
            width: '3rem',
            height: '1.5rem',
            borderRadius: '2px',
          }}
        />
      </button>
    );
  };

  render() {
    const inputProps = Object.assign({}, this.props);
    const { value, layout, id, showErrors, help, errorMessages } = this.props;
    Object.keys(ComponentCommon.propTypes).forEach(key => {
      delete inputProps[key];
    });

    const control = (
      <div className="dropdown">
        {this.previewRenderer()}
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <SwatchesPicker
            {...inputProps}
            color={value}
            onChangeComplete={this.handleChange}
            ref={this.initElementRef}
          />
        </div>
      </div>
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

ColorPickerDropdown.defaultProps = {
  ...ComponentCommon.defaultProps,
};

ColorPickerDropdown.propTypes = {
  ...ComponentCommon.propTypes,
};
