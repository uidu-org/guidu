import { colors } from '@uidu/theme';
import { ControllerFieldState } from 'react-hook-form';
import { StylesConfig } from 'react-select';
import { theme } from 'twin.macro';

function getBoxShadow(fieldState: ControllerFieldState, isFocused: boolean) {
  if (fieldState.error) {
    return '0 0 0, 0 0 0 2px rgb(239 68 68 / 5%), 0 1px 2px 0 rgb(0 0 0 / 5%)';
  }
  if (isFocused) {
    return '0 0 0 1px rgba(var(--brand-primary), 0.1)';
  }
  return 'none';
}

function getBorderColor(fieldState: ControllerFieldState, isFocused: boolean) {
  if (fieldState.error) {
    if (isFocused) {
      return theme`colors.red.400`;
    }
    return theme`colors.red.500`;
  }
  if (isFocused) {
    return 'rgb(var(--brand-primary))';
  }
  return 'rgb(var(--field-border, var(--border)))';
}

export default function baseStyles(
  fieldState: ControllerFieldState,
  isCompact: boolean,
): StylesConfig {
  return {
    // control: (base, { isFocused, isDisabled }) => {
    //   let borderColor = isFocused ? colors.B100 : colors.N20;
    //   let backgroundColor = isFocused ? colors.N0 : colors.N20;
    //   if (isDisabled) {
    //     backgroundColor = colors.N20;
    //   }
    //   if (validationState === 'error') borderColor = colors.R400;
    //   if (validationState === 'success') borderColor = colors.G400;

    //   let borderColorHover = isFocused ? colors.B100 : colors.N30;
    //   if (validationState === 'error') borderColorHover = colors.R400;
    //   if (validationState === 'success') borderColorHover = colors.G400;

    //   const transitionDuration = '200ms';

    //   return {
    //     ...base,
    //     backgroundColor,
    //     borderColor,
    //     borderStyle: 'solid',
    //     borderRadius: '3px',
    //     borderWidth: '2px',
    //     boxShadow: 'none',
    //     minHeight: isCompact ? gridSize() * 4 : gridSize() * 5,
    //     padding: 0,
    //     transition: `background-color ${transitionDuration} ease-in-out,
    //     border-color ${transitionDuration} ease-in-out`,

    //     '-ms-overflow-style': '-ms-autohiding-scrollbar',
    //     '::-webkit-scrollbar': {
    //       height: gridSize(),
    //       width: gridSize(),
    //     },
    //     '::-webkit-scrollbar-corner': {
    //       display: 'none',
    //     },

    //     ':hover': {
    //       '::-webkit-scrollbar-thumb': {
    //         backgroundColor: 'rgba(0,0,0,0.2)',
    //       },
    //       cursor: 'pointer',
    //       backgroundColor: isFocused ? colors.N0 : colors.N30,
    //       borderColor: borderColorHover,
    //     },
    //     '::-webkit-scrollbar-thumb:hover': {
    //       backgroundColor: 'rgba(0,0,0,0.4)',
    //     },
    //   };
    // },
    control: (base, state) => ({
      // none of react-selects styles are passed to <View />
      ...base,
      backgroundColor: 'rgb(var(--body-on-primary-bg))',
      borderRadius: '.25rem',
      borderColor: getBorderColor(fieldState, state.isFocused),
      boxShadow: getBoxShadow(fieldState, state.isFocused),
      '&:hover': {
        borderColor: getBorderColor(fieldState, state.isFocused),
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
      color: colors.N70,
      paddingLeft: '2px',
      paddingRight: '2px',
      paddingBottom: isCompact ? 0 : 6,
      paddingTop: isCompact ? 0 : 6,
      ':hover': {
        color: colors.N500,
      },
    }),
    loadingIndicator: (base) => ({
      ...base,
      paddingBottom: isCompact ? 0 : 6,
      paddingTop: isCompact ? 0 : 6,
    }),
    dropdownIndicator: (base, { isDisabled }) => {
      let color = colors.N500;
      if (isDisabled) {
        color = colors.N70;
      }
      return {
        ...base,
        color,
        paddingBottom: isCompact ? 0 : 6,
        paddingTop: isCompact ? 0 : 6,
        paddingLeft: '6px',
        paddingRight: '6px',
        ':hover': {
          color: colors.N200,
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
      // margin: '0 2px',
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
    // multiValueRemove: (base, { isFocused }) => ({
    //   ...base,
    //   backgroundColor: isFocused && colors.R75,
    //   color: isFocused && colors.R400,
    //   paddingLeft: '2px',
    //   paddingRight: '2px',
    //   borderRadius: '0px 2px 2px 0px',
    //   ':hover': {
    //     color: colors.R400,
    //     backgroundColor: colors.R75,
    //   },
    // }),
    indicatorSeparator: (base) => ({
      ...base,
      margin: '.75rem 0',
    }),
    indicatorsContainer: (base) => ({
      ...base,
      marginLeft: '1rem',
    }),
    menu: (base) => ({
      ...base,
      boxShadow: 'none',
      border: '1px solid rgb(var(--border))',
    }),
    menuList: (base) => ({
      ...base,
      padding: 0,
    }),
  };
}
