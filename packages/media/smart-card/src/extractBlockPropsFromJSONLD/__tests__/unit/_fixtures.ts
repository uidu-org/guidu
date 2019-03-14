export const object = {
  '@type': 'Object',
  url: 'https://www.example.com/',
  name: 'Some object',
  summary: 'The object description',
  generator: {
    type: 'Application',
    name: 'My app',
    icon: 'https://www.example.com/icon.jpg',
  },
};

export const atlassianTask = {
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
  completed: undefined,
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
  startTime: undefined,
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

export const document = {
  ...object,
  '@type': 'Document',
  commentCount: 214,
};

export const spreadsheet = {
  ...document,
  '@type': 'Spreadsheet',
};
