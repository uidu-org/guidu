import * as React from 'react';
import { ButtonAppearances } from '../types';
import { PropsPasser, PropsOf } from '@atlaskit/type-helpers';

const getComponentName = (target: React.ComponentType): string => {
  if (target.displayName && typeof target.displayName === 'string') {
    return target.displayName;
  }

  return target.name || 'Component';
};

const warnIfDeprecatedAppearance = (appearance?: ButtonAppearances) => {
  const deprecatedAppearances = ['help'];
  if (appearance && deprecatedAppearances.indexOf(appearance) !== -1) {
    // tslint:disable-next-line:no-console
    console.warn(
      `Atlaskit: The Button appearance "${appearance}" is deprecated. Please use styled-components' ThemeProvider to provide a custom theme for Button instead.`,
    );
  }
};

type AppearanceProps = { appearance?: ButtonAppearances };

const withDeprecationWarnings: PropsPasser<AppearanceProps> = Component => {
  return class WithDeprecationWarnings extends React.Component<
    PropsOf<typeof Component> & AppearanceProps
  > {
    static displayName = `WithDeprecationWarnings(${getComponentName(
      Component,
    )})`;

    componentWillMount() {
      warnIfDeprecatedAppearance(this.props.appearance);
    }

    componentWillReceiveProps(newProps: AppearanceProps) {
      if (newProps.appearance !== this.props.appearance) {
        warnIfDeprecatedAppearance(newProps.appearance);
      }
    }

    render() {
      return React.createElement(Component, this.props as any);
    }
  };
};

export default withDeprecationWarnings;
