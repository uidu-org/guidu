export const packageUrl = (groupId: string, pkgId: string) =>
  `/packages/${groupId}/${pkgId}`;

export const packageDocUrl = (groupId: string, pkgId: string, docId: string) =>
  `${packageUrl(groupId, pkgId)}/docs/${docId}`;

export const packageExampleUrl = (
  groupId: string,
  pkgId: string,
  exampleId?: string,
) => `/examples/${groupId}/${pkgId}${exampleId ? `/${exampleId}` : ''}`;
