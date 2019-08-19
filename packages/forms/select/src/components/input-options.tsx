import CheckboxIcon from '@atlaskit/icon/glyph/checkbox';
import RadioIcon from '@atlaskit/icon/glyph/radio';
import { colors, gridSize, themed } from '@uidu/theme';
import React, { Component } from 'react';

const getPrimitiveStyles = (props: any) => {
  const { cx, className, getStyles, isDisabled, isFocused, isSelected } = props;

  const styles = {
    alignItems: 'center',
    backgroundColor: isFocused ? colors.N30 : 'transparent',
    color: 'inherit',
    display: 'flex ',
    paddingBottom: 4,
    paddingLeft: `${gridSize() * 2}px`,
    paddingTop: 4,

    ':active': {
      backgroundColor: colors.B50,
    },
  };

  const augmentedStyles = { ...getStyles('option', props), ...styles };
  const bemClasses = {
    option: true,
    'option--is-disabled': isDisabled,
    'option--is-focused': isFocused,
    'option--is-selected': isSelected,
  };

  // maintain react-select API
  return [augmentedStyles, cx(null, bemClasses, className)];
};

// maintains function shape
const backgroundColor = themed({ light: colors.N40A, dark: colors.DN10 });
const transparent = themed({ light: 'transparent', dark: 'transparent' });

// the primary color represents the outer or background element
const getPrimaryColor = ({
  isActive,
  isDisabled,
  isFocused,
  isSelected,
  ...rest
}: any): string | number => {
  let color = backgroundColor;
  if (isDisabled && isSelected) {
    color = themed({ light: colors.B75, dark: colors.DN200 });
  } else if (isDisabled) {
    color = themed({ light: colors.N20A, dark: colors.DN10 });
  } else if (isActive) {
    color = themed({ light: colors.B75, dark: colors.B200 });
  } else if (isFocused && isSelected) {
    color = themed({ light: colors.B300, dark: colors.B75 });
  } else if (isFocused) {
    color = themed({ light: colors.N50A, dark: colors.DN30 });
  } else if (isSelected) {
    color = colors.blue;
  }
  // $FlowFixMe - theme is not found in props
  return color(rest);
};

// the secondary color represents the radio dot or checkmark
const getSecondaryColor = ({
  isActive,
  isDisabled,
  isSelected,
  ...rest
}: any): string | number => {
  let color = themed({ light: colors.N0, dark: colors.DN10 });

  if (isDisabled && isSelected) {
    color = themed({ light: colors.N70, dark: colors.DN10 });
  } else if (isActive && isSelected && !isDisabled) {
    color = themed({ light: colors.B400, dark: colors.DN10 });
  } else if (!isSelected) {
    color = transparent;
  }
  // $FlowFixMe - theme is not found in props
  return color(rest);
};

// type OptionProps = CommonProps & {
//   [string]: any;
//   children: React.ReactNode;
//   getStyles: fn;
//   Icon: CheckboxIcon | RadioIcon;
//   innerProps: InnerProps;
//   isDisabled: boolean;
//   isFocused: boolean;
//   isSelected: boolean;
//   type: 'option';
//   label: string;
// };
type OptionState = { isActive?: boolean };

class ControlOption extends Component<any, any> {
  state: OptionState = { isActive: false };
  onMouseDown = () => this.setState({ isActive: true });
  onMouseUp = () => this.setState({ isActive: false });
  onMouseLeave = () => this.setState({ isActive: false });
  render() {
    const { getStyles, Icon, children, innerProps, ...rest } = this.props;

    // prop assignment
    const props = {
      ...innerProps,
      onMouseDown: this.onMouseDown,
      onMouseUp: this.onMouseUp,
      onMouseLeave: this.onMouseLeave,
    };

    const [styles, classes] = getPrimitiveStyles({ getStyles, ...rest });

    return (
      <div style={styles} className={classes} {...props}>
        <div style={iconWrapperCSS()}>
          <Icon
            primaryColor={getPrimaryColor({ ...this.props, ...this.state })}
            secondaryColor={getSecondaryColor({ ...this.props, ...this.state })}
          />
        </div>
        <div style={truncateCSS()}>{children}</div>
      </div>
    );
  }
}

const iconWrapperCSS = () => ({
  alignItems: 'center',
  display: 'flex ',
  flexShrink: 0,
  paddingRight: '4px',
});

/* TODO:
  to be removed
  the label of an option in the menu
  should ideally be something we can customise
  as part of the react-select component API
  at the moment we are hardcoding it into
  the custom input-option components for Radio and Checkbox Select
  and so this behaviour is not customisable / disableable
  by users who buy into radio / checkbox select.
*/

const truncateCSS: any = () => ({
  textOverflow: 'ellipsis',
  overflowX: 'hidden',
  flexGrow: 1,
  whiteSpace: 'nowrap',
});

export const CheckboxOption = (props: any) => (
  <ControlOption Icon={CheckboxIcon} {...props} />
);

export const RadioOption = (props: any) => (
  <ControlOption Icon={RadioIcon} {...props} />
);
