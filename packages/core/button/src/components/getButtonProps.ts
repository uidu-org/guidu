import { ButtonType, ButtonState } from './Button';
import { ButtonProps } from '../types';

const getAppearanceProps = (props: ButtonProps, state: ButtonState) => {
  const {
    appearance,
    className,
    isDisabled,
    isLoading,
    isSelected,
    spacing,
    shouldFitContainer,
  } = props;

  const { isActive, isFocus, isHover } = state;

  return {
    appearance,
    className,
    disabled: isDisabled,
    isActive,
    isFocus,
    isHover,
    isLoading,
    isSelected,
    spacing,
    fit: shouldFitContainer,
  };
};

const getInteractionProps = (component: ButtonType) => {
  const {
    onBlur,
    onFocus,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onMouseUp,
  } = component;

  const { tabIndex } = component.props;

  // Block onClick/Keyboard submit while isLoading
  const onClick: ButtonProps['onClick'] = component.props.isLoading
    ? e => e.preventDefault()
    : component.props.onClick;

  return {
    onBlur,
    onClick,
    onFocus,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onMouseUp,
    tabIndex,
  };
};

const getLinkElementProps = (
  props: React.AnchorHTMLAttributes<HTMLAnchorElement>,
) => {
  const { href, target } = props;

  return { href, target };
};

const getButtonElementProps = (props: ButtonType['props']) => {
  const { ariaHaspopup, ariaExpanded, ariaControls, form, type } = props;

  return {
    'aria-haspopup': ariaHaspopup,
    'aria-expanded': ariaExpanded,
    'aria-controls': ariaControls,
    form,
    type,
  };
};

const getButtonProps = (component: ButtonType) => {
  const { props, state } = component;

  const defaultProps = {
    id: props.id,
    ...getAppearanceProps(props, state),
    ...getInteractionProps(component),
    'aria-label': props.ariaLabel,
  };

  if (props.component) {
    return {
      ...props,
      ...defaultProps,
    };
  }

  if (props.href) {
    if (props.isDisabled) {
      return defaultProps;
    }

    return {
      ...defaultProps,
      ...getLinkElementProps(props),
    };
  }

  return {
    ...defaultProps,
    ...getButtonElementProps(props),
  };
};

export default getButtonProps;
