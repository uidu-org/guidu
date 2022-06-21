# @uidu/layer

## 0.5.13

### Patch Changes

- 994b16edf: Bump deps

## 0.5.12

### Patch Changes

- 146ad48ee: Bump dependencies on react-intl

## 0.5.11

### Patch Changes

- b1420fb70: Bump dependencies and fix messages dep tree

## 0.5.10

### Patch Changes

- cc6a75b18: Bump dependencies

## 0.5.9

### Patch Changes

- f74b7be3f: Bump to react 18

## 0.5.8

### Patch Changes

- cced08c0d: You can now pass components to Table's row Actions

## 0.5.7

### Patch Changes

- 02edaec3f: Bump dependencies

## 0.5.6

### Patch Changes

- e07f8ed62: Add lang files to npm

## 0.5.5

### Patch Changes

- 43e526133: Bump babel dependencies

## 0.5.4

### Patch Changes

- b5453661d: Bump dependencies

## 0.5.3

### Patch Changes

- dc93d940c: Bump dependencies, publish all

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

## 0.2.0

### Minor Changes

- 30e4244: All core components are now built with preconstruct (rollup)

### Patch Changes

- 30e4244: Fix core packages build

## 0.1.16

### Patch Changes

- 335a6f2: Bump all components

## 0.1.15

### Patch Changes

- 017bded: Drop flow

## 0.1.14

### Patch Changes

- d8ec962: Restore layer dependencies
- Updated dependencies [fefb53f]
  - @uidu/docs@0.1.46

## 0.1.13

### Patch Changes

- 0f69b06: Fix yarnclean
- Updated dependencies [0f69b06]
  - @uidu/docs@0.1.45

## 0.1.12

### Patch Changes

- e41e9e9: Remove css interop from theme
- Updated dependencies [e41e9e9]
  - @uidu/docs@0.1.44

## 0.1.11

### Patch Changes

- 43566b7: Bump styled-components, bump all
- Updated dependencies [43566b7]
  - @uidu/docs@0.1.40

## 0.1.10

### Patch Changes

- 8f92964: Bump styled-components
- Updated dependencies [8f92964]
  - @uidu/docs@0.1.39

## 0.1.9

### Patch Changes

- b54640b: Move dataView logic outside data-manager

## 0.1.8

### Patch Changes

- 9e09850: Bump all packages
- ffffbbe: Update dependencies

- Updated dependencies [9e09850]
- Updated dependencies [ffffbbe]
  - @uidu/docs@0.1.34

## 0.1.7

### Patch Changes

- [patch][9663f6e](https://github.org/uidu-org/guidu/commits/9663f6e):

  Release all packages for bumping all dependencies, fixes for react lifecycle unsafe methods

## 0.1.6

- [patch][4a4aff7](https://github.org/uidu-org/guidu/commits/4a4aff7):

  - Better package json organization

## 0.1.5

- [patch][5ddb7dd](https://github.org/uidu-org/guidu/commits/5ddb7dd):

  - Better dashboard controls and dropdowns

## 0.1.4

- [patch][fd321d7](https://github.org/uidu-org/guidu/commits/fd321d7):

  - Removed unused dependencies

## 0.1.3

- [patch][def6207](https://github.org/uidu-org/guidu/commits/def6207):

  - Bump react-feather, fixes to Select, downshift and toggle

## 0.1.2

- [patch][e3fc364](https://github.org/uidu-org/guidu/commits/e3fc364):

  - Remove some tests, fix travis cache timeout, migrate accordion to typescript

## 0.1.1

- [patch][33713cc](https://github.org/uidu-org/guidu/commits/33713cc):

  - Release data-manager

- [patch][33713cc](https://github.org/uidu-org/guidu/commits/33713cc):

  - Added uidu/layer to fix popper warnings
