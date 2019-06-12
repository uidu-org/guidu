// Stepper is a component to manage multiple step forms
// It uses React Router for managing sections

import queryString from 'query-string';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import { StepperProps } from '../types';
import Step from './Step';

class Stepper extends Component<StepperProps, any> {
  private steps: {
    name?: string;
  } = {};

  componentDidMount() {
    const { history, defaultStep } = this.props;
    // if (defaultStep && !this.getCurrentStepFormLocation()) {
    //   history.replace(`${history.location.pathname}?s=${defaultStep}`);
    // }
  }

  getCurrentStepFormLocation = (): string | undefined => {
    const { history } = this.props;
    return queryString.parse(history.location.search).s as string;
  };

  getStepRect = (
    step: HTMLDivElement,
  ): { top: number; right: number; bottom: number; left: number } => {
    const { scrollElement } = this.props;
    if (!scrollElement) {
      return step.getBoundingClientRect();
    }
    const containerPos = scrollElement.getBoundingClientRect();
    const stepPos = step.getBoundingClientRect();
    return {
      top: stepPos.top - containerPos.top,
      right: stepPos.right - containerPos.right,
      bottom: stepPos.bottom - containerPos.bottom,
      left: stepPos.left - containerPos.left,
    };
  };

  getStepProps = ({ ...rest } = {}) => {
    const { isStepActive, toggleStep, jumpToStep } = this;
    return {
      ref: (c: Step | null) => {
        if (!c) return;
        this.steps[c.props.name] = c;
      },
      isActive: isStepActive,
      toggleStep,
      jumpToStep,
      ...rest,
    };
  };

  isStepActive = (name: string): boolean =>
    this.getCurrentStepFormLocation() === name;

  toggleStep = (name: string, step: React.RefObject<HTMLDivElement>) => {
    const { history } = this.props;
    if (this.isStepActive(name)) {
      history.replace(`${history.location.pathname}`);
    } else if (typeof this.getCurrentStepFormLocation() == 'string') {
      // close other step and jump to new
      this.jumpToStep(name);
    } else {
      this.goToStep(name);
    }
  };

  // Should toggle current step and go to step
  jumpToStep = (to: string) => {
    const from = this.getCurrentStepFormLocation();
    this.jumpToNextStep(from, to);
  };

  jumpToNextStep = (from: string, to: string) => {
    // transitionToPromise(origin).then(() => this.goToStep(name, target));
    this.goToStep(to);
  };

  goToStep = (name: string) => {
    const { history, scrollElement } = this.props;
    const step = this.steps[name].step.current;
    const that = this;
    history.replace(`${history.location.pathname}?s=${name}`);
    setTimeout(() => {
      if (scrollElement) {
        scroll.scrollTo(
          that.getStepRect(step).top + scrollElement.scrollTop - 16,
          {
            duration: 300,
            delay: 50,
            smooth: 'easeInOutQuad',
            container: scrollElement,
          },
        );
      }
    }, 300);
  };

  render() {
    const { getStepProps, jumpToStep, toggleStep } = this;
    const { children } = this.props;
    return children({
      // prop getters
      getStepProps,
      // actions
      jumpToStep,
      toggleStep,
    });
  }
}

export default withRouter(Stepper);
