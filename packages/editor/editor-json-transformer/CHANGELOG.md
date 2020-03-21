# @uidu/editor-json-transformer

## 0.1.8

### Patch Changes

- 0f69b06: Fix yarnclean
- Updated dependencies [0f69b06]
  - @uidu/docs@0.1.45
  - @uidu/adf-schema@0.1.7
  - @uidu/editor-common@0.1.16
  - @uidu/editor-core@0.1.30

## 0.1.7

### Patch Changes

- e41e9e9: Remove css interop from theme
- Updated dependencies [e41e9e9]
  - @uidu/docs@0.1.44
  - @uidu/adf-schema@0.1.6
  - @uidu/editor-common@0.1.15
  - @uidu/editor-core@0.1.29

## 0.1.6

### Patch Changes

- 27d5d26: Fix missing tsconfig paths

## 0.1.5

### Patch Changes

- d9f506a: Lots on dashlet docs and reasoning
- Updated dependencies [d9f506a]
  - @uidu/adf-schema@0.1.5
  - @uidu/editor-common@0.1.14
  - @uidu/editor-core@0.1.25

## 0.1.4

### Patch Changes

- 43566b7: Bump styled-components, bump all
- Updated dependencies [43566b7]
  - @uidu/editor-common@0.1.11
  - @uidu/docs@0.1.40
  - @uidu/adf-schema@0.1.4
  - @uidu/editor-core@0.1.22

## 0.1.3

### Patch Changes

- 8f92964: Bump styled-components
- Updated dependencies [8f92964]
  - @uidu/docs@0.1.39
  - @uidu/editor-common@0.1.10

## 0.1.2

### Patch Changes

- 8c80bd5: Changed how tsc compiles, should be faster to build
- Updated dependencies [8c80bd5]
  - @uidu/adf-schema@0.1.2
  - @uidu/editor-common@0.1.9
  - @uidu/editor-core@0.1.19

## 0.1.1

### Patch Changes

- 9e09850: Bump all packages
- ffffbbe: Update dependencies

- Updated dependencies [9e09850]
- Updated dependencies [ffffbbe]
  - @uidu/docs@0.1.34
  - @uidu/adf-schema@0.1.1
  - @uidu/editor-common@0.1.8
  - @uidu/editor-core@0.1.12

## 6.3.3

- Updated dependencies [1194ad5eb3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1194ad5eb3):
- Updated dependencies [166eb02474](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/166eb02474):
- Updated dependencies [80adfefba2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/80adfefba2):
  - @uidu/editor-common@41.0.0
  - @uidu/editor-core@113.0.0
  - @uidu/editor-test-helpers@10.0.0
  - @uidu/adf-schema@4.0.0

## 6.3.2

- Updated dependencies [08ec269915](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/08ec269915):
  - @uidu/editor-core@112.44.2
  - @uidu/editor-test-helpers@9.11.13
  - @uidu/editor-common@40.0.0

## 6.3.1

### Patch Changes

- [patch][097b696613](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/097b696613):

  Components now depend on TS 3.6 internally, in order to fix an issue with TS resolving non-relative imports as relative imports

## 6.3.0

### Minor Changes

- [minor][66c5c88f4a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/66c5c88f4a):

  Refactor emoji to use typeahead plugin

## 6.2.4

### Patch Changes

- [patch][f34776be97](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f34776be97):

  Type definition files are now referenced in package.json

## 6.2.3

- Updated dependencies [6164bc2629](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6164bc2629):
  - @uidu/editor-core@112.39.5
  - @uidu/editor-test-helpers@9.11.3
  - @uidu/adf-schema@3.0.0
  - @uidu/editor-common@39.17.0

## 6.2.2

### Patch Changes

- [patch][bbff8a7d87](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bbff8a7d87):

  Fixes bug, missing version.json file

## 6.2.1

### Patch Changes

- [patch][18dfac7332](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/18dfac7332):

  In this PR, we are:

  - Re-introducing dist build folders
  - Adding back cjs
  - Replacing es5 by cjs and es2015 by esm
  - Creating folders at the root for entry-points
  - Removing the generation of the entry-points at the root
    Please see this [ticket](https://product-fabric.atlassian.net/browse/BUILDTOOLS-118) or this [page](https://hello.atlassian.net/wiki/spaces/FED/pages/452325500/Finishing+Atlaskit+multiple+entry+points) for further details

## 6.2.0

### Minor Changes

- [minor][634bf920a8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/634bf920a8):

  Expose es5 build for json transformer

## 6.1.0

- [minor][79f0ef0601](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/79f0ef0601):

  - Use strict tsconfig to compile editor packages

## 6.0.2

- Updated dependencies [5e4ff01e4c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5e4ff01e4c):
  - @uidu/editor-test-helpers@9.1.4
  - @uidu/editor-core@112.0.0

## 6.0.1

- Updated dependencies [154372926b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/154372926b):
  - @uidu/editor-test-helpers@9.1.2
  - @uidu/editor-core@111.0.0

## 6.0.0

- [major][7c17b35107](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7c17b35107):

  - Updates react and react-dom peer dependencies to react@^16.8.0 and react-dom@^16.8.0. To use this package, please ensure you use at least this version of react and react-dom.

## 5.0.4

- Updated dependencies [a1192ef860](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a1192ef860):
  - @uidu/editor-common@38.0.0
  - @uidu/editor-core@109.0.0
  - @uidu/editor-test-helpers@8.0.8
  - @atlaskit/util-data-test@11.1.9

## 5.0.3

- Updated dependencies [e7292ab444](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7292ab444):
  - @uidu/editor-common@37.0.0
  - @uidu/editor-core@108.0.0
  - @uidu/editor-test-helpers@8.0.7
  - @atlaskit/util-data-test@11.1.8

## 5.0.2

- Updated dependencies [c2c36de22b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c2c36de22b):
  - @uidu/editor-common@36.0.0
  - @uidu/editor-core@107.0.0
  - @uidu/editor-test-helpers@8.0.3
  - @atlaskit/util-data-test@11.1.5

## 5.0.1

- [patch][1bcaa1b991](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1bcaa1b991):

  - Add npmignore for index.ts to prevent some jest tests from resolving that instead of index.js

## 5.0.0

- [major][9d5cc39394](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d5cc39394):

  - Dropped ES5 distributables from the typescript packages

## 4.3.5

- Updated dependencies [7ab3e93996](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7ab3e93996):
  - @uidu/editor-common@34.0.0
  - @uidu/editor-core@105.0.0
  - @uidu/editor-test-helpers@7.0.6
  - @atlaskit/util-data-test@10.2.5

## 4.3.4

- Updated dependencies [4d17df92f8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4d17df92f8):
  - @uidu/editor-test-helpers@7.0.5
  - @uidu/editor-core@104.0.0

## 4.3.3

- Updated dependencies [76299208e6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/76299208e6):
  - @uidu/editor-core@103.0.3
  - @atlaskit/util-data-test@10.2.3
  - @uidu/editor-common@33.0.3
  - @uidu/docs@7.0.0

## 4.3.2

- Updated dependencies [60f0ad9a7e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/60f0ad9a7e):
  - @uidu/editor-core@103.0.0
  - @uidu/editor-test-helpers@7.0.4

## 4.3.1

- Updated dependencies [4aee5f3cec](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4aee5f3cec):
  - @uidu/editor-common@33.0.0
  - @uidu/editor-core@102.0.0
  - @uidu/editor-test-helpers@7.0.2
  - @atlaskit/util-data-test@10.2.2

## 4.3.0

- [minor][1eb20bca95](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1eb20bca95):

  - ED-6368: No implicit any for editor-\*-transformer packages

## 4.2.0

- [minor][7697e275b0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7697e275b0):

  - Expose the possibility of encoding a single node

## 4.1.12

- Updated dependencies [4a84fc40e0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4a84fc40e0):
  - @uidu/editor-test-helpers@7.0.1
  - @uidu/editor-core@101.0.0

## 4.1.11

- Updated dependencies [4af5bd2a58](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4af5bd2a58):
  - @uidu/adf-schema@1.5.4
  - @uidu/editor-common@32.0.2
  - @uidu/editor-core@100.0.0
  - @uidu/editor-test-helpers@7.0.0

## 4.1.10

- Updated dependencies [fc6164c8c2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fc6164c8c2):
  - @uidu/editor-common@32.0.0
  - @uidu/editor-core@99.0.0
  - @uidu/editor-test-helpers@6.3.22
  - @atlaskit/util-data-test@10.2.1

## 4.1.9

- [patch][557a2b5734](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/557a2b5734):

  - ED-5788: bump prosemirror-view and prosemirror-model

## 4.1.8

- Updated dependencies [69c8d0c19c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/69c8d0c19c):
  - @uidu/editor-common@31.0.0
  - @uidu/editor-core@98.0.0
  - @uidu/editor-test-helpers@6.3.17
  - @atlaskit/util-data-test@10.0.36

## 4.1.7

- Updated dependencies [85d5d168fd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/85d5d168fd):
  - @uidu/editor-common@30.0.0
  - @uidu/editor-core@97.0.0
  - @uidu/editor-test-helpers@6.3.12
  - @atlaskit/util-data-test@10.0.34

## 4.1.6

- Updated dependencies [dadef80](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dadef80):
  - @uidu/editor-common@29.0.0
  - @uidu/editor-core@96.0.0
  - @uidu/editor-test-helpers@6.3.11
  - @atlaskit/util-data-test@10.0.33

## 4.1.5

- Updated dependencies [0c116d6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0c116d6):
  - @uidu/editor-test-helpers@6.3.8
  - @uidu/editor-common@28.0.2
  - @atlaskit/util-data-test@10.0.32
  - @uidu/editor-core@95.0.0

## 4.1.4

- Updated dependencies [cbb8cb5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cbb8cb5):
  - @uidu/editor-common@28.0.0
  - @uidu/editor-core@94.0.0
  - @uidu/editor-test-helpers@6.3.7
  - @atlaskit/util-data-test@10.0.31

## 4.1.3

- Updated dependencies [72d37fb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/72d37fb):
  - @uidu/editor-common@27.0.0
  - @uidu/editor-core@93.0.0
  - @uidu/editor-test-helpers@6.3.6
  - @atlaskit/util-data-test@10.0.30

## 4.1.2

- Updated dependencies [e858305](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e858305):
  - @uidu/editor-test-helpers@6.3.5
  - @uidu/editor-common@26.0.0
  - @uidu/editor-core@92.0.19

## 4.1.1

- Updated dependencies [b3738ea](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b3738ea):
  - @uidu/editor-common@25.0.0
  - @uidu/editor-core@92.0.0
  - @uidu/editor-test-helpers@6.3.4
  - @atlaskit/util-data-test@10.0.28

## 4.1.0

- [minor][1205725](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1205725):

  - Move schema to its own package

## 4.0.25

- Updated dependencies [80f765b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/80f765b):
  - @uidu/editor-common@23.0.0
  - @uidu/editor-core@91.0.0
  - @uidu/editor-test-helpers@6.3.2
  - @atlaskit/util-data-test@10.0.26

## 4.0.24

- Updated dependencies [58b84fa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/58b84fa):
  - @uidu/editor-core@90.3.15
  - @atlaskit/util-data-test@10.0.25
  - @uidu/docs@6.0.0

## 4.0.23

- Updated dependencies [3a7224a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3a7224a):
  - @uidu/editor-test-helpers@6.2.23
  - @uidu/editor-core@90.0.0

## 4.0.22

- Updated dependencies [7e8b4b9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7e8b4b9):
  - @uidu/editor-common@22.0.0
  - @uidu/editor-core@89.0.0
  - @uidu/editor-test-helpers@6.2.19
  - @atlaskit/util-data-test@10.0.21

## 4.0.21

- Updated dependencies [2c21466](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2c21466):
  - @uidu/editor-common@21.0.0
  - @uidu/editor-core@88.0.0
  - @uidu/editor-test-helpers@6.2.16
  - @atlaskit/util-data-test@10.0.20

## 4.0.20

- [patch] Wrap invalid node with unsupported node [fb60e39](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fb60e39)

## 4.0.19

- [patch] Updated dependencies [052ce89](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/052ce89)
  - @uidu/editor-test-helpers@6.2.8
  - @uidu/editor-core@87.0.0
  - @uidu/editor-common@20.1.2

## 4.0.18

- [patch] Updated dependencies [b1ce691](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b1ce691)
  - @uidu/editor-common@20.0.0
  - @uidu/editor-core@86.0.0
  - @uidu/editor-test-helpers@6.2.7
  - @atlaskit/util-data-test@10.0.16

## 4.0.17

- [patch] Updated dependencies [2afa60d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2afa60d)
  - @uidu/editor-common@19.0.0
  - @uidu/editor-core@85.0.0
  - @uidu/editor-test-helpers@6.2.6
  - @atlaskit/util-data-test@10.0.14

## 4.0.16

- [patch] Updated dependencies [8b2c4d3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8b2c4d3)
- [patch] Updated dependencies [3302d51](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3302d51)
  - @uidu/editor-common@18.0.0
  - @uidu/editor-core@84.0.0
  - @uidu/editor-test-helpers@6.2.5
  - @atlaskit/util-data-test@10.0.12

## 4.0.15

- [patch] Updated dependencies [23c7eca](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/23c7eca)
  - @uidu/editor-test-helpers@6.2.4
  - @atlaskit/util-data-test@10.0.11
  - @uidu/editor-core@83.0.0

## 4.0.14

- [patch] ED-5313 add width to mediaSingle [3f8c0ee](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3f8c0ee)

## 4.0.13

- [patch] Updated dependencies [ef76f1f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ef76f1f)
  - @uidu/editor-common@17.0.1
  - @uidu/editor-core@82.0.0
  - @uidu/editor-test-helpers@6.1.3

## 4.0.12

- [patch] Updated dependencies [927ae63](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/927ae63)
  - @uidu/editor-common@17.0.0
  - @uidu/editor-core@81.0.0
  - @atlaskit/util-data-test@10.0.10
  - @uidu/editor-test-helpers@6.1.2

## 4.0.11

- [patch] Updated dependencies [6e1d642](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6e1d642)
  - @uidu/editor-common@16.0.0
  - @uidu/editor-core@80.0.0
  - @uidu/editor-test-helpers@6.0.9
  - @atlaskit/util-data-test@10.0.9

## 4.0.10

- [patch] Update TS to 3.0 [f68d367](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f68d367)
- [none] Updated dependencies [f68d367](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f68d367)
  - @uidu/editor-common@15.0.7
  - @uidu/editor-test-helpers@6.0.8
  - @uidu/editor-core@79.0.12

## 4.0.9

- [patch] ED-5270 Headings now always have a content attribute, even if empty [87a7506](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/87a7506)

## 4.0.8

- [patch] Updated dependencies [7545979](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7545979)
  - @uidu/editor-common@15.0.0
  - @uidu/editor-core@79.0.0
  - @uidu/editor-test-helpers@6.0.6
  - @atlaskit/util-data-test@10.0.8

## 4.0.7

- [patch] Updated dependencies [911a570](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/911a570)
  - @uidu/editor-test-helpers@6.0.5
  - @uidu/editor-core@78.0.0

## 4.0.6

- [patch] Updated dependencies [b12f7e6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b12f7e6)
  - @atlaskit/util-data-test@10.0.7
  - @uidu/editor-common@14.0.11
  - @uidu/editor-test-helpers@6.0.3
  - @uidu/editor-core@77.1.4

## 4.0.5

- [patch] ED-5180: fix table columns collapse [2e0e5a1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2e0e5a1)
- [none] Updated dependencies [2e0e5a1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2e0e5a1)

## 4.0.4

- [none] Updated dependencies [597e0bd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/597e0bd)
  - @atlaskit/util-data-test@10.0.3
  - @uidu/editor-core@77.0.0
  - @uidu/editor-test-helpers@6.0.0
  - @uidu/editor-common@14.0.0
- [none] Updated dependencies [61df453](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/61df453)
  - @atlaskit/util-data-test@10.0.3
  - @uidu/editor-common@14.0.0
  - @uidu/editor-test-helpers@6.0.0
  - @uidu/editor-core@77.0.0
- [none] Updated dependencies [812a39c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/812a39c)
  - @atlaskit/util-data-test@10.0.3
  - @uidu/editor-core@77.0.0
  - @uidu/editor-test-helpers@6.0.0
  - @uidu/editor-common@14.0.0
- [none] Updated dependencies [c8eb097](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c8eb097)
  - @atlaskit/util-data-test@10.0.3
  - @uidu/editor-common@14.0.0
  - @uidu/editor-test-helpers@6.0.0
  - @uidu/editor-core@77.0.0
- [patch] Updated dependencies [d02746f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d02746f)
  - @atlaskit/util-data-test@10.0.3
  - @uidu/editor-common@14.0.0
  - @uidu/editor-test-helpers@6.0.0
  - @uidu/editor-core@77.0.0

## 4.0.3

- [patch] Updated dependencies [acd86a1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/acd86a1)
  - @atlaskit/util-data-test@10.0.2
  - @uidu/editor-common@13.2.7
  - @uidu/editor-test-helpers@5.1.2
  - @uidu/editor-core@76.4.5
  - @uidu/docs@5.0.2

## 4.0.2

- [patch] Bump prosemirror-model to 1.6 in order to use toDebugString on Text node spec [fdd5c5d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fdd5c5d)
- [none] Updated dependencies [fdd5c5d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fdd5c5d)
  - @uidu/editor-common@13.2.6
  - @uidu/editor-test-helpers@5.1.1
  - @uidu/editor-core@76.4.2

## 4.0.1

- [none] Updated dependencies [25353c3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/25353c3)
  - @uidu/editor-core@76.0.0
  - @uidu/editor-test-helpers@5.0.1
- [patch] Updated dependencies [38c0543](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/38c0543)
  - @uidu/editor-core@76.0.0
  - @uidu/editor-test-helpers@5.0.1

## 4.0.0

- [major] Updates to React ^16.4.0 [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
- [major] Updated dependencies [563a7eb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/563a7eb)
  - @atlaskit/util-data-test@10.0.0
  - @uidu/editor-common@13.0.0
  - @uidu/editor-test-helpers@5.0.0
  - @uidu/editor-core@75.0.0
  - @uidu/docs@5.0.0
- [major] Updated dependencies [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
  - @atlaskit/util-data-test@10.0.0
  - @uidu/editor-core@75.0.0
  - @uidu/editor-test-helpers@5.0.0
  - @uidu/editor-common@13.0.0
  - @uidu/docs@5.0.0

## 3.1.8

- [none] Updated dependencies [5f6ec84](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5f6ec84)
  - @uidu/editor-core@74.0.17
  - @uidu/editor-test-helpers@4.2.4
  - @uidu/editor-common@12.0.0
- [patch] Updated dependencies [5958588](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5958588)
  - @uidu/editor-core@74.0.17
  - @uidu/editor-test-helpers@4.2.4
  - @uidu/editor-common@12.0.0

## 3.1.7

- [patch] Updated dependencies [af0cde6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/af0cde6)
  - @uidu/editor-core@74.0.0
  - @uidu/editor-test-helpers@4.2.2

## 3.1.6

- [patch] Move removing nulls to the transformer instead of only in the tests. ED-4496 [617d8c1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/617d8c1)
- [none] Updated dependencies [617d8c1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/617d8c1)
  - @uidu/editor-common@11.3.11

## 3.1.5

- [patch] Updated dependencies [8d5053e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8d5053e)
  - @atlaskit/util-data-test@9.1.15
  - @uidu/editor-common@11.3.8
  - @uidu/editor-test-helpers@4.1.9
  - @uidu/editor-core@73.9.5

## 3.1.4

- [patch] Updated dependencies [0cf2f52](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0cf2f52)
  - @atlaskit/util-data-test@9.1.14
  - @uidu/editor-core@73.9.2
  - @uidu/editor-test-helpers@4.1.8
  - @uidu/editor-common@11.3.7

## 3.1.3

- [patch] Remove pinned prosemirror-model@1.4.0 and move back to caret ranges for prosemirror-model@^1.5.0 [4faccc0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4faccc0)
- [patch] Updated dependencies [4faccc0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4faccc0)
  - @uidu/editor-common@11.3.0
  - @uidu/editor-test-helpers@4.1.5
  - @uidu/editor-core@73.8.6

## 3.1.2

- [patch] Clean Changelogs - remove duplicates and empty entries [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
- [none] Updated dependencies [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
  - @atlaskit/util-data-test@9.1.13
  - @uidu/editor-core@73.7.5
  - @uidu/editor-test-helpers@4.1.2
  - @uidu/editor-common@11.2.1

## 3.1.1

- [patch] Update changelogs to remove duplicate [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
- [none] Updated dependencies [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
  - @atlaskit/util-data-test@9.1.12
  - @uidu/editor-core@73.7.1
  - @uidu/editor-test-helpers@4.1.1
  - @uidu/editor-common@11.1.2
  - @uidu/docs@4.1.1

## 3.1.0

- [none] Updated dependencies [7217164](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7217164)
  - @uidu/editor-core@73.5.0
  - @uidu/editor-test-helpers@4.1.0
  - @atlaskit/util-data-test@9.1.11
  - @uidu/editor-common@11.1.0

## 3.0.11

- [patch] Update and lock prosemirror-model version to 1.4.0 [febf753](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/febf753)
- [none] Updated dependencies [febf753](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/febf753)
  - @uidu/editor-common@11.0.6
  - @uidu/editor-test-helpers@4.0.7
  - @uidu/editor-core@73.4.4

## 3.0.10

- [patch] Strip empty optional attributes from the link mark in editor-json-transformer [c3b3100](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c3b3100)
- [none] Updated dependencies [c3b3100](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c3b3100)
  - @uidu/editor-common@11.0.1

## 3.0.9

- [patch] Updated dependencies [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
  - @atlaskit/util-data-test@9.1.10
  - @uidu/editor-core@73.0.0
  - @uidu/editor-test-helpers@4.0.3
  - @uidu/editor-common@11.0.0
  - @uidu/docs@4.0.0

## 3.0.8

- [patch] Updated dependencies [1c87e5a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1c87e5a)
  - @atlaskit/util-data-test@9.1.9
  - @uidu/editor-core@72.2.2
  - @uidu/editor-test-helpers@4.0.2
  - @uidu/editor-common@10.1.9

## 3.0.7

- [none] Updated dependencies [febc44d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/febc44d)
  - @uidu/editor-core@72.0.0
  - @uidu/editor-test-helpers@4.0.0
  - @atlaskit/util-data-test@9.1.4
  - @uidu/editor-common@10.0.0

## 3.0.6

- [none] Updated dependencies [8fd4dd1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8fd4dd1)
  - @uidu/editor-test-helpers@3.1.8
  - @atlaskit/util-data-test@9.1.3
  - @uidu/editor-core@71.4.0
  - @uidu/editor-common@9.3.9

## 3.0.5

- [patch] ED-4336 support loading dynamic/"auto" tables from confluence to fixed-width tables [0c2f72a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0c2f72a)

## 3.0.1

- [patch] Added missing dependencies and added lint rule to catch them all [0672503](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0672503)

## 3.0.0

- [major] Bump to React 16.3. [4251858](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4251858)

## 2.5.21

- [patch] change table node builder constructor for tests, remove tableWithAttrs [cf43535](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cf43535)

## 2.5.18

- [patch] Upgrading ProseMirror Libs [35d14d5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/35d14d5)

## 2.5.17

- [patch] Add "sideEffects: false" to AKM2 packages to allow consumer's to tree-shake [c3b018a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c3b018a)

## 2.5.6

- [patch] JSON encoding results in invalid ADF for table nodes [8a8d663](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8a8d663)

## 2.5.5

- [patch] updated the repository url to https://bitbucket.org/atlassian/atlaskit-mk-2 [1e57e5a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e57e5a)

## 2.5.3

- [patch] bump editor-common to 6.1.2 [bb7802e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bb7802e)

## 2.5.0

- [minor] Implement JSONTransformer::parse to enable ADF -> PM conversion [c8c3c9e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c8c3c9e)

## 2.4.0

- [minor] Add React 16 support. [12ea6e4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/12ea6e4)

## 2.1.10

- [patch] Change to use editor-core instead of editor-bitbucket for examples [aa0c0ac](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/aa0c0ac)

## 2.1.8

- [patch] Move prosemirror-model to be a dev-dependency [206ce2f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/206ce2f)

## 2.0.3

- [patch] Fix dependencies [9f9de42](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9f9de42)

## 2.0.2

- [patch] Fix of the build scripts for editor-\*-transformer packages [59b4ea5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/59b4ea5)

## 2.0.1

- [patch] Fixed linting [5ebf75d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5ebf75d)

## 2.0.0

- [major] Adding separate transformer packages. [f734c01](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f734c01)
