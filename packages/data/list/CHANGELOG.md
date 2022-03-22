# @uidu/list

## 1.2.4

### Patch Changes

- cced08c0d: You can now pass components to Table's row Actions
- Updated dependencies [cced08c0d]
  - @uidu/data-fields@1.5.9

## 1.2.3

### Patch Changes

- 02edaec3f: Bump dependencies
- Updated dependencies [02edaec3f]
  - @uidu/data-fields@1.5.4

## 1.2.2

### Patch Changes

- e07f8ed62: Add lang files to npm
- Updated dependencies [e07f8ed62]
  - @uidu/data-fields@1.4.8

## 1.2.1

### Patch Changes

- 43e526133: Bump babel dependencies
- Updated dependencies [43e526133]
  - @uidu/data-fields@1.4.7

## 1.2.0

### Minor Changes

- 69fb1dc0d: Data-manager refactor away from render props pattern

  # Breaking Changes

  DataManager no longer accepts render props for the `children` prop. You should use these new components:

  - DataManagerControls
  - DataManagerView
  - DataManagerFooter

  Pagination is now included by default, it now splits items into pages client-side.

### Patch Changes

- Updated dependencies [69fb1dc0d]
  - @uidu/data-fields@1.4.6

## 1.1.4

### Patch Changes

- b5453661d: Bump dependencies
- Updated dependencies [b5453661d]
  - @uidu/data-fields@1.4.4

## 1.1.3

### Patch Changes

- dc93d940c: Bump dependencies, publish all
- Updated dependencies [dc93d940c]
  - @uidu/data-fields@1.4.1

## 1.1.2

### Patch Changes

- 85bc01ca1: Bump dependencies
- Updated dependencies [85bc01ca1]
  - @uidu/data-fields@1.2.3

## 1.1.1

### Patch Changes

- a797171e1: Bump dependencies
- Updated dependencies [a797171e1]
  - @uidu/data-fields@1.2.2

## 1.1.0

### Minor Changes

- 277aa3ab4: Bump data-fields

## 1.0.1

### Patch Changes

- beb3edb67: Select style updates, forwardRef to ShellBody
- Updated dependencies [beb3edb67]
  - @uidu/data-fields@1.0.3

## 1.0.0

### Major Changes

- e1af00303: uidu data packages drop bootstrap

### Patch Changes

- Updated dependencies [e1af00303]
  - @uidu/data-fields@1.0.0

## 0.3.0

### Minor Changes

- c5a9ffbf6: ## Forms to tailwind, use css variables where possible, refactor Button completely

  Button now is styleable from outside with tailwind or normal classNames. It's also possible to use css variables to style the button, and use variants to style the button.
  Removed bootstrap dependency locally, to understand how the uikit behaves in a less opinionated client.
  Bumped dependencies as well.

### Patch Changes

- Updated dependencies [c5a9ffbf6]
  - @uidu/data-fields@0.6.0

## 0.2.19

### Patch Changes

- e98319f67: Bump dependencies
- Updated dependencies [e98319f67]
  - @uidu/data-fields@0.5.20

## 0.2.18

### Patch Changes

- d4a62100d: Removed react-native dependencies
- Updated dependencies [d4a62100d]
  - @uidu/data-fields@0.5.18

## 0.2.17

### Patch Changes

- 3f355aa1c: Removed some css transitions and bump dependencies
- Updated dependencies [ca01a0f67]
- Updated dependencies [3f355aa1c]
  - @uidu/data-fields@0.5.16

## 0.2.16

### Patch Changes

- 355815581: Able to add fake data to dashboard manager dashlets, use @uidu/table inside Table dashlet, fix table styling (tailwind)
- Updated dependencies [355815581]
  - @uidu/data-fields@0.5.15

## 0.2.15

### Patch Changes

- a09ab80e9: Publish all packages
- Updated dependencies [a09ab80e9]
  - @uidu/data-fields@0.5.14

## 0.2.14

### Patch Changes

- 992c21388: Bump dependencies and migrate to yarn2
- Updated dependencies [992c21388]
  - @uidu/data-fields@0.5.13

## 0.2.13

### Patch Changes

- 559a68f: Added isPrivate fields and Gallery as display grid
- Updated dependencies [559a68f]
  - @uidu/data-fields@0.5.11

## 0.2.12

### Patch Changes

- bada352: Bump dependencies
- Updated dependencies [bada352]
  - @uidu/data-fields@0.5.9

## 0.2.11

### Patch Changes

- d3e2a60: Bump react-intl and other dependencies
- Updated dependencies [d3e2a60]
  - @uidu/data-fields@0.5.7

## 0.2.10

### Patch Changes

- 41b1690: Bump dependencies
- Updated dependencies [41b1690]
  - @uidu/data-fields@0.5.5

## 0.2.9

### Patch Changes

- 3bf1635: Fix list appearance in mobile version

## 0.2.8

### Patch Changes

- 53cc17b: Header navigation can now be passed more props, bumped react-intl and tslib to all packages
- Updated dependencies [53cc17b]
  - @uidu/data-fields@0.5.4

## 0.2.7

### Patch Changes

- ec6fdfd: Fix build, bump react-intl
- Updated dependencies [ec6fdfd]
  - @uidu/data-fields@0.5.3

## 0.2.6

### Patch Changes

- 66a32ff: Fix editor-core react-intl defaultmessage bug, Gallery view has now shadows on scroll"

## 0.2.5

### Patch Changes

- 0330b3d: Broken profilecard to fix broken webpack 5 atlaskit dependencies, now stripped out
- Updated dependencies [0330b3d]
  - @uidu/data-fields@0.5.2

## 0.2.4

### Patch Changes

- Updated dependencies [d3df8a4]
  - @uidu/data-fields@0.5.0

## 0.2.3

### Patch Changes

- 542b03a: Fix npmignore
- Updated dependencies [542b03a]
  - @uidu/data-fields@0.4.12

## 0.2.2

### Patch Changes

- 61561e3: npmignore to all packages
- Updated dependencies [61561e3]
  - @uidu/data-fields@0.4.11

## 0.2.1

### Patch Changes

- 8a049c8: Payments update to PaymentMethod and different naming
- Updated dependencies [8a049c8]
  - @uidu/data-fields@0.4.2

## 0.2.0

### Minor Changes

- db36adf: Updated preconstruct build

### Patch Changes

- Updated dependencies [db36adf]
  - @uidu/data-fields@0.4.0

## 0.1.44

### Patch Changes

- cb6768b: Bug fixing

## 0.1.43

### Patch Changes

- b8b0f2e: Data-controls style fixes, List now has headers and proper column rendering

## 0.1.42

### Patch Changes

- 6d9c54d: Style fixes for List

## 0.1.41

### Patch Changes

- 17226ce: Small fixes
- Updated dependencies [17226ce]
  - @uidu/data-fields@0.3.6

## 0.1.40

### Patch Changes

- 2080e56: Publish types properly and bump dependencies
- Updated dependencies [2080e56]
  - @uidu/data-fields@0.3.5

## 0.1.39

### Patch Changes

- 5c90166: Style fixes
- Updated dependencies [5c90166]
  - @uidu/data-fields@0.3.2

## 0.1.38

### Patch Changes

- 67d073d: Bump react version to 17
- Updated dependencies [67d073d]
  - @uidu/data-fields@0.3.1

## 0.1.39

### Patch Changes

- c3ed0b8: Handle cover and avatar
- Updated dependencies [c3ed0b8]
  - @uidu/data-fields@0.3.2

## 0.1.38

### Patch Changes

- 6b0a96a: Bump some dependencies for data-\* packages, perf some rendering with useCallback or useMemo
- Updated dependencies [6b0a96a]
  - @uidu/data-fields@0.3.1

## 0.1.37

### Patch Changes

- 948b48b: Data fields now contain renderers, moved out from table. Changed Field API
- Updated dependencies [948b48b]
  - @uidu/table@0.3.0

## 0.1.36

### Patch Changes

- b5f95b7: Removed colId, cleaning up data-manager WIP
- Updated dependencies [b5f95b7]
  - @uidu/table@0.2.8

## 0.1.35

### Patch Changes

- 48754d9: Small layout fixes to data
- Updated dependencies [48754d9]
  - @uidu/table@0.2.4

## 0.1.34

### Patch Changes

- 0412e7f: Better list view

## 0.1.33

### Patch Changes

- 8b4c8be: Use babel-runtime helpers
- Updated dependencies [9f3ffff]
  - @uidu/table@0.2.3

## 0.1.32

### Patch Changes

- c9cffa3: Data manager now uses a different layout, fix some grouping issues, added pagination to table, fixed gallery
- Updated dependencies [c9cffa3]
  - @uidu/table@0.2.1

## 0.1.31

### Patch Changes

- 35c8bfd: Drop ag-grid in favour of react-table, still WIP
- Updated dependencies [35c8bfd]
  - @uidu/table@0.2.0

## 0.1.30

### Patch Changes

- 12ae0e1: Bump dependencies and sort package json
- Updated dependencies [12ae0e1]
  - @uidu/table@0.1.119

## 0.1.29

### Patch Changes

- 4d06c6b: Bump all packages, now built with preconstruct
- Updated dependencies [4d06c6b]
  - @uidu/table@0.1.118

## 0.1.28

### Patch Changes

- ce58773: Try bump all packages
- Updated dependencies [ce58773]
  - @uidu/table@0.1.117

## 0.1.27

### Patch Changes

- e4db094: Tried preconstruct all forms elements
- Updated dependencies [e4db094]
  - @uidu/table@0.1.116

## 0.1.26

### Patch Changes

- ff7af9c: Bump dependencies
- Updated dependencies [ff7af9c]
  - @uidu/table@0.1.115

## 0.1.25

### Patch Changes

- 335a6f2: Bump all components
- Updated dependencies [335a6f2]
  - @uidu/table@0.1.111

## 0.1.24

### Patch Changes

- 2108758: Bump dependencies, fix some broken docs examples
- Updated dependencies [2108758]
  - @uidu/table@0.1.109

## 0.1.23

### Patch Changes

- 0f69b06: Fix yarnclean
- Updated dependencies [0f69b06]
  - @uidu/docs@0.1.45
  - @uidu/table@0.1.101

## 0.1.22

### Patch Changes

- e41e9e9: Remove css interop from theme
- Updated dependencies [e41e9e9]
  - @uidu/docs@0.1.44
  - @uidu/table@0.1.100

## 0.1.21

### Patch Changes

- 43566b7: Bump styled-components, bump all
- Updated dependencies [43566b7]
  - @uidu/docs@0.1.40
  - @uidu/table@0.1.91

## 0.1.20

### Patch Changes

- 8f92964: Bump styled-components
- Updated dependencies [8f92964]
  - @uidu/docs@0.1.39
  - @uidu/table@0.1.90

## 0.1.19

### Patch Changes

- 7bd5bbf: WIP #55 with finer toggler and gallery card preferences
- Updated dependencies [0abb7ac]
- Updated dependencies [7bd5bbf]
  - @uidu/table@0.1.89

## 0.1.18

### Patch Changes

- 3e00638: Minor fixes to gallery and list

## 0.1.17

### Patch Changes

- 6170c31: Squash some bugs in data, WIP #61: isolate components
- Updated dependencies [6170c31]
  - @uidu/table@0.1.75

## 0.1.16

### Patch Changes

- 8c80bd5: Changed how tsc compiles, should be faster to build
- Updated dependencies [8c80bd5]
  - @uidu/table@0.1.51

## 0.1.15

### Patch Changes

- 9e09850: Bump all packages
- ffffbbe: Update dependencies

- Updated dependencies [9e09850]
- Updated dependencies [ffffbbe]
  - @uidu/docs@0.1.34
  - @uidu/table@0.1.26

## 0.1.14

### Patch Changes

- b90aa9e: Fix table header and alignment

- Updated dependencies [b90aa9e]
  - @uidu/table@0.1.23

## 0.1.13

### Patch Changes

- 384bb60: Try again with uniform data layer

- Updated dependencies [384bb60]
- Updated dependencies [384bb60]
  - @uidu/table@0.1.22

## 0.1.12

### Patch Changes

- ffd1801: Bump all packages changed before changesets update

- Updated dependencies [ffd1801]
  - @uidu/table@0.1.21

## 0.1.11

### Patch Changes

- [patch][6e68a4d](https://github.org/uidu-org/guidu/commits/6e68a4d):

  Add debug for sorter

## 0.1.10

### Patch Changes

- [patch][212eefb](https://github.org/uidu-org/guidu/commits/212eefb):

  Reformat render item value

## 0.1.9

### Patch Changes

- [patch][0ca4f6a](https://github.org/uidu-org/guidu/commits/0ca4f6a):

  Intl data-controls, responsive views (list for mobile)

## 0.1.8

### Patch Changes

- [patch][9663f6e](https://github.org/uidu-org/guidu/commits/9663f6e):

  Release all packages for bumping all dependencies, fixes for react lifecycle unsafe methods

## 0.1.7

- [patch][affa7ad](https://github.org/uidu-org/guidu/commits/affa7ad):

  - Release all packages, unique tsconfig

## 0.1.6

- [patch][4a4aff7](https://github.org/uidu-org/guidu/commits/4a4aff7):

  - Better package json organization

## 0.1.5

- [patch][f9bf957](https://github.org/uidu-org/guidu/commits/f9bf957):

  - Bump dependencies

## 0.1.4

- [patch][8e96367](https://github.org/uidu-org/guidu/commits/8e96367):

  - Added onItemClick and some styling fixes (with classes)

- [patch][68b0979](https://github.org/uidu-org/guidu/commits/68b0979):

  - No default styling for calendar"

## 0.1.3

- [patch][613df8d](https://github.org/uidu-org/guidu/commits/613df8d):

  - Added cover column, updated axios

## 0.1.2

- [patch][39654c0](https://github.org/uidu-org/guidu/commits/39654c0):

  - Removed console.log

- [patch][26c0af6](https://github.org/uidu-org/guidu/commits/26c0af6):

  - Added gutterSize to list as well

## 0.1.1

- [patch][33713cc](https://github.org/uidu-org/guidu/commits/33713cc):

  - Release data-manager
