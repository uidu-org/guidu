import { extractInlineViewPropsFromDigitalDocument } from '../../extractPropsFromDigitalDocument';
import { ReactElement } from 'react';
import { shallow } from 'enzyme';

describe('extractInlineViewPropsFromDigitalDocument', () => {
  it('should set the icon to the appropriate default icon', () => {
    const props = extractInlineViewPropsFromDigitalDocument({
      name: 'title yeee',
    });
    expect(props).toHaveProperty('title', 'title yeee');
    expect(props).toHaveProperty('icon');

    const icon = props.icon as ReactElement<any>;
    const iconRendered = shallow(icon);
    expect(iconRendered.prop('label')).toEqual('title yeee');
  });
});
