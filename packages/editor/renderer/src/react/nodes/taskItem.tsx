import { FabricElementsAnalyticsContext } from '@uidu/analytics-namespaced-context';
import { ProviderFactory, WithProviders } from '@uidu/editor-common';
import * as React from 'react';
import { PureComponent, ReactNode } from 'react';
import { RendererContext } from '../';
import TaskItemWithProviders from './task-item-with-providers';

export interface Props {
  localId: string;
  rendererContext?: RendererContext;
  state?: string;
  providers?: ProviderFactory;
  children?: ReactNode;
}

export default class TaskItem extends PureComponent<Props, {}> {
  private providerFactory: ProviderFactory;

  constructor(props: Props) {
    super(props);
    this.providerFactory = props.providers || new ProviderFactory();
  }

  componentWillUnmount() {
    if (!this.props.providers) {
      // new ProviderFactory is created if no `providers` has been set
      // in this case when component is unmounted it's safe to destroy this providerFactory
      this.providerFactory.destroy();
    }
  }

  private renderWithProvider = (providers: any) => {
    const { taskDecisionProvider } = providers;
    const { children, localId, state, rendererContext } = this.props;
    let objectAri = '';
    let containerAri = '';
    if (rendererContext) {
      objectAri = rendererContext.objectAri || '';
      containerAri = rendererContext.containerAri || '';
    }

    return (
      <FabricElementsAnalyticsContext
        data={{
          userContext: 'document',
        }}
      >
        <TaskItemWithProviders
          objectAri={objectAri}
          containerAri={containerAri}
          taskId={localId}
          isDone={state === 'DONE'}
          taskDecisionProvider={taskDecisionProvider}
        >
          {children}
        </TaskItemWithProviders>
      </FabricElementsAnalyticsContext>
    );
  };

  render() {
    return (
      <WithProviders
        providers={['taskDecisionProvider']}
        providerFactory={this.providerFactory}
        renderNode={this.renderWithProvider}
      />
    );
  }
}
