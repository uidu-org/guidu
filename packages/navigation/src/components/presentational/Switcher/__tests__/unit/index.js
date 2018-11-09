// @flow

import React from 'react';
import { shallow } from 'enzyme';
import { PopupSelect } from '@atlaskit/select';
import { BaseSwitcher, createStyles } from '../../index';

const Target = () => 'A target';

describe('Switcher', () => {
  let baseProps;

  beforeEach(() => {
    baseProps = {
      navWidth: 240,
      options: [
        {
          avatar: 'endeavour',
          id: 'endeavour',
          pathname: '/projects/endeavour',
          text: 'Endeavour',
          subText: 'Software project',
        },
        {
          avatar: 'design-system-support',
          id: 'design-system-support',
          pathname: '/projects/design-system-support',
          text: 'Design System Support',
          subText: 'Service desk project',
        },
      ],
      target: <Target />,
    };
  });

  it('should render correctly', () => {
    expect(shallow(<BaseSwitcher {...baseProps} />)).toMatchSnapshot();
  });

  it('should render a PopupSelect />', () => {
    const wrapper = shallow(<BaseSwitcher {...baseProps} />);
    expect(wrapper.find(PopupSelect)).toHaveLength(1);
  });

  it('should pass default styles to <PopupSelect />', () => {
    const wrapper = shallow(<BaseSwitcher {...baseProps} />);
    const styles = wrapper.prop('styles');
    expect(styles).toEqual(
      expect.objectContaining({
        option: expect.any(Function),
      }),
    );
    expect(wrapper.find(PopupSelect).prop('styles')).toEqual(styles);
  });

  it('should pass merged custom styles to <PopupSelect />', () => {
    const customStyles = {
      option: base => ({
        ...base,
        color: 'green',
        paddingLeft: 16,
        marginBottom: 2,
      }),
      control: base => ({
        ...base,
        color: 'red',
      }),
      groupHeading: base => ({ ...base, color: 'red' }),
      singleValue: base => ({ ...base, color: 'red' }),
    };
    const wrapper = shallow(
      <BaseSwitcher {...baseProps} styles={customStyles} />,
    );
    expect(wrapper.find(PopupSelect).prop('styles')).toEqual(
      expect.objectContaining({
        option: expect.any(Function),
        control: expect.any(Function),
        groupHeading: expect.any(Function),
        singleValue: expect.any(Function),
      }),
    );
  });

  describe('.createStyles()', () => {
    it('should return an object with option property', () => {
      const styles = createStyles();
      expect(styles).toEqual({
        option: expect.any(Function),
      });
    });

    it('should return default option styles if no custom option styles is given', () => {
      const styles = createStyles();
      expect(styles.option({}, {})).toEqual({
        alignItems: 'center',
        border: 'none',
        backgroundColor: 'transparent',
        boxSizing: 'border-box',
        color: 'inherit',
        cursor: 'default',
        display: 'flex',
        flexShrink: 0,
        fontSize: 'inherit',
        height: 8 * 6,
        outline: 'none',
        paddingRight: 8,
        paddingLeft: 8,
        textAlign: 'left',
        textDecoration: 'none',
        width: '100%',
      });
    });

    it('should merge default option styles and custom option styles', () => {
      const customStyles = {
        option: base => ({
          ...base,
          color: 'red',
          backgroundColor: 'blue',
        }),
      };
      const styles = createStyles(customStyles);
      const option = styles.option({}, {});
      expect(option).toEqual({
        alignItems: 'center',
        border: 'none',
        backgroundColor: 'blue',
        boxSizing: 'border-box',
        color: 'red',
        cursor: 'default',
        display: 'flex',
        flexShrink: 0,
        fontSize: 'inherit',
        height: 8 * 6,
        outline: 'none',
        paddingRight: 8,
        paddingLeft: 8,
        textAlign: 'left',
        textDecoration: 'none',
        width: '100%',
      });
    });

    it('should return expected option styles when isFocused is true', () => {
      const styles = createStyles();
      const state = {
        isFocused: true,
        isActive: false,
      };

      expect(styles.option({}, state)).toEqual({
        alignItems: 'center',
        border: 'none',
        backgroundColor: '#EBECF0',
        boxSizing: 'border-box',
        color: 'inherit',
        cursor: 'default',
        display: 'flex',
        flexShrink: 0,
        fontSize: 'inherit',
        height: 8 * 6,
        outline: 'none',
        paddingRight: 8,
        paddingLeft: 8,
        textAlign: 'left',
        textDecoration: 'none',
        width: '100%',
      });
    });

    it('should return expected option styles when isFocused and isActive are true', () => {
      const styles = createStyles();
      const state = {
        isFocused: true,
        isActive: true,
      };

      expect(styles.option({}, state)).toEqual({
        alignItems: 'center',
        border: 'none',
        backgroundColor: '#DEEBFF',
        boxSizing: 'border-box',
        color: 'inherit',
        cursor: 'default',
        display: 'flex',
        flexShrink: 0,
        fontSize: 'inherit',
        height: 8 * 6,
        outline: 'none',
        paddingRight: 8,
        paddingLeft: 8,
        textAlign: 'left',
        textDecoration: 'none',
        width: '100%',
      });
    });
  });
});
