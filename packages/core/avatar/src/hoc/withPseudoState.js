// @flow
import React, { Component, type ComponentType, type ElementRef } from 'react';
import { omit, getDisplayName } from '../utils';

type Props = {
  href?: string,
  isActive?: boolean,
  isFocus?: boolean,
  isHover?: boolean,
  isInteractive?: boolean,
  onBlur?: () => mixed,
  onClick?: () => mixed,
  onFocus?: () => mixed,
  onKeyDown?: () => mixed,
  onKeyUp?: () => mixed,
  onMouseDown?: () => mixed,
  onMouseEnter?: () => mixed,
  onMouseLeave?: () => mixed,
  onMouseUp?: () => mixed,
};

const INTERNAL_HANDLERS = [
  'onBlur',
  'onFocus',
  'onKeyDown',
  'onKeyUp',
  'onMouseDown',
  'onMouseEnter',
  'onMouseLeave',
  'onMouseUp',
];

type State = {
  isActive: boolean,
  isFocus: boolean,
  isHover: boolean,
  isInteractive: boolean,
};

export default function withPseudoState<InnerProps: {}>(
  WrappedComponent: ComponentType<InnerProps>,
) {
  type CombinedProps = { ...$Exact<InnerProps>, ...$Exact<Props> };
  return class ComponentWithPseudoState extends Component<
    CombinedProps,
    State,
  > {
    static displayName = getDisplayName('withPseudoState', WrappedComponent);
    component: ElementRef<*>;
    actionKeys: Array<string>;
    componentWillMount() {
      const { href, isInteractive, onClick } = this.props;

      if (href || isInteractive || onClick) {
        this.actionKeys = onClick || isInteractive ? ['Enter', ' '] : ['Enter'];
      }
    }

    state: State = {
      isActive: Boolean(this.props.isActive),
      isFocus: Boolean(this.props.isActive),
      isHover: Boolean(this.props.isActive),
      isInteractive: Boolean(
        this.props.href || this.props.isInteractive || this.props.onClick,
      ),
    };

    // expose blur/focus to consumers via ref
    blur = () => {
      if (this.component && this.component.blur) this.component.blur();
    };
    focus = () => {
      if (this.component && this.component.focus) this.component.focus();
    };

    setComponent = (component: ElementRef<*>) => {
      this.component = component;
    };

    onBlur = () => this.setState({ isActive: false, isFocus: false });
    onFocus = () => this.setState({ isFocus: true });
    onMouseLeave = () => this.setState({ isActive: false, isHover: false });
    onMouseEnter = () => this.setState({ isHover: true });
    onMouseUp = () => this.setState({ isActive: false });
    onMouseDown = () => this.setState({ isActive: true });

    onKeyDown = (event: KeyboardEvent) => {
      if (this.actionKeys.indexOf(event.key) > -1) {
        this.setState({ isActive: true });
      }
    };
    onKeyUp = (event: KeyboardEvent) => {
      if (this.actionKeys.indexOf(event.key) > -1) {
        this.setState({ isActive: false });
      }
    };

    getProps = (): CombinedProps => {
      const { isInteractive } = this.state;

      // strip the consumer's handlers off props, then merge with our handlers
      // if the element is interactive
      // We cannot properly type omit because of the inability to convert from
      // an array to a union of the array's items. See https://github.com/facebook/flow/issues/961
      // if you want to learn more about this
      // $FlowFixMe
      const props: CombinedProps = omit(this.props, ...INTERNAL_HANDLERS);

      const self: Object = this;

      if (isInteractive) {
        INTERNAL_HANDLERS.forEach((handler: string) => {
          if (this.props[handler]) {
            props[handler] = (...args) => {
              self[handler](...args);
              this.props[handler](...args);
            };
          } else {
            props[handler] = self[handler];
          }
        });
      }

      return props;
    };

    render() {
      return (
        <WrappedComponent
          ref={this.setComponent}
          {...this.state}
          {...this.getProps()}
        />
      );
    }
  };
}
