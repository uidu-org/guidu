// @flow

import React, { PureComponent } from 'react';
import { CSSTransition } from 'react-transition-group';
import { colors } from '@atlaskit/theme';
import { GridColumn } from '@atlaskit/page';
import {
  ProgressTrackerStageContainer,
  ProgressTrackerStageMarker,
  ProgressTrackerStageBar,
  ProgressTrackerStageTitle,
} from './styled';
import type { Stage, ProgressTrackerStageRenderProp } from '../types';

const semibold = '600';
const regular = '400';
const getMarkerColor = status => {
  switch (status) {
    case 'unvisited':
      return colors.N70;
    case 'current':
      return colors.B300;
    case 'visited':
      return colors.B300;
    case 'disabled':
      return colors.B300;
    default:
      return null;
  }
};

const getTextColor = status => {
  switch (status) {
    case 'unvisited':
      return colors.N300;
    case 'current':
      return colors.B300;
    case 'visited':
      return colors.N800;
    case 'disabled':
      return colors.N70;
    default:
      return null;
  }
};

const getFontWeight = status => {
  switch (status) {
    case 'unvisited':
      return regular;
    case 'current':
      return semibold;
    case 'visited':
      return semibold;
    case 'disabled':
      return semibold;
    default:
      return null;
  }
};

type Props = {
  /** stage data passed to each `ProgressTrackerStage` component */
  item: Stage,
  /** render prop to specify how to render components */
  render: ProgressTrackerStageRenderProp,
  /** delay before transitioning in ms */
  transitionDelay: number,
  /** speed at which to transition in ms */
  transitionSpeed: number,
  /** type of easing for transition */
  transitionEasing: string,
};

type State = {
  transitioning: boolean,
  oldMarkerColor: string | null,
  oldPercentageComplete: number,
};

const Fade = ({ children, ...props }: Object) => (
  <CSSTransition {...props} classNames="fade">
    {children}
  </CSSTransition>
);

export default class ProgressTrackerStage extends PureComponent<Props, State> {
  constructor(props: Object) {
    super(props);
    this.state = {
      transitioning: false,
      oldMarkerColor: getMarkerColor(this.props.item.status),
      oldPercentageComplete: 0,
    };
  }

  componentWillMount() {
    const newState = this.state;
    newState.transitioning = true;
    this.setState(newState);
  }

  componentWillReceiveProps() {
    const newState = this.state;
    newState.transitioning = true;
    this.setState(newState);
  }

  shouldShowLink() {
    return this.props.item.status === 'visited' && !this.props.item.noLink;
  }

  render() {
    const {
      item,
      render,
      transitionDelay,
      transitionSpeed,
      transitionEasing,
    } = this.props;

    const onEntered = () => {
      this.setState({
        transitioning: false,
        oldMarkerColor: getMarkerColor(item.status),
        oldPercentageComplete: item.percentageComplete,
      });
    };

    return (
      <GridColumn medium={2}>
        <ProgressTrackerStageContainer>
          <Fade
            appear
            in={this.state.transitioning}
            onEntered={onEntered}
            timeout={transitionDelay + transitionSpeed}
          >
            <ProgressTrackerStageMarker
              oldMarkerColor={this.state.oldMarkerColor}
              color={getMarkerColor(item.status)}
              transitionSpeed={transitionSpeed}
              transitionDelay={transitionDelay}
              transitionEasing={transitionEasing}
            />
          </Fade>
          <Fade
            appear
            in={this.state.transitioning}
            onEntered={onEntered}
            timeout={transitionDelay + transitionSpeed}
          >
            <ProgressTrackerStageBar
              oldPercentageComplete={this.state.oldPercentageComplete}
              percentageComplete={item.percentageComplete}
              transitionSpeed={transitionSpeed}
              transitionDelay={transitionDelay}
              transitionEasing={transitionEasing}
            />
          </Fade>
          <Fade
            appear
            in={this.state.transitioning}
            onEntered={onEntered}
            timeout={transitionDelay + transitionSpeed}
          >
            <ProgressTrackerStageTitle
              color={getTextColor(item.status)}
              fontweight={getFontWeight(item.status)}
              transitionSpeed={transitionSpeed}
              transitionDelay={transitionDelay}
            >
              {this.shouldShowLink() ? render.link({ item }) : item.label}
            </ProgressTrackerStageTitle>
          </Fade>
        </ProgressTrackerStageContainer>
      </GridColumn>
    );
  }
}
