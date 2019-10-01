import { ContentRef, ResourcedTaskItem, TaskDecisionProvider } from '@uidu/task-decision';
import { ContextIdentifierProvider } from '@uidu/editor-common';
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
  contextIdentifierProvider?: Promise<ContextIdentifierProvider>;
}

export interface State {
  resolvedContextProvider?: ContextIdentifierProvider;
}

export default class TaskItemWithProviders extends Component<Props, State> {
  state: State = { resolvedContextProvider: undefined };

  UNSAFE_componentWillMount() {
    this.updateContextIdentifierProvider(this.props);
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
        this.setState({ resolvedContextProvider });
      } catch (err) {
        this.setState({ resolvedContextProvider: undefined });
      }
    } else {
      this.setState({ resolvedContextProvider: undefined });
    }
  }

  render() {
    const {
      contextIdentifierProvider,
      objectAri,
      containerAri,
      ...otherProps
    } = this.props;
    const { objectId, containerId } =
      this.state.resolvedContextProvider ||
      ({
        objectId: objectAri,
        containerId: containerAri,
      } as ContextIdentifierProvider);

    return (
      <ResourcedTaskItem
        {...otherProps}
        objectAri={objectId}
        containerAri={containerId}
      />
    );
  }
}
