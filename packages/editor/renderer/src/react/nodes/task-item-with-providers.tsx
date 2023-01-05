import {
  ContentRef,
  ResourcedTaskItem,
  TaskDecisionProvider,
} from '@uidu/task-decision';
import * as React from 'react';
import { Component, ReactNode } from 'react';

export interface Props {
  taskId: string;
  objectAri: string;
  containerAri: string;
  isDone: boolean;
  contentRef?: ContentRef;
  onChange?: (taskId: string, isChecked: boolean) => void;
  showPlaceholder?: boolean;
  children?: ReactNode;
  taskDecisionProvider?: Promise<TaskDecisionProvider>;
}

export interface State {}

export default class TaskItemWithProviders extends Component<Props, State> {
  state: State = { resolvedContextProvider: undefined };

  render() {
    const { objectAri, containerAri, ...otherProps } = this.props;

    return <ResourcedTaskItem {...otherProps} />;
  }
}
