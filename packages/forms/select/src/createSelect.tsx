import { WithAnalyticsEventsProps } from '@uidu/analytics';
import { FieldBaseProps, Wrapper } from '@uidu/field-base';
import memoizeOne from 'memoize-one';
import React from 'react';
import isEqual from 'react-fast-compare';
import { mergeStyles } from 'react-select';
import makeAnimated from 'react-select/animated';
import * as defaultComponents from './components';
import MultiValueLabel from './components/MultiValueLabel';
import Option from './components/Option';
import SingleValue from './components/SingleValue';
import baseStyles from './styles';
// NOTE in the future, `Props` and `defaultProps` should come
// directly from react-select

type ValidationState = 'default' | 'error' | 'success';
type OptionType = any;
type OptionsType = Array<OptionType>;
type ValueType = OptionType | OptionsType | null | void;

type ReactSelectProps = {
  /* HTML ID(s) of element(s) that should be used to describe this input (for assistive tech) */
  'aria-describedby'?: string;
  /* Aria label (for assistive tech) */
  'aria-label'?: string;
  /* HTML ID of an element that should be used as the label (for assistive tech) */
  'aria-labelledby'?: string;
  /* Remove the currently focused option when the user presses backspace */
  backspaceRemovesValue?: boolean;
  /* When the user reaches the top/bottom of the menu, prevent scroll on the scroll-parent  */
  captureMenuScroll?: boolean;
  /* Close the select menu when the user selects an option */
  closeMenuOnSelect?: boolean;
  /* Custom components to use */
  components?: {};
  /* Delimiter used to join multiple values into a single HTML Input value */
  delimiter?: string;
  /* enables default animated behaviour in components */
  enableAnimation?: boolean;
  /* Clear all values when the user presses escape AND the menu is closed */
  escapeClearsValue?: boolean;
  /* Custom method to filter whether an option should be displayed in the menu */
  filterOption?: (({}, string) => boolean) | null;
  /* Formats option labels in the menu and control as React components */
  formatOptionLabel?: (OptionType, {}) => React.ReactNode;
  /* Resolves option data to a string to be displayed as the label by components */
  getOptionLabel?: (OptionType) => string;
  /* Resolves option data to a string to compare options and specify value attributes */
  getOptionValue?: (OptionType) => string;
  /* Hide the selected option from the menu */
  hideSelectedOptions?: boolean;
  /* Define an id prefix for the select components e.g. {your-id}-value */
  instanceId?: number | string;
  /* Is the select value clearable */
  isClearable?: boolean;
  /* Is the select disabled */
  isDisabled?: boolean;
  /* Is the select in a state of loading (async) */
  isLoading?: boolean;
  /* Override the built-in logic to detect whether an option is disabled */
  isOptionDisabled?: boolean;
  /* Override the built-in logic to detect whether an option is selected */
  isOptionSelected?: (OptionType, OptionsType) => boolean;
  /* Support multiple selected options */
  multiple?: boolean;
  /* Async: Text to display when loading options */
  loadingMessage?: ({ inputValue: string }) => string;
  /* Maximum height of the menu before scrolling */
  maxMenuHeight?: number;
  /* Maximum height of the value container before scrolling */
  maxValueHeight?: number;
  /* Name of the HTML Input (optional - without this, no input will be rendered) */
  name?: string;
  /* Text to display when there are no options */
  noOptionsMessage?: ({ inputValue: string }) => string;
  /* Handle blur events on the control */
  onBlur?: (e: React.FocusEvent<HTMLElement>) => void;
  /* Handle change events on the select */
  onChange?: (name, value, { option, actionMeta }) => void;
  /* Click events by default have preventDefault & stopPropogation called on them. Use this prop to disable this behaviour  */
  onClickPreventDefault?: boolean;
  /* Handle focus events on the control */
  onFocus?: (e: React.FocusEvent<HTMLElement>) => void;
  /* Handle change events on the input; return a string to modify the value */
  onInputChange?: (string) => string | void;
  /* Handle key down events on the select */
  onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
  /* Array of options that populate the select menu */
  options?: OptionsType;
  /* Placeholder text for the select value */
  placeholder?: string | React.ReactNode;
  /* Status to relay to screen readers */
  screenReaderStatus?: ({ count: number }) => string;
  /* Style modifier methods */
  styles?: {};
  /* Select the currently focused option when the user presses tab */
  tabSelectsValue?: boolean;
  /* The value of the select; reflected by the selected option */
  value?: ValueType;

  componentRef?: React.RefObject<any> | ((ref: any) => void);
};

type CreateSelectProps = ReactSelectProps & {
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

    constructor(props: ResultProps) {
      super(props);
      this.cacheComponents = memoizeOne(this.cacheComponents, isEqual).bind(
        this,
      );
      this.cacheComponents(props.components, props.enableAnimation);
    }

    static defaultProps = {
      onClickPreventDefault: true,
      tabSelectsValue: false,
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

    UNSAFE_componentWillReceiveProps(nextProps: ResultProps) {
      this.cacheComponents(nextProps.enableAnimation, nextProps.components);
    }

    cacheComponents = (enableAnimation: boolean, components?: {}) => {
      if (enableAnimation) {
        this.components = makeAnimated({
          ...defaultComponents,
          ...components,
        });
      } else {
        this.components = {
          ...defaultComponents,
          ...components,
        };
      }
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
            getNewOptionData={(inputValue, optionLabel) => ({
              id: inputValue,
              name: optionLabel,
              __isNew__: true,
            })}
            {...(props as ResultProps)}
            components={this.components}
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
