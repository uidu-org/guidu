import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { ComponentCommon, ErrorMessages, Help, Row } from '@uidu/field-base';
// import ControlCommon from './controls/control-common';

export default class CheckboxGroup extends Component {
  constructor(props) {
    super(props);
    this.elements = {};
  }

  handleChange = () => {
    const { options, name } = this.props;
    const checkedOptions = options.filter(
      option => this.elements[option.id].checked,
    );
    const value = checkedOptions.map(option => option.id);
    this.props.onSetValue(value);
    this.props.onChange(name, value);
  };

  renderElement = () => {
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
    delete inputProps.value;
    delete inputProps.onBlur;
    delete inputProps.isPristine;
    delete inputProps.showErrors;
    delete inputProps.options;

    const controls = this.props.options.map(checkbox => {
      const checked = this.props.value.indexOf(checkbox.id) !== -1;
      const disabled = checkbox.disabled || this.props.disabled;
      return (
        <div
          className={classNames(
            'custom-control custom-checkbox',
            this.props.className,
          )}
          key={[this.props.id, checkbox.id].join('-')}
        >
          <input
            {...inputProps}
            className="custom-control-input"
            id={[this.props.id, checkbox.id].join('-')}
            ref={c => {
              this.elements[checkbox.id] = c;
            }}
            checked={checked}
            type="checkbox"
            value={checkbox.id}
            onChange={this.handleChange}
            disabled={disabled}
          />
          <label
            className="custom-control-label"
            htmlFor={[this.props.id, checkbox.id].join('-')}
          >
            {checkbox.label || checkbox.name}
          </label>
        </div>
      );
    });
    if (this.props.type === 'stacked') {
      return <div className="custom-controls-stacked">{controls}</div>;
    }
    return controls;
  };

  render() {
    const element = this.renderElement();

    if (this.props.layout === 'elementOnly') {
      return <div>{element}</div>;
    }

    return (
      <Row {...this.props} fakeLabel>
        {element}
        {this.props.help ? <Help help={this.props.help} /> : null}
        {this.props.showErrors ? (
          <ErrorMessages messages={this.props.errorMessages} />
        ) : null}
      </Row>
    );
  }
}

CheckboxGroup.propTypes = {
  // ...ControlCommon.propTypes,
  ...ComponentCommon.propTypes,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      disabled: PropTypes.bool,
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
  value: PropTypes.arrayOf(PropTypes.number),
  type: PropTypes.oneOf(['inline', 'stacked']),
};

CheckboxGroup.defaultProps = {
  ...ComponentCommon.defaultProps,
  type: 'stacked',
  options: [],
  value: [],
};
