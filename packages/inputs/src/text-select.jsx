import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ComponentCommon from './component-common';

class TextSelect extends Component {
  handleChange = (e, item) => {
    e.preventDefault();
    const { onSetValue, onChange, name } = this.props;
    onSetValue(item);
    onChange(name, item);
  };

  initElementRef = control => {
    this.element = control;
  };

  render() {
    const {
      options,
      value,
      placeholder,
      className,
      dropdownClassName,
    } = this.props;

    return (
      <div className={className}>
        <a
          className="dropdown-toggle"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {value ? value.name : placeholder}
        </a>
        <div
          className={classNames('dropdown-menu', dropdownClassName)}
          aria-labelledby="dropdownMenuButton"
        >
          {options.map(option => (
            <a
              href="#"
              className={classNames('dropdown-item', {
                active: value && value.id === option.id,
              })}
              onClick={e => this.handleChange(e, option)}
            >
              {option.name}
            </a>
          ))}
        </div>
      </div>
    );
  }
}

TextSelect.propTypes = {
  ...ComponentCommon.propTypes,
  className: PropTypes.string,
  dropdownClassName: PropTypes.string,
};

TextSelect.defaultProps = {
  ...ComponentCommon.defaultProps,
  className: 'dropdown',
  dropdownClassName: null,
};

export default TextSelect;
