// @flow
import React, {
  Component,
  type ComponentType,
  type ElementConfig,
  type ElementRef,
} from 'react';
import { getDisplayName } from '../utils';

export default function mapProps(mapping: { [string]: any }) {
  return <Props: {}, WrappedComponent: ComponentType<Props>>(
    DecoratedComponent: WrappedComponent,
  ): ComponentType<ElementConfig<WrappedComponent>> =>
    // TODO: type this correctly
    class MapProps extends Component<*> {
      static displayName: string | void | null = getDisplayName(
        'mapProps',
        DecoratedComponent,
      );
      static DecoratedComponent = DecoratedComponent;

      component: ?ElementRef<*>;

      // expose blur/focus to consumers via ref
      blur = () => {
        if (this.component && this.component.blur) this.component.blur();
      };
      focus = () => {
        if (this.component && this.component.focus) this.component.focus();
      };

      setComponent = (component: ?ElementRef<*>) => {
        this.component = component;
      };

      render() {
        const mapped: { [string]: any } = {
          ...this.props,
          ...Object.keys(mapping).reduce(
            (acc, key) => ({
              ...acc,
              [key]: mapping[key](this.props),
            }),
            {},
          ),
        };

        return <DecoratedComponent ref={this.setComponent} {...mapped} />;
      }
    };
}
