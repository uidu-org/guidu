// @flow

import React, { PureComponent } from 'react';
import { Grid } from '@atlaskit/page';
import { ThemeProvider } from 'styled-components';
import ProgressTrackerStage from '../ProgressTrackerStage';
import { ProgressTrackerContainer } from './styled';
import ProgressTrackerLink from '../ProgressTrackerLink';
import type {
  Stages,
  Spacing,
  LinkComponentProps,
  LinkElement,
  ProgressTrackerStageRenderProp,
} from '../types';

type Props = {
  /** Ordered list of stage data */
  items: Stages,
  /** Margin spacing type between steps */
  spacing: Spacing,
  /** Render prop to specify custom implementations of components */
  render: ProgressTrackerStageRenderProp,
  /** Turns off transition animations if set to false */
  animated: boolean,
};

type State = {
  prevStages: Stages,
};

const TRANSITION_SPEED = 300;
const LINEAR_TRANSITION_SPEED = 50;
const easeOut = 'cubic-bezier(0.15,1,0.3,1)';

export default class ProgressTracker extends PureComponent<Props, State> {
  static defaultProps = {
    items: [],
    spacing: 'cosy',
    render: {
      link: (props: LinkComponentProps): LinkElement => (
        <ProgressTrackerLink {...props} />
      ),
    },
    animated: true,
  };

  createTheme = () => ({
    spacing: this.props.spacing,
    columns: this.props.items.length * 2,
  });

  props: Props;

  componentWillMount() {
    this.setState({
      prevStages: this.props.items.map(stage => ({
        ...stage,
        percentageComplete: 0,
      })),
    });
  }

  componentWillReceiveProps() {
    const newState = this.state;
    newState.prevStages = this.props.items;
    this.setState(newState);
  }

  render() {
    const progressChanges = this.props.items.filter(
      (stage, index) =>
        stage.percentageComplete !==
        this.state.prevStages[index].percentageComplete,
    ).length;
    const totalStepsForward = this.props.items.filter(
      (stage, index) =>
        stage.percentageComplete >
        this.state.prevStages[index].percentageComplete,
    ).length;
    const totalStepsBack = this.props.items.filter(
      (stage, index) =>
        stage.percentageComplete <
        this.state.prevStages[index].percentageComplete,
    ).length;
    let stepsForward = totalStepsForward;
    let stepsBack = totalStepsBack;
    const items = this.props.items.map((stage, index) => {
      let transitionSpeed = 0;
      let transitionDelay = 0;
      const transitionEasing = progressChanges > 1 ? 'linear' : easeOut;
      if (this.props.animated) {
        transitionSpeed =
          progressChanges > 1 ? LINEAR_TRANSITION_SPEED : TRANSITION_SPEED;
        if (
          stage.percentageComplete <
          this.state.prevStages[index].percentageComplete
        ) {
          /** load each transition sequentially in reverse */
          transitionDelay = (stepsBack - 1) * transitionSpeed;
          stepsBack -= 1;
        } else if (
          stage.percentageComplete >
          this.state.prevStages[index].percentageComplete
        ) {
          /** load each transition sequentially */
          transitionDelay =
            (totalStepsForward - stepsForward) * transitionSpeed;
          stepsForward -= 1;
        }
      }

      return (
        <ProgressTrackerStage
          key={stage.id}
          item={stage}
          render={this.props.render}
          transitionSpeed={transitionSpeed}
          transitionDelay={transitionDelay}
          transitionEasing={transitionEasing}
        />
      );
    });

    return (
      <ThemeProvider theme={this.createTheme()}>
        <Grid>
          <ProgressTrackerContainer>{items}</ProgressTrackerContainer>
        </Grid>
      </ThemeProvider>
    );
  }
}
