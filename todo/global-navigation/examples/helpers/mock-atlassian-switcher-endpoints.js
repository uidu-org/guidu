// @flow
import fetchMock from 'fetch-mock';

const ORIGINAL_MOCK_DATA = {
  RECENT_CONTAINERS_DATA: {
    data: [
      {
        objectId: 'some-id',
        type: 'jira-project',
        name: 'Jira Switcher',
        url: 'https://some-random-instance.atlassian.net/projects/CEN',
        iconUrl:
          'https://some-random-instance.atlassian.net/secure/secure/projectavatar?size=medium&avatarId=10324',
      },
    ],
  },
  CUSTOM_LINKS_DATA: [
    {
      key: 'home',
      link: 'https://some-random-instance.atlassian.net/secure',
      label: 'Jira',
      local: true,
      self: false,
      applicationType: 'jira',
    },
    {
      key: 'home',
      link: 'https://some-random-instance.atlassian.net/wiki',
      label: 'Confluence',
      local: true,
      self: false,
      applicationType: 'jira',
    },
    {
      key: 'home',
      link: 'https://bitbucket.org/my-team',
      label: 'Bitbucket - My Team',
      local: false,
      self: false,
      applicationType: 'jira',
    },
  ],
  LICENSE_INFORMATION_DATA: {
    hostname: 'https://some-random-instance.atlassian.net',
    firstActivationDate: 1492488658539,
    maintenanceEndDate: '2017-04-24',
    maintenanceStartDate: '2017-04-17',
    products: {
      // 'confluence.ondemand': { billingPeriod: 'ANNUAL', state: 'ACTIVE' },
      'hipchat.cloud': { billingPeriod: 'ANNUAL', state: 'ACTIVE' },
      'jira-core.ondemand': { billingPeriod: 'ANNUAL', state: 'ACTIVE' },
      'jira-incident-manager.ondemand': {
        billingPeriod: 'ANNUAL',
        state: 'ACTIVE',
      },
      'jira-servicedesk.ondemand': { billingPeriod: 'ANNUAL', state: 'ACTIVE' },
      'jira-software.ondemand': { billingPeriod: 'ANNUAL', state: 'ACTIVE' },
    },
  },
  USER_PERMISSION_DATA: {
    permitted: true,
  },
  XFLOW_SETTINGS: {},
};

export const mockEndpoints = () => {
  const {
    RECENT_CONTAINERS_DATA,
    CUSTOM_LINKS_DATA,
    LICENSE_INFORMATION_DATA,
    USER_PERMISSION_DATA,
    XFLOW_SETTINGS,
  } = ORIGINAL_MOCK_DATA;
  fetchMock.get(
    '/gateway/api/activity/api/client/recent/containers?cloudId=some-cloud-id',
    () =>
      new Promise(res => setTimeout(() => res(RECENT_CONTAINERS_DATA), 1500)),
    { method: 'GET', overwriteRoutes: true },
  );
  fetchMock.get(
    '/rest/menu/latest/appswitcher',
    () => new Promise(res => setTimeout(() => res(CUSTOM_LINKS_DATA), 2500)),
    { method: 'GET', overwriteRoutes: true },
  );
  fetchMock.get(
    '/gateway/api/xflow/some-cloud-id/license-information',
    () =>
      new Promise(res => setTimeout(() => res(LICENSE_INFORMATION_DATA), 2000)),
    { method: 'GET', overwriteRoutes: true },
  );
  fetchMock.post(
    '/gateway/api/permissions/permitted',
    () => new Promise(res => setTimeout(() => res(USER_PERMISSION_DATA), 500)),
    { method: 'POST', overwriteRoutes: true },
  );
  fetchMock.get(
    '/gateway/api/site/some-cloud-id/setting/xflow',
    () => new Promise(res => setTimeout(() => res(XFLOW_SETTINGS), 2000)),
    { method: 'GET', overwriteRoutes: true },
  );
};

export const mockJestEndpoints = (cloudId: string) => {
  const {
    RECENT_CONTAINERS_DATA,
    CUSTOM_LINKS_DATA,
    LICENSE_INFORMATION_DATA,
    USER_PERMISSION_DATA,
    XFLOW_SETTINGS,
  } = ORIGINAL_MOCK_DATA;
  global.fetch = url => {
    let response;
    switch (url) {
      case `/gateway/api/activity/api/client/recent/containers?cloudId=${cloudId}`:
        response = RECENT_CONTAINERS_DATA;
        break;
      case '/rest/menu/latest/appswitcher':
        response = CUSTOM_LINKS_DATA;
        break;
      case `/gateway/api/xflow/${cloudId}/license-information`:
        response = LICENSE_INFORMATION_DATA;
        break;
      case '/gateway/api/permissions/permitted':
        response = USER_PERMISSION_DATA;
        break;
      case `/gateway/api/site/${cloudId}/setting/xflow`:
        response = XFLOW_SETTINGS;
        break;
      default:
        response = {};
        break;
    }

    return Promise.resolve({
      json: () => Promise.resolve(response),
    });
  };
};
