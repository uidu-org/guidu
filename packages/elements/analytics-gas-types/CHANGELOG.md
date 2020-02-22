# @atlaskit/analytics-gas-types

## 0.1.5

### Patch Changes

- 27d5d26: Fix missing tsconfig paths

## 0.1.4

### Patch Changes

- d9f506a: Lots on dashlet docs and reasoning
- Updated dependencies [d9f506a]
  - @uidu/analytics@0.1.18

## 0.1.3

### Patch Changes

- 43566b7: Bump styled-components, bump all
- Updated dependencies [43566b7]
  - @uidu/analytics@0.1.17
  - @uidu/docs@0.1.40

## 0.1.2

### Patch Changes

- 8c80bd5: Changed how tsc compiles, should be faster to build
- Updated dependencies [8c80bd5]
  - @uidu/analytics@0.1.16

## 0.1.1

### Patch Changes

- 9e09850: Bump all packages
- ffffbbe: Update dependencies

- Updated dependencies [9e09850]
- Updated dependencies [ffffbbe]
  - @uidu/analytics@0.1.15
  - @uidu/docs@0.1.34

## 4.0.10

### Patch Changes

- [patch][097b696613](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/097b696613):

  Components now depend on TS 3.6 internally, in order to fix an issue with TS resolving non-relative imports as relative imports

## 4.0.9

### Patch Changes

- [patch][ecca4d1dbb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ecca4d1dbb):

  Upgraded Typescript to 3.3.x

## 4.0.8

- Updated dependencies [926b43142b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/926b43142b):
  - @uidu/analytics@6.0.0

## 4.0.7

### Patch Changes

- [patch][9f8ab1084b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9f8ab1084b):

  Consume analytics-next ts type definitions as an ambient declaration.

## 4.0.6

### Patch Changes

- [patch][bbff8a7d87](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bbff8a7d87):

  Fixes bug, missing version.json file

## 4.0.5

### Patch Changes

- [patch][18dfac7332](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/18dfac7332):

  In this PR, we are:

  - Re-introducing dist build folders
  - Adding back cjs
  - Replacing es5 by cjs and es2015 by esm
  - Creating folders at the root for entry-points
  - Removing the generation of the entry-points at the root
    Please see this [ticket](https://product-fabric.atlassian.net/browse/BUILDTOOLS-118) or this [page](https://hello.atlassian.net/wiki/spaces/FED/pages/452325500/Finishing+Atlaskit+multiple+entry+points) for further details

## 4.0.4

- Updated dependencies [7c17b35107](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7c17b35107):
  - @uidu/docs@8.0.0
  - @uidu/analytics@5.0.0

## 4.0.3

- [patch][0a4ccaafae](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0a4ccaafae):

  - Bump tslib

## 4.0.2

- [patch][3f28e6443c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3f28e6443c):

  - @uidu/analytics-types is deprecated. Now you can use types for @uidu/analytics supplied from itself.

## 4.0.1

- [patch][1bcaa1b991](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1bcaa1b991):

  - Add npmignore for index.ts to prevent some jest tests from resolving that instead of index.js

## 4.0.0

- [major][9d5cc39394](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d5cc39394):

  - Dropped ES5 distributables from the typescript packages

## 3.2.5

- Updated dependencies [76299208e6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/76299208e6):
  - @uidu/docs@7.0.0

## 3.2.4

- [patch][a3b8046](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a3b8046):

  - Add more specific types to analytics-listener webclient type

## 3.2.3

- Updated dependencies [58b84fa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/58b84fa):
  - @uidu/docs@6.0.0

## 3.2.2

- [patch] Analytics event's 'source' field from GasPayload type is now optional. In most cases, the 'source' field is expected to be set by the integrator through AnalyticsContext. Thus it's recommended that components do not set it to avoid overriding the one provided by the integrating product. Analytics listeners are handling the case where the 'source' field couldn't be found by setting the default value "unknown" before sending the event through the client. [1c0ea95](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1c0ea95)

## 3.2.1

- [patch] fixed imports, docs and made GasPayload package attributes optional [6be5eed](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6be5eed)

## 3.2.0

- [minor] Update GasPayload to include proper format for screen events [85ddb9e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/85ddb9e)

## 3.1.3

- [patch] Fix es5 exports of some of the newer modules [3f0cd7d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3f0cd7d)

## 3.1.2

- [patch] Updated dependencies [acd86a1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/acd86a1)
  - @uidu/docs@5.0.2

## 3.1.1

- [patch] FS-2020 add session id to typeahead plugin inside editor [5ae463f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5ae463f)

## 3.1.0

- [minor] Allow sending of search queries in analytics events [e5f14e9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e5f14e9)

## 3.0.0

- [major] Updated dependencies [563a7eb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/563a7eb)
  - @uidu/docs@5.0.0
- [major] Updated dependencies [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
  - @uidu/docs@5.0.0

## 2.1.4

- [patch] Move the tests under src and club the tests under unit, integration and visual regression [f1a9069](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f1a9069)

## 2.1.3

- [patch] Update changelogs to remove duplicate [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
- [none] Updated dependencies [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
  - @uidu/docs@4.1.1

## 2.1.2

- [none] Updated dependencies [9d20f54](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d20f54)
  - @uidu/docs@4.1.0

## 2.1.1

- [patch] Updated dependencies [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
  - @uidu/docs@4.0.0

## 2.1.0

- [minor] Export individual event types as constants [9be1db0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9be1db0)

## 2.0.0

- [major] added new package analytics-gas-types [4d238a6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4d238a6)
