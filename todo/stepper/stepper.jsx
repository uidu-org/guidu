// Stepper is a component to manage multiple step forms
// It uses React Router for managing sections

import { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { animateScroll as scroll } from 'react-scroll';
import { transitionToPromise } from 'utils';

export default class Stepper extends Component {
  componentDidMount() {
    const { history, defaultStep } = this.props;
    if (defaultStep && !this.getCurrentStepFormLocation()) {
      history.replace(`${history.location.pathname}?s=${defaultStep}`);
    }
  }

  getCurrentStepFormLocation = () => {
    const { history } = this.props;
    return queryString.parse(history.location.search).s;
  };

  getStepRect = stepRef => {
    const { scrollElement } = this.props;
    if (!scrollElement) {
      return stepRef.getBoundingClientRect();
    }
    const containerPos = scrollElement.getBoundingClientRect();
    const stepPos = stepRef.getBoundingClientRect();
    const relativePos = {};

    relativePos.top = stepPos.top - containerPos.top;
    relativePos.right = stepPos.right - containerPos.right;
    relativePos.bottom = stepPos.bottom - containerPos.bottom;
    relativePos.left = stepPos.left - containerPos.left;
    return relativePos;
  };

  getStepProps = ({ ...rest } = {}) => {
    const {
      isStepActive,
      toggleStep,
      getStepRect,
      goToStep,
      jumpToNextStep,
    } = this;
    return {
      isActive: isStepActive,
      toggleStep,
      goToStep,
      jumpToNextStep,
      getStepRect,
      ...rest,
    };
  };

  getStateAndHelpers = () => {
    const {
      // prop getters
      getStepProps,
      // actions
      jumpToNextStep,
      toggleStep,
      goToStep,
    } = this;
    return {
      // prop getters
      getStepProps,
      // actions
      jumpToNextStep,
      goToStep,
      toggleStep,
      // state
    };
  };

  isStepActive = name => this.getCurrentStepFormLocation() === name;

  toggleStep = (name, step) => {
    const { history } = this.props;
    if (this.isStepActive(name)) {
      history.replace(`${history.location.pathname}`);
    } else {
      this.goToStep(name, step);
    }
  };

  jumpToNextStep = (origin, target, name) => {
    transitionToPromise(origin).then(() => this.goToStep(name, target));
  };

  goToStep = (name, step) => {
    const { history, scrollElement } = this.props;
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
    const { children } = this.props;
    return children(this.getStateAndHelpers());
  }
}

Stepper.propTypes = {
  defaultStep: PropTypes.string,
  history: PropTypes.shape(PropTypes.obj).isRequired,
  children: PropTypes.func.isRequired,
};

Stepper.defaultProps = {
  defaultStep: null,
};
