// @flow

import { shallow } from 'enzyme';
import React from 'react';

import { Grid } from '@atlaskit/page';
import { ThemeProvider } from 'styled-components';
import ProgressTracker from '../../index';
import ProgressTrackerStage from '../../../ProgressTrackerStage';
import { ProgressTrackerContainer } from '../../styled';

const items = [
  {
    id: '1',
    label: 'Step 1',
    percentageComplete: 0,
    status: 'current',
    href: '#',
  },
  {
    id: '2',
    label: 'Step 2',
    percentageComplete: 0,
    status: 'unvisited',
    href: '#',
  },
  {
    id: '3',
    label: 'Step 3',
    percentageComplete: 0,
    status: 'unvisited',
    href: '#',
  },
  {
    id: '4',
    label: 'Step 4',
    percentageComplete: 0,
    status: 'unvisited',
    href: '#',
  },
  {
    id: '5',
    label: 'Step 5',
    percentageComplete: 0,
    status: 'unvisited',
    href: '#',
  },
  {
    id: '6',
    label: 'Step 6',
    percentageComplete: 0,
    status: 'unvisited',
    href: '#',
  },
];

const completedStages = [
  {
    id: '1',
    label: 'Step 1',
    percentageComplete: 100,
    status: 'current',
    href: '#',
  },
  {
    id: '2',
    label: 'Step 2',
    percentageComplete: 100,
    status: 'unvisited',
    href: '#',
  },
  {
    id: '3',
    label: 'Step 3',
    percentageComplete: 100,
    status: 'unvisited',
    href: '#',
  },
  {
    id: '4',
    label: 'Step 4',
    percentageComplete: 100,
    status: 'unvisited',
    href: '#',
  },
  {
    id: '5',
    label: 'Step 5',
    percentageComplete: 100,
    status: 'unvisited',
    href: '#',
  },
  {
    id: '6',
    label: 'Step 6',
    percentageComplete: 100,
    status: 'unvisited',
    href: '#',
  },
];

const testBackwardsRenderTransitions = progressTrackerStages => {
  progressTrackerStages.forEach((stage, index) => {
    expect(stage.props().transitionDelay).toBe(
      (progressTrackerStages.length - 1 - index) * 50,
    );
  });
};

const testMultiStepRenderTransitions = progressTrackerStages => {
  progressTrackerStages.forEach((stage, index) => {
    expect(stage.props().transitionDelay).toBe(index * 50);
    expect(stage.props().transitionEasing).toBe('linear');
  });
};

const testNoOrSingleStepRenderTransitions = progressTrackerStages => {
  progressTrackerStages.forEach(stage => {
    expect(stage.props().transitionDelay).toBe(0);
    expect(stage.props().transitionEasing).toBe('cubic-bezier(0.15,1,0.3,1)');
  });
};

describe('ak-progress-tracker/progress-tracker', () => {
  it('should render the component', () => {
    const wrapper = shallow(<ProgressTracker items={items} />);
    expect(wrapper.length).toBeGreaterThan(0);
    expect(wrapper.find(ProgressTrackerContainer)).toHaveLength(1);
    expect(wrapper.find(Grid)).toHaveLength(1);
    expect(wrapper.find(ThemeProvider)).toHaveLength(1);
    expect(wrapper.find(ProgressTrackerStage)).toHaveLength(6);
  });

  it('should create default theme correctly', () => {
    const wrapper = shallow(<ProgressTracker items={items} />);
    expect(wrapper.find(ThemeProvider).props().theme).toMatchObject({
      spacing: 'cosy',
      columns: 12,
    });
  });

  it('should set initial transition', () => {
    const wrapper = shallow(<ProgressTracker items={items} />);
    const progressTrackerStages = wrapper.find(ProgressTrackerStage);
    testNoOrSingleStepRenderTransitions(progressTrackerStages);
  });

  it('should set backwards transition', () => {
    const wrapper = shallow(<ProgressTracker items={completedStages} />);
    wrapper.setProps({ items });
    const progressTrackerStages = wrapper.find(ProgressTrackerStage);
    testBackwardsRenderTransitions(progressTrackerStages);
  });

  it('should set multistep transition', () => {
    const wrapper = shallow(<ProgressTracker items={items} />);
    wrapper.setProps({ items: completedStages });
    const progressTrackerStages = wrapper.find(ProgressTrackerStage);
    testMultiStepRenderTransitions(progressTrackerStages);
  });

  it('should set single step transitions', () => {
    const wrapper = shallow(<ProgressTracker items={items} />);
    const changedStages = items.map(stage => {
      if (stage.id === '1') {
        return {
          id: '1',
          label: 'Step 1',
          percentageComplete: 50,
          status: 'current',
          href: '#',
        };
      }
      return stage;
    });
    wrapper.setProps({ changedStages });
    const progressTrackerStages = wrapper.find(ProgressTrackerStage);
    testNoOrSingleStepRenderTransitions(progressTrackerStages);
  });
});
