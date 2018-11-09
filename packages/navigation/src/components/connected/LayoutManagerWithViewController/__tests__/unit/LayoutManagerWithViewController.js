// @flow

import React from 'react';
import { mount } from 'enzyme';
import { HashRouter } from 'react-router-dom';

import LayoutManagerWithViewController from '../../LayoutManagerWithViewController';
import { NavigationProvider } from '../../../../../index';

const GlobalNavigationComponent = () => null;

describe('LayoutManagerWithViewController', () => {
  let wrapper;

  let onCollapseStart;
  let onCollapseEnd;
  let onExpandStart;
  let onExpandEnd;
  let getRefs;

  beforeEach(() => {
    onCollapseStart = jest.fn();
    onCollapseEnd = jest.fn();
    onExpandStart = jest.fn();
    onExpandEnd = jest.fn();
    getRefs = jest.fn();

    wrapper = mount(
      <HashRouter>
        <NavigationProvider
          cache={false}
          initialPeekViewId="root/index"
          isDebugEnabled={false}
        >
          <LayoutManagerWithViewController
            globalNavigation={GlobalNavigationComponent}
            firstSkeletonToRender={'product'}
            onCollapseStart={onCollapseStart}
            onCollapseEnd={onCollapseEnd}
            onExpandStart={onExpandStart}
            onExpandEnd={onExpandEnd}
            getRefs={getRefs}
          >
            <p>
              Children requires to have `NavigationProvider` as a parent Because
              of `unstated`. This is an issue
            </p>
          </LayoutManagerWithViewController>
        </NavigationProvider>
      </HashRouter>,
    );
  });

  afterEach(() => {
    onCollapseStart.mockReset();
    onCollapseEnd.mockReset();
    onExpandStart.mockReset();
    onExpandEnd.mockReset();
    getRefs.mockReset();
  });

  it('should render global navigation based on using `globalNavigation` as a reference', () => {
    expect(wrapper.find(GlobalNavigationComponent).length).toBe(1);
  });

  describe('LayerInitialised', () => {
    it('should be initialised when `onInitialised` method is called', () => {
      const layerInitialised = wrapper.find('LayerInitialised');

      expect(layerInitialised.props().initialised).toBe(false);

      layerInitialised.props().onInitialised();
      wrapper.update();

      expect(wrapper.find('LayerInitialised').props().initialised).toBe(true);
    });
  });

  describe('Skeleton management', () => {
    it('should render skeleton using `product` context', () => {
      expect(
        wrapper.find(LayoutManagerWithViewController).props()
          .firstSkeletonToRender,
      ).toBe('product');

      expect(
        wrapper
          .find('SkeletonItem')
          .first()
          .props().theme.context,
      ).toBe('product');
    });

    it('should render skeleton using `container` context', () => {
      const containerWrapper = mount(
        <HashRouter>
          <NavigationProvider
            initialPeekViewId="root/index"
            isDebugEnabled={false}
          >
            <LayoutManagerWithViewController
              globalNavigation={GlobalNavigationComponent}
              firstSkeletonToRender={'container'}
            >
              <p>
                Children requires to have `NavigationProvider` as a parent
                Because of `unstated`. This is an issue
              </p>
            </LayoutManagerWithViewController>
          </NavigationProvider>
        </HashRouter>,
      );

      expect(
        containerWrapper.find(LayoutManagerWithViewController).props()
          .firstSkeletonToRender,
      ).toBe('container');

      expect(
        containerWrapper
          .find('SkeletonItem')
          .first()
          .props().theme.context,
      ).toBe('container');
    });
  });

  describe('Passing props to LayoutManager', () => {
    it('should pass expand/collapse listeners and getRefs', () => {
      const layoutManager = wrapper.find('LayoutManager');

      onCollapseStart(200);
      onCollapseEnd(0);
      onExpandStart(0);
      onExpandEnd(200);

      expect(layoutManager.props().onCollapseStart).toBeCalledWith(200);
      expect(layoutManager.props().onCollapseEnd).toBeCalledWith(0);
      expect(layoutManager.props().onExpandStart).toBeCalledWith(0);
      expect(layoutManager.props().onExpandEnd).toBeCalledWith(200);
      expect(layoutManager.props().getRefs).toHaveBeenCalled();
    });
  });
});
