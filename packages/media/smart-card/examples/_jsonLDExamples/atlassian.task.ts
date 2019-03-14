import {
  JIRA_TASK,
  JIRA_SUB_TASK,
  JIRA_STORY,
  JIRA_BUG,
  JIRA_EPIC,
  JIRA_INCIDENT,
  JIRA_SERVICE_REQUEST,
  JIRA_CHANGE,
  JIRA_PROBLEM,
  JIRA_CUSTOM_TASK_TYPE,
} from '../../src/extractInlinePropsFromJSONLD/constants';

export const AsanaTask = {
  '@context': {
    '@vocab': 'https://www.w3.org/ns/activitystreams#',
    atlassian: 'https://schema.atlassian.com/ns/vocabulary#',
    schema: 'http://schema.org/',
  },
  '@id': 'https://app.asana.com/0/759475196256783/759474743020981',
  '@type': ['Object', 'atlassian:Task'],
  url: 'https://app.asana.com/0/759475196256783/759474743020981',
  assigned: '2018-07-27T11:15:06.815Z',
  assignedBy: {
    '@type': 'Person',
    image:
      'https://s3.amazonaws.com/profile_photos/759476127806059.0DzzEW07pkfWviGTroc8_128x128.png',
    name: 'Test User',
  },
  assignedTo: {
    '@type': 'Person',
    image:
      'https://s3.amazonaws.com/profile_photos/759476127806059.0DzzEW07pkfWviGTroc8_128x128.png',
    name: 'Test User',
  },
  attributedTo: {
    '@type': 'Person',
    image:
      'https://s3.amazonaws.com/profile_photos/759476127806059.0DzzEW07pkfWviGTroc8_128x128.png',
    name: 'Test User',
  },
  commentCount: 1,
  content: 'Some raw text with new lines',
  context: {
    '@type': 'Collection',
    name: 'NEXT UP',
  },
  dateCreated: '2018-07-27T11:14:57.392Z',
  endTime: '2018-07-31T00:00:00.000Z',
  generator: {
    '@type': 'Application',
    icon: 'https://asana.com/favicon.ico',
    name: 'Asana',
  },
  isCompleted: false,
  isDeleted: false,
  mediaType: 'text/plain',
  name: 'project-board-task-1',
  subscriber: {
    '@type': 'Person',
    image:
      'https://s3.amazonaws.com/profile_photos/759476127806059.0DzzEW07pkfWviGTroc8_128x128.png',
    name: 'Test User',
  },
  subscriberCount: 1,
  summary: 'Some raw text with new lines',
  tags: [
    {
      '@type': 'Object',
      id: 'https://app.asana.com/0/759494272065666/list',
      name: 'tagged',
      url: 'https://app.asana.com/0/759494272065666/list',
    },
  ],
  taskStatus: {
    '@type': 'Object',
    name: 'Today',
    url: 'https://app.asana.com/0/759475196256783/list',
  },
  taskType: {
    '@type': 'Object',
    id: 'https://app.asana.com/0/759475196256783/759474743020981',
    name: 'project-board-task-1',
    url: 'https://app.asana.com/0/759475196256783/759474743020981',
  },
  updated: '2018-07-31T11:48:17.741Z',
  updatedBy: {
    '@type': 'Person',
    image:
      'https://s3.amazonaws.com/profile_photos/759476127806059.0DzzEW07pkfWviGTroc8_128x128.png',
    name: 'Test User',
  },
};

export const GitHubIssue = {
  '@context': {
    '@vocab': 'https://www.w3.org/ns/activitystreams#',
    atlassian: 'https://schema.atlassian.com/ns/vocabulary#',
    schema: 'http://schema.org/',
  },
  '@id': 'https://github.com/User/repo-name/issues/8',
  '@type': ['Object', 'atlassian:Task'],
  url: 'https://github.com/user/repo-name/issues/8?somefilter=true',
  assignedBy: {
    '@type': 'Person',
    image: 'https://avatars2.githubusercontent.com/u/15986691?v=4',
    name: 'User',
  },
  assignedTo: [
    {
      '@type': 'Person',
      image: 'https://avatars2.githubusercontent.com/u/15986691?v=4',
      name: 'User',
    },
    {
      '@type': 'Person',
      image: 'https://avatars0.githubusercontent.com/u/40266685?v=4',
      name: 'Partner',
    },
  ],
  attributedTo: {
    '@type': 'Person',
    image: 'https://avatars2.githubusercontent.com/u/15986691?v=4',
    name: 'User',
  },
  commentCount: 24,
  content: 'Issue descriptions bla bla',
  context: {
    '@type': 'atlassian:Project',
    name: 'User/repo-name',
  },
  dateCreated: '2018-07-10T15:00:32Z',
  generator: {
    '@type': 'Application',
    icon: 'https://git-scm.com/favicon.ico',
    name: 'GitHub',
  },
  isCompleted: false,
  isDeleted: false,
  mediaType: 'text/markdown',
  name: 'Some issue with icons',
  startTime: '2018-07-10T15:00:32Z',
  subscriber: [
    {
      '@type': 'Person',
      image: 'https://avatars0.githubusercontent.com/u/385?v=4',
      name: 'subscriber1',
    },
    {
      '@type': 'Person',
      image: 'https://avatars3.githubusercontent.com/u/2050?v=4',
      name: 'subscriber2',
    },
  ],
  subscriberCount: 1,
  tag: [
    {
      '@type': 'Object',
      id: 576144926,
      name: 'enhancement',
      url: 'https://github.com/user/repo-name/labels/enhancement',
    },
    {
      '@type': 'Object',
      id: 576144927,
      name: 'help wanted',
      url: 'https://github.com/user/repo-name/labels/help%20wanted',
    },
    {
      '@type': 'Object',
      id: 576144928,
      name: 'invalid',
      url: 'https://github.com/user/repo-name/labels/invalid',
    },
  ],
  taskStatus: {
    '@type': 'Link',
    href: 'https://github.com/user/repo-name/issues?q=is%3Aissue%20is%3Aopen',
    name: 'open',
  },
  taskType: {
    '@type': 'Link',
    href: 'https://github.com/user/repo-name/issues',
    name: 'Issue',
  },
  updated: '2018-07-30T16:15:03Z',
};

const generateJiraTask = (
  taskName: string,
  taskType: string,
  taskTypeName: string,
) => ({
  '@type': ['Object', 'atlassian:Task'],
  '@context': {
    '@vocab': 'https://www.w3.org/ns/activitystreams#',
    atlassian: 'https://schema.atlassian.com/ns/vocabulary#',
    schema: 'http://schema.org/',
  },
  '@id': `https://jira.atlassian.com/browse/?jql=issuetype%20=%20${taskTypeName}%20order%20by%20created%20DESC`,
  url: `https://jira.atlassian.com/browse/MAC-123`,
  icon: {
    url: 'https://cdn.iconscout.com/icon/free/png-256/guitar-61-160923.png',
  },
  assignedBy: {
    '@type': 'Person',
    image:
      'http://www.bohemiaticket.cz/photos/db/57/db57d4caf42e8d79b3e3b891d510bf3e-7324-750x450-fit.jpg',
    name: 'Frank Sinatra 🎺',
  },
  assignedTo: [
    {
      '@type': 'Person',
      image: 'https://avatars2.githubusercontent.com/u/15986691?v=4',
      name:
        'https://storybird.s3.amazonaws.com/artwork/PaulMcDougall/full/cheese.jpeg',
    },
    {
      '@type': 'Person',
      image:
        'https://stumptownblogger.typepad.com/.a/6a010536b86d36970c0168eb2c5e6b970c-800wi',
      name: 'Don Rickles ✨',
    },
  ],
  attributedTo: {
    '@type': 'Person',
    image:
      'http://www.bohemiaticket.cz/photos/db/57/db57d4caf42e8d79b3e3b891d510bf3e-7324-750x450-fit.jpg',
    name: 'Frank Sinatra 🎺',
  },
  commentCount: 24,
  content: 'Frank needs Don to perform for him',
  context: {
    '@type': 'atlassian:Project',
    name: 'Musicians and Comedians unite',
  },
  dateCreated: '2018-07-10T15:00:32Z',
  generator: {
    '@type': 'Application',
    '@id': 'https://www.atlassian.com/#Jira',
    icon:
      'https://product-fabric.atlassian.net/s/tmq6us/b/15/4b814c568b5302d1d1376067007f07c2/_/favicon-software.ico',
    name: 'Jira',
  },
  isCompleted: false,
  isDeleted: false,
  name: taskName,
  startTime: '2018-07-10T15:00:32Z',
  taskType: {
    '@type': ['Object', 'atlassian:TaskType'],
    '@id': `https://www.atlassian.com/#${taskType}`,
    name: `${taskTypeName}`,
  },
  taskStatus: {
    '@type': 'Link',
    href:
      'https://jira.atlassian.com/projects/MAC/issues/?filter=allopenissues',
    name: 'open',
  },
});

export const JiraTask = generateJiraTask(
  'Get Don to perform',
  JIRA_TASK,
  'Task',
);
export const JiraSubTask = generateJiraTask(
  'Buy new trumpet',
  JIRA_SUB_TASK,
  'Sub-task',
);
export const JiraStory = generateJiraTask(
  'Market next concert',
  JIRA_STORY,
  'Story',
);
export const JiraBug = generateJiraTask(
  'Fix audio quality of mixer',
  JIRA_BUG,
  'Bug',
);
export const JiraEpic = generateJiraTask(
  'Tribute to Earth Concert',
  JIRA_EPIC,
  'Epic',
);
export const JiraIncident = generateJiraTask(
  'Remove unauthorised crowd members',
  JIRA_INCIDENT,
  'Incident',
);
export const JiraServiceRequest = generateJiraTask(
  'Re-string instruments',
  JIRA_SERVICE_REQUEST,
  'Service Request',
);
export const JiraChange = generateJiraTask(
  'Change album cover',
  JIRA_CHANGE,
  'Change',
);
export const JiraProblem = generateJiraTask(
  'Request Don to step teasing',
  JIRA_PROBLEM,
  'Problem',
);
export const JiraCustomTaskType = generateJiraTask(
  'Perform at the Conga Club',
  JIRA_CUSTOM_TASK_TYPE,
  'Musician Request',
);

export const JiraTasks = [
  JiraTask,
  JiraSubTask,
  JiraStory,
  JiraBug,
  JiraEpic,
  JiraIncident,
  JiraServiceRequest,
  JiraChange,
  JiraProblem,
  JiraCustomTaskType,
];
