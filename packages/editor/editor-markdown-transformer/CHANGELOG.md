# @uidu/editor-markdown-transformer

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

## 3.1.6

- Updated dependencies [1194ad5eb3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1194ad5eb3):
- Updated dependencies [166eb02474](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/166eb02474):
- Updated dependencies [80adfefba2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/80adfefba2):
  - @uidu/editor-common@41.0.0
  - @uidu/editor-core@113.0.0
  - @uidu/editor-test-helpers@10.0.0
  - @uidu/adf-schema@4.0.0

## 3.1.5

- Updated dependencies [08ec269915](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/08ec269915):
  - @uidu/editor-core@112.44.2
  - @uidu/editor-test-helpers@9.11.13
  - @uidu/editor-common@40.0.0

## 3.1.4

### Patch Changes

- [patch][097b696613](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/097b696613):

  Components now depend on TS 3.6 internally, in order to fix an issue with TS resolving non-relative imports as relative imports

## 3.1.3

- Updated dependencies [6164bc2629](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6164bc2629):
  - @uidu/editor-core@112.39.5
  - @uidu/editor-test-helpers@9.11.3
  - @uidu/adf-schema@3.0.0
  - @uidu/editor-common@39.17.0

## 3.1.2

### Patch Changes

- [patch][bbff8a7d87](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bbff8a7d87):

  Fixes bug, missing version.json file

## 3.1.1

### Patch Changes

- [patch][18dfac7332](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/18dfac7332):

  In this PR, we are:

  - Re-introducing dist build folders
  - Adding back cjs
  - Replacing es5 by cjs and es2015 by esm
  - Creating folders at the root for entry-points
  - Removing the generation of the entry-points at the root
    Please see this [ticket](https://product-fabric.atlassian.net/browse/BUILDTOOLS-118) or this [page](https://hello.atlassian.net/wiki/spaces/FED/pages/452325500/Finishing+Atlaskit+multiple+entry+points) for further details

## 3.1.0

- [minor][79f0ef0601](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/79f0ef0601):

  - Use strict tsconfig to compile editor packages

## 3.0.8

- Updated dependencies [5e4ff01e4c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5e4ff01e4c):
  - @uidu/editor-test-helpers@9.1.4
  - @uidu/editor-core@112.0.0

## 3.0.7

- Updated dependencies [154372926b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/154372926b):
  - @uidu/editor-test-helpers@9.1.2
  - @uidu/editor-core@111.0.0

## 3.0.6

- Updated dependencies [7c17b35107](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7c17b35107):
  - @uidu/adf-schema@2.5.5
  - @uidu/editor-common@39.0.0
  - @uidu/editor-core@110.0.0
  - @uidu/docs@8.0.0
  - @uidu/editor-test-helpers@9.0.0
  - @atlaskit/util-data-test@12.0.0

## 3.0.5

- Updated dependencies [a1192ef860](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a1192ef860):
  - @uidu/editor-common@38.0.0
  - @uidu/editor-core@109.0.0
  - @uidu/editor-test-helpers@8.0.8
  - @atlaskit/util-data-test@11.1.9

## 3.0.4

- Updated dependencies [e7292ab444](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7292ab444):
  - @uidu/editor-common@37.0.0
  - @uidu/editor-core@108.0.0
  - @uidu/editor-test-helpers@8.0.7
  - @atlaskit/util-data-test@11.1.8

## 3.0.3

- [patch][d13fad66df](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d13fad66df):

  - Enable esModuleInterop for typescript, this allows correct use of default exports

## 3.0.2

- Updated dependencies [c2c36de22b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c2c36de22b):
  - @uidu/editor-common@36.0.0
  - @uidu/editor-core@107.0.0
  - @uidu/editor-test-helpers@8.0.3
  - @atlaskit/util-data-test@11.1.5

## 3.0.1

- [patch][1bcaa1b991](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1bcaa1b991):

  - Add npmignore for index.ts to prevent some jest tests from resolving that instead of index.js

## 3.0.0

- [major][9d5cc39394](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d5cc39394):

  - Dropped ES5 distributables from the typescript packages

## 2.2.5

- Updated dependencies [7ab3e93996](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7ab3e93996):
  - @uidu/editor-common@34.0.0
  - @uidu/editor-core@105.0.0
  - @uidu/editor-test-helpers@7.0.6
  - @atlaskit/util-data-test@10.2.5

## 2.2.4

- Updated dependencies [4d17df92f8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4d17df92f8):
  - @uidu/editor-test-helpers@7.0.5
  - @uidu/editor-core@104.0.0

## 2.2.3

- Updated dependencies [76299208e6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/76299208e6):
  - @uidu/editor-core@103.0.3
  - @atlaskit/util-data-test@10.2.3
  - @uidu/editor-common@33.0.3
  - @uidu/docs@7.0.0

## 2.2.2

- Updated dependencies [60f0ad9a7e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/60f0ad9a7e):
  - @uidu/editor-core@103.0.0
  - @uidu/editor-test-helpers@7.0.4

## 2.2.1

- Updated dependencies [4aee5f3cec](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4aee5f3cec):
  - @uidu/editor-common@33.0.0
  - @uidu/editor-core@102.0.0
  - @uidu/editor-test-helpers@7.0.2
  - @atlaskit/util-data-test@10.2.2

## 2.2.0

- [minor][1eb20bca95](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1eb20bca95):

  - ED-6368: No implicit any for editor-\*-transformer packages

## 2.1.12

- Updated dependencies [4a84fc40e0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4a84fc40e0):
  - @uidu/editor-test-helpers@7.0.1
  - @uidu/editor-core@101.0.0

## 2.1.11

- Updated dependencies [4af5bd2a58](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4af5bd2a58):
  - @uidu/adf-schema@1.5.4
  - @uidu/editor-common@32.0.2
  - @uidu/editor-core@100.0.0
  - @uidu/editor-test-helpers@7.0.0

## 2.1.10

- Updated dependencies [fc6164c8c2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fc6164c8c2):
  - @uidu/editor-common@32.0.0
  - @uidu/editor-core@99.0.0
  - @uidu/editor-test-helpers@6.3.22
  - @atlaskit/util-data-test@10.2.1

## 2.1.9

- [patch][557a2b5734](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/557a2b5734):

  - ED-5788: bump prosemirror-view and prosemirror-model

## 2.1.8

- Updated dependencies [69c8d0c19c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/69c8d0c19c):
  - @uidu/editor-common@31.0.0
  - @uidu/editor-core@98.0.0
  - @uidu/editor-test-helpers@6.3.17
  - @atlaskit/util-data-test@10.0.36

## 2.1.7

- Updated dependencies [85d5d168fd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/85d5d168fd):
  - @uidu/editor-common@30.0.0
  - @uidu/editor-core@97.0.0
  - @uidu/editor-test-helpers@6.3.12
  - @atlaskit/util-data-test@10.0.34

## 2.1.6

- Updated dependencies [dadef80](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dadef80):
  - @uidu/editor-common@29.0.0
  - @uidu/editor-core@96.0.0
  - @uidu/editor-test-helpers@6.3.11
  - @atlaskit/util-data-test@10.0.33

## 2.1.5

- Updated dependencies [0c116d6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0c116d6):
  - @uidu/editor-test-helpers@6.3.8
  - @uidu/editor-common@28.0.2
  - @atlaskit/util-data-test@10.0.32
  - @uidu/editor-core@95.0.0

## 2.1.4

- Updated dependencies [cbb8cb5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cbb8cb5):
  - @uidu/editor-common@28.0.0
  - @uidu/editor-core@94.0.0
  - @uidu/editor-test-helpers@6.3.7
  - @atlaskit/util-data-test@10.0.31

## 2.1.3

- Updated dependencies [72d37fb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/72d37fb):
  - @uidu/editor-common@27.0.0
  - @uidu/editor-core@93.0.0
  - @uidu/editor-test-helpers@6.3.6
  - @atlaskit/util-data-test@10.0.30

## 2.1.2

- Updated dependencies [e858305](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e858305):
  - @uidu/editor-test-helpers@6.3.5
  - @uidu/editor-common@26.0.0
  - @uidu/editor-core@92.0.19

## 2.1.1

- Updated dependencies [b3738ea](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b3738ea):
  - @uidu/editor-common@25.0.0
  - @uidu/editor-core@92.0.0
  - @uidu/editor-test-helpers@6.3.4
  - @atlaskit/util-data-test@10.0.28

## 2.1.0

- [minor][1205725](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1205725):

  - Move schema to its own package

## 2.0.23

- Updated dependencies [80f765b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/80f765b):
  - @uidu/editor-common@23.0.0
  - @uidu/editor-core@91.0.0
  - @uidu/editor-test-helpers@6.3.2
  - @atlaskit/util-data-test@10.0.26

## 2.0.22

- Updated dependencies [58b84fa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/58b84fa):
  - @uidu/editor-core@90.3.15
  - @atlaskit/util-data-test@10.0.25
  - @uidu/docs@6.0.0

## 2.0.21

- Updated dependencies [3a7224a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3a7224a):
  - @uidu/editor-test-helpers@6.2.23
  - @uidu/editor-core@90.0.0

## 2.0.20

- Updated dependencies [7e8b4b9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7e8b4b9):
  - @uidu/editor-common@22.0.0
  - @uidu/editor-core@89.0.0
  - @uidu/editor-test-helpers@6.2.19
  - @atlaskit/util-data-test@10.0.21

## 2.0.19

- Updated dependencies [2c21466](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2c21466):
  - @uidu/editor-common@21.0.0
  - @uidu/editor-core@88.0.0
  - @uidu/editor-test-helpers@6.2.16
  - @atlaskit/util-data-test@10.0.20

## 2.0.18

- [patch] Updated dependencies [052ce89](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/052ce89)
  - @uidu/editor-test-helpers@6.2.8
  - @uidu/editor-core@87.0.0
  - @uidu/editor-common@20.1.2

## 2.0.17

- [patch] Updated dependencies [b1ce691](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b1ce691)
  - @uidu/editor-common@20.0.0
  - @uidu/editor-core@86.0.0
  - @uidu/editor-test-helpers@6.2.7
  - @atlaskit/util-data-test@10.0.16

## 2.0.16

- [patch] Updated dependencies [2afa60d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2afa60d)
  - @uidu/editor-common@19.0.0
  - @uidu/editor-core@85.0.0
  - @uidu/editor-test-helpers@6.2.6

## 2.0.15

- [patch] Upgrade markdown-it to reduce duplicate dependencies [a27ace1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a27ace1)

## 2.0.14

- [patch] Updated dependencies [8b2c4d3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8b2c4d3)
- [patch] Updated dependencies [3302d51](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3302d51)
  - @uidu/editor-common@18.0.0
  - @uidu/editor-core@84.0.0
  - @uidu/editor-test-helpers@6.2.5

## 2.0.13

- [patch] Updated dependencies [23c7eca](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/23c7eca)
  - @uidu/editor-test-helpers@6.2.4
  - @uidu/editor-core@83.0.0

## 2.0.12

- [patch] support hardbreak [39ca6cf](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/39ca6cf)

## 2.0.11

- [patch] Updated dependencies [ef76f1f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ef76f1f)
  - @uidu/editor-common@17.0.1
  - @uidu/editor-core@82.0.0
  - @uidu/editor-test-helpers@6.1.3

## 2.0.10

- [patch] Updated dependencies [927ae63](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/927ae63)
  - @uidu/editor-common@17.0.0
  - @uidu/editor-core@81.0.0
  - @uidu/editor-test-helpers@6.1.2

## 2.0.9

- [patch] Updated dependencies [6e1d642](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6e1d642)
  - @uidu/editor-common@16.0.0
  - @uidu/editor-core@80.0.0
  - @uidu/editor-test-helpers@6.0.9

## 2.0.8

- [patch] Updated dependencies [7545979](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7545979)
  - @uidu/editor-common@15.0.0
  - @uidu/editor-core@79.0.0
  - @uidu/editor-test-helpers@6.0.6

## 2.0.7

- [patch] Updated dependencies [911a570](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/911a570)
  - @uidu/editor-test-helpers@6.0.5
  - @uidu/editor-core@78.0.0

## 2.0.6

- [patch] Updated dependencies [b12f7e6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b12f7e6)
  - @uidu/editor-common@14.0.11
  - @uidu/editor-test-helpers@6.0.3
  - @uidu/editor-core@77.1.4

## 2.0.5

- [none] Updated dependencies [597e0bd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/597e0bd)
  - @uidu/editor-core@77.0.0
  - @uidu/editor-test-helpers@6.0.0
  - @uidu/editor-common@14.0.0
- [none] Updated dependencies [61df453](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/61df453)
  - @uidu/editor-common@14.0.0
  - @uidu/editor-test-helpers@6.0.0
  - @uidu/editor-core@77.0.0
- [none] Updated dependencies [812a39c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/812a39c)
  - @uidu/editor-core@77.0.0
  - @uidu/editor-test-helpers@6.0.0
  - @uidu/editor-common@14.0.0
- [none] Updated dependencies [c8eb097](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c8eb097)
  - @uidu/editor-common@14.0.0
  - @uidu/editor-test-helpers@6.0.0
  - @uidu/editor-core@77.0.0
- [patch] Updated dependencies [d02746f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d02746f)
  - @uidu/editor-common@14.0.0
  - @uidu/editor-test-helpers@6.0.0
  - @uidu/editor-core@77.0.0

## 2.0.4

- [patch] Fixes issue an issue with empty lists inside tables [378fe99](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/378fe99)
- [none] Updated dependencies [378fe99](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/378fe99)

## 2.0.3

- [patch] Updated dependencies [acd86a1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/acd86a1)
  - @uidu/editor-common@13.2.7
  - @uidu/editor-test-helpers@5.1.2
  - @uidu/editor-core@76.4.5
  - @uidu/docs@5.0.2

## 2.0.2

- [patch] Bump prosemirror-model to 1.6 in order to use toDebugString on Text node spec [fdd5c5d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fdd5c5d)
- [none] Updated dependencies [fdd5c5d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fdd5c5d)
  - @uidu/editor-common@13.2.6
  - @uidu/editor-test-helpers@5.1.1
  - @uidu/editor-core@76.4.2

## 2.0.1

- [none] Updated dependencies [25353c3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/25353c3)
  - @uidu/editor-core@76.0.0
  - @uidu/editor-test-helpers@5.0.1
- [patch] Updated dependencies [38c0543](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/38c0543)
  - @uidu/editor-core@76.0.0
  - @uidu/editor-test-helpers@5.0.1

## 2.0.0

- [major] Updated dependencies [563a7eb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/563a7eb)
  - @uidu/editor-common@13.0.0
  - @uidu/editor-test-helpers@5.0.0
  - @uidu/editor-core@75.0.0
  - @uidu/docs@5.0.0
- [major] Updated dependencies [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
  - @uidu/editor-core@75.0.0
  - @uidu/editor-test-helpers@5.0.0
  - @uidu/editor-common@13.0.0
  - @uidu/docs@5.0.0

## 1.2.8

- [none] Updated dependencies [5f6ec84](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5f6ec84)
  - @uidu/editor-core@74.0.17
  - @uidu/editor-test-helpers@4.2.4
  - @uidu/editor-common@12.0.0
- [patch] Updated dependencies [5958588](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5958588)
  - @uidu/editor-core@74.0.17
  - @uidu/editor-test-helpers@4.2.4
  - @uidu/editor-common@12.0.0

## 1.2.7

- [patch] Updated dependencies [af0cde6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/af0cde6)
  - @uidu/editor-core@74.0.0
  - @uidu/editor-test-helpers@4.2.2

## 1.2.6

- [patch] Updated dependencies [8d5053e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8d5053e)
  - @uidu/editor-common@11.3.8
  - @uidu/editor-test-helpers@4.1.9
  - @uidu/editor-core@73.9.5

## 1.2.5

- [patch] Updated dependencies [0cf2f52](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0cf2f52)
  - @uidu/editor-core@73.9.2
  - @uidu/editor-test-helpers@4.1.8
  - @uidu/editor-common@11.3.7

## 1.2.4

- [patch] Remove pinned prosemirror-model@1.4.0 and move back to caret ranges for prosemirror-model@^1.5.0 [4faccc0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4faccc0)
- [patch] Updated dependencies [4faccc0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4faccc0)
  - @uidu/editor-common@11.3.0
  - @uidu/editor-test-helpers@4.1.5
  - @uidu/editor-core@73.8.6

## 1.2.3

- [patch] Bump prosemirror-markdown to 1.1.0 and treat new lines when pasting as <br> [5c28782](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5c28782)
- [none] Updated dependencies [5c28782](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5c28782)
  - @uidu/editor-core@73.8.5

## 1.2.2

- [patch] Clean Changelogs - remove duplicates and empty entries [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
- [none] Updated dependencies [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
  - @uidu/editor-core@73.7.5
  - @uidu/editor-test-helpers@4.1.2
  - @uidu/editor-common@11.2.1

## 1.2.1

- [patch] Update changelogs to remove duplicate [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
- [none] Updated dependencies [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
  - @uidu/editor-core@73.7.1
  - @uidu/editor-test-helpers@4.1.1
  - @uidu/editor-common@11.1.2
  - @uidu/docs@4.1.1

## 1.2.0

- [none] Updated dependencies [7217164](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7217164)
  - @uidu/editor-core@73.5.0
  - @uidu/editor-test-helpers@4.1.0
  - @uidu/editor-common@11.1.0

## 1.1.1

- [patch] Update and lock prosemirror-model version to 1.4.0 [febf753](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/febf753)
- [none] Updated dependencies [febf753](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/febf753)
  - @uidu/editor-common@11.0.6
  - @uidu/editor-test-helpers@4.0.7
  - @uidu/editor-core@73.4.4

## 1.1.0

- [minor] Adds support for images [cad95fa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cad95fa)
- [none] Updated dependencies [cad95fa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cad95fa)
  - @uidu/editor-core@73.2.0

## 1.0.0

- [major] makes styled-components a peer dependency and upgrades version range from 1.4.6 - 3 to ^3.2.6 [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
- [patch] Updated dependencies [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
  - @uidu/editor-core@73.0.0
  - @uidu/editor-common@11.0.0
  - @uidu/docs@4.0.0

## 0.2.23

- [patch] Updated dependencies [1c87e5a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1c87e5a)
  - @uidu/editor-core@72.2.2
  - @uidu/editor-common@10.1.9

## 0.2.22

- [none] Updated dependencies [febc44d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/febc44d)
  - @uidu/editor-core@72.0.0
  - @uidu/editor-common@10.0.0

## 0.2.21

- [none] Updated dependencies [8fd4dd1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8fd4dd1)
  - @uidu/editor-core@71.4.0
  - @uidu/editor-common@9.3.9

## 0.2.20

- [patch] Fix a crash for markdown transformer where the table misses a call [82bd4c6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/82bd4c6)
- [patch] Updated dependencies [82bd4c6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/82bd4c6)
  - @uidu/editor-core@71.3.23

## 0.2.18

- [patch] Fix Markdown-it dependency to be the same version that prosemirror-markdown uses internally to prevent unnecessary bundle size increase [9abf097](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9abf097)

## 0.2.15

- [patch] Added missing dependencies and added lint rule to catch them all [0672503](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0672503)

## 0.2.11

- [patch] Upgrading ProseMirror Libs [35d14d5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/35d14d5)

## 0.2.10

- [patch] Add "sideEffects: false" to AKM2 packages to allow consumer's to tree-shake [c3b018a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c3b018a)

## 0.2.1

- [patch] JSON encoding results in invalid ADF for table nodes [8a8d663](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8a8d663)

## 0.2.0

- [minor] Update styled-components dependency to support versions 1.4.6 - 3 [ceccf30](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ceccf30)

## 0.1.5

- [patch] updated the repository url to https://bitbucket.org/atlassian/atlaskit-mk-2 [1e57e5a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e57e5a)

## 0.1.3

- [patch] bump editor-common to 6.1.2 [bb7802e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bb7802e)

## 0.1.1

- [patch] Adding module-field to package.json [b833ed7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b833ed7)

## 0.1.0

- [minor] Addes in editor-markdown-transformer package [10042be](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/10042be)
