import { Logs } from '../components/ChangeLog';

export type Changelog = { default: { default: string } | string } | string;

export const divvyChangelog = (changelog: Changelog): Logs => {
  let stringChangelog;
  if (
    typeof changelog === 'object' &&
    typeof changelog.default === 'object' &&
    changelog.default.default
  )
    stringChangelog = changelog.default.default;
  else if (typeof changelog === 'object' && changelog.default)
    stringChangelog = changelog.default;
  else if (typeof changelog === 'string') stringChangelog = changelog;

  const splitToken = `__CHANGELOG_SPLIT_${Date.now()}__`;
  return stringChangelog
    .replace(/[\n\r\s]## /g, `${splitToken}## `)
    .split(splitToken)
    .reduce(
      (all, md) => {
        // This should only allow us to skip the first chunk which is the name, as
        // well as the unreleased section.
        const match = md.match(/\d+\.\d+\.\d+/);
        // Getting the repository url
        let repository = md.match(
          'https://bitbucket.org/atlassian/atlaskit/commits/',
        )
          ? 'atlaskit'
          : 'atlaskit-mk-2';
        const version = match ? match[0] : null;
        if (!version) return all;
        return all.concat({
          version,
          md,
          repository,
        });
      },
      [] as Logs,
    );
};
