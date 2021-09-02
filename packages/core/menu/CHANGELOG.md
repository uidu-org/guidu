# @uidu/menu

## 0.5.2

### Patch Changes

- beb3edb67: Select style updates, forwardRef to ShellBody
- Updated dependencies [beb3edb67]
  - @uidu/theme@0.6.1

## 0.5.1

### Patch Changes

- 4e1595620: Fix form section spacings, fieldDownshift preset tailwind update, focus ring on fields

## 0.5.0

### Minor Changes

- c5a9ffbf6: ## Forms to tailwind, use css variables where possible, refactor Button completely

  Button now is styleable from outside with tailwind or normal classNames. It's also possible to use css variables to style the button, and use variants to style the button.
  Removed bootstrap dependency locally, to understand how the uikit behaves in a less opinionated client.
  Bumped dependencies as well.

### Patch Changes

- Updated dependencies [c5a9ffbf6]
  - @uidu/theme@0.6.0

## 0.4.16

### Patch Changes

- e98319f67: Bump dependencies
- Updated dependencies [e98319f67]
  - @uidu/theme@0.5.15

## 0.4.15

### Patch Changes

- d4a62100d: Removed react-native dependencies
- Updated dependencies [d4a62100d]
  - @uidu/theme@0.5.14

## 0.4.14

### Patch Changes

- 355815581: Able to add fake data to dashboard manager dashlets, use @uidu/table inside Table dashlet, fix table styling (tailwind)
- Updated dependencies [355815581]
  - @uidu/theme@0.5.13

## 0.4.13

### Patch Changes

- a09ab80e9: Publish all packages
- Updated dependencies [a09ab80e9]
  - @uidu/theme@0.5.12

## 0.4.12

### Patch Changes

- 992c21388: Bump dependencies and migrate to yarn2
- Updated dependencies [992c21388]
  - @uidu/theme@0.5.11

## 0.4.11

### Patch Changes

- bada352: Bump dependencies
- Updated dependencies [bada352]
  - @uidu/theme@0.5.10

## 0.4.10

### Patch Changes

- d3e2a60: Bump react-intl and other dependencies
- Updated dependencies [d3e2a60]
  - @uidu/theme@0.5.9

## 0.4.9

### Patch Changes

- 41b1690: Bump dependencies
- Updated dependencies [41b1690]
  - @uidu/theme@0.5.8

## 0.4.8

### Patch Changes

- 53cc17b: Header navigation can now be passed more props, bumped react-intl and tslib to all packages
- Updated dependencies [53cc17b]
  - @uidu/theme@0.5.7

## 0.4.7

### Patch Changes

- 3aa1e19: Better animated menu and dropdown, added routeritem to @uidu/menu
- ec6fdfd: Fix build, bump react-intl
- Updated dependencies [ec6fdfd]
  - @uidu/theme@0.5.6

## 0.4.6

### Patch Changes

- 0330b3d: Broken profilecard to fix broken webpack 5 atlaskit dependencies, now stripped out
- Updated dependencies [0330b3d]
  - @uidu/theme@0.5.5

## 0.4.5

### Patch Changes

- 542b03a: Fix npmignore
- Updated dependencies [542b03a]
  - @uidu/theme@0.5.4

## 0.4.4

### Patch Changes

- 61561e3: npmignore to all packages
- Updated dependencies [61561e3]
  - @uidu/theme@0.5.3

## 0.4.3

### Patch Changes

- 4f05b19: Fix RecurringPayment

## 0.4.2

### Patch Changes

- 8a049c8: Payments update to PaymentMethod and different naming
- Updated dependencies [8a049c8]
  - @uidu/theme@0.5.2

## 0.4.1

### Patch Changes

- 5e821c6: Fix build
- Updated dependencies [5e821c6]
  - @uidu/theme@0.5.1

## 0.4.0

### Minor Changes

- db36adf: Updated preconstruct build

### Patch Changes

- Updated dependencies [db36adf]
  - @uidu/theme@0.5.0

## 0.3.12

### Patch Changes

- e21bf74: Bump dependencies, style fixes
- Updated dependencies [e21bf74]
  - @uidu/theme@0.4.11

## 0.3.11

### Patch Changes

- 6697810: Fix emotion core react jsx pragma
- Updated dependencies [6697810]
  - @uidu/theme@0.4.9

## 0.3.10

### Patch Changes

- 2080e56: Publish types properly and bump dependencies
- Updated dependencies [2080e56]
  - @uidu/theme@0.4.8

## 0.3.9

### Patch Changes

- 67d073d: Bump react version to 17
- Updated dependencies [67d073d]
  - @uidu/theme@0.4.7

## 0.3.8

### Patch Changes

- 948b48b: Data fields now contain renderers, moved out from table. Changed Field API
- Updated dependencies [948b48b]
  - @uidu/theme@0.4.6

## 0.3.7

### Patch Changes

- 8b4c8be: Use babel-runtime helpers
- Updated dependencies [8b4c8be]
  - @uidu/theme@0.4.5

## 0.3.6

### Patch Changes

- fabc5c1: Small fixes for (maybe) better build

## 0.3.5

### Patch Changes

- 4d06c6b: Bump all packages, now built with preconstruct
- Updated dependencies [4d06c6b]
  - @uidu/theme@0.4.4

## 0.3.4

### Patch Changes

- ce58773: Try bump all packages
- Updated dependencies [ce58773]
  - @uidu/theme@0.4.3

## 0.3.3

### Patch Changes

- e4db094: Tried preconstruct all forms elements
- e4db094: Try rebuild with new preconstruct version
- Updated dependencies [e4db094]
- Updated dependencies [e4db094]
  - @uidu/theme@0.4.2

## 0.3.2

### Patch Changes

- ff7af9c: Bump dependencies
- Updated dependencies [ff7af9c]
  - @uidu/theme@0.4.1

## 0.3.1

### Patch Changes

- f6490ed: Bump dependencies for navigation to be built with preconstruct

## 0.3.0

### Minor Changes

- 7cd4d7c: Shell is now more flexible than ever

  ### Breaking changes

  - ShellBody was intended as a scrollable container, now, instead of <ShellBody scrollable></ShellBody> you should use <ScrollableContainer />
  - Shell components did change name and functionality. Look at documentation on how to use them

### Patch Changes

- Updated dependencies [7cd4d7c]
  - @uidu/theme@0.4.0

## 0.2.1

### Patch Changes

- 0ccd041: Remove tsconfig build
- Updated dependencies [0ccd041]
  - @uidu/theme@0.3.3

## 0.2.0

### Minor Changes

- 30e4244: All core components are now built with preconstruct (rollup)

### Patch Changes

- 30e4244: Fix core packages build
- Updated dependencies [30e4244]
  - @uidu/theme@0.3.2

## 0.1.1

### Patch Changes

- 335a6f2: Bump all components
- 7e701de: Sort packages
- 335a6f2: Bump dependencies
