//@flow
import React from 'react';
import { shallow, mount } from 'enzyme';
import { ItemPrimitiveBase } from '../../primitives';
import type {
  ItemRenderComponentProps,
  ItemPresentationProps,
} from '../../types';

const TestComponent = (props: ItemRenderComponentProps) => (
  <div>Test Component {props.className}</div>
);
const BeforeOrAfterComponent = (props: ItemPresentationProps) => (
  <div>Before/After Component {props.spacing}</div>
);

describe('ItemPrimitiveBase', () => {
  let defaultProps;

  beforeEach(() => {
    defaultProps = {
      isSelected: false,
      isActive: false,
      isHover: false,
      isFocused: false,
      spacing: 'default',
      text: 'item content',
      createAnalyticsEvent: (): any => ({}),
      theme: {
        context: 'default',
        mode: ({
          item: jest.fn().mockReturnValue({
            default: {},
          }),
        }: any),
      },
    };
  });

  it('should fetch component style', () => {
    shallow(<ItemPrimitiveBase {...defaultProps} />);

    expect(defaultProps.theme.mode.item).toHaveBeenCalledTimes(1);
  });

  it('should render only component prop if present', () => {
    const wrapper = mount(
      <ItemPrimitiveBase {...defaultProps} component={TestComponent} />,
    );

    expect(wrapper.find(TestComponent).length).toBe(1);
    expect(wrapper.find('a').length).toBe(0);
    expect(wrapper.find('button').length).toBe(0);
  });

  it('should pass all component props and innerRef as ref prop to component if present', () => {
    const wrapper = mount(
      <ItemPrimitiveBase {...defaultProps} component={TestComponent} />,
    );
    const componentWrapper = wrapper.find(TestComponent);

    const {
      createAnalyticsEvent,
      theme,
      isActive,
      isHover,
      isSelected,
      isFocused,
      isDragging,
      ...componentProps
    } = wrapper.props();

    expect(componentWrapper.props()).toEqual(
      expect.objectContaining(componentProps),
    );
    expect(componentWrapper.prop('ref')).toEqual(wrapper.prop('innerRef'));
  });

  it('should render an anchor element if href prop is present', () => {
    const wrapper = mount(
      <ItemPrimitiveBase {...defaultProps} href={'<a>test</test>'} />,
    );

    expect(wrapper.find('a').length).toBe(1);
    expect(wrapper.find(TestComponent).length).toBe(0);
    expect(wrapper.find('button').length).toBe(0);
  });

  it('should pass expected props to anchor if href prop is present', () => {
    const onClick = () => {};
    const target = 'target';
    const href = '<a>test</a>';

    const wrapper = mount(
      <ItemPrimitiveBase
        {...defaultProps}
        onClick={onClick}
        href={href}
        target={target}
      />,
    );

    const anchorWrapper = wrapper.find('a');

    expect(anchorWrapper.props()).toEqual(
      expect.objectContaining({
        href,
        onClick,
        target,
      }),
    );
    expect(anchorWrapper.prop('innerRef')).toBeUndefined();
  });

  it('should render a button element if onClick prop is present', () => {
    const wrapper = mount(
      <ItemPrimitiveBase {...defaultProps} onClick={() => {}} />,
    );

    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('a').length).toBe(0);
    expect(wrapper.find(TestComponent).length).toBe(0);
  });

  it('should pass expected props to button if onClick prop is present', () => {
    const onClick = () => {};

    const wrapper = mount(
      <ItemPrimitiveBase {...defaultProps} onClick={onClick} />,
    );

    expect(wrapper.find('button').prop('onClick')).toBe(onClick);
    expect(wrapper.find('button').prop('innerRef')).toBeUndefined();
  });

  it('should always render text prop', () => {
    const wrapper = mount(<ItemPrimitiveBase {...defaultProps} />);
    expect(wrapper.text()).toBe(wrapper.prop('text'));
  });

  it('should render Before with expected props if present', () => {
    const wrapper = mount(
      <ItemPrimitiveBase {...defaultProps} before={BeforeOrAfterComponent} />,
    );
    expect(wrapper.find(BeforeOrAfterComponent).props()).toEqual({
      isActive: false,
      isHover: false,
      isSelected: false,
      spacing: 'default',
      isFocused: false,
      isDragging: false,
    });
  });

  it('should render After with expected props if present', () => {
    const wrapper = mount(
      <ItemPrimitiveBase {...defaultProps} after={BeforeOrAfterComponent} />,
    );

    expect(wrapper.find(BeforeOrAfterComponent).props()).toEqual({
      isActive: false,
      isHover: false,
      isSelected: false,
      spacing: 'default',
      isFocused: false,
      isDragging: false,
    });
  });

  it('should render Before, text and After components in right order', () => {
    const BeforeComponent = (props: ItemPresentationProps) => props.spacing;
    const AfterComponent = (props: ItemPresentationProps) => props.spacing;

    const wrapper = shallow(
      <ItemPrimitiveBase
        {...defaultProps}
        before={BeforeComponent}
        after={AfterComponent}
      />,
    );

    expect(wrapper.childAt(0).find(BeforeComponent)).toHaveLength(1);
    expect(wrapper.childAt(1).text()).toEqual(defaultProps.text);
    expect(wrapper.childAt(2).find(AfterComponent)).toHaveLength(1);
  });

  it('should allow applying custom styles', () => {
    const styles = () => ({
      itemBase: {
        color: 'itemBase-fake-color',
      },
      beforeWrapper: {
        color: 'beforeWrapper-fake-color',
      },
      contentWrapper: {
        color: 'contentWrapper-fake-color',
      },
      textWrapper: {
        color: 'textWrapper-fake-color',
      },
      subTextWrapper: {
        color: 'subTextWrapper-fake-color',
      },
      afterWrapper: {
        color: 'afterWrapper-fake-color',
      },
    });

    const wrapper = shallow(
      <ItemPrimitiveBase
        {...defaultProps}
        styles={styles}
        subText={'subtext'}
        before={BeforeOrAfterComponent}
        after={BeforeOrAfterComponent}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
