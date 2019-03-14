import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { IconAndTitleLayout } from '../../index';
import { OtherWrapper } from '../../styled';
import { Icon } from '../../../Icon';

describe('IconAndTitleLayout', () => {
  it('should render the text', () => {
    const element = mount(<IconAndTitleLayout title="some text content" />);
    expect(element.text()).toContain('some text content');
  });

  it('should render an icon when it is provided', () => {
    const element = mount(
      <IconAndTitleLayout icon="some-link-to-icon" title="some text content" />,
    );
    const elementIcon = element.find(Icon);
    expect(elementIcon).toHaveLength(1);
    const elementIconImage = elementIcon.find('img');
    expect(elementIconImage).toHaveLength(1);
    expect(elementIconImage.prop('src')).toEqual('some-link-to-icon');
  });

  it('should not render an icon when it is not provided', () => {
    const element = shallow(<IconAndTitleLayout title="some text content" />);
    expect(element.find(Icon)).toHaveLength(0);
  });

  it('should render children when it is provided', () => {
    const element = mount(
      <IconAndTitleLayout title="some text content">
        Hello World!
      </IconAndTitleLayout>,
    );
    expect(element.find(OtherWrapper)).toHaveLength(1);
    expect(element.find(OtherWrapper).text()).toEqual('Hello World!');
  });

  it('should not render children when it is not provided', () => {
    const element = shallow(<IconAndTitleLayout title="some text content" />);
    expect(element.find(OtherWrapper)).toHaveLength(0);
  });
});
