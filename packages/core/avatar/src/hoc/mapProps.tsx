import React, { Component } from 'react';
import { getDisplayName } from '../utils';

export default function mapProps(mapping) {
  return DecoratedComponent =>
    // TODO: type this correctly
    class MapProps extends Component<any> {
      static displayName: string | void | null = getDisplayName(
        'mapProps',
        DecoratedComponent,
      );
      static DecoratedComponent = DecoratedComponent;

      component?: any;

      // expose blur/focus to consumers via ref
      blur = () => {
        if (this.component && this.component.blur) {
          this.component.blur();
        }
      };

      focus = () => {
        if (this.component && this.component.focus) this.component.focus();
      };

      setComponent = (component?: any) => {
        this.component = component;
      };

      render() {
        const mapped = {
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
