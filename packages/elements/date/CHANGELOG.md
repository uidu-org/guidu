# @atlaskit/date

## 0.1.5

### Patch Changes

- ef3e4c4: Migrate theme to typescript
- Updated dependencies [ef3e4c4]
  - @uidu/theme@0.2.0
  - @uidu/docs@0.1.41

## 0.1.4

### Patch Changes

- 43566b7: Bump styled-components, bump all
- Updated dependencies [43566b7]
  - @uidu/docs@0.1.40
  - @uidu/theme@0.1.20
  - @uidu/elements-test-helpers@0.1.3

## 0.1.3

### Patch Changes

- 8f92964: Bump styled-components
- Updated dependencies [8f92964]
  - @uidu/docs@0.1.39
  - @uidu/theme@0.1.19

## 0.1.2

### Patch Changes

- 8c80bd5: Changed how tsc compiles, should be faster to build
- Updated dependencies [8c80bd5]
  - @uidu/elements-test-helpers@0.1.2

## 0.1.1

### Patch Changes

- 9e09850: Bump all packages
- ffffbbe: Update dependencies

- Updated dependencies [9e09850]
- Updated dependencies [ffffbbe]
  - @uidu/docs@0.1.34
  - @uidu/theme@0.1.18
  - @uidu/elements-test-helpers@0.1.1

## 0.7.6

### Patch Changes

- [patch][c8bb1c7896](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c8bb1c7896):

  Fix some packages having a 'modules' field in package.json rather than 'module'

## 0.7.5

### Patch Changes

- [patch][097b696613](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/097b696613):

  Components now depend on TS 3.6 internally, in order to fix an issue with TS resolving non-relative imports as relative imports

## 0.7.4

### Patch Changes

- [patch][ecca4d1dbb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ecca4d1dbb):

  Upgraded Typescript to 3.3.x

## 0.7.3

### Patch Changes

- [patch][01cfa54997](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/01cfa54997):

  Move @types/date-fns from dependencies to devDependencies.

## 0.7.2

### Patch Changes

- [patch][bbff8a7d87](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bbff8a7d87):

  Fixes bug, missing version.json file

## 0.7.1

### Patch Changes

- [patch][18dfac7332](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/18dfac7332):

  In this PR, we are:

  - Re-introducing dist build folders
  - Adding back cjs
  - Replacing es5 by cjs and es2015 by esm
  - Creating folders at the root for entry-points
  - Removing the generation of the entry-points at the root
    Please see this [ticket](https://product-fabric.atlassian.net/browse/BUILDTOOLS-118) or this [page](https://hello.atlassian.net/wiki/spaces/FED/pages/452325500/Finishing+Atlaskit+multiple+entry+points) for further details

## 0.7.0

- [minor][7c17b35107](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7c17b35107):

  - Updates react and react-dom peer dependencies to react@^16.8.0 and react-dom@^16.8.0. To use this package, please ensure you use at least this version of react and react-dom.

## 0.6.4

- Updated dependencies [9c0b4744be](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9c0b4744be):
  - @uidu/docs@7.0.3
  - @uidu/theme@8.1.7

## 0.6.3

- [patch][d13fad66df](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d13fad66df):

  - Enable esModuleInterop for typescript, this allows correct use of default exports

## 0.6.2

- Updated dependencies [b0210d7ccc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b0210d7ccc):
  - @atlaskit/elements-test-helpers@0.5.0

## 0.6.1

- [patch][1bcaa1b991](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1bcaa1b991):

  - Add npmignore for index.ts to prevent some jest tests from resolving that instead of index.js

## 0.6.0

- [minor][b684722884](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b684722884):

  - improvement of SSR tests and examples for Fabric Elements

## 0.5.0

- [minor][9d5cc39394](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d5cc39394):

  - Dropped ES5 distributables from the typescript packages

## 0.4.2

- Updated dependencies [7261577953](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7261577953):
  - @atlaskit/elements-test-helpers@0.3.0

## 0.4.1

- Updated dependencies [76299208e6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/76299208e6):
  - @uidu/docs@7.0.0
  - @uidu/theme@8.0.0

## 0.4.0

- [minor][4072865c1c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4072865c1c):

  - added SSR tests to task-decision

## 0.3.0

- [minor][36bb743af0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/36bb743af0):

  - added/cleaned up ssr tests

## 0.2.1

- [patch][2762ffd47e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2762ffd47e):

  - add SSR/hydration tests to Date element

## 0.2.0

- [minor][67d563a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/67d563a):

  - ED-5888 Add dark mode for date

## 0.1.9

- Updated dependencies [58b84fa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/58b84fa):
  - @uidu/theme@7.0.1
  - @uidu/docs@6.0.0

## 0.1.8

- Updated dependencies [d13242d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d13242d):
  - @uidu/docs@5.2.3
  - @uidu/theme@7.0.0

## 0.1.7

- [patch][3061b52](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3061b52):

  - AK-5723 - adjust files in package.json to ensure correct publishing of dist/package.json

## 0.1.6

- [patch][36c362f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/36c362f):

  - FS-3174 - Fix usage of gridSize() and borderRadius()

## 0.1.5

- [patch][527b954](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/527b954):

  - FS-3174 - Remove usage of util-shared-styles from elements components

## 0.1.4

- [patch] ED-5529 Fix JSON Schema [d286ab3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d286ab3)

## 0.1.3

- [patch] Fix rxjs and date-fns import in TS components [ab15cee](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ab15cee)

## 0.1.2

- [patch] Updated dependencies [df22ad8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/df22ad8)
  - @uidu/theme@6.0.0
  - @uidu/docs@5.0.6

## 0.1.1

- [patch] update the dependency of react-dom to 16.4.2 due to vulnerability in previous versions read https://reactjs.org/blog/2018/08/01/react-v-16-4-2.html for details [a4bd557](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a4bd557)
- [none] Updated dependencies [a4bd557](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a4bd557)
  - @uidu/theme@5.1.3

## 0.1.0

- [minor] FS-2131 add date element [b026429](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b026429)
