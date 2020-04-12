# @uidu/adf-schema

## 0.2.0

### Minor Changes

- de873fc: Bump some dependencies, rewrite editor-core

### Patch Changes

- Updated dependencies [de873fc]
  - @uidu/editor-json-transformer@0.1.10

## 0.1.10

### Patch Changes

- 7e54643: Fix shema export

## 0.1.9

### Patch Changes

- b1761c8: Modified how medias are handled in many components

## 0.1.8

### Patch Changes

- 6099e0d: Better work with media picker, now able to add images

## 0.1.7

### Patch Changes

- 0f69b06: Fix yarnclean
- Updated dependencies [0f69b06]
  - @uidu/editor-json-transformer@0.1.8
  - @uidu/json-schema-generator@0.1.6

## 0.1.6

### Patch Changes

- e41e9e9: Remove css interop from theme
- Updated dependencies [e41e9e9]
  - @uidu/editor-json-transformer@0.1.7
  - @uidu/json-schema-generator@0.1.5

## 0.1.5

### Patch Changes

- d9f506a: Lots on dashlet docs and reasoning
- Updated dependencies [d9f506a]
  - @uidu/editor-json-transformer@0.1.5

## 0.1.4

### Patch Changes

- 43566b7: Bump styled-components, bump all
- Updated dependencies [43566b7]
  - @uidu/editor-json-transformer@0.1.4
  - @uidu/json-schema-generator@0.1.3

## 0.1.3

### Patch Changes

- 074c822: Fix multiple grouping and NumberFilterForm

## 0.1.2

### Patch Changes

- 8c80bd5: Changed how tsc compiles, should be faster to build
- Updated dependencies [8c80bd5]
  - @uidu/editor-json-transformer@0.1.2

## 0.1.1

### Patch Changes

- 9e09850: Bump all packages
- ffffbbe: Update dependencies

- Updated dependencies [9e09850]
- Updated dependencies [ffffbbe]
  - @uidu/editor-json-transformer@0.1.1
  - @uidu/json-schema-generator@0.1.1

## 4.1.0

### Minor Changes

- [minor][65ada7f318](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/65ada7f318):

  **FABDODGEM-12 Editor Cashmere Release**

  - [Internal post](https://go.atlassian.com/cashmere-release)

  **Affected editor components:**

  tables, media, mobile, text color, emoji, copy/paste, analytics

  **Performance**

  - Async import for code blocks and task items on renderer
    - https://product-fabric.atlassian.net/browse/ED-7155

  **Table**

  - Add support to sort tables that contains smart links
    - https://product-fabric.atlassian.net/browse/ED-7449
  - Scale table when changing to full width mode
    - https://product-fabric.atlassian.net/browse/ED-7724

  **Text color**

  - Update text color toolbar with right color when text is inside a list, panel, etc.
    - https://product-fabric.atlassian.net/browse/FM-1752

**Mobile** - Implement undo/redo interface on Hybrid Editor - https://product-fabric.atlassian.net/browse/FM-2393

**Copy and Paste**

    - Support copy & paste when missing context-id attr
      - https://product-fabric.atlassian.net/browse/MS-2344
    - Right click + copy image fails the second time that is pasted
      - https://product-fabric.atlassian.net/browse/MS-2324
    - Copying a never touched image for the first time from editor fails to paste
      - https://product-fabric.atlassian.net/browse/MS-2338
    - Implement analytics when a file is copied
      - https://product-fabric.atlassian.net/browse/MS-2036

**Media**

- Add analytics events and error reporting [NEW BIG FEATURE]
  - https://product-fabric.atlassian.net/browse/MS-2275
  - https://product-fabric.atlassian.net/browse/MS-2329
  - https://product-fabric.atlassian.net/browse/MS-2330
  - https://product-fabric.atlassian.net/browse/MS-2331
  - https://product-fabric.atlassian.net/browse/MS-2332
  - https://product-fabric.atlassian.net/browse/MS-2390
- Fixed issue where we can’t insert same file from MediaPicker twice
  - https://product-fabric.atlassian.net/browse/MS-2080
- Disable upload of external files to media
  - https://product-fabric.atlassian.net/browse/MS-2372

**Notable Bug Fixes**

    - Implement consistent behaviour for rule and mediaSingle on insertion
      - Feature Flag:
        - allowNewInsertionBehaviour - [default: true]
      - https://product-fabric.atlassian.net/browse/ED-7503
    - Fixed bug where we were showing table controls on mobile.
      - https://product-fabric.atlassian.net/browse/ED-7690
    - Fixed bug where editor crashes after unmounting react component.
      - https://product-fabric.atlassian.net/browse/ED-7318
    - Fixed bug where custom emojis are not been showed on the editor
      - https://product-fabric.atlassian.net/browse/ED-7726

- [minor][79c69ed5cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/79c69ed5cd):

  ED-7449 Implement sorting inline cards inside tables base on resolved title

### Patch Changes

- [patch][1715ad2bd5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1715ad2bd5):

  ED-7731: add support for GraphQL syntax highlighting

## 4.0.0

### Major Changes

- [major][1194ad5eb3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1194ad5eb3):

  Remove unnecessary `tableBackgroundBorderColors` in favour of unique `tableBackgroundBorderColor` for all table cell background border- [major][80adfefba2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/80adfefba2):

  Remove applicationCard node and action mark

### Minor Changes

- [minor][5276c19a41](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5276c19a41):

  ED-5996: support viewing inline comments within editor

  You can do this with the `annotationProvider` prop. Passing a truthy value to this (e.g. the empty object `{}`) will:

  - enable support for working with the `annotation` ADF mark
  - will render highlights around any annotations, and
  - allow copying and pasting of annotations within the same document, or between documents

  You can also optionally pass a React component to the `component`, so you can render custom components on top of or around the editor when the user's text cursor is inside an annotation.

  Please see [the package documentation](https://atlaskit.atlassian.com/packages/editor/editor-core/docs/annotations) for more information.

  There is an example component called `ExampleInlineCommentComponent` within the `@uidu/editor-test-helpers` package. It is currently featured in the full page examples on the Atlaskit website.

  Annotations are styled within the editor using the `fabric-editor-annotation` CSS class.

  Other changes:

  - `Popup` now supports an optional `rect` parameter to direct placement, rather than calculating the bounding client rect around a DOM node.- [minor][45ae9e1cc2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/45ae9e1cc2):

  ED-7201 Add new background cell colors and improve text color

### Patch Changes

- [patch][bbb4f9463d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bbb4f9463d):

  CEMS-234 Prioritize media single over media group

  This solves issue where pasting images with text from third party applications into a table ends adding an error image.- [patch][922ec81fe7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/922ec81fe7):

  ED-7710: Only show annotation highlight if we have a provider

## 3.1.3

### Patch Changes

- [patch][48fcfce0a1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/48fcfce0a1):

  Export missing definitions from schema to fix types in utils

## 3.1.2

### Patch Changes

- [patch][097b696613](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/097b696613):

  Components now depend on TS 3.6 internally, in order to fix an issue with TS resolving non-relative imports as relative imports

## 3.1.1

### Patch Changes

- [patch][0d7d459f1a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0d7d459f1a):

  Fixes type errors which were incompatible with TS 3.6

## 3.1.0

### Minor Changes

- [minor][66c5c88f4a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/66c5c88f4a):

  Refactor emoji to use typeahead plugin- [minor][bdee736f14](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bdee736f14):

  ED-7175: unify smart link and hyperlink toolbars

  Also updates the toDOM and parseDOM on ADF nodes, making `url` optional.

  Smart cards can now optionally be passed an onResolve callback, of the shape:

      onResolve?: (data: { url?: string; title?: string }) => void;

  This gets fired when the view resolves a smart card from JSON-LD, either via the client or the `data` prop.

### Patch Changes

- [patch][6e3a0038fc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6e3a0038fc):

  ED-7288: reduces the number of DOM nodes in table cells, changes the way resize handles are positioned- [patch][a0a3fa7aac](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a0a3fa7aac):

  Ensure mediagroup nodes are copied to destination collection when pasted in different documents

## 3.0.0

### Major Changes

- [major][6164bc2629](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6164bc2629):

  ED-6806 Move 'calcTableColumnWidths' from adf-schema into editor-common

  BREAKING CHANGE

  We move 'calcTableColumnWidths' helper from adf-schema into our helper library editor-common, you can use it from editor-common in the same way:

  Before:

  ```javascript
  import { calcTableColumnWidths } from '@uidu/adf-schema';
  ```

  Now:

  ```javascript
  import { calcTableColumnWidths } from '@uidu/editor-common';
  ```

## 2.13.1

### Patch Changes

- [patch][a892339c19](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a892339c19):

  Give all editor decorations a key to prevent ProseMirror from re-rendering decorations constantly.

  Enables YAML language for codeblocks

## 2.13.0

### Minor Changes

- [minor][ec66d3c646](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ec66d3c646):

  Improve performance of pages with smart cards

## 2.12.4

### Patch Changes

- [patch][0bb88234e6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0bb88234e6):

  Upgrade prosemirror-view to 1.9.12

## 2.12.3

### Patch Changes

- [patch][ec8066a555](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ec8066a555):

  Upgrade `@types/prosemirror-view` Typescript definitions to latest 1.9.x API

## 2.12.2

### Patch Changes

- [patch][bbff8a7d87](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bbff8a7d87):

  Fixes bug, missing version.json file

## 2.12.1

### Patch Changes

- [patch][18dfac7332](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/18dfac7332):

  In this PR, we are:

  - Re-introducing dist build folders
  - Adding back cjs
  - Replacing es5 by cjs and es2015 by esm
  - Creating folders at the root for entry-points
  - Removing the generation of the entry-points at the root
    Please see this [ticket](https://product-fabric.atlassian.net/browse/BUILDTOOLS-118) or this [page](https://hello.atlassian.net/wiki/spaces/FED/pages/452325500/Finishing+Atlaskit+multiple+entry+points) for further details

## 2.12.0

### Minor Changes

- [minor][13ca42c394](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/13ca42c394):

  # use getAuthFromContext from media when a file if pasted from a different collection

  Now products can provide auth using **getAuthFromContext** on MediaClientConfig:

  ```
  import {MediaClientConfig} from '@uidu/media-core'
  import Editor from '@uidu/editor-core'

  const viewMediaClientConfig: MediaClientConfig = {
    authProvider // already exists
    getAuthFromContext(contextId: string) {
      // here products can return auth for external pages.
      // in case of copy & paste on Confluence, they can provide read token for
      // files on the source collection
    }
  }
  const mediaProvider: = {
    viewMediaClientConfig
  }

  <Editor {...otherNonRelatedProps} media={{provider: mediaProvider}} />
  ```

## 2.11.4

### Patch Changes

- [patch][f60618b0f0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f60618b0f0):

  ED-5844 Adding media link UI to editor

## 2.11.3

### Patch Changes

- [patch][4aed452b1b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4aed452b1b):

  ED-7041, SL-231: fix copying smart link from renderer to editor

## 2.11.2

### Patch Changes

- [patch][1b12e59bfd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1b12e59bfd):

  ED-6917, SL-260: support drag and drop of smart links

## 2.11.1

### Patch Changes

- [patch][4c0fcec857](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4c0fcec857):

  ED-7059: fix trailing slashes for hyperlinks being removed, and smart links resolving

## 2.11.0

### Minor Changes

- [minor][ef787dba60](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ef787dba60):

  ED-7178: Promoting alignment and indentation to full schema

## 2.10.0

### Minor Changes

- [minor][3d9136e483](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3d9136e483):

  ED-7182: Promoting annotation to full schema

## 2.9.0

### Minor Changes

- [minor][d6c31deacf](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d6c31deacf):

  ED-6701 Upgrade prosemirror-view to 1.9.10 and prosemirror-inputrules to 1.0.4 for composition input improvements

## 2.8.1

### Patch Changes

- [patch][34c6df4fb8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/34c6df4fb8):

  adf-schema has been extended with one missing color, email-renderer now bundles up styles into .css file

## 2.8.0

### Minor Changes

- [minor][86bf524679](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/86bf524679):

  ED-7117, ED-7087: Fix copy pasting smart links out of editor. Fallback to HTML anchor tag if errors occur during rendering (e.g. no provider found).

## 2.7.1

### Patch Changes

- [patch][4931459ac1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4931459ac1):

  Revert removed by accident breakout mark

## 2.7.0

### Minor Changes

- [minor][0a7ce4f0e6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0a7ce4f0e6):

  ED-7046: promote layoutSection and layoutColumn from stage-0 to full schema

## 2.6.1

### Patch Changes

- [patch][aff59f9a99](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/aff59f9a99):

  ED-7045: promote mediaSingle width attribute from stage-0 to full schema

## 2.6.0

### Minor Changes

- [minor][a6a241d230](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a6a241d230):

  Breakout mark stage-0 -> full schema

## 2.5.10

### Patch Changes

- [patch][9886f4afa1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9886f4afa1):

  - [ED-7017] Improve table performance removing cellView from table

## 2.5.9

- [patch][f823890888](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f823890888):

  - ED-6970: Fix backspacing inside a layout removing all content.

## 2.5.8

- [patch][5ad66b6d1a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5ad66b6d1a):

  - [ED-6860] Revert prosemirror-view 1.8.9 bumps, this version was making the cursor typing slowly. this version is recreating all plugins when we use `EditorView.setProps`

## 2.5.7

- [patch][1ec6367e00](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1ec6367e00):

  - ED-6551 - Lists should correctly wrap adjacent floated content without overlapping

## 2.5.6

- [patch][80cf1c1e82](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/80cf1c1e82):

  - [ED-6654] Update prosemirror-view to 1.8.9 that fixes a few issues with mouse selections on prosemirror like click on table and the controls doesn't show up

## 2.5.5

- Updated dependencies [7c17b35107](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7c17b35107):
  - @uidu/editor-json-transformer@6.0.0
  - @uidu/editor-test-helpers@9.0.0

## 2.5.4

- [patch][0a4ccaafae](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0a4ccaafae):

  - Bump tslib

- [patch][0ac39bd2dd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0ac39bd2dd):

  - Bump tslib to 1.9

## 2.5.3

- [patch][583f5db46d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/583f5db46d):

  - Use tslib as dependency

## 2.5.2

- [patch][6695367885](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6695367885):

  - Revert emoji refactor

## 2.5.1

- [patch][c01f9e1cc7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c01f9e1cc7):

  - Standardise code-block class between editor/renderer. Fix bg color when code-block is nested within a table heading.

## 2.5.0

- [minor][64dd2ab46f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/64dd2ab46f):

  - ED-6558 Fix clicking to set the cursor placement after an inline node that's at the end of a line. Set the default style attribute of Status nodes to be empty instead of 'null'.

## 2.4.1

- [patch][97e555c168](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/97e555c168):

  - Revert "[ED-5259 - ED-6200] adds defaultMarks on tableNode (pull request #5259)"

## 2.4.0

- [minor][09a90e4af1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/09a90e4af1):

  - ED-6319 Supporting select media using gap cursor, fix behaviour of backspace key and gap cursor in media single with layout wrap-right.

## 2.3.2

- [patch][b425ea772b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b425ea772b):

  - Revert "ED-5505 add strong as default mark to table header (pull request #5291)"

## 2.3.1

- [patch][d13fad66df](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d13fad66df):

  - Enable esModuleInterop for typescript, this allows correct use of default exports

## 2.3.0

- [minor][02dd1f7287](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/02dd1f7287):

  - [ED-5505] Persists formatting to table cells and headers when toggling header row, column or applying any text formatting to empty cells.

## 2.2.1

- [patch][3f8a08fc88](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3f8a08fc88):

  Release a new version of adf-schema

## 2.2.0

- [minor][63133d8704](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/63133d8704):

  - [ED-6200] Add defaultMarks attribute on tableCell schema

## 2.1.0

- [minor][0fea11af41](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0fea11af41):

  - Email renderer supports numbered columns, adf-schema extended with colors

## 2.0.1

- [patch][205b101e2b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/205b101e2b):

  - ED-6230: bump prosemirror-view to 1.8.3; workaround Chrome bug with copy paste multiple images

## 2.0.0

- [major][9d5cc39394](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d5cc39394):

  - Dropped ES5 distributables from the typescript packages

## 1.7.1

- [patch][0825fbe634](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0825fbe634):

  - ED-6410: remove opacity from cells background color

## 1.7.0

- [minor][6380484429](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6380484429):

  - ED-6485 Support breakout mark on layout-section. Retain breakout mark when toggling list nested within columns.

## 1.6.2

- [patch][d18b085e2a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d18b085e2a):

  - Integrating truly upfront ID

## 1.6.1

- [patch][4d0c196597](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4d0c196597):

  - ED-6232 Fix copy-pasting a table with numbered column drops one column

## 1.6.0

- [minor][3672ec23ef](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3672ec23ef):

  - [ED-5788] Add new layout Breakout button for CodeBlock and Layout

## 1.5.5

- [patch][356de07a87](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/356de07a87):

  - Revert back to number for external media

## 1.5.4

- Updated dependencies [4af5bd2a58](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4af5bd2a58):
  - @uidu/editor-json-transformer@4.1.11
  - @uidu/editor-test-helpers@7.0.0

## 1.5.3

- [patch][775da616c6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/775da616c6):

  - [ED-5910] Keep width & height on media node as number

## 1.5.2

- [patch][e83a441140](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e83a441140):

  - Revert type change to width/height attributes for media node

## 1.5.1

- [patch][09696170ec](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/09696170ec):

  - Bumps prosemirror-utils to 0.7.6

## 1.5.0

- [minor][14fe1381ba](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/14fe1381ba):

  - ED-6118: ensure media dimensions are always integers, preventing invalid ADF

## 1.4.6

- [patch][557a2b5734](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/557a2b5734):

  - ED-5788: bump prosemirror-view and prosemirror-model

## 1.4.5

- [patch][4552e804d3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4552e804d3):

  - dismiss StatusPicker if status node is not selected

## 1.4.4

- [patch][adff2caed7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/adff2caed7):

  - Improve typings

## 1.4.3

- [patch][d10cf50721](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d10cf50721):

  - added fabric status to ADF full schema

## 1.4.2

- [patch][478a86ae8a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/478a86ae8a):

  - avoid using the same localId when pasting status

## 1.4.1

- [patch][2d6d5b6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2d6d5b6):

  - ED-5379: rework selecting media under the hood; maintain size and layout when copy-pasting

## 1.4.0

- [minor][c5ee0c8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c5ee0c8):

  - Added Annotation mark to ADF, editor & renderer

## 1.3.3

- [patch][060f2da](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/060f2da):

  - ED-5991: bumped prosemirror-view to 1.6.8

## 1.3.2

- [patch][a50c114](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a50c114):

  - ED-6026: unify attributes for blockCard and inlineCard; allow parseDOM using just 'data' attribute

## 1.3.1

- [patch][7d9ccd7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7d9ccd7):

  - fixed copy/paste status from renderer to editor

## 1.3.0

- [minor][cbcac2e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cbcac2e):

  - Promote smartcard nodes to full schema

## 1.2.0

- [minor][5b11b69](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5b11b69):

  - Allow mixed of cell types in a table row

## 1.1.0

- [minor][b9f8a8f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b9f8a8f):

  - Adding alignment options to media

## 1.0.1

- [patch][d7bfd60](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d7bfd60):

  - Rengenerate JSON schema after moving packages

## 1.0.0

- [major][1205725](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1205725):

  - Move schema to its own package
