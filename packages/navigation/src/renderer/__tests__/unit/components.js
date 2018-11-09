// @flow

import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';
import { JiraWordmark } from '@atlaskit/logo';

import BackItemComponent from '../../../components/connected/BackItem';
import ConnectedItemComponent from '../../../components/connected/ConnectedItem';
import GoToItemComponent from '../../../components/connected/GoToItem';
import HeaderSectionComponent from '../../../components/presentational/HeaderSection';
import MenuSectionComponent from '../../../components/presentational/MenuSection';
import SortableContextComponent from '../../../components/connected/SortableContext';
import SortableGroupComponent from '../../../components/connected/SortableGroup';
import SortableItemComponent from '../../../components/connected/SortableItem';
import ItemsRenderer, { components } from '../../components';

const {
  BackItem,
  GoToItem,
  Item,
  HeaderSection,
  MenuSection,
  SortableContext,
  SortableGroup,
  SortableItem,
} = components;

describe('navigation-next view renderer', () => {
  describe('Item component', () => {
    it('should be the ConnectedItem UI component', () => {
      expect(Item).toBe(ConnectedItemComponent);
    });
  });

  describe('GoToItem component', () => {
    it('should be the GoToItem UI component', () => {
      expect(GoToItem).toBe(GoToItemComponent);
    });
  });

  describe('Back Item component', () => {
    it('should be the BackItem UI component', () => {
      expect(BackItem).toBe(BackItemComponent);
    });
  });

  describe('Sortable Item component', () => {
    it('should be the SortableItem UI component', () => {
      expect(SortableItem).toBe(SortableItemComponent);
    });
  });

  describe('HeaderSection', () => {
    it('should render the HeaderSection UI component', () => {
      const wrapper = shallow(
        <HeaderSection
          id="header"
          items={[{ type: 'Wordmark', wordmark: JiraWordmark, id: 'wordmark' }]}
        >
          {({ className }) => <div className={className} />}
        </HeaderSection>,
      );

      expect(wrapper.find(HeaderSectionComponent)).toHaveLength(1);
      expect(wrapper).toMatchSnapshot();
    });

    it('should render the items using ItemsRenderer', () => {
      const items = [
        { type: 'Wordmark', wordmark: JiraWordmark, id: 'wordmark' },
      ];
      const customComponents = { foo: () => null };
      const wrapper = mount(
        <HeaderSection
          customComponents={customComponents}
          id="header"
          items={items}
        >
          {({ className }) => <div className={className} />}
        </HeaderSection>,
      );

      expect(wrapper.find(ItemsRenderer)).toHaveLength(1);
      expect(wrapper.find(ItemsRenderer).props()).toEqual({
        customComponents,
        items,
      });
    });
  });

  describe('MenuSection', () => {
    it('should render the MenuSection UI component', () => {
      const wrapper = shallow(
        <MenuSection
          id="menu"
          items={[
            { type: 'Item', text: 'Backlog', id: 'backlog' },
            { type: 'Item', text: 'Active sprints', id: 'active-sprints' },
            { type: 'Item', text: 'Issues', id: 'issues' },
          ]}
        >
          {({ className }) => <div className={className} />}
        </MenuSection>,
      );

      expect(wrapper.find(MenuSectionComponent)).toHaveLength(1);
      expect(wrapper).toMatchSnapshot();
    });

    it('should render the MenuSection UI component correctly with all optional props', () => {
      const items = [
        { type: 'Item', text: 'Backlog', id: 'backlog' },
        { type: 'Item', text: 'Active sprints', id: 'active-sprints' },
        { type: 'Item', text: 'Issues', id: 'issues' },
      ];
      const wrapper = shallow(
        <MenuSection
          id="menu"
          items={items}
          parentId="foo"
          nestedGroupKey="menu"
          alwaysShowScrollHint
        >
          {({ className }) => <div className={className} />}
        </MenuSection>,
      );

      expect(wrapper.find(MenuSectionComponent).props()).toEqual({
        alwaysShowScrollHint: true,
        children: expect.any(Function),
        id: 'menu',
        parentId: 'foo',
      });
    });

    it('should render the items using ItemsRenderer', () => {
      const customComponents = { foo: () => null };
      const items = [
        { type: 'Item', text: 'Backlog', id: 'backlog' },
        { type: 'Item', text: 'Active sprints', id: 'active-sprints' },
        { type: 'Item', text: 'Issues', id: 'issues' },
      ];
      const wrapper = mount(
        <MenuSection
          customComponents={customComponents}
          id="menu"
          items={items}
        >
          {({ className }) => <div className={className} />}
        </MenuSection>,
      );

      expect(wrapper.find(ItemsRenderer)).toHaveLength(1);
      expect(wrapper.find(ItemsRenderer).props()).toEqual({
        customComponents,
        items,
      });
    });
  });

  describe('SortableContext', () => {
    let items;
    beforeEach(() => {
      items = [
        {
          type: 'SortableGroup',
          id: 'sortable-group',
          items: [
            { type: 'SortableItem', id: 'backlog', text: 'Backlog' },
            {
              type: 'SortableItem',
              id: 'active-sprints',
              text: 'Active sprints',
            },
            { type: 'SortableItem', id: 'issues', text: 'Issues' },
          ],
        },
      ];
    });
    it('should render the SortableContext UI component', () => {
      const wrapper = shallow(
        <SortableContext id="sortable" items={items} onDragEnd={() => {}} />,
      );

      expect(wrapper.find(SortableContextComponent)).toHaveLength(1);
      expect(wrapper).toMatchSnapshot();
    });

    it('should render the SortableContext UI component correctly with all optional props', () => {
      const dragHooks = {
        onDragStart: () => {},
        onDragUpdate: () => {},
        onDragEnd: () => {},
      };
      const wrapper = shallow(
        <SortableContext id="sortable" items={items} {...dragHooks} />,
      );

      expect(wrapper.find(SortableContextComponent).props()).toEqual({
        children: wrapper.find(ItemsRenderer).get(0),
        id: 'sortable',
        ...dragHooks,
      });
    });

    it('should render the items using ItemsRenderer', () => {
      const customComponents = { foo: () => null };
      const wrapper = mount(
        <SortableContext
          customComponents={customComponents}
          id="menu"
          items={items}
          onDragEnd={() => {}}
        />,
      );

      // More than 1 ItemsRenderer will render due to SortableGroup existing in items
      expect(wrapper.find(ItemsRenderer).length).toBeGreaterThanOrEqual(1);
      expect(
        wrapper
          .find(ItemsRenderer)
          .first()
          .props(),
      ).toEqual({
        customComponents,
        items,
      });
    });

    it('should not render anything if items is empty', () => {
      const wrapper = shallow(
        <SortableContext id="sortable" items={[]} onDragEnd={() => {}} />,
      );

      expect(wrapper.html()).toBeNull();
    });
  });

  describe('SortableGroup', () => {
    let items;
    beforeEach(() => {
      items = [
        { type: 'SortableItem', text: 'Backlog', id: 'backlog' },
        { type: 'SortableItem', text: 'Active sprints', id: 'active-sprints' },
        { type: 'SortableItem', text: 'Issues', id: 'issues' },
      ];
    });
    it('should render the SortableGroup UI Component', () => {
      const wrapper = shallow(
        <SortableGroup
          id="sortable-group"
          heading="Sortable Group"
          items={items}
        />,
      );

      expect(wrapper.find(SortableGroupComponent)).toHaveLength(1);
      expect(wrapper).toMatchSnapshot();
    });

    it('should render the items using ItemsRenderer', () => {
      const customComponents = { foo: () => null };
      const wrapper = shallow(
        <SortableGroup
          customComponents={customComponents}
          id="sortable-group"
          heading="Sortable Group"
          items={items}
        />,
      );

      expect(wrapper.find(ItemsRenderer)).toHaveLength(1);
      expect(wrapper.find(ItemsRenderer).props()).toEqual({
        customComponents,
        items,
      });
    });

    it('should block render of the items unless `items` or `customComponents` have changed', () => {
      const customComponents = { foo: () => null };
      // We cannot setProps on non-root instance, so create render prop component to allow us to change
      const Harness = ({ rootItems, children }: any) => children({ rootItems });
      // Need to render sortable context for react-beautiful-dnd to work when mounting
      const wrapper = mount(
        <Harness rootItems={items}>
          {({ rootItems }) => (
            <SortableContextComponent onDragEnd={() => {}}>
              <SortableGroup
                customComponents={customComponents}
                id="sortable-group"
                heading="Sortable Group"
                items={rootItems}
              />,
            </SortableContextComponent>
          )}
        </Harness>,
      );

      const renderSpy = jest.spyOn(
        // Can only retrieve a child instance if mounting instead of shallowing
        wrapper.find(ItemsRenderer).instance(),
        'render',
      );

      expect(renderSpy).toHaveBeenCalledTimes(0);

      wrapper.setProps({ rootItems: items });

      expect(renderSpy).toHaveBeenCalledTimes(0);

      wrapper.setProps({ rootItems: [...items] });

      expect(renderSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('ItemsRenderer', () => {
    const didMountSpy = jest.fn();
    class Corgie extends Component<{}> {
      componentDidMount() {
        didMountSpy();
      }
      render() {
        return null;
      }
    }

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should render items correctly', () => {
      const InlineCustom = () => null;
      const items = [
        { id: 'headerSection', type: 'HeaderSection', items: [] },
        { id: 'menuSection', type: 'MenuSection', items: [] },
        { type: 'Item', id: 'item' },
        { type: 'BackItem', id: 'back-item' },
        { type: 'GoToItem', id: 'goto-item', goTo: 'view' },
        { type: InlineCustom, id: 'inlineCustom' },
        { type: 'Corgie', id: 'corgie' },
      ];
      const wrapper = shallow(
        <ItemsRenderer items={items} customComponents={{ Corgie }} />,
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('should cache custom components with analytics', () => {
      const items = [{ type: 'Corgie', id: 'corgie' }];
      const wrapper = mount(
        <ItemsRenderer items={items} customComponents={{ Corgie }} />,
      );
      expect(didMountSpy).toHaveBeenCalledTimes(1);
      wrapper.setProps({ foo: 1 });
      expect(didMountSpy).toHaveBeenCalledTimes(1);
    });

    it('should cache inline custom components with analytics', () => {
      const items = [{ type: Corgie, id: 'corgieSpy' }];
      const wrapper = mount(<ItemsRenderer items={items} />);
      expect(didMountSpy).toHaveBeenCalledTimes(1);
      wrapper.setProps({ foo: 1 });
      expect(didMountSpy).toHaveBeenCalledTimes(1);
    });
  });
});
