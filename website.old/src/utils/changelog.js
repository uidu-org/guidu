// @flow
import type { Logs } from '../components/ChangeLog';

export const divvyChangelog = (changelog): Logs => {
  const splitToken = `__CHANGELOG_SPLIT_${Date.now()}__`;
  return changelog.default
    .replace(/[\n\r\s]## /g, `${splitToken}## `)
    .split(splitToken)
    .reduce((all, md) => {
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
    }, []);
};
