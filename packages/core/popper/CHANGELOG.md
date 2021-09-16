# @uidu/popper

## 0.5.2

### Patch Changes

- a797171e1: Bump dependencies

## 0.5.1

### Patch Changes

- beb3edb67: Select style updates, forwardRef to ShellBody

## 0.5.0

### Minor Changes

- c5a9ffbf6: ## Forms to tailwind, use css variables where possible, refactor Button completely

  Button now is styleable from outside with tailwind or normal classNames. It's also possible to use css variables to style the button, and use variants to style the button.
  Removed bootstrap dependency locally, to understand how the uikit behaves in a less opinionated client.
  Bumped dependencies as well.

## 0.4.14

### Patch Changes

- e98319f67: Bump dependencies

## 0.4.13

### Patch Changes

- d4a62100d: Removed react-native dependencies

## 0.4.12

### Patch Changes

- 355815581: Able to add fake data to dashboard manager dashlets, use @uidu/table inside Table dashlet, fix table styling (tailwind)

## 0.4.11

### Patch Changes

- a09ab80e9: Publish all packages

## 0.4.10

### Patch Changes

- 992c21388: Bump dependencies and migrate to yarn2

## 0.4.9

### Patch Changes

- bada352: Bump dependencies

## 0.4.8

### Patch Changes

- d3e2a60: Bump react-intl and other dependencies

## 0.4.7

### Patch Changes

- 41b1690: Bump dependencies

## 0.4.6

### Patch Changes

- 53cc17b: Header navigation can now be passed more props, bumped react-intl and tslib to all packages

## 0.4.5

### Patch Changes

- ec6fdfd: Fix build, bump react-intl

## 0.4.4

### Patch Changes

- 0330b3d: Broken profilecard to fix broken webpack 5 atlaskit dependencies, now stripped out

## 0.4.3

### Patch Changes

- 542b03a: Fix npmignore

## 0.4.2

### Patch Changes

- 61561e3: npmignore to all packages

## 0.4.1

### Patch Changes

- 8a049c8: Payments update to PaymentMethod and different naming

## 0.4.0

### Minor Changes

- db36adf: Updated preconstruct build

## 0.3.8

### Patch Changes

- 2080e56: Publish types properly and bump dependencies

## 0.3.7

### Patch Changes

- 67d073d: Bump react version to 17

## 0.3.6

### Patch Changes

- 948b48b: Data fields now contain renderers, moved out from table. Changed Field API

## 0.3.5

### Patch Changes

- 8b4c8be: Use babel-runtime helpers

## 0.3.4

### Patch Changes

- 4d06c6b: Bump all packages, now built with preconstruct

## 0.3.3

### Patch Changes

- ce58773: Try bump all packages

## 0.3.2

### Patch Changes

- e4db094: Tried preconstruct all forms elements
- e4db094: Try rebuild with new preconstruct version

## 0.3.1

### Patch Changes

- ff7af9c: Bump dependencies

## 0.3.0

### Minor Changes

- 7cd4d7c: Shell is now more flexible than ever

  ### Breaking changes

  - ShellBody was intended as a scrollable container, now, instead of <ShellBody scrollable></ShellBody> you should use <ScrollableContainer />
  - Shell components did change name and functionality. Look at documentation on how to use them

## 0.2.1

### Patch Changes

- 0ccd041: Remove tsconfig build
- 2b445b6: Try to fix popper build

## 0.2.0

### Minor Changes

- 30e4244: All core components are now built with preconstruct (rollup)

### Patch Changes

- 30e4244: Fix core packages build

## 0.1.23

### Patch Changes

- 335a6f2: Bump all components
- 335a6f2: Bump dependendies and cleanup

## 0.1.22

### Patch Changes

- bbbb87e: Small ui fixes

## 0.1.21

### Patch Changes

- fefb53f: Bump popper for tooltip, not for layers
- Updated dependencies [fefb53f]
  - @uidu/docs@0.1.46

## 0.1.20

### Patch Changes

- 0f69b06: Fix yarnclean
- Updated dependencies [0f69b06]
  - @uidu/docs@0.1.45
  - @uidu/button@0.1.58
  - @uidu/theme@0.2.4

## 0.1.19

### Patch Changes

- e41e9e9: Remove css interop from theme
- Updated dependencies [e41e9e9]
  - @uidu/docs@0.1.44
  - @uidu/button@0.1.57
  - @uidu/theme@0.2.3

## 0.1.18

### Patch Changes

- d9f506a: Lots on dashlet docs and reasoning

## 0.1.17

### Patch Changes

- Updated dependencies [ef3e4c4]
  - @uidu/theme@0.2.0
  - @uidu/docs@0.1.41
  - @uidu/button@0.1.51

## 0.1.16

### Patch Changes

- 43566b7: Bump styled-components, bump all
- Updated dependencies [43566b7]
  - @uidu/button@0.1.50
  - @uidu/docs@0.1.40
  - @uidu/theme@0.1.20

## 0.1.15

### Patch Changes

- 8f92964: Bump styled-components
- Updated dependencies [8f92964]
  - @uidu/button@0.1.49
  - @uidu/docs@0.1.39
  - @uidu/theme@0.1.19

## 0.1.14

### Patch Changes

- 0b23379: Bump dependencies
- Updated dependencies [0b23379]
  - @uidu/docs@0.1.38

## 0.1.13

### Patch Changes

- 8c80bd5: Changed how tsc compiles, should be faster to build
- Updated dependencies [8c80bd5]
  - @uidu/button@0.1.48

## 0.1.12

### Patch Changes

- 301d188: Changed how columns should be defined in data-manager

## 0.1.11

### Patch Changes

- 9e09850: Bump all packages
- ffffbbe: Update dependencies

- Updated dependencies [9e09850]
- Updated dependencies [9e09850]
- Updated dependencies [9e09850]
- Updated dependencies [ffffbbe]
  - @uidu/button@0.1.46
  - @uidu/docs@0.1.34
  - @uidu/theme@0.1.18

## 0.1.10

### Patch Changes

- [patch][9663f6e](https://github.org/uidu-org/guidu/commits/9663f6e):

  Release all packages for bumping all dependencies, fixes for react lifecycle unsafe methods- [patch][9663f6e](https://github.org/uidu-org/guidu/commits/9663f6e):

  FIX in theme and dependencies

## 0.1.9

- [patch][4a4aff7](https://github.org/uidu-org/guidu/commits/4a4aff7):

  - Better package json organization

## 0.1.8

- [patch][fd321d7](https://github.org/uidu-org/guidu/commits/fd321d7):

  - Removed unused dependencies

## 0.1.7

- [patch][def6207](https://github.org/uidu-org/guidu/commits/def6207):

  - Bump react-feather, fixes to Select, downshift and toggle

## 0.1.6

- [patch][e3fc364](https://github.org/uidu-org/guidu/commits/e3fc364):

  - Remove some tests, fix travis cache timeout, migrate accordion to typescript

- [patch][e3fc364](https://github.org/uidu-org/guidu/commits/e3fc364):

  - Bump packages, remove some dependencies, better media-card types"

## 0.1.5

- [patch][93d4c6e](https://github.org/uidu-org/guidu/commits/93d4c6e):

  - Drop CJS from builds, release all packages to update references both in dev and production

## 0.1.4

- [patch][31cf37a](https://github.org/uidu-org/guidu/commits/31cf37a):

  - Release all packages again

- [patch][7200672](https://github.org/uidu-org/guidu/commits/7200672):

  - Release all

## 0.1.3

- [patch][0d12731](https://github.org/uidu-org/guidu/commits/0d12731):

  - Release all packages

- [patch][0d12731](https://github.org/uidu-org/guidu/commits/0d12731):

  - Remove dist files from repo

- [patch][0d12731](https://github.org/uidu-org/guidu/commits/0d12731):

  - Build and publish all packages

- [patch][0d12731](https://github.org/uidu-org/guidu/commits/0d12731):

  - Release all packages to fix those with previuos failed builds

## 0.1.2

- [patch] :

  - Big component rewrite, fix bolt dev environmnet"

## 0.1.1

- [patch] :

  - Publish media components, added message 0.1.0
