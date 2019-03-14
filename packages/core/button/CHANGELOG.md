# @atlaskit/button

## 10.1.2
- Updated dependencies [d7ef59d432](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d7ef59d432):
  - @atlaskit/docs@6.0.1
  - @atlaskit/checkbox@5.0.11
  - @atlaskit/icon@16.0.0

## 10.1.1
- Updated dependencies [58b84fa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/58b84fa):
  - @atlaskit/analytics-next@3.1.2
  - @atlaskit/checkbox@5.0.9
  - @atlaskit/icon@15.0.2
  - @atlaskit/logo@9.2.6
  - @atlaskit/spinner@9.0.13
  - @atlaskit/theme@7.0.1
  - @atlaskit/docs@6.0.0

## 10.1.0
- [minor] [36929ef](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/36929ef):

  - Add reset as it is listed as a valid type for button and is useful when building forms

## 10.0.4
- Updated dependencies [d13242d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d13242d):
  - @atlaskit/docs@5.2.3
  - @atlaskit/checkbox@5.0.8
  - @atlaskit/icon@15.0.1
  - @atlaskit/logo@9.2.5
  - @atlaskit/spinner@9.0.12
  - @atlaskit/theme@7.0.0

## 10.0.3
- [patch] [76a8f1c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/76a8f1c):

  - Convert @atlaskit/textarea to Typescript
    - Dist paths have changed, if you are importing by exact file path you will need to update your imports `import '@atlaskit/button/dist/es5/components/ButtonGroup'`
    - Flow types are not present any more, Typescript definitions are shipped instead

## 10.0.2
- [patch] [8f89287](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8f89287):

  - Add tslib to dependencies to stop load breaking when it's not there

## 10.0.1
- Updated dependencies [ab9b69c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ab9b69c):
  - @atlaskit/docs@5.2.2
  - @atlaskit/checkbox@5.0.7
  - @atlaskit/icon@15.0.0

## 10.0.0
- [major] [6998f11](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6998f11):

  - Converted @atlaskit/button to Typescript
    - Dist paths have changed, if you are importing by exact file path you will need to update your imports
      - E.g. `import '@atlaskit/button/dist/cjs/components/ButtonGroup';` would need to be updated to `import '@atlaskit/button/dist/es5/components/ButtonGroup'`
    - Flow types are not present any more, Typescript definitions are shipped instead

- Updated dependencies [bfac186](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bfac186):
  - @atlaskit/analytics-next-types@3.1.2
  - @atlaskit/type-helpers@2.0.0

## 9.0.16
- [patch] Fix truncation in button [508ca2c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/508ca2c)

## 9.0.15
- [patch] Adds missing implicit @babel/runtime dependency [b71751b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b71751b)

## 9.0.14
- [patch] Fix styling of button rendering icon in IE [b4c5b87](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b4c5b87)

## 9.0.13
- [patch] Updated dependencies [65c6514](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/65c6514)
  - @atlaskit/docs@5.0.8
  - @atlaskit/checkbox@5.0.2
  - @atlaskit/icon@14.0.0

## 9.0.12
- [patch] Add help appearance [3548c3f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3548c3f)

## 9.0.11
- [patch] Update the appearance of selected for Help [196603f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/196603f)

## 9.0.10
- [patch] Updated dependencies [7d51a09](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7d51a09)
  - @atlaskit/spinner@9.0.9

## 9.0.9
- [patch] Updated dependencies [80e1925](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/80e1925)
  - @atlaskit/checkbox@5.0.0

## 9.0.8
- [patch] Adds sideEffects: false to allow proper tree shaking [b5d6d04](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b5d6d04)

## 9.0.6
- [patch] Updated dependencies [df22ad8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/df22ad8)
  - @atlaskit/theme@6.0.0
  - @atlaskit/spinner@9.0.6
  - @atlaskit/icon@13.2.5
  - @atlaskit/checkbox@4.0.4
  - @atlaskit/docs@5.0.6

## 9.0.5
- [patch] update the dependency of react-dom to 16.4.2 due to vulnerability in previous versions read https://reactjs.org/blog/2018/08/01/react-v-16-4-2.html for details [a4bd557](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a4bd557)
- [patch] Updated dependencies [a4bd557](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a4bd557)
  - @atlaskit/analytics-next@3.0.4
  - @atlaskit/checkbox@4.0.3
  - @atlaskit/theme@5.1.3
  - @atlaskit/spinner@9.0.5
  - @atlaskit/icon@13.2.4

## 9.0.4
- [patch] Updated dependencies [acd86a1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/acd86a1)
  - @atlaskit/icon@13.2.2
  - @atlaskit/checkbox@4.0.2
  - @atlaskit/theme@5.1.2
  - @atlaskit/spinner@9.0.4
  - @atlaskit/analytics-next@3.0.3
  - @atlaskit/docs@5.0.2

## 9.0.3
- [patch] Add a SSR test for every package, add react-dom and build-utils in devDependencies [7e331b5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7e331b5)
- [patch] Updated dependencies [7e331b5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7e331b5)
  - @atlaskit/analytics-next@3.0.2
  - @atlaskit/checkbox@4.0.1
  - @atlaskit/theme@5.1.1
  - @atlaskit/spinner@9.0.3
  - @atlaskit/icon@13.2.1

## 9.0.2
- [patch] Move analytics tests and replace elements to core [49d4ab4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/49d4ab4)
- [patch] Updated dependencies [49d4ab4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/49d4ab4)
  - @atlaskit/analytics-next@3.0.1
  - @atlaskit/spinner@9.0.2
  - @atlaskit/docs@5.0.1

## 9.0.1
- [patch] Updated dependencies [619ab41](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/619ab41)
  - @atlaskit/spinner@9.0.1

## 9.0.0
- [major] Provides analytics for common component interations. See the [Instrumented Components](https://atlaskit.atlassian.com/packages/core/analytics-next) section for more details. If you are using enzyme for testing you will have to use [our forked version of the library](https://atlaskit.atlassian.com/docs/guides/testing#we-use-a-forked-version-of-enzyme). [563a7eb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/563a7eb)
- [major] Updates to React ^16.4.0 [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
- [major] Updated dependencies [563a7eb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/563a7eb)
  - @atlaskit/analytics-next@3.0.0
  - @atlaskit/checkbox@4.0.0
  - @atlaskit/theme@5.0.0
  - @atlaskit/spinner@9.0.0
  - @atlaskit/docs@5.0.0
  - @atlaskit/icon@13.0.0
- [major] Updated dependencies [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
  - @atlaskit/analytics-next@3.0.0
  - @atlaskit/checkbox@4.0.0
  - @atlaskit/theme@5.0.0
  - @atlaskit/spinner@9.0.0
  - @atlaskit/docs@5.0.0
  - @atlaskit/icon@13.0.0

## 8.2.7
- [patch] Fixed spinner position and size for isLoading state of buttons [d6fb3c9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d6fb3c9)
- [none] Updated dependencies [d6fb3c9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d6fb3c9)

## 8.2.6
- [patch] Updated prop description for button. Added button label props for inline-edit accessibility. [11205df](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/11205df)
- [none] Updated dependencies [11205df](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/11205df)

## 8.2.5
- [patch] Fix flow types [da63331](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/da63331)

- [none] Updated dependencies [da63331](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/da63331)
- [none] Updated dependencies [7724115](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7724115)

## 8.2.4
- [patch] Remove or update $FlowFixMe [e8ad98a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e8ad98a)
- [none] Updated dependencies [e8ad98a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e8ad98a)
  - @atlaskit/icon@12.6.1

## 8.2.3
- [patch] Updated dependencies [cdba8b3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cdba8b3)
  - @atlaskit/spinner@8.0.0

## 8.2.2
- [patch] Fix $FlowFixMe and release packages [25d0b2d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/25d0b2d)
- [patch] Updated dependencies [25d0b2d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/25d0b2d)
  - @atlaskit/spinner@7.1.1
  - @atlaskit/checkbox@3.1.2
  - @atlaskit/icon@12.3.1

## 8.2.1
- [patch] Fixed interactions for isLoading state. Now prevents interactions (click, hover, keyboard submit) while loading [4605f44](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4605f44)
- [none] Updated dependencies [4605f44](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4605f44)

## 8.2.0
- [minor] Fixes types for Flow 0.74 [dc50cd2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dc50cd2)
- [patch] Updated dependencies [dc50cd2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dc50cd2)
  - @atlaskit/spinner@7.1.0
  - @atlaskit/checkbox@3.1.0
  - @atlaskit/icon@12.2.0

## 8.1.2
- [patch] Clean Changelogs - remove duplicates and empty entries [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
- [patch] Updated dependencies [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
  - @atlaskit/theme@4.0.4
  - @atlaskit/spinner@7.0.2
  - @atlaskit/checkbox@3.0.6
  - @atlaskit/icon@12.1.2

## 8.1.1
- [patch] Update changelogs to remove duplicate [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
- [patch] Updated dependencies [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
  - @atlaskit/theme@4.0.3
  - @atlaskit/spinner@7.0.1
  - @atlaskit/icon@12.1.1
  - @atlaskit/analytics-next@2.1.8
  - @atlaskit/checkbox@3.0.5
  - @atlaskit/docs@4.1.1

## 8.1.0
- [patch] Updated dependencies [9d20f54](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d20f54)
  - @atlaskit/spinner@7.0.0
  - @atlaskit/icon@12.1.0
  - @atlaskit/checkbox@3.0.4
  - @atlaskit/docs@4.1.0
  - @atlaskit/theme@4.0.2
  - @atlaskit/analytics-next@2.1.7

## 8.0.1
- [patch] Update readme's [223cd67](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/223cd67)
- [patch] Updated dependencies [223cd67](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/223cd67)
  - @atlaskit/icon@12.0.1
  - @atlaskit/analytics-next@2.1.5
  - @atlaskit/checkbox@3.0.1
  - @atlaskit/theme@4.0.1
  - @atlaskit/spinner@6.0.1
  - @atlaskit/docs@4.0.1

## 8.0.0
- [major] makes styled-components a peer dependency and upgrades version range from 1.4.6 - 3 to ^3.2.6 [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
- [patch] Updated dependencies [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
  - @atlaskit/icon@12.0.0
  - @atlaskit/analytics-next@2.1.4
  - @atlaskit/checkbox@3.0.0
  - @atlaskit/theme@4.0.0
  - @atlaskit/spinner@6.0.0
  - @atlaskit/docs@4.0.0

## 7.2.5
- [patch] Updated dependencies [d662caa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d662caa)
  - @atlaskit/icon@11.3.0
  - @atlaskit/analytics-next@2.1.1
  - @atlaskit/theme@3.2.2
  - @atlaskit/docs@3.0.4

## 7.2.4
- [patch] Export types for Button [6a47d88](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6a47d88)
- [none] Updated dependencies [6a47d88](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6a47d88)

## 7.2.3
- [patch] Fix invalid css in button [2363d14](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2363d14)
- [none] Updated dependencies [2363d14](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2363d14)

## 7.2.2
- [patch] Fix react ref dev warnings when using custom components [40b743c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/40b743c)

## 7.2.0
- [minor] Add ariaLabel prop to button so that it can be passed to the underlying component [d7a1e7e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d7a1e7e)

## 7.1.0
- [minor] Add `autoFocus` to button, allowing button to be automatically focused on first render. [bf36eb6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bf36eb6)

## 7.0.3
- [patch] Fix a react dev warning when using a custom component [8fb3bc1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8fb3bc1)

## 7.0.2
- [patch] Update empty state and button to have consistent types [f0da143](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f0da143)

## 7.0.1
- [patch] Update tests + flow [05d406d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/05d406d)
- [patch] Remove default props to have it optional [0907a36](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0907a36)

## 7.0.0
- [major] Bump to React 16.3. [4251858](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4251858)

## 6.6.4
- [patch] Updates flow types of withAnalyticsEvents and withAnalyticsContext HOCs [26778bc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/26778bc)
- [patch] Uses element config flow type with button deprecation warnings hoc [a9aa90a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a9aa90a)

## 6.6.3
- [patch] added onBlur and onFocus hooks [27d01b7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/27d01b7)

## 6.6.2
- [patch] Re-releasing due to potentially broken babel release [9ed0bba](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9ed0bba)

## 6.6.1
- [patch] added selected focus state for button [dad190d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dad190d)

## 6.6.0
- [minor] Update styled-components dependency to support versions 1.4.6 - 3 [ceccf30](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ceccf30)

## 6.5.0
- [minor] Instrument button with analytics [4e84f5b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4e84f5b)

## 6.4.2
- [patch] updated the repository url to https://bitbucket.org/atlassian/atlaskit-mk-2 [1e57e5a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e57e5a)

## 6.4.1
- [patch] Packages Flow types for elements components [3111e74](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3111e74)

## 6.4.0
- [minor] id property on Button component is not propagated if href property is provided [7d46c81](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7d46c81)

## 6.3.1
- [patch] Resolved low hanging flow errors in field-base field-text comment icon item and website, $ [007de27](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/007de27)

## 6.3.0
- [minor] Add React 16 support. [12ea6e4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/12ea6e4)

## 6.2.0
- [minor] replace flow type to be less restrictive [a28cdbd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a28cdbd)

## 6.1.0
- [minor] Add theming to Button. Deprecate 'help' appearance from Button. [c14ea2e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c14ea2e)
- [minor] Add theming to Button. Deprecate 'help' appearance from Button. [c14ea2e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c14ea2e)

## 6.0.0
- [major] Remove typescript [4635000](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4635000)
- [major] Remove typescript [4635000](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4635000)
- [patch] Move button to new repo, tidy types [2dafda6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2dafda6)
- [patch] Move button to new repo, tidy types [2dafda6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2dafda6)

## 5.4.14 (2017-12-01)
* bug fix; fix button group spacing (issues closed: ak-3978) ([f0037f2](https://bitbucket.org/atlassian/atlaskit/commits/f0037f2))

## 5.4.13 (2017-11-30)
* bug fix; fix disabled buttons with child elements propagating click events ([584ffdc](https://bitbucket.org/atlassian/atlaskit/commits/584ffdc))

## 5.4.12 (2017-11-27)
* bug fix; export interface for ts ([15c291c](https://bitbucket.org/atlassian/atlaskit/commits/15c291c))

## 5.4.11 (2017-11-27)
* bug fix; fix disabled buttons not swallowing click events (issues closed: ak-3646) ([80e976b](https://bitbucket.org/atlassian/atlaskit/commits/80e976b))

## 5.4.10 (2017-11-24)
* bug fix; fix button-group prop validation to ignore null children ([3f7f0c3](https://bitbucket.org/atlassian/atlaskit/commits/3f7f0c3))

## 5.4.9 (2017-11-21)
* bug fix; bumping internal dependencies to latest version ([5e81848](https://bitbucket.org/atlassian/atlaskit/commits/5e81848))

## 5.4.8 (2017-10-27)
* bug fix; correct formatting for user-select style ([fe9419c](https://bitbucket.org/atlassian/atlaskit/commits/fe9419c))

## 5.4.7 (2017-10-27)
* bug fix; change icon to be unselectable so button content can be copied ([e8c876a](https://bitbucket.org/atlassian/atlaskit/commits/e8c876a))

## 5.4.6 (2017-10-27)
* bug fix; updated button props typings ([c7a9c09](https://bitbucket.org/atlassian/atlaskit/commits/c7a9c09))

## 5.4.5 (2017-10-23)
* bug fix; support false/null/undefined children in ButtonGroup ([4667228](https://bitbucket.org/atlassian/atlaskit/commits/4667228))

## 5.4.4 (2017-10-22)
* bug fix; update dependencies for react-16 ([077d1ad](https://bitbucket.org/atlassian/atlaskit/commits/077d1ad))

## 5.4.3 (2017-10-16)
* bug fix; fix issue where invalid box-shadow style was applied (issues closed: ak-3704) ([a786038](https://bitbucket.org/atlassian/atlaskit/commits/a786038))

## 5.4.2 (2017-10-03)
* bug fix; improve button performance ([1bbf0d1](https://bitbucket.org/atlassian/atlaskit/commits/1bbf0d1))

## 5.4.1 (2017-09-27)
* bug fix; button will truncate if wider than its parent (issues closed: ak-3332) ([a701ea1](https://bitbucket.org/atlassian/atlaskit/commits/a701ea1))

## 5.4.0 (2017-09-22)
* feature; buttons no longer prevent text selection (issues closed: ak-3270) ([9ab343b](https://bitbucket.org/atlassian/atlaskit/commits/9ab343b))

## 5.3.0 (2017-09-18)
* feature; support new Help button appearance (issues closed: ak-3535) ([69728ed](https://bitbucket.org/atlassian/atlaskit/commits/69728ed))

## 5.2.0 (2017-09-12)
* feature; we need the ability to reference elements ([cbf5c12](https://bitbucket.org/atlassian/atlaskit/commits/cbf5c12))

## 5.1.2 (2017-09-08)
* bug fix; adding ButtonGroup to type declarations of button pckage. ([bb373c1](https://bitbucket.org/atlassian/atlaskit/commits/bb373c1))

## 5.1.1 (2017-08-24)
* bug fix; improved focus ring contrast for warning and danger buttons ([39ddda7](https://bitbucket.org/atlassian/atlaskit/commits/39ddda7))

## 5.1.0 (2017-08-23)
* bug fix; subtle-link button font colour is slightly updated (issues closed: ak-2480) ([510393a](https://bitbucket.org/atlassian/atlaskit/commits/510393a))
* feature; added warning (yellow) and danger (red) options to Button.appearance prop (issues closed: ak-2480) ([ba4cfde](https://bitbucket.org/atlassian/atlaskit/commits/ba4cfde))

## 5.0.1 (2017-08-16)
* bug fix; fix react warning about PropTypes ([6b4cd29](https://bitbucket.org/atlassian/atlaskit/commits/6b4cd29))

## 5.0.0 (2017-08-11)
* bug fix; fix the theme-dependency ([db90333](https://bitbucket.org/atlassian/atlaskit/commits/db90333))
* bug fix; button: fix focus box shadow ([9746e73](https://bitbucket.org/atlassian/atlaskit/commits/9746e73))
* bug fix; button: fix dark link color - default / hover / active ([7b85a29](https://bitbucket.org/atlassian/atlaskit/commits/7b85a29))
* breaking; affects internal styled-components implementation ([d14522a](https://bitbucket.org/atlassian/atlaskit/commits/d14522a))
* breaking; implement dark mode theme ([d14522a](https://bitbucket.org/atlassian/atlaskit/commits/d14522a))
* feature; implement dark mode ([d959bb1](https://bitbucket.org/atlassian/atlaskit/commits/d959bb1))

## 4.0.0 (2017-08-11)
* bug fix; button: fix focus box shadow ([9746e73](https://bitbucket.org/atlassian/atlaskit/commits/9746e73))
* bug fix; button: fix dark link color - default / hover / active ([7b85a29](https://bitbucket.org/atlassian/atlaskit/commits/7b85a29))
* breaking; affects internal styled-components implementation ([d14522a](https://bitbucket.org/atlassian/atlaskit/commits/d14522a))
* breaking; implement dark mode theme ([d14522a](https://bitbucket.org/atlassian/atlaskit/commits/d14522a))
* feature; implement dark mode ([d959bb1](https://bitbucket.org/atlassian/atlaskit/commits/d959bb1))

## 3.6.0 (2017-08-09)
* feature; export ButtonGroup from button package (issues closed: ak-2382) ([61682c6](https://bitbucket.org/atlassian/atlaskit/commits/61682c6))

## 3.5.3 (2017-07-27)
* fix; rename jsnext:main to jsnext:experimental:main temporarily ([c7508e0](https://bitbucket.org/atlassian/atlaskit/commits/c7508e0))

## 3.5.2 (2017-07-25)
* fix; use class transform in loose mode in babel to improve load performance in apps ([fde719a](https://bitbucket.org/atlassian/atlaskit/commits/fde719a))

## 3.5.1 (2017-07-20)
* fix; return focus ring to buttons ([94f1ad0](https://bitbucket.org/atlassian/atlaskit/commits/94f1ad0))

## 3.2.0 (2017-07-17)
* fix; rerelease, failed prepublish scripts ([5fd82f8](https://bitbucket.org/atlassian/atlaskit/commits/5fd82f8))

## 3.2.0 (2017-07-17)
* feature; added ES module builds to dist and add jsnext:main to most ADG packages ([ea76507](https://bitbucket.org/atlassian/atlaskit/commits/ea76507))

## 3.1.0 (2017-07-10)
* feature; added functionality to have full-width buttons via optional prop ([ad7fae6](https://bitbucket.org/atlassian/atlaskit/commits/ad7fae6))

## 2.0.0 (2017-06-01)
* fix; add prop-types as a dependency to avoid React 15.x warnings ([92598eb](https://bitbucket.org/atlassian/atlaskit/commits/92598eb))
* refactored button to styled-components ([de6465b](https://bitbucket.org/atlassian/atlaskit/commits/de6465b))
* breaking; refactored to styled-components
* ISSUES CLOSED: AK-2381, AK-2300

## 1.1.4 (2017-05-25)
* fix; update util-shared-styles dependency in button ([159dd02](https://bitbucket.org/atlassian/atlaskit/commits/159dd02))

## 1.1.3 (2017-05-06)
* fix; link buttons with no spacing are now baseline aligned correctly ([66f5e65](https://bitbucket.org/atlassian/atlaskit/commits/66f5e65))

## 1.1.2 (2017-04-27)
* fix; update legal copy to be more clear. Not all modules include ADG license. ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

## 1.1.1 (2017-04-26)
* fix; update legal copy and fix broken links for component README on npm. New contribution and ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))

## 1.1.0 (2017-04-20)
* feature; removed explicit style! imports, set style-loader in webpack config ([891fc3c](https://bitbucket.org/atlassian/atlaskit/commits/891fc3c))

## 1.0.16 (2017-04-04)
* fix; adds defensive code to allow testing in mocha/jsdom ([3f9b72c](https://bitbucket.org/atlassian/atlaskit/commits/3f9b72c))

## 1.0.15 (2017-03-23)
* fix; Empty commit to release the component ([49c08ee](https://bitbucket.org/atlassian/atlaskit/commits/49c08ee))

## 1.0.13 (2017-03-21)
* fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))

## 1.0.11 (2017-03-08)
* fix; fix subtle-link button to use the correct color default color ([c4c274d](https://bitbucket.org/atlassian/atlaskit/commits/c4c274d))

## 1.0.10 (2017-02-28)
* fix; dummy commit to release stories ([3df5d9f](https://bitbucket.org/atlassian/atlaskit/commits/3df5d9f))

## 1.0.9 (2017-02-28)
* fix; dummy commit to fix broken stories and missing registry pages ([a31e92a](https://bitbucket.org/atlassian/atlaskit/commits/a31e92a))

## 1.0.8 (2017-02-28)
* fix; dummy commit to release stories for components ([a105c02](https://bitbucket.org/atlassian/atlaskit/commits/a105c02))

## 1.0.7 (2017-02-28)
* fix; Removes jsdoc annotations from button ([fe8e23b](https://bitbucket.org/atlassian/atlaskit/commits/fe8e23b))

## 1.0.6 (2017-02-24)
* fix; fixes AK-1787: buttons with z-index + shadow ([014af88](https://bitbucket.org/atlassian/atlaskit/commits/014af88))
* fix; spinner related tests fixed ([e6d8ad5](https://bitbucket.org/atlassian/atlaskit/commits/e6d8ad5))
* fix; storybook clean up and button margin fixed ([e06b9c5](https://bitbucket.org/atlassian/atlaskit/commits/e06b9c5))

## 1.0.5 (2017-02-20)
* fix; use correctly scoped package names in npm docs ([91dbd2f](https://bitbucket.org/atlassian/atlaskit/commits/91dbd2f))

## 1.0.4 (2017-02-16)
* fix; refactor stories to use // rather than http:// ([a0826cf](https://bitbucket.org/atlassian/atlaskit/commits/a0826cf))

## 1.0.3 (2017-02-09)
* fix; avoiding binding render to this ([40c9951](https://bitbucket.org/atlassian/atlaskit/commits/40c9951))

## 1.0.2 (2017-02-09)
* fix; readme refactor to use util-readme ([1adf905](https://bitbucket.org/atlassian/atlaskit/commits/1adf905))

## 1.0.1 (2017-02-06)
* fix; Updates package to use ak scoped packages ([1262016](https://bitbucket.org/atlassian/atlaskit/commits/1262016))
