import { WithAnalyticsEventsProps } from '@uidu/analytics';
import { FieldBaseProps, Wrapper } from '@uidu/field-base';
import React from 'react';
import { mergeStyles, Props } from 'react-select';
import * as defaultComponents from './components';
import MultiValueLabel from './components/MultiValueLabel';
import Option from './components/Option';
import SingleValue from './components/SingleValue';
import baseStyles from './styles';

export type CreateSelectProps = Props & {
  enableAnimation?: boolean;
  components?: any;
} & FieldBaseProps & {
    /* This prop affects the height of the select control. Compact is gridSize() * 4, default is gridSize * 5  */
    spacing?: 'compact' | 'default';
    /* The state of validation if used in a form */
    validationState?: any;
  };

const createSelect = <TOriginalProps extends {}>(
  Component: React.ComponentType<TOriginalProps>,
) => {
  type ResultProps = TOriginalProps &
    CreateSelectProps &
    WithAnalyticsEventsProps;
  const result = class UiduSelect extends React.Component<ResultProps> {
    components: {};
    select: any;

    static defaultProps = {
      onClickPreventDefault: true,
      tabSelectsValue: true,
      isClearable: true,
      isSearchable: true,
      getOptionLabel: ({ name }) => name,
      getOptionValue: ({ id }) => id,
      onChange: () => {},
      components: {
        Option,
        SingleValue,
        MultiValueLabel,
      },
    };

    focus() {
      this.select.focus();
    }

    blur() {
      this.select.blur();
    }

    onSelectRef = (ref: React.RefObject<any>) => {
      this.select = ref;

      const { componentRef } = this.props;

      if (typeof componentRef === 'object') {
        (componentRef as any).current = ref;
      }
      if (typeof componentRef === 'function') {
        (componentRef as any)(ref);
      }
    };

    onChange = (value, option, actionMeta) => {
      const { name, onSetValue, onChange } = this.props;
      onSetValue(value);
      onChange(name, value, { option, actionMeta });
    };

    flatten = (arr) =>
      arr.reduce(
        (acc, val) =>
          Array.isArray(val.options)
            ? acc.concat(this.flatten(val.options))
            : acc.concat(val),
        [],
      );

    clean = (x) => x.trim();
    toArray = (str) => str.split(',').map(this.clean);
    toString = (arr) => arr.join(',');

    getValue = () => {
      const { value, options, multiple, getOptionValue } = this.props;

      if (value === undefined) return undefined;

      const opts = this.flatten(options);
      const cleanedValue = multiple
        ? opts.filter((o) => value.includes(getOptionValue(o)))
        : opts.find((o) => getOptionValue(o) === value);

      return cleanedValue;
    };

    render() {
      const {
        styles,
        validationState,
        spacing,
        multiple,
        options,
        value,
        getOptionLabel,
        getOptionValue,
        componentRef,
        components,
        disabled,
        ...props
      } = this.props; // eslint-disable-line

      const isCompact = spacing === 'compact';

      // props must be spread first to stop `components` being overridden
      return (
        <Wrapper {...props}>
          <Component
            ref={this.onSelectRef}
            isMulti={multiple}
            value={this.getValue()}
            options={options}
            getOptionLabel={getOptionLabel}
            getOptionValue={getOptionValue}
            formatCreateLabel={(inputValue) => `Create new...${inputValue}`}
            isDisabled={!!disabled}
            getNewOptionData={(inputValue, optionLabel) => ({
              id: inputValue,
              name: optionLabel,
              __isNew__: true,
            })}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...(props as ResultProps)}
            components={{
              ...defaultComponents,
              ...components,
            }}
            styles={mergeStyles(baseStyles(validationState, isCompact), styles)}
            onChange={(option, actionMeta) => {
              if (multiple) {
                return this.onChange(
                  option ? option.map((v) => getOptionValue(v)) : '',
                  option,
                  actionMeta,
                );
              }
              return this.onChange(
                option ? getOptionValue(option) : '',
                option,
                actionMeta,
              );
            }}
          />
        </Wrapper>
      );
    }
  };
  return result;
};

export default (Component) => createSelect(Component);
