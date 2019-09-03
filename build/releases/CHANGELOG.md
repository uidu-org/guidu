# @uidu/build-releases

## 3.0.18

### Patch Changes

- [patch][9663f6e](https://github.org/uidu-org/guidu/commits/9663f6e):

  Release all packages for bumping all dependencies, fixes for react lifecycle unsafe methods

## 3.0.17

- [patch][4a4aff7](https://github.org/uidu-org/guidu/commits/4a4aff7):

  - Better package json organization

## 3.0.16

- [patch][e3fc364](https://github.org/uidu-org/guidu/commits/e3fc364):

  - Remove some tests, fix travis cache timeout, migrate accordion to typescript

## 3.0.15

- [patch][33713cc](https://github.org/uidu-org/guidu/commits/33713cc):

  - Added uidu/layer to fix popper warnings

- [patch][33713cc](https://github.org/uidu-org/guidu/commits/33713cc):

  - Remove some dependencies

## 3.0.14

- [patch][bf73cb5](https://github.org/uidu-org/guidu/commits/bf73cb5):

  - Update some styling to tabbar and navigation

## 3.0.13

- [patch][4f6e77f](https://github.org/uidu-org/guidu/commits/4f6e77f):

  - Bump bolt dependencies

## 3.0.12

- [patch][93d4c6e](https://github.org/uidu-org/guidu/commits/93d4c6e):

  - Drop CJS from builds, release all packages to update references both in dev and production

## 3.0.11

- [patch][31cf37a](https://github.org/uidu-org/guidu/commits/31cf37a):

  - Release all packages again

- [patch][7200672](https://github.org/uidu-org/guidu/commits/7200672):

  - Release all

## 3.0.10

- [patch][0d12731](https://github.org/uidu-org/guidu/commits/0d12731):

  - Release all packages

- [patch][0d12731](https://github.org/uidu-org/guidu/commits/0d12731):

  - Build and publish all packages

- [patch][0d12731](https://github.org/uidu-org/guidu/commits/0d12731):

  - Release all packages to fix those with previuos failed builds

## 3.0.9

- [patch] :

  - Bump dependencies and added shell and navigation components

## 3.0.8

- [patch] :

  - Big component rewrite, fix bolt dev environmnet"

## 3.0.7

- [patch] :

  - Publish media components, added message 0.1.0

## 3.0.6

- [patch] :

  - Dist folder created

## 3.0.5

- [patch] :

  - Release with build included

- [patch] :

  - Released newly created components and moved all atlaskit references to @uidu scope

- [patch] :

  - Wrong version for 3 packages

## 3.0.3

- [patch][c87337f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c87337f):

  - The version command now removes empty folders before it starts. This should prevent a race condition in CI

## 3.0.2

- [patch][f7b030a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f7b030a):

  - Fixes potential infinite loop in parseChangesetCommit

## 3.0.1

- [patch][494c1fe](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/494c1fe):

  - Update git commit message to match previous tooling.

## 3.0.0

- [major][44ec8bf" d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/44ec8bf"
  d):

  Changesets now use local file system - this has several effects:

  1. Changesets will no longer automatically create a commit. You will need to add and commit the files yourself.
  2. Changesets are easier to modify. You should ONLY modify the changes.md file (_Not changes.json_).
  3. There will be a new directory which is `.changeset`, which will hold all the changesets.

  Apart from these changes, your process using this should not have changed.

  Changeset now accepts skipCI flag, where previously release commits automatically skipped CI. i.e.

  ```
  yarn build-releases version --skipCI
  ```

  **Breaking**: Changeset and version commands now accept `--commit` flag which makes them commit automatically (previously this was the default behaviour). Otherwise, these commands simply make the file-system changes.

  ```
  yarn build-releases changeset --commit
  ```

  We also introduce the `intitialize` command. See the package [README.md](https://www.npmjs.com/package/@uidu/build-releases) for more details about this.

## 2.1.3

- [patch] Bumps bolt version to get some bug fixes around publishing [493f5f7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/493f5f7)

## 2.1.2

- [patch] Pulls in fix in bolt causing publishing to fail when running a yarn subprocess (see boltpkg/bolt #189) [2b36121](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2b36121)

## 2.1.1

- [patch] Fixes bug where empty summaries would cause a changeset to not get found [25b30bf](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/25b30bf)

## 2.1.0

- [minor] Allows passing --public flag for publishing scoped packages [159c28e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/159c28e)
- [minor] Changes changelogs to be opt out rather than opt in [f461788](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f461788)

## 2.0.0

- [major] Completely refactors build-releases to be externally consumable 8458ef7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8458ef7)

## 1.28.2

- [patch] Bug fix and better error messages for changeset error [7f09b86](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7f09b86)

## 1.28.1

- [patch] update flow dep, fix flow errors [722ad83](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/722ad83)

## 1.28.0

- [minor] Adds tagging to releases [34c64fd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/34c64fd)

## 1.27.0

- [minor] Splits out and exposes flattenChangesets function [5ee5f74](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5ee5f74)

## 1.26.0

- [minor] Lots of new features (consider this package unstable and only for use internally) [7cdf2e6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7cdf2e6)
