import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Star } from 'react-feather';
import Rate from 'antd/es/rate';

import ComponentCommon from './component-common';
import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';
import Icon from './icon';

export default class InputRate extends PureComponent {
  handleChange = value => {
    const { onSetValue, onChange, name } = this.props;
    onSetValue(value);
    onChange(name, value);
  };

  initElementRef = control => {
    this.element = control ? control.element : null;
  };

  render() {
    const { layout, id, showErrors, help, errorMessages } = this.props;
    const inputProps = Object.assign({}, this.props);
    Object.keys(ComponentCommon.propTypes).forEach(key => {
      delete inputProps[key];
    });

    delete inputProps.isPristine;
    delete inputProps.showErrors;

    const control = (
      <Rate
        allowHalf
        character={<Star size="2rem" strokeWidth={0} fill="currentColor" />}
        defaultValue={2.5}
        onChange={this.handleChange}
      />
    );

    if (layout === 'elementOnly') {
      return control;
    }

    return (
      <Row {...this.props} htmlFor={id}>
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

InputRate.propTypes = {
  ...ComponentCommon.propTypes,
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

InputRate.defaultProps = {
  ...ComponentCommon.defaultProps,
  className: 'form-control',
  value: undefined,
};
