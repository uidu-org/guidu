# @atlaskit/analytics-namespaced-context

## 0.1.6

### Patch Changes

- e41e9e9: Remove css interop from theme
- Updated dependencies [e41e9e9]
  - @uidu/docs@0.1.44
  - @uidu/analytics@0.1.20
  - @uidu/analytics-listeners@0.1.5

## 0.1.5

### Patch Changes

- 27d5d26: Fix missing tsconfig paths
- Updated dependencies [27d5d26]
  - @uidu/analytics-listeners@0.1.4

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
  - @uidu/analytics-listeners@0.1.3

## 0.1.2

### Patch Changes

- 8c80bd5: Changed how tsc compiles, should be faster to build
- Updated dependencies [8c80bd5]
  - @uidu/analytics@0.1.16
  - @uidu/analytics-listeners@0.1.2

## 0.1.1

### Patch Changes

- 9e09850: Bump all packages
- ffffbbe: Update dependencies

- Updated dependencies [9e09850]
- Updated dependencies [ffffbbe]
  - @uidu/analytics@0.1.15
  - @uidu/docs@0.1.34
  - @uidu/analytics-listeners@0.1.1

## 4.1.7

### Patch Changes

- [patch][097b696613](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/097b696613):

  Components now depend on TS 3.6 internally, in order to fix an issue with TS resolving non-relative imports as relative imports

## 4.1.6

### Patch Changes

- [patch][ecca4d1dbb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ecca4d1dbb):

  Upgraded Typescript to 3.3.x

## 4.1.5

### Patch Changes

- [patch][926b43142b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/926b43142b):

  Analytics-next has been converted to Typescript. Typescript consumers will now get static type safety. Flow types are no longer provided. No behavioural changes.

  **Breaking changes**

  - `withAnalyticsForSumTypeProps` alias has been removed, please use `withAnalyticsEvents`
  - `AnalyticsContextWrappedComp` alias has been removed, please use `withAnalyticsContext`

  **Breaking changes to TypeScript annotations**

  - `withAnalyticsEvents` now infers proptypes automatically, consumers no longer need to provide props as a generic type.
  - `withAnalyticsContext` now infers proptypes automatically, consumers no longer need to provide props as a generic type.
  - Type `WithAnalyticsEventProps` has been renamed to `WithAnalyticsEventsProps` to match source code
  - Type `CreateUIAnalyticsEventSignature` has been renamed to `CreateUIAnalyticsEvent` to match source code
  - Type `UIAnalyticsEventHandlerSignature` has been renamed to `UIAnalyticsEventHandler` to match source code
  - Type `AnalyticsEventsPayload` has been renamed to `AnalyticsEventPayload`
  - Type `ObjectType` has been removed, please use `Record<string, any>` or `[key: string]: any`
  - Type `UIAnalyticsEventInterface` has been removed, please use `UIAnalyticsEvent`
  - Type `AnalyticsEventInterface` has been removed, please use `AnalyticsEvent`
  - Type `CreateAndFireEventFunction` removed and should now be inferred by TypeScript
  - Type `AnalyticsEventUpdater` removed and should now be inferred by TypeScript

## 4.1.4

### Patch Changes

- [patch][9f8ab1084b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9f8ab1084b):

  Consume analytics-next ts type definitions as an ambient declaration.

## 4.1.3

### Patch Changes

- [patch][bbff8a7d87](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bbff8a7d87):

  Fixes bug, missing version.json file

## 4.1.2

### Patch Changes

- [patch][18dfac7332](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/18dfac7332):

  In this PR, we are:

  - Re-introducing dist build folders
  - Adding back cjs
  - Replacing es5 by cjs and es2015 by esm
  - Creating folders at the root for entry-points
  - Removing the generation of the entry-points at the root
    Please see this [ticket](https://product-fabric.atlassian.net/browse/BUILDTOOLS-118) or this [page](https://hello.atlassian.net/wiki/spaces/FED/pages/452325500/Finishing+Atlaskit+multiple+entry+points) for further details

## 4.1.1

### Patch Changes

- [patch][d0db01b410](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d0db01b410):

  TypeScript users of withAnalyticsEvents and withAnalyticsContext are now required to provide props as a generic type. This is so that TypeScript can correctly calculate the props and defaultProps of the returned component.

  Before:

  ```typescript
  withAnalyticsEvents()(Button) as ComponentClass<Props>;
  ```

  After:

  ```typescript
  withAnalyticsEvents<Props>()(Button);
  ```

## 4.1.0

- [minor][f53003a5ed](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f53003a5ed):

  - ED-6741 Add 'appearance' to all editor analytics events

## 4.0.0

- [major][7c17b35107](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7c17b35107):

  - Updates react and react-dom peer dependencies to react@^16.8.0 and react-dom@^16.8.0. To use this package, please ensure you use at least this version of react and react-dom.

## 3.0.3

- [patch][0a4ccaafae](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0a4ccaafae):

  - Bump tslib

## 3.0.2

- [patch][3f28e6443c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3f28e6443c):

  - @uidu/analytics-types is deprecated. Now you can use types for @uidu/analytics supplied from itself.

## 3.0.1

- [patch][1bcaa1b991](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1bcaa1b991):

  - Add npmignore for index.ts to prevent some jest tests from resolving that instead of index.js

## 3.0.0

- [major][9d5cc39394](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d5cc39394):

  - Dropped ES5 distributables from the typescript packages

## 2.2.1

- Updated dependencies [76299208e6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/76299208e6):
  - @atlaskit/analytics-listeners@4.2.1
  - @uidu/docs@7.0.0
  - @uidu/analytics@4.0.0

## 2.2.0

- [minor][8c65a38bfc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8c65a38bfc):

  - enable noImplicitAny for elements analytics packages. Fix related issues.

## 2.1.5

- Updated dependencies [58b84fa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/58b84fa):
  - @uidu/analytics@3.1.2
  - @atlaskit/analytics-listeners@4.1.4
  - @uidu/docs@6.0.0

## 2.1.4

- [patch] Analytics event's 'source' field from GasPayload type is now optional. In most cases, the 'source' field is expected to be set by the integrator through AnalyticsContext. Thus it's recommended that components do not set it to avoid overriding the one provided by the integrating product. Analytics listeners are handling the case where the 'source' field couldn't be found by setting the default value "unknown" before sending the event through the client. [1c0ea95](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1c0ea95)

## 2.1.3

- [patch] fixed imports, docs and made GasPayload package attributes optional [6be5eed](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6be5eed)
- [patch] use createAndFire function from analytics-next [095f356](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/095f356)
- [patch] Fixed TS errors and code improvements [b290312](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b290312)
- [patch] enable analytics-next TDs on analytics-listeners and analytics-namespaced-context [e65f377](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e65f377)

## 2.1.2

- [patch] Updated dependencies [90ba6bd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/90ba6bd)
  - @atlaskit/analytics-listeners@4.0.0

## 2.1.1

- [patch] Updated dependencies [dfa100e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dfa100e)
  - @atlaskit/analytics-listeners@3.3.1

## 2.1.0

- [minor] Add NavigationContext component that provides context to events fired on the navigation channel [89225ce](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/89225ce)
- [patch] Updated dependencies [808b55b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/808b55b)
  - @atlaskit/analytics-listeners@3.2.0
- [none] Updated dependencies [89225ce](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/89225ce)
  - @atlaskit/analytics-listeners@3.2.0

## 2.0.3

- [patch] Fix es5 exports of some of the newer modules [3f0cd7d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3f0cd7d)
- [none] Updated dependencies [3f0cd7d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3f0cd7d)
  - @atlaskit/analytics-gas-types@3.1.3

## 2.0.2

- [patch] Updated dependencies [acd86a1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/acd86a1)
  - @atlaskit/button@9.0.4
  - @uidu/analytics@3.0.3
  - @uidu/docs@5.0.2
  - @atlaskit/analytics-gas-types@3.1.2

## 2.0.1

- [patch] fixes problem with modules not being exported [80e90ed](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/80e90ed)

## 2.0.0

- [major] Updates to React ^16.4.0 [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
- [major] Updated dependencies [563a7eb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/563a7eb)
  - @uidu/analytics@3.0.0
  - @atlaskit/button@9.0.0
  - @uidu/docs@5.0.0
  - @atlaskit/analytics-gas-types@3.0.0
- [major] Updated dependencies [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
  - @uidu/analytics@3.0.0
  - @atlaskit/button@9.0.0
  - @uidu/docs@5.0.0
  - @atlaskit/analytics-gas-types@3.0.0

## 1.0.3

- [patch] Move the tests under src and club the tests under unit, integration and visual regression [f1a9069](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f1a9069)
- [none] Updated dependencies [f1a9069](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f1a9069)
  - @atlaskit/analytics-gas-types@2.1.4

## 1.0.2

- [patch] Add missing dependencies to packages to get the website to build [9c32280](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9c32280)

* [none] Updated dependencies [99446e3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/99446e3)
  - @uidu/docs@4.2.2
* [none] Updated dependencies [9bac948](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9bac948)
  - @uidu/docs@4.2.2

## 1.0.1

- [patch] wrapper for analytics-next AnalyticsContext to add a namespace [91e5997](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/91e5997)
