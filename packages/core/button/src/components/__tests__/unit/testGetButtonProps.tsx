import * as React from 'react';
import { mount } from 'enzyme';

import Button, { ButtonGroup } from '../../..';

const Component = () => null;

const customProps: Record<string, any> = { customProp: 1 };

describe('getButtonProps', () => {
  it('should pass through all props to a custom component', () => {
    const cmp = mount(<Button {...customProps} component={Component} />);
    expect(cmp.find(Component).prop('customProp')).toBe(1);
  });

  it('should not pass through all props to an inbuilt component', () => {
    const cmp = mount(<Button {...customProps} />);

    expect(cmp.find('StyledButton').prop('customProp')).toBeUndefined();
  });
  it('should add appearance props', () => {
    const cmp = mount(<Button />);

    expect(Object.keys(cmp.find('StyledButton').props())).toEqual(
      expect.arrayContaining([
        'appearance',
        'className',
        'disabled',
        'isActive',
        'isFocus',
        'isHover',
        'isSelected',
        'spacing',
        'fit',
      ]),
    );
  });

  it("should pass interaction state props from the component's state", () => {
    const cmp = mount(<Button />);

    expect(cmp.find('StyledButton').prop('isActive')).toBe(false);
    expect(cmp.find('StyledButton').prop('isFocus')).toBe(false);
    expect(cmp.find('StyledButton').prop('isHover')).toBe(false);
  });

  it('should add interaction handler props', () => {
    const cmp = mount(<Button />);

    expect(Object.keys(cmp.find('StyledButton').props())).toEqual(
      expect.arrayContaining([
        'onBlur',
        'onFocus',
        'onMouseDown',
        'onMouseEnter',
        'onMouseLeave',
        'onMouseUp',
      ]),
    );
  });

  it('should pass interaction handler functions directly from the component', () => {
    const onBlur = () => {};
    const onFocus = () => {};
    const onMouseDown = () => {};
    const onMouseEnter = () => {};
    const onMouseLeave = () => {};
    const onMouseUp = () => {};

    const cmp = mount(
      <Button
        onBlur={onBlur}
        onFocus={onFocus}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
      />,
    );

    expect(cmp.find('StyledButton').prop('onBlur')).not.toBe(onBlur);
    expect(cmp.find('StyledButton').prop('onFocus')).not.toBe(onFocus);
    expect(cmp.find('StyledButton').prop('onMouseDown')).not.toBe(onMouseDown);
    expect(cmp.find('StyledButton').prop('onMouseEnter')).not.toBe(
      onMouseEnter,
    );
    expect(cmp.find('StyledButton').prop('onMouseLeave')).not.toBe(
      onMouseLeave,
    );
    expect(cmp.find('StyledButton').prop('onMouseUp')).not.toBe(onMouseUp);
  });

  it('should pass the onClick handler from props', () => {
    const onClick = () => {};
    const cmp = mount(<Button onClick={onClick} />);

    expect(cmp.find('StyledButton').prop('onClick')).toEqual(expect.anything());
  });

  it('should add aria, form, id and type props to a button', () => {
    const cmp = mount(<Button />);

    expect(Object.keys(cmp.find('StyledButton').props())).toEqual(
      expect.arrayContaining([
        'aria-haspopup',
        'aria-expanded',
        'aria-controls',
        'form',
        'id',
        'type',
      ]),
    );

    const cmp2 = mount(<Button href="#" />);

    expect(Object.keys(cmp2.find('StyledLink').props())).not.toEqual(
      expect.arrayContaining([
        'aria-haspopup',
        'aria-expanded',
        'aria-controls',
        'form',
        'id',
        'type',
      ]),
    );
  });

  it('should add href and target props to a link', () => {
    const cmp = mount(<Button href="#" />);

    expect(Object.keys(cmp.find('StyledLink').props())).toEqual(
      expect.arrayContaining(['href', 'target']),
    );

    const cmp2 = mount(<Button href="#" isDisabled />);

    expect(Object.keys(cmp2.find('StyledSpan').props())).not.toEqual(
      expect.arrayContaining(['href', 'target']),
    );
  });
});
describe('getButtonGroupProps > ', () => {
  it('should not default appearance', () => {
    const cmp = mount(
      <ButtonGroup>{<Button appearance="primary" />}</ButtonGroup>,
    );
    expect(cmp.find(Button).prop('appearance')).toBe('primary');
  });
  it('should not default to another value if changed', () => {
    const cmp = mount(
      <ButtonGroup>{<Button appearance="warning" />}</ButtonGroup>,
    );
    expect(cmp.find(Button).prop('appearance')).toBe('warning');
  });
});
