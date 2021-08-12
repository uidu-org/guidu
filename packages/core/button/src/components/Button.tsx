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
import { Theme } from '../theme';
import { ButtonProps } from '../types';
import pkg from '../version.json';
import Content from './Content';
import IconWrapper from './IconWrapper';
import InnerWrapper from './InnerWrapper';
import LoadingSpinner from './LoadingSpinner';
import { composeRefs, filterProps, mapAttributesToState } from './utils';

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
      return { isHover: true };
    case 'onMouseLeave':
      return { isHover: false, isActive: false };
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
    theme = (current, props) => current(props),
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

  const getElement = () => {
    if (href) {
      return isDisabled ? 'span' : 'a';
    }
    return 'button';
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

  const StyledButton: React.ElementType = CustomComponent || getElement();

  const iconIsOnlyChild: boolean = !!(
    (iconBefore && !iconAfter && !children) ||
    (iconAfter && !iconBefore && !children)
  );

  const specifiers = (styles: {}) => {
    if (StyledButton === 'a') {
      return {
        ...styles,
        'a&': styles,
      };
    } else if (StyledButton === CustomComponent) {
      return {
        ...styles,
        '&, a&, &:hover, &:active, &:focus': styles,
      };
    }
    return styles;
  };

  return (
    <Theme.Provider value={theme}>
      <Theme.Consumer
        // mode={mode}
        state={mapAttributesToState(attributes)}
        iconIsOnlyChild={iconIsOnlyChild}
        {...props}
      >
        {({ buttonStyles, spinnerStyles }) => {
          return (
            <StyledButton
              {...filterProps(
                {
                  type,
                  href,
                  ...rest,
                },
                StyledButton,
              )}
              href={href}
              type={type}
              ref={getComposedRefs(button, consumerRef)}
              onMouseEnter={_onMouseEnter}
              onMouseLeave={_onMouseLeave}
              onMouseDown={_onMouseDown}
              onMouseUp={_onMouseUp}
              onFocus={_onFocus}
              onBlur={_onBlur}
              disabled={isDisabled}
              className={className}
              style={specifiers(buttonStyles)}
              // {...rest}
            >
              <InnerWrapper onClick={_onInnerClick} fit={!!shouldFitContainer}>
                {isLoading && (
                  <LoadingSpinner
                    spacing={spacing}
                    appearance={appearance}
                    isSelected={isSelected}
                    isDisabled={isDisabled}
                    styles={spinnerStyles}
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
        }}
      </Theme.Consumer>
    </Theme.Provider>
  );
}

// export class Button extends React.Component<ButtonProps, ButtonState> {
//   static defaultProps: ButtonProps = {
//     appearance: 'default',
//     autoFocus: false,
//     isDisabled: false,
//     isLoading: false,
//     isSelected: false,
//     shouldFitContainer: false,
//     spacing: 'default',
//     theme: (current, props) => current(props),
//     type: 'button',
//   };

//   state = {
//     isActive: false,
//     isFocus: false,
//     isHover: false,
//   };

//   isInteractive = () => !this.props.isDisabled && !this.props.isLoading;

//   onMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
//     this.setState({ isHover: true });
//     if (this.props.onMouseEnter) {
//       this.props.onMouseEnter(e);
//     }
//   };

//   onMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
//     this.setState({ isHover: false, isActive: false });
//     if (this.props.onMouseLeave) {
//       this.props.onMouseLeave(e);
//     }
//   };

//   onMouseDown = (e: React.MouseEvent<HTMLElement>) => {
//     e.preventDefault();
//     this.setState({ isActive: true });
//     if (this.props.onMouseDown) {
//       this.props.onMouseDown(e);
//     }
//   };

//   onMouseUp = (e: React.MouseEvent<HTMLElement>) => {
//     this.setState({ isActive: false });
//     if (this.props.onMouseUp) {
//       this.props.onMouseUp(e);
//     }
//   };

//   onFocus: React.FocusEventHandler<HTMLButtonElement> = (event) => {
//     this.setState({ isFocus: true });
//     if (this.props.onFocus) {
//       this.props.onFocus(event);
//     }
//   };

//   onBlur: React.FocusEventHandler<HTMLButtonElement> = (event) => {
//     this.setState({ isFocus: false });
//     if (this.props.onBlur) {
//       this.props.onBlur(event);
//     }
//   };

//   getElement = () => {
//     const { href, isDisabled } = this.props;
//     if (href) {
//       return isDisabled ? 'span' : 'a';
//     }
//     return 'button';
//   };

//   // Swallow click events when the button is disabled
//   // to prevent inner child clicks bubbling up.
//   onInnerClick: React.MouseEventHandler<HTMLElement> = (e) => {
//     if (!this.isInteractive()) {
//       e.stopPropagation();
//     }
//     return true;
//   };

//   render() {
//     const {
//       appearance = 'default',
//       children,
//       className,
//       component: CustomComponent,
//       consumerRef,
//       iconAfter,
//       iconBefore,
//       isDisabled = false,
//       isLoading = false,
//       isSelected = false,
//       shouldFitContainer = false,
//       spacing = 'default',
//       theme = (
//         current: (props: ThemeProps) => ThemeTokens,
//         props: ThemeProps,
//       ) => current(props),
//       ...rest
//     } = this.props;

//     const attributes = { ...this.state, isSelected, isDisabled };

//     const StyledButton: React.ReactType = CustomComponent || this.getElement();

//     const iconIsOnlyChild: boolean = !!(
//       (iconBefore && !iconAfter && !children) ||
//       (iconAfter && !iconBefore && !children)
//     );

//     const specifiers = (styles: {}) => {
//       if (StyledButton === 'a') {
//         return {
//           ...styles,
//           'a&': styles,
//         };
//       } else if (StyledButton === CustomComponent) {
//         return {
//           ...styles,
//           '&, a&, &:hover, &:active, &:focus': styles,
//         };
//       }
//       return styles;
//     };

//     return (
//       <Theme.Provider value={theme}>
//         <GlobalTheme.Consumer>
//           {({ mode }: { mode: ThemeMode }) => (
//             <Theme.Consumer
//               mode={mode}
//               state={mapAttributesToState(attributes)}
//               iconIsOnlyChild={iconIsOnlyChild}
//               {...this.props}
//             >
//               {({ buttonStyles, spinnerStyles }) => {
//                 return (
//                   <StyledButton
//                     {...filterProps(rest, StyledButton)}
//                     ref={this.getComposedRefs(this.button, consumerRef)}
//                     onMouseEnter={this.onMouseEnter}
//                     onMouseLeave={this.onMouseLeave}
//                     onMouseDown={this.onMouseDown}
//                     onMouseUp={this.onMouseUp}
//                     onFocus={this.onFocus}
//                     onBlur={this.onBlur}
//                     disabled={isDisabled}
//                     className={className}
//                     style={specifiers(buttonStyles)}
//                   >
//                     <InnerWrapper
//                       onClick={this.onInnerClick}
//                       fit={!!shouldFitContainer}
//                     >
//                       {isLoading && (
//                         <LoadingSpinner
//                           spacing={spacing}
//                           appearance={appearance}
//                           isSelected={isSelected}
//                           isDisabled={isDisabled}
//                           styles={spinnerStyles}
//                         />
//                       )}
//                       {iconBefore && (
//                         <IconWrapper
//                           isLoading={isLoading}
//                           spacing={spacing}
//                           isOnlyChild={iconIsOnlyChild}
//                           icon={iconBefore}
//                         />
//                       )}
//                       {children && (
//                         <Content
//                           isLoading={isLoading}
//                           followsIcon={!!iconBefore}
//                           spacing={spacing}
//                         >
//                           {children}
//                         </Content>
//                       )}
//                       {iconAfter && (
//                         <IconWrapper
//                           isLoading={isLoading}
//                           spacing={spacing}
//                           isOnlyChild={iconIsOnlyChild}
//                           icon={iconAfter}
//                         />
//                       )}
//                     </InnerWrapper>
//                   </StyledButton>
//                 );
//               }}
//             </Theme.Consumer>
//           )}
//         </GlobalTheme.Consumer>
//       </Theme.Provider>
//     );
//   }
// }

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
