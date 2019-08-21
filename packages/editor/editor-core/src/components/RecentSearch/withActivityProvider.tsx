import { ActivityProvider } from '@atlaskit/activity';
import { ProviderFactory, Providers, WithProviders } from '@uidu/editor-common';
import * as React from 'react';
import { Diff } from '../../utils/types';

export interface ExpandedActivityProviderProps {
  providerFactory: ProviderFactory;
}

export interface WithActivityProviderProps {
  activityProvider: ActivityProvider;
}

export default function withActivityProvider<Props>(
  WrappedComponent: React.ComponentType<Props & WithActivityProviderProps>,
) {
  return class WithActivityProvider extends React.Component<
    Diff<Props, WithActivityProviderProps> & ExpandedActivityProviderProps
  > {
    renderNode = (providers: Providers) => {
      const { providerFactory, ...props } = this
        .props as ExpandedActivityProviderProps;
      const { activityProvider } = providers;

      return (
        <WrappedComponent
          activityProvider={activityProvider as any}
          {...(props as Props)}
        />
      );
    };

    render() {
      const { providerFactory } = this.props;
      return (
        <WithProviders
          providers={['activityProvider']}
          providerFactory={providerFactory}
          renderNode={this.renderNode}
        />
      );
    }
  };
}
