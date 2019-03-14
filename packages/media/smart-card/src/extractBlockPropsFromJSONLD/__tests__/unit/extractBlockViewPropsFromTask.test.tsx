import * as React from 'react';
import { mount } from 'enzyme';

import { atlassianTask } from './_fixtures';
import {
  buildTaskTitle,
  buildTaskDescription,
  buildTaskLink,
  buildTaskByline,
  buildTaskUser,
  buildTaskUsers,
  buildTaskCommentCount,
  buildTaskDetailsLozenge,
  buildTaskContext,
} from '../../extractPropsFromTask';
import { FormattedRelative, IntlProvider } from 'react-intl';

describe('extractPropsFromTask()', () => {
  describe('build a title', () => {
    it('should not fail for empty input', () => {
      expect(buildTaskTitle({})).toEqual({});
    });

    it('should build a title', () => {
      expect(buildTaskTitle(atlassianTask)).toEqual({
        title: { text: atlassianTask.name },
      });
    });
  });

  describe('build a description', () => {
    it('should not fail for empty input', () => {
      expect(buildTaskDescription({})).toEqual({});
    });

    it('should build a title', () => {
      expect(buildTaskDescription(atlassianTask)).toEqual({
        description: { text: atlassianTask.summary },
      });
    });
  });

  describe('build a link', () => {
    it('should not fail for empty input', () => {
      expect(buildTaskLink({})).toEqual({});
    });

    it('should build a title', () => {
      expect(buildTaskLink(atlassianTask)).toEqual({
        link: atlassianTask.url,
      });
    });
  });

  describe('build a byline', () => {
    it('should not fail for empty input', () => {
      expect(buildTaskByline({})).toEqual({});
    });

    it("should include 'updated by user' in byline", () => {
      const mock = {
        updated: '2018-07-27T11:14:57.392Z',
        updatedBy: {
          name: 'Test User',
        },
        dateCreated: '2018-06-27T11:14:57.392Z',
      };
      const props = buildTaskByline(mock);
      expect(props).toHaveProperty('byline');

      const byline = props.byline as React.ReactElement<any>;
      const wrapper = mount(<IntlProvider locale="en">{byline}</IntlProvider>);
      expect(wrapper.find(FormattedRelative).prop('value')).toEqual(
        '2018-07-27T11:14:57.392Z',
      );
      expect(wrapper.text()).toContain('Updated  by Test User');
    });

    it("should include 'updated' in byline", () => {
      const mock = {
        updated: '2018-07-27T11:14:57.392Z',
        dateCreated: '2018-06-27T11:14:57.392Z',
      };
      const props = buildTaskByline(mock);
      expect(props).toHaveProperty('byline');

      const byline = props.byline as React.ReactElement<any>;
      const wrapper = mount(<IntlProvider locale="en">{byline}</IntlProvider>);
      expect(wrapper.find(FormattedRelative).prop('value')).toEqual(
        '2018-07-27T11:14:57.392Z',
      );
      expect(wrapper.text()).toContain('Updated');
    });

    it("should include 'created by user' in byline", () => {
      const mock = {
        dateCreated: '2018-06-27T11:14:57.392Z',
        attributedTo: {
          name: 'Test User',
        },
      };
      const props = buildTaskByline(mock);
      expect(props).toHaveProperty('byline');

      const byline = props.byline as React.ReactElement<any>;
      const wrapper = mount(<IntlProvider locale="en">{byline}</IntlProvider>);
      expect(wrapper.find(FormattedRelative).prop('value')).toEqual(
        '2018-06-27T11:14:57.392Z',
      );
      expect(wrapper.text()).toContain('Created  by Test User');
    });
  });

  describe('build a user', () => {
    it('should not fail for empty input', () => {
      expect(buildTaskUser({})).toEqual({});
    });

    it('should build a full user', () => {
      const mock = {
        assignedBy: {
          name: 'Test User',
          image: 'user.jpg',
        },
      };
      expect(buildTaskUser(mock)).toEqual({
        user: {
          icon: mock.assignedBy.image,
          name: mock.assignedBy.name,
        },
      });
    });

    it('should build a partial user', () => {
      const mock = {
        assignedBy: {
          name: 'Test User',
        },
      };
      expect(buildTaskUser(mock)).toEqual({
        user: {
          name: mock.assignedBy.name,
        },
      });
    });
  });

  describe('build a users', () => {
    it('should not fail for empty input', () => {
      expect(buildTaskUsers({})).toEqual({});
    });

    it('should handle array only', () => {
      const mock = {
        assignedTo: {},
      };
      expect(buildTaskUsers(mock)).toEqual({});
    });

    it('should handle non-array only', () => {
      const mock = {
        assignedTo: [],
      };
      expect(buildTaskUsers(mock)).toEqual({});
    });

    it('should handle non-array only', () => {
      const mock = {
        assignedTo: [
          {
            image: 'user.jpg',
            name: 'The User',
          },
        ],
      };
      expect(buildTaskUsers(mock)).toEqual({
        users: [
          {
            icon: mock.assignedTo[0].image,
            name: mock.assignedTo[0].name,
          },
        ],
      });
    });
  });

  describe('build a comment count', () => {
    it('should not fail for empty input', () => {
      expect(buildTaskCommentCount({})).toEqual({});
    });

    it('should build comment count out of a string', () => {
      const mock = {
        commentCount: '123',
      };
      expect(buildTaskCommentCount(mock).text).toEqual('123');
      expect(buildTaskCommentCount(mock).icon).toBeDefined();
    });

    it('should build comment count out of a number', () => {
      const mock = {
        commentCount: 123,
      };
      expect(buildTaskCommentCount(mock).text).toEqual('123');
      expect(buildTaskCommentCount(mock).icon).toBeDefined();
    });
  });

  describe('build details lozenge', () => {
    it('should not fail for empty input', () => {
      expect(buildTaskCommentCount({})).toEqual({});
    });

    it('should build a lozenge', () => {
      const mock = {
        taskStatus: {
          name: 'abc',
        },
      };
      expect(buildTaskDetailsLozenge(mock)).toEqual({
        lozenge: {
          text: mock.taskStatus.name,
          appearance: 'success',
        },
      });
    });
  });

  describe('build context', () => {
    it('should handle empty input', () => {
      expect(buildTaskContext({})).toEqual({});
    });

    it('should handle empty input', () => {
      const mock = {
        generator: {
          name: 'test gen',
          icon: 'gen.jpg',
        },
        context: {
          name: 'test cotnext',
        },
      };
      expect(buildTaskContext(mock)).toEqual({
        context: {
          text: `${mock.generator.name} / ${mock.context.name}`,
          icon: mock.generator.icon,
        },
      });
    });
  });
});
