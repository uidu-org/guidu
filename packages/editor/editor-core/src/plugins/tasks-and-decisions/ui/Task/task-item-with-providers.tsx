import { FabricElementsAnalyticsContext } from '@atlaskit/analytics-namespaced-context';
import {
  ContentRef,
  ResourcedTaskItem,
  TaskDecisionProvider,
} from '@atlaskit/task-decision';
import { ContextIdentifierProvider } from '@uidu/editor-common';
import * as React from 'react';
import { Component, ReactElement } from 'react';

export interface Props {
  taskId: string;
  isDone: boolean;
  contentRef?: ContentRef;
  onChange?: (taskId: string, isChecked: boolean) => void;
  showPlaceholder?: boolean;
  placeholder?: string;
  children?: ReactElement<any>;
  taskDecisionProvider?: Promise<TaskDecisionProvider>;
  contextIdentifierProvider?: Promise<ContextIdentifierProvider>;
}

export interface State {
  resolvedContextProvider?: ContextIdentifierProvider;
}

export default class TaskItemWithProviders extends Component<Props, State> {
  state: State = { resolvedContextProvider: undefined };

  // Storing the mounted state is an anti-pattern, however the asynchronous state
  // updates via `updateContextIdentifierProvider` means we may be dismounted before
  // it receives a response.
  // Since we can't cancel the Promise we store the mounted state to avoid state
  // updates when no longer suitable.
  private mounted = false;

  UNSAFE_componentWillMount() {
    this.mounted = true;
    this.updateContextIdentifierProvider(this.props);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    if (
      nextProps.contextIdentifierProvider !==
      this.props.contextIdentifierProvider
    ) {
      this.updateContextIdentifierProvider(nextProps);
    }
  }

  private async updateContextIdentifierProvider(props: Props) {
    if (props.contextIdentifierProvider) {
      try {
        const resolvedContextProvider = await props.contextIdentifierProvider;
        if (this.mounted) this.setState({ resolvedContextProvider });
      } catch (err) {
        if (this.mounted) this.setState({ resolvedContextProvider: undefined });
      }
    } else {
      this.setState({ resolvedContextProvider: undefined });
    }
  }

  render() {
    const { contextIdentifierProvider, ...otherProps } = this.props;
    const { objectId, containerId } =
      this.state.resolvedContextProvider || ({} as ContextIdentifierProvider);
    const userContext = objectId ? 'edit' : 'new';

    return (
      <FabricElementsAnalyticsContext
        data={{
          userContext,
        }}
      >
        <ResourcedTaskItem
          {...otherProps}
          objectAri={objectId}
          containerAri={containerId}
        />
      </FabricElementsAnalyticsContext>
    );
  }
}
