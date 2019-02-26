# @atlaskit/code

## 8.2.3
- [patch] [d49e9bbb13](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d49e9bbb13):

  - Expose the props on website

## 8.2.2
- Updated dependencies [58b84fa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/58b84fa):
  - @atlaskit/theme@7.0.1
  - @atlaskit/docs@6.0.0

## 8.2.1
- Updated dependencies [d13242d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d13242d):
  - @atlaskit/docs@5.2.3
  - @atlaskit/theme@7.0.0

## 8.2.0
- [minor] [10fe416](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/10fe416):

  - Props Language should be required and surfacing more props for code

## 8.1.1
- [patch] [84e8015](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/84e8015):

  - Bump react-syntax-highlighter to 10.0.1

## 8.1.0
- [minor] [26027dd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/26027dd):

  - Upgrade react syntax highlighter to version that ships its own async loaded languages and supports SSR

## 8.0.12
- [patch] Inline code should wrap [f1d9a54](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f1d9a54)

## 8.0.11
- [patch] Fix webpack 3 support for page & code [03af95e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/03af95e)

## 8.0.10
- [patch] Update babel config to transpile out dynamic imports for commonjs [2dae295](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2dae295)

## 8.0.9
- [patch] Adds missing implicit @babel/runtime dependency [b71751b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b71751b)

## 8.0.8
- [patch] Add some padding to the code without line numbers [67cd63d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/67cd63d)

## 8.0.7
- [patch] Added yaml to supported languages for code and added styling for the key token. [95f9236](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/95f9236)

## 8.0.6
- [patch] Async load highlighter languages [9102fa2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9102fa2)

## 8.0.5
- [patch] Upgrade react-syntax-highlighter again and use async loaded prism [260d66a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/260d66a)

## 8.0.4
- [patch] Upgraded react-syntax-highlighter to 8.0.2 [7cc7000](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7cc7000)

## 8.0.3
- [patch] Adds sideEffects: false to allow proper tree shaking [b5d6d04](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b5d6d04)

## 8.0.1
- [patch] Updated dependencies [df22ad8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/df22ad8)
  - @atlaskit/theme@6.0.0
  - @atlaskit/docs@5.0.6

## 8.0.0
- [major] ED-4989: replace hjs with prism [f9c0cdb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f9c0cdb)
- [none] Updated dependencies [f9c0cdb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f9c0cdb)
  - @atlaskit/docs@5.0.5

## 7.0.3
- [patch] update the dependency of react-dom to 16.4.2 due to vulnerability in previous versions read https://reactjs.org/blog/2018/08/01/react-v-16-4-2.html for details [a4bd557](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a4bd557)
- [none] Updated dependencies [a4bd557](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a4bd557)
  - @atlaskit/theme@5.1.3

## 7.0.2
- [patch] Updated dependencies [acd86a1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/acd86a1)
  - @atlaskit/theme@5.1.2
  - @atlaskit/docs@5.0.2

## 7.0.1
- [patch] Add a SSR test for every package, add react-dom and build-utils in devDependencies [7e331b5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7e331b5)
- [none] Updated dependencies [7e331b5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7e331b5)
  - @atlaskit/theme@5.1.1

## 7.0.0

- [major] Updates to React ^16.4.0 [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
- [major] Updated dependencies [563a7eb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/563a7eb)
  - @atlaskit/theme@5.0.0
  - @atlaskit/docs@5.0.0
- [major] Updated dependencies [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
  - @atlaskit/theme@5.0.0
  - @atlaskit/docs@5.0.0

## 6.0.1
- [patch] Add default theme prop to prevent Code throwing errors when no theme provider is given [07334bc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/07334bc)
- [none] Updated dependencies [07334bc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/07334bc)

## 6.0.0
- [major] Significantly reduce the bundle-size of @atlaskit/code by only supporting a subset of languages. Also introduces support for theming the content via @atlaskit/theme. AK-4536 [eee2d45](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/eee2d45)
- [none] Updated dependencies [eee2d45](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/eee2d45)
  - @atlaskit/docs@4.2.1

## 5.0.4
- [patch] Clean Changelogs - remove duplicates and empty entries [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
- [none] Updated dependencies [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
  - @atlaskit/theme@4.0.4

## 5.0.3
- [patch] Update changelogs to remove duplicate [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
- [none] Updated dependencies [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
  - @atlaskit/theme@4.0.3
  - @atlaskit/docs@4.1.1

## 5.0.2
- [none] Updated dependencies [9d20f54](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d20f54)
  - @atlaskit/docs@4.1.0
  - @atlaskit/theme@4.0.2

## 5.0.1
- [patch] Update readme's [223cd67](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/223cd67)
- [patch] Updated dependencies [223cd67](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/223cd67)
  - @atlaskit/theme@4.0.1
  - @atlaskit/docs@4.0.1

## 5.0.0
- [major] makes styled-components a peer dependency and upgrades version range from 1.4.6 - 3 to ^3.2.6 [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
- [patch] Updated dependencies [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
  - @atlaskit/theme@4.0.0
  - @atlaskit/docs@4.0.0

## 4.0.4
- [patch] Updated dependencies [d662caa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d662caa)
  - @atlaskit/theme@3.2.2
  - @atlaskit/docs@3.0.4

## 4.0.3
- [patch] Align font sizes for inline code, mentions and dates [d2ef1af](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d2ef1af)
- [none] Updated dependencies [d2ef1af](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d2ef1af)

## 4.0.1
- [patch] Get rid of outdent dependency [6a2c1d9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6a2c1d9)

## 4.0.0
- [major] Bump to React 16.3. [4251858](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4251858)

## 3.1.2
- [patch] Plain text should not be rendered as markdown [fe307dc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fe307dc)

## 3.1.1
- [patch] Re-releasing due to potentially broken babel release [9ed0bba](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9ed0bba)

## 3.1.0
- [minor] Update styled-components dependency to support versions 1.4.6 - 3 [ceccf30](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ceccf30)

## 3.0.6
- [patch] updated the repository url to https://bitbucket.org/atlassian/atlaskit-mk-2 [1e57e5a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e57e5a)

## 3.0.5
- [patch] Packages Flow types for elements components [3111e74](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3111e74)

## 3.0.4
- [patch] Minor manual bump for packages desync'd from npm [e988c58](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e988c58)

## 3.0.3
- Manual bump to resolve desync with npm package version.

## 3.0.2
- [patch] Enabling syntax highlighter language auto-detect [4831bd2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4831bd2)

## 3.0.1
- [patch] Resolved low hanging flow errors in field-base field-text comment icon item and website, $ [007de27](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/007de27)

## 3.0.0
- [major] Moved to elements repo converted to flow typing, stripped out typescript types [235e392](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/235e392)

## 2.2.1
- [patch] Remove styled-components as a peerDependency from @atlaskit/code. [047032b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/047032b)

## 2.2.0
- [minor] Add React 16 support. [12ea6e4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/12ea6e4)

