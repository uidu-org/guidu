import * as React from 'react';
import ComponentTransition from 'react-transition-group/Transition';

/*
  I extracted Transition into its own component for two reasons:
    1. To make the exit transition work... react-transition-group@^2 doesn't persist the state of the rendered component as it transitions out
    which (unless you maintain extra state in your component) results in the alert changing types and losing its message during transition
    2. I thought it would probably be reused one-day
*/

type State = 'entering' | 'entered' | 'exiting' | 'exited';
type EnterTransition = 'fade' | 'slide-up';
type ExitTransition = 'fade' | 'slide-down';

const styles: {
  [state: string]: { [animation: string]: { [state: string]: {} } };
} = {
  enter: {
    fade: {
      entering: {
        opacity: '0',
      },
      entered: {
        opacity: '1',
      },
    },
    'slide-up': {
      entering: {
        transform: 'translate(0, 100%)',
      },
      entered: {
        transform: 'translate(0, 0)',
      },
    },
  },
  exit: {
    fade: {
      exiting: {
        opacity: '1',
      },
      exited: {
        opacity: '0',
      },
    },
    'slide-down': {
      exiting: {
        transform: 'translate(0, 0)',
      },
      exited: {
        transform: 'translate(0, 100%)',
      },
    },
  },
};

function getStyle(
  type: 'enter' | 'exit',
  name: EnterTransition | ExitTransition,
  state: State,
): {} {
  return (
    styles && styles[type] && styles[type][name] && styles[type][name][state]
  );
}

export interface TransitionProps {
  enter?: ('fade' | 'slide-up')[];
  exit?: ('fade' | 'slide-down')[];
  timeout: number | { enter: number; exit: number };
  children: null | React.ReactElement<any>;
}

export interface TransitionState {
  visible: boolean;
  children: null | React.ReactElement<any>;
}

export default class Transition extends React.Component<
  TransitionProps,
  TransitionState
> {
  constructor(props: TransitionProps) {
    super(props);
    this.state = {
      visible: props.children !== null,
      children: props.children,
    };
  }

  componentWillReceiveProps(nextProps: TransitionProps) {
    const { children: nextChildren } = nextProps;
    const { children: prevChildren } = this.props;

    // when exiting, show the old element until the transition is finished - otherwise the Alert changes mid-transition
    if (nextChildren !== prevChildren) {
      if (nextChildren === null) {
        this.setState({
          visible: false,
        });
      } else {
        this.setState({
          visible: true,
          children: nextChildren,
        });
      }
    }
  }

  handleExited = () => {
    const { timeout, children } = this.props;
    window.setTimeout(
      () =>
        this.setState({
          visible: false,
          children,
        }),
      timeout as number,
    ); // FIXME: hmm not sure why we have to wait - it should have already finished
  };

  getStyle(
    status: 'enter' | 'entering' | 'entered' | 'exit' | 'exiting' | 'exited',
  ): {} {
    const { enter = [], exit = [], timeout } = this.props;

    if (status === 'entering') {
      return enter.reduce(
        (accum, name) => ({ ...accum, ...getStyle('enter', name, 'entering') }),
        {},
      );
    }

    if (status === 'entered') {
      return {
        ...enter.reduce(
          (accum, name) => ({
            ...accum,
            ...getStyle('enter', name, 'entering'),
          }),
          {},
        ),
        ...enter.reduce(
          (accum, name) => ({
            ...accum,
            ...getStyle('enter', name, 'entered'),
          }),
          {},
        ),
        transition: `all ${timeout}ms ease-in-out`,
      };
    }

    if (status === 'exiting') {
      return {
        ...exit.reduce(
          (accum, name) => ({ ...accum, ...getStyle('exit', name, 'exiting') }),
          {},
        ),
      };
    }

    if (status === 'exited') {
      return {
        ...exit.reduce(
          (accum, name) => ({ ...accum, ...getStyle('exit', name, 'exiting') }),
          {},
        ),
        ...exit.reduce(
          (accum, name) => ({ ...accum, ...getStyle('exit', name, 'exited') }),
          {},
        ),
        transition: `all ${timeout}ms ease-in-out`,
      };
    }

    return {};
  }

  render() {
    const { timeout } = this.props;
    const { visible, children } = this.state;
    return (
      <ComponentTransition
        appear={true}
        enter={true}
        exit={true}
        in={visible}
        timeout={timeout}
        onExited={this.handleExited}
      >
        {(
          status:
            | 'enter'
            | 'entering'
            | 'entered'
            | 'exit'
            | 'exiting'
            | 'exited',
        ) => {
          if (children) {
            return React.cloneElement(children, {
              style: this.getStyle(status),
            });
          } else {
            return children;
          }
        }}
      </ComponentTransition>
    );
  }
}
