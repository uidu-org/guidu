import {
  ContentRef,
  ResourcedTaskItem,
  TaskDecisionProvider,
} from '@uidu/task-decision';
import React, { Component, ReactElement } from 'react';

export interface Props {
  taskId: string;
  isDone: boolean;
  contentRef?: ContentRef;
  onChange?: (taskId: string, isChecked: boolean) => void;
  showPlaceholder?: boolean;
  placeholder?: string;
  children?: ReactElement<any>;
  taskDecisionProvider?: Promise<TaskDecisionProvider>;
}

export interface State {}

export default class TaskItemWithProviders extends Component<Props, State> {
  static displayName = 'TaskItemWithProviders';

  state: State = {};

  // Storing the mounted state is an anti-pattern, however the asynchronous state
  // updates via `updateContextIdentifierProvider` means we may be dismounted before
  // it receives a response.
  // Since we can't cancel the Promise we store the mounted state to avoid state
  // updates when no longer suitable.
  private mounted = false;

  UNSAFE_componentWillMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { ...otherProps } = this.props;
    const userContext = 'new';

    return <ResourcedTaskItem {...otherProps} objectAri={objectId} />;
  }
}
