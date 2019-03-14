import { shallow } from 'enzyme';
import { ReactElement } from 'react';

import { extractInlineViewPropsFromTask } from '../../extractPropsFromTask';
import { JiraTasks } from '../../../../examples/_jsonLDExamples/atlassian.task';

const JiraTaskTypes = JiraTasks.slice(0, JiraTasks.length - 1);
const JiraTaskCustomType = JiraTasks[JiraTasks.length - 1];

describe('extractInlineViewPropsFromTask', () => {
  it('should return default icon when a generator is not specified', () => {
    const props = extractInlineViewPropsFromTask({});
    expect(props).toHaveProperty('title', '');
    expect(props).toHaveProperty('icon');

    const icon = props.icon as ReactElement<any>;
    const iconRendered = shallow(icon);
    expect(iconRendered.prop('label')).toEqual('');
  });

  // Note: Custom issue type does not return a React element - tested separately below.
  JiraTaskTypes.map(task => {
    it(`should return an icon when a Jira generator is provided, with issue type: ${
      task.taskType.name
    }`, () => {
      const props = extractInlineViewPropsFromTask(task);
      expect(props).toHaveProperty('title');
      expect(props).toHaveProperty('icon');

      const icon = props.icon as ReactElement<any>;
      const iconRendered = shallow(icon);
      expect(iconRendered.prop('label')).toEqual(task.name || '');
    });
  });
  // For Jira custom issue type:
  it('should return an icon when a Jira generator is provided, with issue type: custom', () => {
    const props = extractInlineViewPropsFromTask(JiraTaskCustomType);
    expect(props).toHaveProperty('title');
    expect(props).toHaveProperty('icon', JiraTaskCustomType.icon.url);
  });
});
