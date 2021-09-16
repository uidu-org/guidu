import {
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
} from '@uidu/analytics';
import memoize from 'memoize-one';
import React, {
  FocusEventHandler,
  MouseEvent,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { buttonVariants } from '../theme';
import { ButtonAppearances, ButtonProps } from '../types';
import pkg from '../version.json';
import Content from './Content';
import IconWrapper from './IconWrapper';
import InnerWrapper from './InnerWrapper';
import LoadingSpinner from './LoadingSpinner';
import { composeRefs, filterProps, mapAttributesToState } from './utils';

export const StyledButton = styled.button<{
  appearance: ButtonAppearances;
  status: string;
  $iconIsOnlyChild: boolean;
}>`
  ${({ appearance = 'default', status }) =>
    buttonVariants[appearance] && buttonVariants[appearance][status]}
  ${({ $iconIsOnlyChild }) => $iconIsOnlyChild && tw`py-2`}
`;

export type ButtonState = {
  isActive?: boolean;
  isFocus?: boolean;
  isHover?: boolean;
};

const initialState: ButtonState = {
  isActive: false,
  isFocus: false,
  isHover: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'onMouseEnter':
      return { isHover: true, isFocus: state.isFocus };
    case 'onMouseLeave':
      return { isHover: false, isActive: false, isFocus: state.isFocus };
    case 'onMouseDown':
      return { isHover: false, isActive: false };
    case 'onMouseUp':
      return { isActive: false };
    case 'onFocus':
      return { isFocus: true };
    case 'onBlur':
      return { isFocus: false };
    default:
      throw new Error();
  }
}

function Button(props: ButtonProps) {
  const {
    appearance = 'default',
    autoFocus = false,
    isDisabled = false,
    isLoading = false,
    isSelected = false,
    shouldFitContainer = false,
    spacing = 'default',
    type = 'button',
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onFocus,
    onBlur,
    children,
    className,
    component: CustomComponent,
    consumerRef,
    iconAfter,
    iconBefore,
    href,
    to,
    ...rest
  } = props;
  // ref can be a range of things because we render button, a, span or other React components
  const button = useRef<HTMLButtonElement>();
  const getComposedRefs = memoize(composeRefs);

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (autoFocus && button instanceof HTMLButtonElement) {
      button.current.focus();
    }
  }, []);

  const isInteractive = () => !isDisabled && !isLoading;

  const _onMouseEnter = (e: MouseEvent<HTMLElement>) => {
    dispatch({ type: 'onMouseEnter' });
    onMouseEnter && onMouseEnter(e);
  };

  const _onMouseLeave = (e: MouseEvent<HTMLElement>) => {
    dispatch({ type: 'onMouseLeave' });
    onMouseLeave && onMouseLeave(e);
  };

  const _onMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch({ type: 'onMouseDown' });
    onMouseDown && onMouseDown(e);
  };

  const _onMouseUp = (e: React.MouseEvent<HTMLElement>) => {
    dispatch({ type: 'onMouseUp' });
    onMouseUp && onMouseUp(e);
  };

  const _onFocus: FocusEventHandler<HTMLButtonElement> = (e) => {
    dispatch({ type: 'onFocus' });
    onFocus && onFocus(e);
  };

  const _onBlur: React.FocusEventHandler<HTMLButtonElement> = (e) => {
    dispatch({ type: 'onBlur' });
    onBlur && onBlur(e);
  };

  // Swallow click events when the button is disabled
  // to prevent inner child clicks bubbling up.
  const _onInnerClick: React.MouseEventHandler<HTMLElement> = (e) => {
    if (!isInteractive()) {
      e.stopPropagation();
    }
    return true;
  };

  const attributes = { ...state, isSelected, isDisabled };

  // const StyledButton: React.ElementType = CustomComponent || getElement();

  const iconIsOnlyChild: boolean = !!(
    (iconBefore && !iconAfter && !children) ||
    (iconAfter && !iconBefore && !children)
  );

  return (
    <StyledButton
      {...filterProps({
        type,
        href,
        to,
        ...rest,
      })}
      ref={getComposedRefs(button, consumerRef)}
      onMouseEnter={_onMouseEnter}
      onMouseLeave={_onMouseLeave}
      onMouseDown={_onMouseDown}
      onMouseUp={_onMouseUp}
      onFocus={_onFocus}
      onBlur={_onBlur}
      disabled={isDisabled}
      css={[
        tw`align-baseline border-width[1px] border-transparent inline-flex max-w-full outline-none! text-center text-decoration[none] whitespace-nowrap font-size[inherit] font-style[normal] font-weight[normal]`,
        tw`font-medium rounded appearance-none font-size[.975rem]`,
        isLoading && tw`pointer-events-none`,
        state === 'hover'
          ? {
              transition:
                'background 0s ease-out, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38)',
            }
          : {
              transition:
                'background 0.1s ease-out, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38)',
            },
        state === 'hover' &&
        (appearance === 'link' || appearance === 'subtle-link')
          ? tw`hover:underline`
          : tw`hover:text-decoration[none]`,
        spacing === 'none' ? tw`p-0` : tw`px-1.5 py-2`,
        tw`line-height[initial]`,
        state === 'hover' || state === 'active' || state === 'selected'
          ? tw`cursor-pointer`
          : state === 'disabled'
          ? tw`cursor-not-allowed`
          : tw`cursor-default`,
        spacing === 'none' ? tw`align-baseline` : tw`align-middle`,
        shouldFitContainer ? tw`w-full` : tw`w-auto`,
        state === 'active'
          ? tw`transition-duration[0s]`
          : state === 'focus'
          ? tw`transition-duration[0s, 0.2s]`
          : tw`transition-duration[0.1s, 0.15s]`,
      ]}
      appearance={appearance}
      className={className}
      status={mapAttributesToState(attributes)}
      $iconIsOnlyChild={iconIsOnlyChild}
    >
      <InnerWrapper onClick={_onInnerClick} fit={!!shouldFitContainer}>
        {isLoading && (
          <LoadingSpinner
            spacing={spacing}
            appearance={appearance}
            isSelected={isSelected}
            isDisabled={isDisabled}
          />
        )}
        {iconBefore && (
          <IconWrapper
            isLoading={isLoading}
            spacing={spacing}
            isOnlyChild={iconIsOnlyChild}
            icon={iconBefore}
          />
        )}
        {children && (
          <Content
            isLoading={isLoading}
            followsIcon={!!iconBefore}
            spacing={spacing}
          >
            {children}
          </Content>
        )}
        {iconAfter && (
          <IconWrapper
            isLoading={isLoading}
            spacing={spacing}
            isOnlyChild={iconIsOnlyChild}
            icon={iconAfter}
          />
        )}
      </InnerWrapper>
    </StyledButton>
  );
}

const createAndFireEventOnGuidu = createAndFireEvent('uidu');
const ButtonWithRef = React.forwardRef<HTMLElement, ButtonProps>(
  // @ts-ignore
  (props, ref) => <Button {...props} consumerRef={ref} />,
);
ButtonWithRef.displayName = 'Button';

// @ts-ignore
export default withAnalyticsContext({
  componentName: 'button',
  packageName: pkg.name,
  packageVersion: pkg.version,
})(
  withAnalyticsEvents({
    onClick: createAndFireEventOnGuidu({
      action: 'clicked',
      actionSubject: 'button',
      attributes: {
        componentName: 'button',
        packageName: pkg.name,
        packageVersion: pkg.version,
      },
    }),
  })(ButtonWithRef),
) as React.ComponentType<ButtonProps>;
