import * as React from 'react';
import { shallow } from 'enzyme';
import { Content, findParent } from '../../../newgen/content';
import { ContentWrapper } from '../../../newgen/styled';

describe('<Content />', () => {
  jest.useFakeTimers();

  const setup = () => {
    const component = shallow(
      <Content>
        <div />
        <div />
      </Content>,
    );

    return {
      component,
    };
  };

  it('should render children', () => {
    const { component } = setup();
    expect(component.children()).toHaveLength(2);
  });

  it('should allow children to show controls', () => {
    const { component } = setup();

    expect(
      component
        .children()
        .at(1)
        .prop('showControls'),
    ).toBeDefined();
  });

  it('should handle mouse move', () => {
    const { component } = setup();

    expect(component.state('showControls')).toBeTruthy();
    component.find(ContentWrapper).simulate('mouseMove');
    jest.runOnlyPendingTimers();
    expect(component.state('showControls')).toBeFalsy();
  });

  it('should keep controls visible when user is hovering them', () => {
    const { component } = setup();
    const target = document.createElement('div');

    target.classList.add('mvng-hide-controls');
    component.find(ContentWrapper).simulate('mouseMove', {
      target,
    });
    jest.runOnlyPendingTimers();
    expect(component.state('showControls')).toBeTruthy();
  });

  it('should pass controls visibility down to <ContentWrapper />', () => {
    const { component } = setup();

    expect(component.find(ContentWrapper).prop('showControls')).toBeTruthy();
  });

  it('should clear the timeout when component gets unmounted', () => {
    const { component } = setup();
    const clearTimeout = jest.fn();

    (component as any).instance()['clearTimeout'] = clearTimeout;
    component.unmount();
    expect(clearTimeout).toHaveBeenCalledTimes(1);
  });
});

describe('findParent()', () => {
  it('should return the parent element if the class matches', () => {
    const wrapper = document.createElement('div');
    const child = document.createElement('div');
    wrapper.classList.add('a', 'some-class');
    wrapper.appendChild(child);

    expect(findParent(child, 'some-class')).toEqual(wrapper);
  });

  it('should return the element itself if it returns the classname', () => {
    const child = document.createElement('div');
    child.classList.add('some-class');

    expect(findParent(child, 'some-class')).toEqual(child);
  });

  it('should return undefined if there is no parent element matching', () => {
    const wrapper = document.createElement('div');
    const child = document.createElement('div');
    wrapper.classList.add('a');
    wrapper.appendChild(child);

    expect(findParent(child, 'some-class')).toBeUndefined();
  });

  it('should respect passed max parent element as boundary', () => {
    const superWrapper = document.createElement('div');
    const wrapper = document.createElement('div');
    const child = document.createElement('div');
    wrapper.classList.add('some-class');
    superWrapper.appendChild(wrapper);
    wrapper.appendChild(child);

    expect(findParent(child, 'some-class', wrapper)).toBeUndefined();
  });
});
