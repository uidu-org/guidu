import { extractInlineViewPropsFromSourceCodePullRequest } from '../../extractPropsFromSourceCodePullRequest';
import { ReactElement } from 'react';
import { shallow } from 'enzyme';

describe('extractInlineViewPropsFromSourceCodePullRequest', () => {
  it('should set the icon to the appropriate default icon', () => {
    const props = extractInlineViewPropsFromSourceCodePullRequest({
      name: 'title yeee',
    });
    expect(props).toHaveProperty('title', 'title yeee');
    expect(props).toHaveProperty('icon');

    const icon = props.icon as ReactElement<any>;
    const iconRendered = shallow(icon);
    expect(iconRendered.prop('label')).toEqual('title yeee');
  });

  it('should set the name properly (if url ends in a number)', () => {
    const props = extractInlineViewPropsFromSourceCodePullRequest({
      '@url': 'https://bitbucket.org/atlassian/pull-requests/190',
      name: 'some pr',
    });
    expect(props).toHaveProperty('title', '#190 some pr');
    expect(props).toHaveProperty('icon');

    const icon = props.icon as ReactElement<any>;
    const iconRendered = shallow(icon);
    expect(iconRendered.prop('label')).toEqual('some pr');
  });

  it('should set the name properly (if url ends in a slash)', () => {
    const props = extractInlineViewPropsFromSourceCodePullRequest({
      '@url': 'https://bitbucket.org/atlassian/pull-requests/190/',
      name: 'some pr',
    });
    expect(props).toHaveProperty('title', '#190 some pr');
    expect(props).toHaveProperty('icon');

    const icon = props.icon as ReactElement<any>;
    const iconRendered = shallow(icon);
    expect(iconRendered.prop('label')).toEqual('some pr');
  });

  it('should set the name properly (if url ends in a query parameter)', () => {
    const props = extractInlineViewPropsFromSourceCodePullRequest({
      '@url': 'https://bitbucket.org/atlassian/pull-requests/190?rel=facebook',
      name: 'some pr',
    });
    expect(props).toHaveProperty('title', '#190 some pr');
    expect(props).toHaveProperty('icon');

    const icon = props.icon as ReactElement<any>;
    const iconRendered = shallow(icon);
    expect(iconRendered.prop('label')).toEqual('some pr');
  });
});
