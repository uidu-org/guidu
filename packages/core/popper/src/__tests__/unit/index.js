// @flow
import { mount, shallow } from 'enzyme';
import React from 'react';
import { Popper as PopperCompo } from '../..';

jest.mock('popper.js', () => {
  const PopperJS = jest.requireActual('popper.js');

  return class Popper {
    static placements = PopperJS.placements;

    constructor() {
      return {
        destroy: () => {},
        scheduleUpdate: () => {},
      };
    }
  };
});

const Content = () => <div className="content">Hello</div>;

const referenceElement = document.createElement('div');

const mountPopper = props =>
  mount(
    <PopperCompo {...props}>
      {({ ref, style, placement, arrowProps }) => (
        <div ref={ref} style={style} data-placement={placement}>
          <div {...arrowProps} />
        </div>
      )}
    </PopperCompo>,
  );

test('Popper should be defined', () => {
  const wrapper = mountPopper({ referenceElement });
  expect(wrapper).not.toBeNull();
});

test('Popper should be pass its children', () => {
  expect(shallow(<PopperCompo />).children()).toHaveLength(1);
});

test('should render content into popup', () => {
  const wrapper = mount(
    <PopperCompo referenceElement={referenceElement}>
      {({ ref, style, placement }) => (
        <div ref={ref} style={style} data-placement={placement}>
          <Content />
        </div>
      )}
    </PopperCompo>,
  );
  expect(wrapper.find(Content)).toHaveLength(1);
});
