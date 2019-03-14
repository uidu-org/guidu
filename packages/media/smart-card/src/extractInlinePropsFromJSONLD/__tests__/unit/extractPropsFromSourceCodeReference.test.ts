import { extractInlineViewPropsFromSourceCodeReference } from '../../extractPropsFromSourceCodeReference';
import { ReactElement } from 'react';
import { shallow } from 'enzyme';

describe('extractInlineViewPropsFromSourceCodeReference', () => {
  it('should set the icon to the appropriate default icon', () => {
    const props = extractInlineViewPropsFromSourceCodeReference({
      name: 'title yeee',
    });
    expect(props).toHaveProperty('title', 'title yeee');
    expect(props).toHaveProperty('icon');

    const icon = props.icon as ReactElement<any>;
    const iconRendered = shallow(icon);
    expect(iconRendered.prop('label')).toEqual('title yeee');
  });
});
