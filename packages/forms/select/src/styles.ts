import { ControllerFieldState } from 'react-hook-form';
import { ControlProps, StylesConfig } from 'react-select';
import { theme } from 'twin.macro';

function getBoxShadow(
  fieldState: ControllerFieldState,
  { isFocused }: ControlProps,
) {
  if (fieldState.error) {
    return '0 0 0, 0 0 0 2px rgb(239 68 68 / 5%), 0 1px 2px 0 rgb(0 0 0 / 5%)';
  }
  if (isFocused) {
    return '0 0 0 1px rgba(var(--brand-primary), 0.1)';
  }
  return 'none';
}

function getBorderColor(
  fieldState: ControllerFieldState,
  { isFocused, isDisabled }: ControlProps,
) {
  if (fieldState.error) {
    if (isFocused) {
      return theme`colors.red.400`;
    }
    return theme`colors.red.500`;
  }
  if (isDisabled) {
    return 'rgba(var(--field-border, var(--border)), .5)';
  }
  if (isFocused) {
    return 'rgb(var(--brand-primary))';
  }
  return 'rgb(var(--field-border, var(--border)))';
}

export function baseStyles(fieldState: ControllerFieldState): StylesConfig {
  return {
    control: (base, state) => ({
      ...base,
      backgroundColor: 'rgb(var(--body-on-primary-bg))',
      borderRadius: '.25rem',
      borderColor: getBorderColor(fieldState, state),
      boxShadow: getBoxShadow(fieldState, state),
      '&:hover': {
        borderColor: getBorderColor(fieldState, state),
        ...(state.isFocused && {}),
      },
    }),
    placeholder: (base, state) => ({
      ...base,
      color: fieldState.error ? theme`colors.red.400` : theme`colors.gray.400`,
    }),
    valueContainer: (base, state) => {
      if (state.isMulti) {
        if (state.selectProps.isSearchable) {
          return {
            ...base,
            padding: 'calc(0.75rem - 2px)',
          };
        }
        if (state.hasValue) {
          return {
            ...base,
            padding: 'calc(0.75rem - 4px)',
          };
        }
        return {
          ...base,
          padding: 'calc(0.75rem - 0px)',
        };
      }
      if (state.hasValue) {
        return { ...base, padding: 'calc(.75rem - 2px) 1rem' };
      }
      return {
        ...base,
        padding: 'calc(.75rem - 2px) 1rem',
      };
    },
    clearIndicator: (base) => ({
      ...base,
      color: theme`colors.gray.500`,
      padding: 6,
      ':hover': {
        color: theme`colors.gray.700`,
      },
    }),
    loadingIndicator: (base) => ({
      ...base,
      paddingBottom: 6,
      paddingTop: 6,
    }),
    dropdownIndicator: (base, { isDisabled }) => {
      let color = theme`colors.gray.500`;
      if (isDisabled) {
        color = theme`colors.gray.300`;
      }
      return {
        ...base,
        color,
        padding: 6,
        ':hover': {
          color: theme`colors.gray.700`,
        },
      };
    },
    input: (base, state) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0,
      'input:focus': {
        boxShadow: 'none',
      },
    }),
    option: (base, { isSelected, isFocused, isDisabled }) => ({
      ...base,
      padding: '.75rem 1rem',
      backgroundColor:
        isSelected || isFocused
          ? 'rgba(var(--brand-primary), .05)'
          : 'transparent',
      color: isDisabled
        ? 'rgb(var(--brand-subtle))'
        : 'rgba(var(--body-primary), 1)',
      '&:hover': {
        backgroundColor: 'rgba(var(--brand-primary), .1)',
        color: isDisabled
          ? 'rgb(var(--brand-subtle))'
          : 'rgba(var(--body-primary), 1)',
      },
    }),
    multiValue: (base) => ({
      ...base,
      borderRadius: '.25rem',
      backgroundColor: 'rgba(var(--brand-primary), .65)',
      color: 'rgb(var(--brand-on-primary))',
      maxWidth: '100%',
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: 'rgb(var(--brand-on-primary))',
    }),
    indicatorSeparator: (base) => ({
      ...base,
      margin: '.75rem 0',
      backgroundColor: 'rgba(var(--border), .8)',
    }),
    indicatorsContainer: (base) => ({
      ...base,
      marginLeft: '1rem',
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
      boxShadow: 'none',
      border: '1px solid rgb(var(--border))',
    }),
    menuList: (base) => ({
      ...base,
      padding: 0,
    }),
  };
}

export default baseStyles;
