import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ComponentCommon from './component-common';
import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';

export default class RadioButton extends Component {
  handleChange = e => {
    const { name, onSetValue, onChange } = this.props;
    const { value } = e.currentTarget;
    onSetValue(value);
    onChange(name, value);
  };

  renderElement() {
    const {
      options,
      disabled,
      buttonClassName,
      activeClassName,
      disabledClassName,
      value,
      id,
    } = this.props;

    const controls = options.map(radio => {
      const checked = value === radio.id.toString();
      const optionDisabled = radio.disabled || disabled;
      return (
        <label
          key={radio.id}
          className={classNames('btn', buttonClassName, radio.className, {
            [disabledClassName]: optionDisabled,
            [activeClassName]: checked,
          })}
          htmlFor={[id, radio.id].join('-')}
        >
          <input
            type="radio"
            id={[id, radio.id].join('-')}
            value={radio.id}
            checked={checked}
            onChange={this.handleChange}
          />{' '}
          {radio.name}
        </label>
      );
    }, this);
    return controls;
  }

  render() {
    const {
      className,
      layout,
      id,
      help,
      showErrors,
      errorMessages,
    } = this.props;

    if (layout === 'elementOnly') {
      return <div className={className}>{this.renderElement()}</div>;
    }

    return (
      <Row {...this.props} htmlFor={id} fakeLabel>
        <div className={className} data-toggle="buttons">
          {this.renderElement()}
        </div>
        {help && <Help help={help} />}
        {showErrors && <ErrorMessages messages={errorMessages} />}
      </Row>
    );
  }
}

RadioButton.propTypes = {
  ...ComponentCommon.propTypes,
  className: PropTypes.string,
  activeClassName: PropTypes.string,
  disabledClassName: PropTypes.string,
  buttonClassName: PropTypes.string,
};

RadioButton.defaultProps = {
  ...ComponentCommon.defaultProps,
  className: 'btn-group btn-group-toggle',
  activeClassName: 'bg-primary',
  disabledClassName: 'btn-disabled',
  buttonClassName: 'card card-body',
};
