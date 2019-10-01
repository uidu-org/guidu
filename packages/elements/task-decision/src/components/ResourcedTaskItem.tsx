import { FabricElementsAnalyticsContext } from '@uidu/analytics-namespaced-context';
import * as React from 'react';
import { PureComponent } from 'react';
import {
  Appearance,
  BaseItem,
  ContentRef,
  DecisionState,
  TaskDecisionProvider,
  TaskState,
  User,
} from '../types';
import TaskItem from './TaskItem';

export interface Props {
  taskId: string;
  isDone?: boolean;
  onChange?: (taskId: string, isChecked: boolean) => void;
  contentRef?: ContentRef;
  children?: any;
  taskDecisionProvider?: Promise<TaskDecisionProvider>;
  objectAri?: string;
  containerAri?: string;
  showPlaceholder?: boolean;
  placeholder?: string;
  appearance?: Appearance;
  creator?: User;
  lastUpdater?: User;
  disabled?: boolean;
}

export interface State {
  isDone?: boolean;
  lastUpdater?: User;
}

export default class ResourcedTaskItem extends PureComponent<Props, State> {
  public static defaultProps: Partial<Props> = {
    appearance: 'inline',
  };
  private mounted: boolean = false;

  constructor(props: Props) {
    super(props);

    this.state = {
      isDone: props.isDone,
      lastUpdater: props.lastUpdater,
    };
  }

  componentDidMount() {
    this.mounted = true;
    this.subscribe(
      this.props.taskDecisionProvider,
      this.props.containerAri,
      this.props.objectAri,
      this.props.isDone,
    );
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    if (nextProps.isDone !== this.state.isDone) {
      // This only occurs for Actions (DONE vs TODO), since Decisions only support DECIDED.
      // If the document is refreshed or changed, we need to reset the local state to match the new
      // source of truth from the revised data.
      this.onUpdate(nextProps.isDone ? 'DONE' : 'TODO');
    }
    if (
      nextProps.taskDecisionProvider !== this.props.taskDecisionProvider ||
      nextProps.containerAri !== this.props.containerAri ||
      nextProps.objectAri !== this.props.objectAri
    ) {
      this.unsubscribe();
      this.subscribe(
        nextProps.taskDecisionProvider,
        nextProps.containerAri,
        nextProps.objectAri,
        nextProps.isDone,
      );
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
    this.mounted = false;
  }

  private subscribe(
    taskDecisionProvider?: Promise<TaskDecisionProvider>,
    containerAri?: string,
    objectAri?: string,
    isDone?: boolean,
  ) {
    if (taskDecisionProvider && containerAri && objectAri) {
      taskDecisionProvider.then(provider => {
        if (!this.mounted) {
          return;
        }
        const { taskId } = this.props;
        const objectKey = { localId: taskId, objectAri, containerAri };
        const item: BaseItem<TaskState> = {
          ...objectKey,
          state: isDone ? 'DONE' : 'TODO',
          lastUpdateDate: new Date(),
          type: 'TASK',
        };
        provider.subscribe(
          { localId: taskId, objectAri, containerAri },
          this.onUpdate,
          item,
        );
      });
    }
  }

  private unsubscribe() {
    const {
      taskDecisionProvider,
      taskId,
      objectAri,
      containerAri,
    } = this.props;
    if (taskDecisionProvider && containerAri && objectAri) {
      taskDecisionProvider.then(provider => {
        provider.unsubscribe(
          { localId: taskId, objectAri, containerAri },
          this.onUpdate,
        );
      });
    }
  }

  private onUpdate = (state: TaskState | DecisionState) => {
    this.setState({ isDone: state === 'DONE' });
  };

  private handleOnChange = (taskId: string, isDone: boolean) => {
    const {
      taskDecisionProvider,
      objectAri,
      containerAri,
      onChange,
    } = this.props;
    // Optimistically update the task
    this.setState({ isDone });

    if (taskDecisionProvider && containerAri && objectAri) {
      // Call provider to update task
      taskDecisionProvider.then(provider => {
        if (!this.mounted) {
          return;
        }
        provider.toggleTask(
          { localId: taskId, objectAri, containerAri },
          isDone ? 'DONE' : 'TODO',
        );

        // onChange could trigger a rerender, in order to get the correct state
        // we should only call onChange once the internal state have been modified
        if (onChange) {
          onChange(taskId, isDone);
        }

        if (isDone) {
          // Undefined provider.getCurrentUser or currentUser shows 'Created By'
          // ie. does not update to prevent incorrect 'Completed By' message
          this.setState({
            lastUpdater: provider.getCurrentUser
              ? provider.getCurrentUser()
              : undefined,
          });
        }
      });
    } else {
      // No provider - state managed by consumer
      if (onChange) {
        onChange(taskId, isDone);
      }
    }
  };

  render() {
    const { isDone, lastUpdater } = this.state;
    const {
      appearance,
      children,
      containerAri,
      contentRef,
      creator,
      objectAri,
      showPlaceholder,
      placeholder,
      taskId,
      disabled,
    } = this.props;

    return (
      <FabricElementsAnalyticsContext
        data={{
          containerAri,
          objectAri,
        }}
      >
        <TaskItem
          isDone={isDone}
          taskId={taskId}
          onChange={this.handleOnChange}
          appearance={appearance}
          contentRef={contentRef}
          showPlaceholder={showPlaceholder}
          placeholder={placeholder}
          creator={creator}
          lastUpdater={lastUpdater}
          disabled={disabled}
        >
          {children}
        </TaskItem>
      </FabricElementsAnalyticsContext>
    );
  }
}
