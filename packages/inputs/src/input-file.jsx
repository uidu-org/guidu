import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ComponentCommon from './component-common';
import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';
import Icon from './icon';
import FileControl from './controls/input-file';

export default class InputFile extends Component {
  handleChange = event => {
    const target = event.currentTarget;
    const { value } = target;
    const { onSetValue, onChange, name } = this.props;
    // We're passing an additional argument to the onChange handler here,
    // the 'value' of the field. This value is actually pretty useless,
    // and we're only including here for completeness.
    // An example value would be: "C:\fakepath\name-of-file.txt". Note that
    // if we select multiple files, it only returns a "fakepath" string for
    // the first file.
    // A web search for "C:\fakepath\" gives more details.
    if (target.files.length > 0) {
      onSetValue(target.files);
      onChange(name, target.files, value);
    } else {
      this.setValue('');
      onChange(name, '', value);
    }
    onChange(name, target.files, value);
  };

  initElementRef = control => {
    this.element = control ? control.element : null;
  };

  render() {
    const inputProps = Object.assign({}, this.props);
    Object.keys(ComponentCommon.propTypes).forEach(key => {
      delete inputProps[key];
    });

    delete inputProps.addonAfter;
    delete inputProps.addonBefore;
    delete inputProps.buttonAfter;
    delete inputProps.buttonBefore;
    delete inputProps.debounce;
    delete inputProps.updateOn;
    delete inputProps.isPristine;
    delete inputProps.value;

    const control = (
      <FileControl
        {...inputProps}
        onChange={this.handleChange}
        ref={this.initElementRef}
      />
    );

    if (this.props.layout === 'elementOnly') {
      return control;
    }

    return (
      <Row {...this.props} htmlFor={this.props.id} fakeLabel>
        {control}
        {this.props.showErrors ? (
          <Icon symbol="remove" className="form-control-feedback" />
        ) : null}
        {this.props.help ? <Help help={this.props.help} /> : null}
        {this.props.showErrors ? (
          <ErrorMessages messages={this.props.errorMessages} />
        ) : null}
      </Row>
    );
  }
}

InputFile.propTypes = {
  ...FileControl.propTypes,
  ...ComponentCommon.propTypes,
  value: PropTypes.shape(PropTypes.obj),
};

InputFile.defaultProps = {
  ...ComponentCommon.defaultProps,
  value: {},
};
