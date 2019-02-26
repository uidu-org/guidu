// @flow
import React, {
  PureComponent,
  createContext,
  type ElementType,
  type Node,
} from 'react';
import memoizeOne from 'memoize-one';
import Portal from '@atlaskit/portal';
import { layers } from '@atlaskit/theme';

import { Fade } from './Animation';
import Blanket from '../styled/Blanket';

const noop = () => {};

const { Consumer: TargetConsumer, Provider: TargetProvider } = createContext();

type SpotlightContext = {
  opened: () => void,
  closed: () => void,
  targets: {
    [string]: HTMLElement | void,
  },
};
const {
  Consumer: SpotlightStateConsumer,
  Provider: SpotlightStateProvider,
} = createContext(
  ({ opened: noop, closed: noop, targets: {} }: SpotlightContext),
);

export { TargetConsumer };

export { SpotlightStateConsumer as SpotlightConsumer };

type Props = {
  /** Boolean prop for toggling blanket transparency  */
  blanketIsTinted?: boolean,
  /* Typically the app, or a section of the app */
  children: Node,
  /* Deprecated - Replaces the wrapping fragment with component */
  component?: ElementType,
};

const Container = ({
  component: Wrapper,
  children,
}: {
  component: ElementType,
  children: Node,
}) => <Wrapper>{children}</Wrapper>;

export default class SpotlightManager extends PureComponent<
  Props,
  {
    spotlightCount: number,
    targets: { [string]: HTMLElement | void },
  },
> {
  static defaultProps = {
    blanketIsTinted: true,
  };

  componentDidMount() {
    if (process.env.NODE_ENV !== 'production') {
      if (this.props.component) {
        // eslint-disable-next-line no-console
        console.warn(
          `Atlaskit: The SpotlightManager 'component' prop is deprecated. Please wrap the SpotlightManager in the component instead.`,
        );
      }
    }
  }

  state = {
    spotlightCount: 0,
    targets: {},
  };

  targetRef = (name: string) => (element: HTMLElement | void) => {
    this.setState(state => ({
      targets: {
        ...state.targets,
        [name]: element || undefined,
      },
    }));
  };

  spotlightOpen = () => {
    this.setState(state => ({ spotlightCount: state.spotlightCount + 1 }));
  };

  spotlightClose = () => {
    this.setState(state => ({ spotlightCount: state.spotlightCount - 1 }));
  };

  getStateProviderValue = memoizeOne(
    (targets): SpotlightContext => ({
      opened: this.spotlightOpen,
      closed: this.spotlightClose,
      targets,
    }),
  );

  render() {
    const { blanketIsTinted, children, component: Tag } = this.props;
    return (
      <SpotlightStateProvider
        value={this.getStateProviderValue(this.state.targets)}
      >
        <TargetProvider value={this.targetRef}>
          <Container component={Tag || React.Fragment}>
            <Fade in={this.state.spotlightCount > 0}>
              {animationStyles => (
                <Portal zIndex={layers.spotlight()}>
                  <Blanket style={animationStyles} isTinted={blanketIsTinted} />
                </Portal>
              )}
            </Fade>
            {children}
          </Container>
        </TargetProvider>
      </SpotlightStateProvider>
    );
  }
}
