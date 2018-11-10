// @flow

import React from 'react';
import { mount, shallow } from 'enzyme';
import { NavigationAnalyticsContext } from '@atlaskit/analytics-namespaced-context';

import ContentNavigation from '../../ContentNavigation';
import LayoutManager, { Page } from '../../LayoutManager';
import ResizeControl from '../../ResizeControl';
import ResizeTransition from '../../ResizeTransition';
import { LayoutEventListener } from '../../LayoutEvent';

import { ContainerNavigationMask, NavigationContainer } from '../../primitives';
import type { LayoutManagerProps } from '../../types';

const GlobalNavigation = () => null;
const ProductNavigation = () => null;

describe('LayoutManager', () => {
  let defaultProps: $Shape<LayoutManagerProps>;
  let mockNavigationUIController: any;
  beforeEach(() => {
    mockNavigationUIController = ({
      expand: Function.prototype,
      state: {
        isCollapsed: false,
      },
    }: any);
    defaultProps = {
      navigationUIController: mockNavigationUIController,
      globalNavigation: GlobalNavigation,
      productNavigation: ProductNavigation,
      containerNavigation: null,
      children: <div>Page content</div>,
    };
  });
  // TODO: Please update this test, it should be deterministic,
  // make sure your generated snapshots do not include platform specific or other non-deterministic data. In this case, the packageVersion.
  // eslint-disable-next-line
  it.skip('should render correctly', () => {
    const wrapper = shallow(<LayoutManager {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('Flyout', () => {
    beforeEach(() => {
      defaultProps.experimental_flyoutOnHover = true;
      defaultProps.navigationUIController.state.isCollapsed = true;
    });

    describe('when experimental_flyoutOnHover is set and navigation is collapsed', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      it('should open when mousing over ContainerNavigationMask with a delay of 350ms', () => {
        const wrapper = mount(<LayoutManager {...defaultProps} />);
        expect(wrapper.state('flyoutIsOpen')).toBe(false);
        wrapper.find(ContainerNavigationMask).simulate('mouseover');

        jest.advanceTimersByTime(349);
        expect(wrapper.state('flyoutIsOpen')).toBe(false);

        jest.advanceTimersByTime(1);
        expect(wrapper.state('flyoutIsOpen')).toBe(true);
      });

      it('should not open when mousing out before 350ms', () => {
        const wrapper = mount(<LayoutManager {...defaultProps} />);
        expect(wrapper.state('flyoutIsOpen')).toBe(false);
        wrapper.find(ContainerNavigationMask).simulate('mouseover');

        jest.advanceTimersByTime(300);
        wrapper.find(NavigationContainer).simulate('mouseleave');
        expect(wrapper.state('flyoutIsOpen')).toBe(false);

        jest.runAllTimers();
        expect(wrapper.state('flyoutIsOpen')).toBe(false);
      });

      it('should close when mousing out of NavigationContainer', () => {
        const wrapper = mount(<LayoutManager {...defaultProps} />);

        wrapper.find(ContainerNavigationMask).simulate('mouseover');
        wrapper.find(NavigationContainer).simulate('mouseout');

        expect(wrapper.state('flyoutIsOpen')).toBe(false);
      });

      it('should display ContentNavigation when flyout is open', () => {
        const wrapper = mount(<LayoutManager {...defaultProps} />);

        wrapper.setState({ flyoutIsOpen: true });
        wrapper.update();
        expect(wrapper.find(ContentNavigation).prop('isVisible')).toBe(true);
      });

      it('should NOT display ContentNavigation when flyout is closed', () => {
        const wrapper = mount(<LayoutManager {...defaultProps} />);

        wrapper.setState({ flyoutIsOpen: false });
        wrapper.update();
        expect(wrapper.find(ContentNavigation).prop('isVisible')).toBe(false);
      });

      it('should NOT display resize hint bar', () => {
        const wrapper = mount(<LayoutManager {...defaultProps} />);

        const resizeBar = wrapper.find(
          'div[aria-label="Click to expand the navigation"]',
        );
        expect(resizeBar).toHaveLength(0);
      });

      it('should NOT be open when nav is permanently expanded', () => {
        const wrapper = mount(<LayoutManager {...defaultProps} />);

        wrapper.find(ContainerNavigationMask).simulate('mouseover');
        defaultProps.navigationUIController.state.isCollapsed = false;
        wrapper.setProps(defaultProps);

        expect(wrapper.state('flyoutIsOpen')).toBe(false);
      });

      it('should NOT listen to mouseOvers over ContainerNavigationMask if flyout is already open', () => {
        const wrapper = mount(<LayoutManager {...defaultProps} />);
        expect(
          wrapper.find(ContainerNavigationMask).prop('onMouseOver'),
        ).toEqual(expect.any(Function));
        wrapper.find(ContainerNavigationMask).simulate('mouseover');

        jest.advanceTimersByTime(349);
        wrapper.update();
        expect(
          wrapper.find(ContainerNavigationMask).prop('onMouseOver'),
        ).toEqual(expect.any(Function));

        jest.advanceTimersByTime(1);
        wrapper.update();
        expect(
          wrapper.find(ContainerNavigationMask).prop('onMouseOver'),
        ).toBeNull();
      });

      it('should NOT listen to mouseOuts of NavigationContainer if flyout is already closed', () => {
        const wrapper = mount(<LayoutManager {...defaultProps} />);

        wrapper.setState({ flyoutIsOpen: false });
        wrapper.update();
        expect(wrapper.find(NavigationContainer).prop('onMouseOut')).toBeNull();
      });

      describe('Expand/collapse callbacks', () => {
        let handlers;
        beforeEach(() => {
          handlers = {
            onExpandStart: jest.fn(),
            onExpandEnd: jest.fn(),
            onCollapseStart: jest.fn(),
            onCollapseEnd: jest.fn(),
          };
        });

        it('should NOT be called when flyout opens', () => {
          const wrapper = mount(
            <LayoutManager {...defaultProps} {...handlers} />,
          );

          wrapper.setState({ flyoutIsOpen: true });
          wrapper.update();
          jest.runAllTimers();

          Object.keys(handlers).forEach(propName => {
            expect(handlers[propName]).not.toHaveBeenCalled();
          });
        });

        it('should NOT be called when flyout closes', () => {
          const wrapper = mount(
            <LayoutManager {...defaultProps} {...handlers} />,
          );

          wrapper.setState({ flyoutIsOpen: true });
          wrapper.update();
          jest.runAllTimers();

          wrapper.setState({ flyoutIsOpen: false });
          wrapper.update();
          jest.runAllTimers();

          Object.keys(handlers).forEach(propName => {
            expect(handlers[propName]).not.toHaveBeenCalled();
          });
        });
      });
    });

    describe('when experimental_flyoutOnHover is not set', () => {
      beforeEach(() => {
        defaultProps.experimental_flyoutOnHover = false;
      });

      it('should NOT open NavigationContainer when mousing over ContainerNavigationMask', () => {
        const wrapper = mount(<LayoutManager {...defaultProps} />);
        expect(wrapper.state('flyoutIsOpen')).toBe(false);
        wrapper.find(ContainerNavigationMask).simulate('mouseover');
        expect(wrapper.state('flyoutIsOpen')).toBe(false);
      });

      it('should NOT cause a re-render when mousing out of NavigationContainer', () => {
        const wrapper = mount(<LayoutManager {...defaultProps} />);
        expect(wrapper.state('flyoutIsOpen')).toBe(false);
        wrapper.find(NavigationContainer).simulate('mouseover');

        expect(wrapper.state('flyoutIsOpen')).toBe(false);
      });
    });

    describe('when navigation is permanently expanded', () => {
      beforeEach(() => {
        defaultProps.navigationUIController.state.isCollapsed = false;
      });

      it('should NOT cause a re-render when mousing over ContainerNavigationMask', () => {
        const wrapper = mount(<LayoutManager {...defaultProps} />);
        expect(wrapper.state('flyoutIsOpen')).toBe(false);
        wrapper.find(ContainerNavigationMask).simulate('mouseover');
        expect(wrapper.state('flyoutIsOpen')).toBe(false);
      });

      it('should NOT cause a re-render when mousing out of NavigationContainer', () => {
        const wrapper = mount(<LayoutManager {...defaultProps} />);
        expect(wrapper.state('flyoutIsOpen')).toBe(false);
        wrapper.find(NavigationContainer).simulate('mouseover');
        expect(wrapper.state('flyoutIsOpen')).toBe(false);
      });
    });
  });

  describe('collapse & expand callbacks', () => {
    let handlers;

    beforeEach(() => {
      handlers = {
        onExpandStart: jest.fn(),
        onExpandEnd: jest.fn(),
        onCollapseStart: jest.fn(),
        onCollapseEnd: jest.fn(),
      };
    });

    it('should be attached to the Page transition component', () => {
      const wrapper = mount(<LayoutManager {...handlers} {...defaultProps} />);
      expect(
        wrapper
          .find(Page)
          .find(ResizeTransition)
          .props(),
      ).toEqual(expect.objectContaining(handlers));
    });

    it('should NOT be attached to the Nav transition component', () => {
      const wrapper = mount(<LayoutManager {...handlers} {...defaultProps} />);
      expect(
        wrapper
          .find(ResizeTransition)
          .first()
          .props(),
      ).not.toEqual(expect.objectContaining(handlers));
    });

    it('should call onExpandStart when nav starts to permanently expand', () => {
      defaultProps.navigationUIController.state.isCollapsed = true;
      const wrapper = mount(<LayoutManager {...handlers} {...defaultProps} />);

      expect(handlers.onExpandStart).not.toHaveBeenCalled();

      defaultProps.navigationUIController.state.isCollapsed = false;
      wrapper.setProps(defaultProps);

      expect(handlers.onExpandStart).toHaveBeenCalledTimes(1);
    });

    it('should call onExpandEnd when nav completes permanently expanding', () => {
      defaultProps.navigationUIController.state.isCollapsed = true;
      const wrapper = mount(<LayoutManager {...handlers} {...defaultProps} />);

      defaultProps.navigationUIController.state.isCollapsed = false;
      wrapper.setProps(defaultProps);

      jest.advanceTimersByTime(299);
      expect(handlers.onExpandEnd).not.toHaveBeenCalled();

      jest.advanceTimersByTime(1);
      expect(handlers.onExpandEnd).toHaveBeenCalledTimes(1);
    });

    it('should call onCollapseStart when nav starts to permanently collapse', () => {
      defaultProps.navigationUIController.state.isCollapsed = false;
      const wrapper = mount(<LayoutManager {...handlers} {...defaultProps} />);

      expect(handlers.onCollapseStart).not.toHaveBeenCalled();

      defaultProps.navigationUIController.state.isCollapsed = true;
      wrapper.setProps(defaultProps);

      expect(handlers.onCollapseStart).toHaveBeenCalledTimes(1);
    });

    it('should call onCollapseEnd when nav completes permanently collapsing', () => {
      defaultProps.navigationUIController.state.isCollapsed = false;
      const wrapper = mount(<LayoutManager {...handlers} {...defaultProps} />);

      defaultProps.navigationUIController.state.isCollapsed = true;
      wrapper.setProps(defaultProps);

      jest.advanceTimersByTime(299);
      expect(handlers.onCollapseEnd).not.toHaveBeenCalled();

      jest.advanceTimersByTime(1);
      expect(handlers.onCollapseEnd).toHaveBeenCalledTimes(1);
    });
  });

  describe('analytics', () => {
    it('should render NavigationAnalyticsContext with correct payload when nav is collapsed', () => {
      defaultProps.navigationUIController.state.isCollapsed = true;
      const wrapper = shallow(<LayoutManager {...defaultProps} />);

      const analyticsContext = wrapper.find(NavigationAnalyticsContext);

      expect(analyticsContext).toHaveLength(1);
      expect(analyticsContext.prop('data')).toEqual({
        attributes: {
          isExpanded: false,
          flyoutOnHoverEnabled: false,
        },
        componentName: 'navigation',
        packageName: '@atlaskit/navigation-next',
        packageVersion: expect.any(String),
      });
    });

    it('should render NavigationAnalyticsContext with correct payload when nav is expanded', () => {
      defaultProps.navigationUIController.state.isCollapsed = false;
      const wrapper = shallow(<LayoutManager {...defaultProps} />);

      const analyticsContext = wrapper.find(NavigationAnalyticsContext);

      expect(analyticsContext).toHaveLength(1);
      expect(analyticsContext.prop('data')).toEqual({
        attributes: {
          isExpanded: true,
          flyoutOnHoverEnabled: false,
        },
        componentName: 'navigation',
        packageName: '@atlaskit/navigation-next',
        packageVersion: expect.any(String),
      });
    });

    it('should render NavigationAnalyticsContext with correct payload when flyoutOnHover experiment is enabled', () => {
      defaultProps.experimental_flyoutOnHover = true;
      const wrapper = shallow(<LayoutManager {...defaultProps} />);

      const analyticsContext = wrapper.find(NavigationAnalyticsContext);

      expect(analyticsContext).toHaveLength(1);
      expect(analyticsContext.prop('data')).toEqual({
        attributes: {
          isExpanded: true,
          flyoutOnHoverEnabled: true,
        },
        componentName: 'navigation',
        packageName: '@atlaskit/navigation-next',
        packageVersion: expect.any(String),
      });
    });
  });

  describe('Sortable item dragging', () => {
    it('should set itemIsDragging state when onItemDragStart event is fired', () => {
      const wrapper = shallow(<LayoutManager {...defaultProps} />);

      expect(wrapper.state('itemIsDragging')).toBe(false);
      wrapper.find(LayoutEventListener).prop('onItemDragStart')();
      expect(wrapper.state('itemIsDragging')).toBe(true);
    });

    it('should unset itemIsDragging state when onItemDragEnd event is fired', () => {
      const wrapper = shallow(<LayoutManager {...defaultProps} />);
      wrapper.find(LayoutEventListener).prop('onItemDragStart')();

      expect(wrapper.state('itemIsDragging')).toBe(true);
      wrapper.find(LayoutEventListener).prop('onItemDragEnd')();
      expect(wrapper.state('itemIsDragging')).toBe(false);
    });

    it('should disable grab area when item is being dragged', () => {
      const wrapper = mount(<LayoutManager {...defaultProps} />);

      expect(wrapper.find(ResizeControl).prop('isGrabAreaDisabled')).toBe(
        false,
      );
      wrapper.setState({ itemIsDragging: true });
      expect(wrapper.find(ResizeControl).prop('isGrabAreaDisabled')).toBe(true);
    });

    it('should disable interaction on ContainerNavigationMask when item is being dragged', () => {
      const wrapper = mount(<LayoutManager {...defaultProps} />);

      expect(
        wrapper.find(ContainerNavigationMask).prop('disableInteraction'),
      ).toBe(false);
      wrapper.setState({ itemIsDragging: true });
      expect(
        wrapper.find(ContainerNavigationMask).prop('disableInteraction'),
      ).toBe(true);
    });

    it('should block render of navigation when `itemIsDragging` state changes', () => {
      const globalNav: any = jest.fn(() => null);
      const productNav: any = jest.fn(() => null);
      const wrapper = mount(
        <LayoutManager
          {...defaultProps}
          globalNavigation={globalNav}
          productNavigation={productNav}
        />,
      );

      expect(globalNav).toHaveBeenCalledTimes(1);
      expect(productNav).toHaveBeenCalledTimes(1);

      wrapper.setState({ itemIsDragging: true });

      expect(globalNav).toHaveBeenCalledTimes(1);
      expect(productNav).toHaveBeenCalledTimes(1);

      wrapper.setState({ mouseIsOverNavigation: true });

      expect(globalNav).toHaveBeenCalledTimes(2);
      expect(productNav).toHaveBeenCalledTimes(2);

      wrapper.setState({ itemIsDragging: false });

      expect(globalNav).toHaveBeenCalledTimes(2);
      expect(productNav).toHaveBeenCalledTimes(2);
    });
  });
});
