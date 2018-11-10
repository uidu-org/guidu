import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import Async from 'react-select/lib/Async';
import Creatable from 'react-select/lib/Creatable';
import AsyncCreatable from 'react-select/lib/AsyncCreatable';
import Downshift from 'downshift';
import { ChevronDown, X } from 'react-feather';
import ControlCommon from './control-common';

// With react-select

const Arrow = props => {
  const {
    getStyles,
    innerProps: { ref, ...restInnerProps },
  } = props;
  return (
    <div
      {...restInnerProps}
      ref={ref}
      className="d-flex align-items-center mx-2"
      style={getStyles('dropdownIndicator', props)}
    >
      <ChevronDown size={18} />
    </div>
  );
};

Arrow.propTypes = {
  getStyles: PropTypes.func.isRequired,
  innerProps: PropTypes.shape(PropTypes.obj).isRequired,
};

const ClearIndicator = props => {
  const {
    getStyles,
    innerProps: { ref, ...restInnerProps },
  } = props;
  return (
    <div
      {...restInnerProps}
      ref={ref}
      style={getStyles('clearIndicator', props)}
      className="d-flex align-items-center mx-2"
    >
      <X size={16} />
    </div>
  );
};

ClearIndicator.propTypes = {
  getStyles: PropTypes.func.isRequired,
  innerProps: PropTypes.shape(PropTypes.obj).isRequired,
};

export default class SelectControl extends Component {
  onExposedChange = selectedItem => {
    const { multi, onChange, value, options, valueField } = this.props;
    if (multi) {
      if (
        value &&
        value.map(v => v[valueField]).indexOf(selectedItem[valueField]) >= 0
      ) {
        const newValue = value
          .map(v => v[valueField])
          .filter(v => v !== selectedItem[valueField]);
        return onChange(
          options.filter(o => newValue.indexOf(o[valueField]) >= 0),
        );
      }
      return onChange([
        ...options.filter(
          o => value.map(v => v[valueField]).indexOf(o[valueField]) >= 0,
        ),
        selectedItem,
      ]);
    }
    return onChange(selectedItem);
  };

  initElementRef = element => {
    this.element = (element && element.select) || element;
  };

  isValidNewOption = (inputValue, selectValue, selectOptions) => {
    if (
      inputValue.trim().length === 0 ||
      selectOptions.find(option => option.name === inputValue)
    ) {
      return false;
    }
    return true;
  };

  renderExposedOption = (item, downshiftProps) => {
    const {
      optionRenderer,
      multi,
      value,
      valueField,
      onFocus,
      onBlur,
    } = this.props;
    const isSelected = multi
      ? value && value.map(v => v[valueField]).indexOf(item[valueField]) >= 0
      : value && value[valueField] === item[valueField];

    if (optionRenderer) {
      return optionRenderer(item, downshiftProps, isSelected);
    }

    const { getItemProps, highlightedIndex, index } = downshiftProps;

    return (
      <button
        type="button"
        {...getItemProps({ item })}
        key={item[valueField]}
        className={classNames(
          'card p-2 mb-2 w-50 align-items-center justify-content-start flex-row',
          {
            'bg-primary text-white': isSelected,
          },
        )}
        style={{
          backgroundColor: highlightedIndex === index ? '#f1f3f5' : 'white',
        }}
        tabIndex={0}
        onFocus={() => onFocus(index)}
        onBlur={() => onBlur(index)}
      >
        <div className="px-2 badge badge-light badge-pill mr-2">
          {index + 1}
        </div>
        <div>{item.name}</div>
      </button>
    );
  };

  render() {
    const {
      exposed,
      create,
      labelField,
      valueField,
      options,
      value,
      menuClassName,
      multi,
      async,
      styles,
      components,
      //
      onFocus,
      onBlur,
    } = this.props;

    const downshiftProps = Object.assign({}, this.props);
    delete downshiftProps.onChange;

    if (exposed) {
      return (
        <Downshift
          {...downshiftProps}
          ref={c => {
            this.element = c;
          }}
          itemToString={item => item[labelField]}
          onSelect={this.onExposedChange}
          initialSelectedItem={
            multi
              ? options.filter(
                  i =>
                    value &&
                    value.map(v => v[valueField]).indexOf(i[valueField]) >= 0,
                )
              : value
          }
        >
          {({ getItemProps, selectedItem, highlightedIndex }) => (
            <div className={menuClassName}>
              {options.map((item, index) =>
                this.renderExposedOption(item, {
                  index,
                  value,
                  getItemProps,
                  selectedItem,
                  highlightedIndex,
                  onFocus,
                  onBlur,
                }),
              )}
            </div>
          )}
        </Downshift>
      );
    }

    const commonProps = {
      value,
      components: {
        DropdownIndicator: Arrow,
        ClearIndicator,
        ...components,
      },
      ref: this.initElementRef,
      getOptionLabel: option => option[labelField],
      getOptionValue: option => option[valueField],
      styles: {
        option: (base, state) => ({
          ...base,
          padding: '1rem',
          backgroundColor:
            state.isSelected || state.isFocused
              ? 'rgb(242, 249, 252)'
              : 'transparent',
          color: 'rgb(51, 51, 51)',
          '&:hover': {
            backgroundColor: 'rgb(242, 249, 252)',
            color: 'rgb(51, 51, 51)',
          },
        }),
        input: (base, state) => ({
          ...base,
          paddingTop: 0,
          paddingBottom: 0,
          margin: '0 2px',
        }),
        control: (base, state) => ({
          // none of react-selects styles are passed to <View />
          ...base,
          backgroundColor: 'transparent',
          borderRadius: '.25rem',
          borderColor: state.isFocused ? '#f8d1bb' : '#ced4da',
          boxShadow: state.isFocused
            ? '0 0 0 0.2rem rgba(236, 132, 71, 0.25)'
            : '0 1px 0 rgba(0, 0, 0, 0.06)',
          '&:hover': {
            borderColor: state.isFocused ? '#f8d1bb' : '#ced4da',
          },
        }),
        valueContainer: (base, state) => ({
          ...base,
          padding:
            state.isMulti && state.hasValue ? 'calc(1rem - 3px) 1rem' : '1rem',
        }),
        indicatorSeparator: base => ({
          ...base,
          margin: '1rem 0',
          backgroundColor: '#ced4da',
        }),
        indicatorsContainer: base => ({
          ...base,
          marginLeft: '1rem',
        }),
        menu: base => ({
          ...base,
          boxShadow: 'none',
          border: '1px solid #ced4da',
        }),
        menuList: base => ({
          ...base,
          padding: 0,
        }),
        ...styles,
      },
    };

    if (async) {
      if (create) {
        return (
          <AsyncCreatable
            {...this.props}
            {...commonProps}
            getNewOptionData={(inputValue, optionLabel) => ({
              id: inputValue,
              name: optionLabel,
            })}
            isValidNewOption={this.isValidNewOption}
            isMulti={multi}
          />
        );
      }
      return (
        <Async
          {...this.props}
          {...commonProps}
          isValidNewOption={this.isValidNewOption}
          isMulti={multi}
        />
      );
    }

    if (create) {
      return (
        <Creatable
          {...this.props}
          {...commonProps}
          isValidNewOption={this.isValidNewOption}
          getNewOptionData={(inputValue, optionLabel) => ({
            id: inputValue,
            name: optionLabel,
          })}
          options={options}
          isMulti={multi}
        />
      );
    }

    return (
      <Select
        {...this.props}
        {...commonProps}
        options={options}
        isMulti={multi}
      />
    );
  }
}

SelectControl.defaultProps = {
  ...ControlCommon.defaultProps,
  onFocus: () => {},
  onBlur: () => {},
};

SelectControl.propTypes = {
  ...ControlCommon.propTypes,
  multi: PropTypes.bool,
};
