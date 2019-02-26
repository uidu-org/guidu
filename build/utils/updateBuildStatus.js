// @flow
const { execSync } = require('npm-run');

/*::
type buildStatusOpts = {
  commit: string,
  repoSlug: string,
  repoOwner: string,
  username: string,
  password: string,
  state: 'INPROGRESS' | 'SUCCESSFUL' | 'FAILED',
  buildKey: string,
  buildName: string,
  description: string,
  url: string
}
*/

const defaultCommit = String(process.env.BITBUCKET_COMMIT);
const defaultUsername = String(process.env.BITBUCKET_USER);
const defaultPassword = String(process.env.BITBUCKET_PASSWORD);
const defaultRepoOwner = String(process.env.BITBUCKET_REPO_OWNER);
const defaultRepoSlug = String(process.env.BITBUCKET_REPO_SLUG);
const defaultBuildName = 'Custom build status';
const defaultDescription = 'No description given';
const defaultUrl = 'bitbucket.org/atlassian/atlaskit-mk-2/';
const defaultBuildKey = (commit /*: string */, buildName /*: string */) =>
  `${buildName} - ${commit.substr(0, 6)}`;

// This is just a wrapper function around the bitbucket-build-status npm package
// https://www.npmjs.com/package/bitbucket-build-status
function updateBuildStatus(opts /*: buildStatusOpts*/) {
  const commit = opts.commit || defaultCommit;
  const username = opts.username || defaultUsername;
  const password = opts.password || defaultPassword;
  const repoOwner = opts.repoOwner || defaultRepoOwner;
  const repoSlug = opts.repoSlug || defaultRepoSlug;
  const buildName = opts.buildName || defaultBuildName;
  const description = opts.description || defaultDescription;
  const url = opts.url || defaultUrl;
  const buildKey = opts.buildKey || defaultBuildKey(commit, buildName);
  const state = opts.state;

  if (!state) {
    console.error('No state provided to updateBuildStatus');
    process.exit(1);
  }

  const commandToRun = `bbuild --commit "${commit}" \
    --repo "${repoSlug}" \
    --owner "${repoOwner}" \
    --username "${username}" \
    --password "${password}" \
    --key "${buildKey}" \
    --name "${buildName}" \
    --description "${description}" \
    --url "${url}"\
    --state "${state}" 1> /dev/null`;

  execSync(commandToRun);
  if (state === 'FAILED') {
    process.exit(1);
  }
}

module.exports = updateBuildStatus;
