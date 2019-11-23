# @atlaskit/renderer

## 0.1.6

### Patch Changes

- 8c80bd5: Changed how tsc compiles, should be faster to build
- Updated dependencies [8c80bd5]
  - @uidu/analytics@0.1.16
  - @uidu/avatar@0.2.21
  - @uidu/button@0.1.48
  - @uidu/code@0.1.16
  - @uidu/tooltip@0.1.19
  - @uidu/adf-schema@0.1.2
  - @uidu/adf-utils@0.4.1
  - @uidu/editor-common@0.1.9
  - @uidu/editor-json-transformer@0.1.2
  - @uidu/analytics-listeners@0.1.2
  - @uidu/analytics-namespaced-context@0.1.2
  - @uidu/status@0.1.2
  - @uidu/task-decision@0.1.3
  - @uidu/util-data-test@0.1.3
  - @uidu/field-range@0.1.18
  - @uidu/media-card@0.1.20
  - @uidu/media-filmstrip@0.1.20
  - @uidu/navigation@0.1.26

## 0.1.5

### Patch Changes

- ab9a25e: Added flags, wip filters

## 0.1.4

### Patch Changes

- Updated dependencies [6dd1ab6]
  - @uidu/adf-utils@0.4.0

## 0.1.3

### Patch Changes

- Updated dependencies [2b8b01c]
  - @uidu/adf-utils@0.3.0

## 0.1.2

### Patch Changes

- Updated dependencies [8cd67b9]
  - @uidu/adf-utils@0.2.0

## 0.1.1

### Patch Changes

- 9e09850: Bump all packages
- ffffbbe: Update dependencies

- Updated dependencies [9e09850]
- Updated dependencies [9e09850]
- Updated dependencies [9e09850]
- Updated dependencies [9e09850]
- Updated dependencies [ffffbbe]
  - @uidu/button@0.1.46
  - @uidu/code@0.1.15
  - @uidu/analytics@0.1.15
  - @uidu/avatar@0.2.20
  - @uidu/docs@0.1.34
  - @uidu/theme@0.1.18
  - @uidu/tooltip@0.1.16
  - @uidu/adf-schema@0.1.1
  - @uidu/adf-utils@0.1.1
  - @uidu/editor-common@0.1.8
  - @uidu/editor-json-transformer@0.1.1
  - @uidu/analytics-listeners@0.1.1
  - @uidu/analytics-namespaced-context@0.1.1
  - @uidu/mentions@0.1.9
  - @uidu/status@0.1.1
  - @uidu/task-decision@0.1.1
  - @uidu/util-data-test@0.1.1
  - @uidu/field-range@0.1.16
  - @uidu/media-card@0.1.19
  - @uidu/media-filmstrip@0.1.19
  - @uidu/navigation@0.1.25

## 51.1.0

### Minor Changes

- [minor][37af022ca2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/37af022ca2):

  Delay loading code blocks and task items- [minor][65ada7f318](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/65ada7f318):

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

- [patch][92801136b9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/92801136b9):

  [ED-7727] Improve not allowed sorting message when the table has merged cells. Now the message will show up only on the sorting icon avoiding conflicts with confluence comments- [patch][e0edc768ec](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e0edc768ec):

  ED-7743 special chars in heading will gets removed.- [patch][1ea48d7fd1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1ea48d7fd1):

  ED-7244 Fixed flaky test- [patch][dac3a85916](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dac3a85916):

  ED-7318 Prevent manipulating the DOM after the editor has been destroyed

## 51.0.0

### Major Changes

- [major][166eb02474](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/166eb02474):

  **Editor Bombazine Release**

  **BREAKING CHANGES**

  ​ **Renderer**

  - Change in contract for `eventHandlers.smartCard.onClick` prop:
        Old: onClick(url): void
  New: onClick(event, url): void

  ​ **ADF Schema**

      - Remove applicationCard node and action mark
      - Remove exposed `tableBackgroundBorderColors` in favour of `tableBackgroundBorderColor`


    **Affected editor components:**

    Tables, Media, Headings, Copy and Paste, Mobile

    **Anchor Links**

      - Headings in the renderer now show an anchor link on hover
        - Feature Flag:
          - allowHeadingAnchorLinks - [default: false]
        - https://product-fabric.atlassian.net/browse/ED-5137

    **Copy and Paste**

      - Fixed a bug where right click for copy image failed the second time that is pasted
        - https://product-fabric.atlassian.net/browse/MS-2324

    **Media**

      - Resizing/Aligning media inside Table
        - Feature Flag:
          - allowResizingInTables - [default: false]
        - https://product-fabric.atlassian.net/browse/ED-6359
      - You can now insert same file from MediaPicker twice
        - https://product-fabric.atlassian.net/browse/MS-2080
      - Implement media link in renderer
        - https://product-fabric.atlassian.net/browse/ED-7244

    **Tables**

      - Implement table sorting in renderer - [NEW BIG FEATURE][not enabled]
        - Feature Flag:
          - allowColumnSorting – [default: false]
        - https://product-fabric.atlassian.net/browse/ED-7392
      - Expanded table cell background color palette
        - https://product-fabric.atlassian.net/browse/ED-7201

    **Mobile**

      - Provide method for scrolling to actions, decisions and mentions
        - https://product-fabric.atlassian.net/browse/FM-2261
        - https://product-fabric.atlassian.net/browse/FM-2055
      - Improve Hybrid Editor Scrolling
        - https://product-fabric.atlassian.net/browse/FM-2212

    **Notable Bug fixes**

      - Fixed an issue where you couldn't split merged cells when a cell contained a media item
        - https://product-fabric.atlassian.net/browse/ED-6898
      - Pasting content with an emoji no longer duplicates the emoji as an image
        - https://product-fabric.atlassian.net/browse/ED-7513
      - Content inside of a table cell no longer overflows if table looses focus
        - https://product-fabric.atlassian.net/browse/ED-7529
      - Fixed an issue when adding rows and cols at the same time start adding infinite columns
        - https://product-fabric.atlassian.net/browse/ED-7700- [major] [40ead387ef](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/40ead387ef):

ED-7532 Expose ability to cancel default browser behavior when clicking Smart Links- [major][80adfefba2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/80adfefba2):

Remove applicationCard node and action mark

### Minor Changes

- [minor][9cddedc62f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9cddedc62f):

  ED-7244 added hover effects for media link in renderer- [minor][3f1c7dd26a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3f1c7dd26a):

  [ED-7392] Add sort table by column on renderer behind allowColumnSorting feature flag
  [ED-7392] Extract common methods to sort table

- [minor][decd6fceea](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/decd6fceea):

  ED-5137 added heading anchor link

  You can now use the `allowHeadingAnchorLinks` prop to display heading anchor links in renderer, next to all top level headings.
  There is also an existing property called `disableHeadingIDs`, when you set both `disableHeadingIDs` and `allowHeadingAnchorLinks` to false, the anchor link button will not display, however the heading anchor id will still be in the DOM.

  Note: This feature is only enabled for top level headings(e.g. not nested in other blocks like table).

### Patch Changes

- [patch][f9584ff209](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f9584ff209):

  ED-7244 updated hover animation style- [patch][030e778af9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/030e778af9):

  pass contextId to media card

- Updated dependencies [1194ad5eb3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1194ad5eb3):
  - @uidu/adf-utils@7.0.0
  - @uidu/editor-common@41.0.0
  - @uidu/editor-json-transformer@6.3.3
  - @uidu/editor-test-helpers@10.0.0
  - @uidu/adf-schema@4.0.0

## 50.0.2

- Updated dependencies [8d0f37c23e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8d0f37c23e):
  - @atlaskit/navigation-next@6.6.2
  - @uidu/mentions@18.15.1
  - @uidu/task-decision@15.3.2
  - @atlaskit/avatar@17.0.0
  - @uidu/theme@9.2.2
  - @atlaskit/profilecard@12.0.9

## 50.0.1

- Updated dependencies [af72468517](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/af72468517):
  - @uidu/editor-common@40.0.1
  - @atlaskit/media-client@2.1.2
  - @atlaskit/media-core@30.0.14
  - @atlaskit/media-filmstrip@34.3.6
  - @atlaskit/media-test-helpers@25.1.1
  - @atlaskit/media-card@65.0.0
  - @atlaskit/analytics-listeners@6.2.0

## 50.0.0

### Major Changes

- [major][08ec269915](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/08ec269915):

  ED-7532 Expose ability to cancel default browser behaviour when clicking Smart Links within the Mobile Renderer.

## 49.9.3

### Patch Changes

- [patch][6b9ed8f471](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6b9ed8f471):

  Export and consume validator from editor-common

## 49.9.2

### Patch Changes

- [patch][b0804f563f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b0804f563f):

  Fix default export of text serializer

## 49.9.1

### Patch Changes

- [patch][8b07822f8a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8b07822f8a):

  Add entry-point for text-serializer

## 49.9.0

### Minor Changes

- [minor][c6efb2f5b6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c6efb2f5b6):

  Prefix the legacy lifecycle methods with UNSAFE\_\* to avoid warning in React 16.9+

  More information about the deprecation of lifecycles methods can be found here:
  https://reactjs.org/blog/2018/03/29/react-v-16-3.html#component-lifecycle-changes

## 49.8.3

### Patch Changes

- [patch][097b696613](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/097b696613):

  Components now depend on TS 3.6 internally, in order to fix an issue with TS resolving non-relative imports as relative imports

## 49.8.2

### Patch Changes

- [patch][0d7d459f1a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0d7d459f1a):

  Fixes type errors which were incompatible with TS 3.6

## 49.8.1

### Patch Changes

- [patch][ecca4d1dbb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ecca4d1dbb):

  Upgraded Typescript to 3.3.x

## 49.8.0

### Minor Changes

- [minor][d438397a89](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d438397a89):

  ## Editor Azlon Release

  ### Affected editor components:

  Tables, Media, Smart Cards, Extensions, Analytics, Copy and Paste, Code Block, Undo, Emoji

  ### Performance

  - Reduce number of wrapping nodes in table cells. – [table][affects: wrapping, overflow, resizing]
    - https://product-fabric.atlassian.net/browse/ED-7288
  - Cache resizeState in pluginState to avoid expensive DOM operations. – [table][affects: resizing]
    - https://product-fabric.atlassian.net/browse/ED-7343
  - Delay MutationObserver initialization in table. – [table][affects: initial table rendering, size adjustment on initial render]
    - https://product-fabric.atlassian.net/browse/ED-7436
  - Improve the way we handle mouse events in table – [table][affects: column drag handlers, table controls, resizing]
    - https://product-fabric.atlassian.net/browse/ED-7342

  ### SmartCards

  - Pending and error states do not pass onClick prop
    - https://product-fabric.atlassian.net/browse/SL-359
  - Make toolbars consistent between blue link and smart link – [affects: link and smart link]
    - https://product-fabric.atlassian.net/browse/ED-7157

  ### Mention Highlights

  Not clear how to test. – [affects: all type aheads, mention type ahead]

  ### Emoji Refactor

  Emoji has been rewritten to use common TypeAhead plugin (same as quick insert and mention). Need to thoroughly look at emoji typeahead, e.g. typing ":" and inserting emojis...

  - https://product-fabric.atlassian.net/browse/ED-5369

  ### Copy and Paste

  - Copying text & images from Google doc changes formatting on paste [affects: media]
    - https://product-fabric.atlassian.net/browse/ED-7338
  - Pasted code block does not persist selected language – [affects: code block]
    - https://product-fabric.atlassian.net/browse/ED-7050
  - Copy and paste media

  ### Tables

  - Table add 40+ blank columns
    - https://product-fabric.atlassian.net/browse/ED-7031
  - Implement Table Sorting in Edit Mode – [NEW BIG FEATURE][not enabled]
    - Feature flag:
      - allowColumnSorting – [default: false]
    - https://product-fabric.atlassian.net/browse/ED-7391

  ### Analytics

  - Fire undo events – [affects: undo]
    - https://product-fabric.atlassian.net/browse/ED-7276
  - Make all insert events set analytics meta
    - https://product-fabric.atlassian.net/browse/ED-7277

  ### Notable Bug fixes

  - Issue with ctrl+z [affects: undo on different languages, e.g. Russian keyboard]
    - https://product-fabric.atlassian.net/browse/ED-7310

- [minor][5ed73a70a9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5ed73a70a9):

  ## Editor Azlon Release

  TODO: RELEASE NOTES

### Patch Changes

- [patch][48de0e74ae](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/48de0e74ae):

  add missing attrs to MediaSingle node for copy and paste

## 49.7.10

- Updated dependencies [3624730f44](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3624730f44):
  - @uidu/editor-common@39.17.4
  - @atlaskit/media-client@2.0.2
  - @atlaskit/media-core@30.0.11
  - @atlaskit/media-filmstrip@34.3.3
  - @atlaskit/media-test-helpers@25.0.2
  - @atlaskit/media-card@64.0.0

## 49.7.9

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

## 49.7.8

- Updated dependencies [69586b5353](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/69586b5353):
  - @uidu/editor-test-helpers@9.11.6
  - @atlaskit/media-card@63.3.11
  - @atlaskit/media-client@2.0.1
  - @atlaskit/media-core@30.0.10
  - @atlaskit/media-filmstrip@34.3.2
  - @atlaskit/media-test-helpers@25.0.0

## 49.7.7

- Updated dependencies [ee804f3eeb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ee804f3eeb):
  - @uidu/editor-common@39.17.2
  - @atlaskit/media-card@63.3.9
  - @atlaskit/media-core@30.0.9
  - @atlaskit/media-filmstrip@34.3.1
  - @atlaskit/media-test-helpers@24.3.5
  - @atlaskit/media-client@2.0.0

## 49.7.6

### Patch Changes

- [patch][80a3f4224a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/80a3f4224a):

  fix: ensure smart cards lazily load correctly

## 49.7.5

### Patch Changes

- [patch][6164bc2629](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6164bc2629):

  ED-6806 Move 'calcTableColumnWidths' from adf-schema into editor-common

  BREAKING CHANGE

  We move 'calcTableColumnWidths' helper from adf-schema into our helper library editor-common, you can use it from editor-common in the same way:

  Before:

  ```javascript
  import { calcTableColumnWidths } from '@uidu/adf-schema';
  ```

  Now:

  ````javascript
  import { calcTableColumnWidths } from '@uidu/editor-common';
  ```- [patch] [d4223be707](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d4223be707):

  ED-6805 Fix table column widths calculation (renderer/confluence-transformer)
  ````

## 49.7.4

### Patch Changes

- [patch][a892339c19](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a892339c19):

  Give all editor decorations a key to prevent ProseMirror from re-rendering decorations constantly.

  Enables YAML language for codeblocks

## 49.7.3

### Patch Changes

- [patch][ba223c9878](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ba223c9878):

  ED-7267: Validate URLs passing through smart links- [patch][9f8ab1084b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9f8ab1084b):

  Consume analytics-next ts type definitions as an ambient declaration.

## 49.7.2

### Patch Changes

- [patch][bbff8a7d87](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bbff8a7d87):

  Fixes bug, missing version.json file

## 49.7.1

### Patch Changes

- [patch][18dfac7332](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/18dfac7332):

  In this PR, we are:

  - Re-introducing dist build folders
  - Adding back cjs
  - Replacing es5 by cjs and es2015 by esm
  - Creating folders at the root for entry-points
  - Removing the generation of the entry-points at the root
    Please see this [ticket](https://product-fabric.atlassian.net/browse/BUILDTOOLS-118) or this [page](https://hello.atlassian.net/wiki/spaces/FED/pages/452325500/Finishing+Atlaskit+multiple+entry+points) for further details

## 49.7.0

### Minor Changes

- [minor][92dd3a8d58](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/92dd3a8d58):

  Add media attrs to MediaSingle node on renderer

  This ensures we populate the clipboard with enough media information, that can be
  used later on editor side on paste event, to copy the file to the destination
  collection.

## 49.6.1

### Patch Changes

- [patch][4aed452b1b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4aed452b1b):

  ED-7041, SL-231: fix copying smart link from renderer to editor

## 49.6.0

### Minor Changes

- [minor][e9cdfa5aed](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e9cdfa5aed):

  ED-7188: Full width mode is now centre aligned.

## 49.5.0

### Minor Changes

- [minor][4a22a774a6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4a22a774a6):

  AUX-36 Add update support for extension handler

## 49.4.2

### Patch Changes

- [patch][229335aab3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/229335aab3):

  ED-7192 Fix wrong version of @atlaskit/analytics-namespaced-context inside renderer

## 49.4.1

- Updated dependencies [06326ef3f7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/06326ef3f7):
  - @uidu/docs@8.1.3
  - @uidu/button@13.0.9
  - @atlaskit/navigation-next@6.3.2
  - @uidu/editor-common@39.13.2
  - @uidu/editor-test-helpers@9.5.2
  - @uidu/mentions@18.6.2
  - @atlaskit/status@0.9.3
  - @uidu/task-decision@15.1.1
  - @atlaskit/media-card@63.3.1
  - @atlaskit/media-filmstrip@34.2.2
  - @atlaskit/media-test-helpers@24.1.2
  - @atlaskit/smart-card@12.2.3
  - @atlaskit/profilecard@12.0.1
  - @atlaskit/icon@19.0.0

## 49.4.0

### Minor Changes

- [minor][1bc0c48926](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1bc0c48926):

  uploadContext and viewContext fields of MediaProvider (part of Editor and Renderer props) are deprecated. New fields uploadMediaClientConfig and viewMediaClientConfig should be used from now on.

## 49.3.0

### Minor Changes

- [minor][241a14694e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/241a14694e):

  IMPORTANT! This release accidentally released breaking changes.
  MediaProvider's field `viewContext` was replaced with `uploadMediaClientConfig`.
  This was fixed in the following version 49.4.0.

  Minor change: Add RUM to renderer

## 49.2.0

### Minor Changes

- [minor][86bf524679](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/86bf524679):

  ED-7117, ED-7087: Fix copy pasting smart links out of editor. Fallback to HTML anchor tag if errors occur during rendering (e.g. no provider found).

## 49.1.2

- Updated dependencies [2b333a4c6d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2b333a4c6d):
  - @uidu/editor-common@39.8.7
  - @atlaskit/profilecard@12.0.0

## 49.1.1

### Patch Changes

- [patch][0438f37f2c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0438f37f2c):

  ED-7105 Fix issue where images in full-width mode page could be a different size between the editor and renderer

## 49.1.0

### Minor Changes

- [minor][fec7d4576f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fec7d4576f):

  Bump new version of @uidu/mentions to other AK packages to get correct i18n strings

## 49.0.1

- Updated dependencies [393fb6acd2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/393fb6acd2):
  - @uidu/editor-test-helpers@9.4.1
  - @atlaskit/smart-card@12.0.0

## 49.0.0

### Major Changes

- [major][ff85c1c706](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ff85c1c706):

  Extracted email renderer outside react renderer

## 48.8.2

- Updated dependencies [a40f54404e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a40f54404e):
  - @uidu/editor-common@39.8.2
  - @atlaskit/profilecard@11.0.0

## 48.8.1

### Patch Changes

- [patch][ec0197518f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ec0197518f):

  Fix incorrect date import path

## 48.8.0

### Minor Changes

- [minor][11a8112851](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/11a8112851):

  ED-6991 Fire analytics event for renderer started

  Set up analytics v3 in renderer

## 48.7.3

- Updated dependencies [cfc3c8adb3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cfc3c8adb3):
  - @uidu/docs@8.1.2
  - @uidu/button@13.0.8
  - @atlaskit/navigation-next@6.0.8
  - @uidu/editor-common@39.7.2
  - @uidu/editor-test-helpers@9.3.9
  - @uidu/mentions@18.3.1
  - @atlaskit/status@0.9.2
  - @uidu/task-decision@15.0.3
  - @atlaskit/media-card@63.1.5
  - @atlaskit/media-filmstrip@34.2.1
  - @atlaskit/media-test-helpers@24.0.3
  - @atlaskit/smart-card@11.1.6
  - @atlaskit/profilecard@10.2.6
  - @atlaskit/field-range@7.0.4
  - @atlaskit/icon@18.0.0

## 48.7.2

### Patch Changes

- [patch][750b4819e2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/750b4819e2):

  Email serializer can stub images to pass browser tests

## 48.7.1

- [patch][b0ef06c685](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b0ef06c685):

  - This is just a safety release in case anything strange happened in in the previous one. See Pull Request #5942 for details

## 48.7.0

- [minor][372235caca](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/372235caca):

  - Email renderer now renders media node

- Updated dependencies [9ecfef12ac](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9ecfef12ac):
- Updated dependencies [97bfe81ec8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/97bfe81ec8):
  - @uidu/editor-test-helpers@9.3.4
  - @atlaskit/media-card@63.1.0
  - @atlaskit/media-core@30.0.3
  - @atlaskit/media-filmstrip@34.1.2
  - @atlaskit/media-test-helpers@24.0.0
  - @uidu/docs@8.1.0
  - @atlaskit/field-range@7.0.2
  - @atlaskit/code@11.0.0

## 48.6.0

- [minor][21f5217343](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/21f5217343):

  - consume emoji new entrypoints in AK

## 48.5.0

- [minor][7089d49f61](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7089d49f61):

  - consume the new mention entrypoints

## 48.4.0

- [minor][9a1b2075e8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9a1b2075e8):

  - consume new Status entrypoints

## 48.3.0

- [minor][79f0ef0601](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/79f0ef0601):

  - Use strict tsconfig to compile editor packages

## 48.2.0

- [minor][8555107bfd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8555107bfd):

  - ensure that arbitary HTML does not get evaluated by email clients

## 48.1.4

- [patch][dfc7aaa563](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dfc7aaa563):

  - ED-6863: Fix the rendering of extensions in the renderer when they have breakout layouts.

## 48.1.3

- [patch][1ec6367e00](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1ec6367e00):

  - ED-6551 - Lists should correctly wrap adjacent floated content without overlapping

## 48.1.2

- [patch][5539fc187f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5539fc187f):

  - Email renderer - single-line codeBlock still has rounded corners

## 48.1.1

- Updated dependencies [ed3f034232](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ed3f034232):
  - @uidu/editor-test-helpers@9.1.3
  - @atlaskit/media-card@63.0.2
  - @atlaskit/media-core@30.0.1
  - @atlaskit/media-filmstrip@34.1.1
  - @atlaskit/media-test-helpers@23.0.0

## 48.1.0

- [minor][5a49043dac](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5a49043dac):

  - Enable strictPropertyInitialization in tsconfig.base

## 48.0.1

- [patch][8f2d13f0ec](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8f2d13f0ec):

  - Email renderer - nested lists do not have vertical margins

## 48.0.0

- [major][7c17b35107](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7c17b35107):

  - Updates react and react-dom peer dependencies to react@^16.8.0 and react-dom@^16.8.0. To use this package, please ensure you use at least this version of react and react-dom.

- Updated dependencies [7c17b35107](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7c17b35107):
  - @uidu/adf-utils@6.0.5
  - @uidu/adf-schema@2.5.5
  - @uidu/editor-common@39.0.0
  - @atlaskit/media-card@63.0.0
  - @atlaskit/media-filmstrip@34.0.0
  - @uidu/docs@8.0.0
  - @atlaskit/visual-regression@0.1.0
  - @uidu/button@13.0.0
  - @atlaskit/code@10.0.0
  - @atlaskit/field-range@7.0.0
  - @atlaskit/icon@17.0.0
  - @atlaskit/navigation-next@6.0.0
  - @uidu/theme@9.0.0
  - @uidu/editor-json-transformer@6.0.0
  - @uidu/editor-test-helpers@9.0.0
  - @atlaskit/analytics-listeners@6.0.0
  - @atlaskit/analytics-namespaced-context@4.0.0
  - @uidu/mentions@18.0.0
  - @atlaskit/status@0.9.0
  - @uidu/task-decision@15.0.0
  - @atlaskit/util-data-test@12.0.0
  - @atlaskit/media-core@30.0.0
  - @atlaskit/media-test-helpers@22.0.0
  - @atlaskit/smart-card@11.0.0
  - @atlaskit/profilecard@10.0.0

## 47.1.0

- [minor][69a8870b4b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/69a8870b4b):

  - adds support for line numbers in email renderer code blocks

## 47.0.0

- Updated dependencies [a1192ef860](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a1192ef860):
  - @uidu/editor-common@38.0.0
  - @atlaskit/media-card@62.0.0
  - @atlaskit/media-filmstrip@33.0.0
  - @uidu/editor-json-transformer@5.0.4
  - @uidu/editor-test-helpers@8.0.8
  - @uidu/task-decision@14.0.9
  - @atlaskit/util-data-test@11.1.9
  - @atlaskit/media-test-helpers@21.4.0
  - @atlaskit/media-core@29.3.0

## 46.0.1

- [patch][166ca915ac](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/166ca915ac):

  - ED-6737: Prevent default tables from going into overflow in the renderer straight away after publish.

  This issue was caused by dynamic sizing, a default table being created in 760 width and then being rendered in 680 width.

  Also included in this patch: Preventing the shadow appearing on the right hand side of the table, when there is no overflow.

## 46.0.0

- Updated dependencies [e7292ab444](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7292ab444):
  - @uidu/editor-common@37.0.0
  - @atlaskit/media-card@61.0.0
  - @atlaskit/media-filmstrip@32.0.0
  - @uidu/editor-json-transformer@5.0.3
  - @uidu/editor-test-helpers@8.0.7
  - @uidu/task-decision@14.0.8
  - @atlaskit/util-data-test@11.1.8
  - @atlaskit/media-test-helpers@21.3.0
  - @atlaskit/media-core@29.2.0

## 45.6.5

- [patch][8eeac8c104](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8eeac8c104):

  - ED-6725: Update renderer nodes when appearances changes

## 45.6.4

- [patch][9047a1921a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9047a1921a):

  - Bugfix of email renderer list vertical indentation

## 45.6.3

- [patch][a6fb248987](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a6fb248987):

  - ED-6639 Align lists styles between editor & renderer

## 45.6.2

- [patch][0d23e11834](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0d23e11834):

  - ED-6736 Prevent extensions with specified width from overflowing between layout cols.

## 45.6.1

- Updated dependencies [9c0b4744be](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9c0b4744be):
  - @uidu/docs@7.0.3
  - @uidu/button@12.0.3
  - @atlaskit/code@9.0.1
  - @atlaskit/field-range@6.0.4
  - @atlaskit/icon@16.0.9
  - @atlaskit/navigation-next@5.1.5
  - @uidu/editor-common@36.1.12
  - @uidu/mentions@17.6.7
  - @atlaskit/status@0.8.3
  - @uidu/task-decision@14.0.5
  - @atlaskit/media-card@60.0.3
  - @atlaskit/media-filmstrip@31.0.4
  - @atlaskit/smart-card@10.2.4
  - @atlaskit/profilecard@9.0.2
  - @uidu/theme@8.1.7

## 45.6.0

- [minor][ca3c087624](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ca3c087624):

  - ED-6606: Add 'full-width' appearance to renderer

  Example:

  ```js
  import Renderer from '@uidu/renderer';

  <Renderer document={...} appearance="full-width" />
  ```

## 45.5.1

- [patch][86d11a504b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/86d11a504b):

  - [ED-5837] Fix copy-paste table from renderer to editor to keep column widths

## 45.5.0

- [minor][3d34915d24](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3d34915d24):

  - Fixed heading render for ADF->Email

## 45.4.3

- Updated dependencies [1e826b2966](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e826b2966):
  - @uidu/docs@7.0.2
  - @atlaskit/icon@16.0.8
  - @atlaskit/navigation-next@5.1.4
  - @uidu/theme@8.1.6
  - @atlaskit/analytics-listeners@5.0.3
  - @uidu/task-decision@14.0.3
  - @atlaskit/media-card@60.0.1
  - @atlaskit/media-core@29.1.4
  - @atlaskit/media-filmstrip@31.0.3
  - @atlaskit/smart-card@10.2.2
  - @atlaskit/profilecard@9.0.1
  - @atlaskit/field-range@6.0.3
  - @uidu/button@12.0.0

## 45.4.2

- [patch][c01f9e1cc7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c01f9e1cc7):

  - Standardise code-block class between editor/renderer. Fix bg color when code-block is nested within a table heading.

## 45.4.1

- [patch][55e47676aa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/55e47676aa):

  - revert update status code splits in Renderer/Editor which causes component dist to be broken

## 45.4.0

- [minor][969915d261](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/969915d261):

  - update status import entrypoints in Renderer/editor

## 45.3.3

- [patch][32317ff8f3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/32317ff8f3):

  - MS-1633 Renderer passes a list of files and external images to a Card to be opened with Media Viewer

## 45.3.2

- [patch][0ff405bd0f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0ff405bd0f):

  - Removed CardView and CardViewLoader from public APIs and replaced it with light-weight and stateless CardLoading and CardError components. Handling of external images is now done by Card component itself using ExternalImageIdentifier interface.

  If you’ve been using CardView for loading:

  ```js
  <CardView status="loading" mediaItemType="file" dimensions={cardDimensions} />
  ```

  Now you can use new component:

  ```js
  <CardLoading dimensions={cardDimensions} />
  ```

  If you were using CardView to show an error

  ```js
  <CardView status="error" mediaItemType={type} dimensions={cardDimensions} />
  ```

  Now you can use new component:

  ```js
  <CardError dimensions={cardDimensions} />
  ```

  In case you were using CardView to show image with known external URI:

  ```js
  <CardView status="complete" dataURI={dataURI} metadata={metadata} />
  ```

  You will have to find a way to switch to using Card component using ExternalImageIdentifier interface:

  ```js
  <Card identifier={identifier} context={context} />
  ```

## 45.3.1

- [patch][823d44ebb0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/823d44ebb0):

  - ED-6667 Enfoce consistent whitespace between renderer & editor

## 45.3.0

- [minor][7a656ef460](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7a656ef460):

  - Email renderer - tables now honor table widths

## 45.2.4

- [patch][370476ca07](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/370476ca07):

  - ED-6674: fix table shadow overlapping inline comments

## 45.2.3

- [patch][d13fad66df](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d13fad66df):

  - Enable esModuleInterop for typescript, this allows correct use of default exports

## 45.2.2

- Updated dependencies [bfca144ea5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bfca144ea5):
  - @uidu/editor-common@36.1.1
  - @atlaskit/profilecard@9.0.0

## 45.2.1

- [patch][acfd88ba22](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/acfd88ba22):

  - ED-6639 Align lists styles between editor & renderer

## 45.2.0

- [minor][b6f4afdec5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b6f4afdec5):

  - add date renderer

## 45.1.0

- [minor][827ed599a0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/827ed599a0):

  - add placeholders for media nodes

## 45.0.0

- Updated dependencies [c2c36de22b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c2c36de22b):
  - @uidu/editor-common@36.0.0
  - @atlaskit/media-card@59.0.0
  - @atlaskit/media-filmstrip@31.0.0
  - @uidu/editor-json-transformer@5.0.2
  - @uidu/editor-test-helpers@8.0.3
  - @uidu/task-decision@14.0.1
  - @atlaskit/util-data-test@11.1.5
  - @atlaskit/media-test-helpers@21.1.0
  - @atlaskit/media-core@29.1.0

## 44.7.0

- [minor][001fa9a7d0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/001fa9a7d0):

  - render adf - email actions and decisions

## 44.6.1

- [patch][106d046114](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/106d046114):

  - Fix issue with media-viewer opening in CC on inline video player controlls clicked

## 44.6.0

- [minor][1593822e4d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1593822e4d):

  - CS-857 Email renderer puts placeholders in place of extensions

## 44.5.0

- [minor][e6f58b1837](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e6f58b1837):

  - Email renderer layout column and section support

## 44.4.3

- Updated dependencies [9c316bd8aa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9c316bd8aa):
  - @uidu/editor-common@35.1.3
  - @atlaskit/media-core@29.0.2
  - @atlaskit/media-filmstrip@30.0.2
  - @atlaskit/media-test-helpers@21.0.3
  - @atlaskit/media-card@58.0.0

## 44.4.2

- Updated dependencies [eb4323c388](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/eb4323c388):
  - @atlaskit/util-data-test@11.1.4
  - @uidu/task-decision@14.0.0

## 44.4.1

- Updated dependencies [97abf5e006](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/97abf5e006):
  - @atlaskit/status@0.8.0

## 44.4.0

- [minor][1b3c18ae43](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1b3c18ae43):

  - CS-856: Create no-op nodes and marks for email renderer

## 44.3.0

- [minor][0fea11af41](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0fea11af41):

  - Email renderer supports numbered columns, adf-schema extended with colors

## 44.2.1

- [patch][ea6b08700c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ea6b08700c):

  - ED-6245: Ensure extensions scroll + overflow when they may break out of their parent container.

## 44.2.0

- [minor][d91db66a8f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d91db66a8f):

  - add support for block and inline smart cards in ADF to email renderer

## 44.1.0

- [minor][b4ce89e3cb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b4ce89e3cb):

  - improve the display of info panels in email renderer

## 44.0.3

- [patch][abd1e85008](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/abd1e85008):

  - ED-6536: Fixes non-resized tables accidently getting a width applied.

## 44.0.2

- [patch][1bcaa1b991](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1bcaa1b991):

  - Add npmignore for index.ts to prevent some jest tests from resolving that instead of index.js

## 44.0.1

- Updated dependencies [b684722884](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b684722884):
  - @uidu/mentions@17.1.0
  - @atlaskit/status@0.7.0
  - @uidu/task-decision@13.1.0
  - @atlaskit/util-data-test@11.1.0

## 44.0.0

- [major][9d5cc39394](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d5cc39394):

  - Dropped ES5 distributables from the typescript packages

- Updated dependencies [9d5cc39394](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d5cc39394):
  - @atlaskit/profilecard@8.0.2
  - @uidu/docs@7.0.1
  - @atlaskit/icon@16.0.5
  - @atlaskit/navigation-next@5.0.1
  - @uidu/theme@8.0.1
  - @uidu/editor-common@35.0.0
  - @atlaskit/media-card@57.0.0
  - @atlaskit/media-filmstrip@30.0.0
  - @atlaskit/field-range@6.0.1
  - @uidu/button@11.0.0
  - @uidu/adf-schema@2.0.0
  - @uidu/editor-json-transformer@5.0.0
  - @uidu/editor-test-helpers@8.0.0
  - @atlaskit/analytics-listeners@5.0.0
  - @atlaskit/analytics-namespaced-context@3.0.0
  - @uidu/mentions@17.0.0
  - @atlaskit/status@0.6.0
  - @uidu/task-decision@13.0.0
  - @atlaskit/util-data-test@11.0.0
  - @atlaskit/media-core@29.0.0
  - @atlaskit/media-test-helpers@21.0.0
  - @atlaskit/smart-card@10.0.0

## 43.1.0

- [minor][feec817d38](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/feec817d38):

  - add email renderer for status

## 43.0.1

- [patch][5b226754b8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5b226754b8):

  - ED-5939: Replace SizeDetector with WidthDetector in all editor components

## 43.0.0

- Updated dependencies [7ab3e93996](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7ab3e93996):
  - @uidu/editor-common@34.0.0
  - @uidu/editor-test-helpers@7.0.6
  - @atlaskit/media-card@56.0.0
  - @atlaskit/media-filmstrip@29.0.0
  - @atlaskit/media-test-helpers@20.1.8
  - @uidu/editor-json-transformer@4.3.5
  - @uidu/task-decision@12.0.1
  - @atlaskit/util-data-test@10.2.5
  - @atlaskit/media-core@28.0.0

## 42.0.1

- Updated dependencies [72c6f68226](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/72c6f68226):
  - @atlaskit/util-data-test@10.2.4
  - @uidu/task-decision@12.0.0

## 42.0.0

- [major][4d17df92f8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4d17df92f8):

  - ED-6484: Remove the 'inline-comment' appearance from Editor.

## 41.6.1

- [patch][8ed53a1cbb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8ed53a1cbb):

  - fix padding, wrapping for inline smart links.

## 41.6.0

- [minor][345bc86152](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/345bc86152):

  - Email renderer does not underline links anymore

## 41.5.0

- [minor][8ec7dd4cb2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8ec7dd4cb2):

  - email rendering - fixed a bug with em

## 41.4.0

- [minor][3a2836d6d7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3a2836d6d7):

  - move MediaViewer opening logic into Card by passing shouldOpenMediaViewer flag when there is no click handler defined

## 41.3.1

- Updated dependencies [dbff4fdcf9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dbff4fdcf9):
  - @uidu/editor-common@33.0.4
  - @atlaskit/profilecard@8.0.0

## 41.3.0

- [minor][b8d146fb27](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b8d146fb27):

  - CS-843 Email renderer codeblock support for outlook

## 41.2.1

- Updated dependencies [76299208e6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/76299208e6):
  - @uidu/button@10.1.3
  - @atlaskit/icon@16.0.4
  - @uidu/editor-json-transformer@4.3.3
  - @atlaskit/analytics-listeners@4.2.1
  - @atlaskit/analytics-namespaced-context@2.2.1
  - @uidu/mentions@16.2.2
  - @atlaskit/status@0.5.1
  - @uidu/task-decision@11.3.1
  - @atlaskit/util-data-test@10.2.3
  - @atlaskit/media-card@55.0.2
  - @atlaskit/media-core@27.2.3
  - @atlaskit/media-filmstrip@28.0.1
  - @atlaskit/smart-card@9.11.3
  - @atlaskit/media-test-helpers@20.1.7
  - @uidu/editor-common@33.0.3
  - @uidu/docs@7.0.0
  - @atlaskit/code@9.0.0
  - @atlaskit/field-range@6.0.0
  - @atlaskit/navigation-next@5.0.0
  - @atlaskit/size-detector@7.0.0
  - @uidu/theme@8.0.0
  - @atlaskit/profilecard@7.0.0

## 41.2.0

- [minor][bdde0f4f25](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bdde0f4f25):

  - CS-858: Alignment support for email html rendering

## 41.1.1

- Updated dependencies [4072865c1c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4072865c1c):
  - @atlaskit/status@0.5.0
  - @uidu/task-decision@11.3.0

## 41.1.0

- [minor][e385e90f31](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e385e90f31):

  - CS-840 Email renderer now supports indentations

## 41.0.1

- Updated dependencies [36bb743af0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/36bb743af0):
  - @atlaskit/status@0.4.0

## 41.0.0

- Updated dependencies [4aee5f3cec](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4aee5f3cec):
  - @uidu/editor-common@33.0.0
  - @atlaskit/media-card@55.0.0
  - @atlaskit/media-filmstrip@28.0.0
  - @uidu/editor-json-transformer@4.3.1
  - @uidu/editor-test-helpers@7.0.2
  - @uidu/task-decision@11.2.3
  - @atlaskit/util-data-test@10.2.2
  - @atlaskit/media-test-helpers@20.1.6
  - @atlaskit/media-core@27.2.0

## 40.1.1

- Updated dependencies [0de1251ad1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0de1251ad1):
  - @uidu/editor-common@32.4.3
  - @atlaskit/size-detector@6.0.0

## 40.1.0

- [minor][09e8eb968f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/09e8eb968f):

  - ED-6256: render media items with occurenceKey; ignore link cards

## 40.0.0

- [major][4a84fc40e0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4a84fc40e0):

  - ED-5766 Remove the deprecated 'message' appearance from Editor

## 39.0.2

- Updated dependencies [4af5bd2a58](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4af5bd2a58):
  - @uidu/editor-json-transformer@4.1.11
  - @uidu/adf-schema@1.5.4
  - @uidu/editor-common@32.0.2
  - @uidu/mentions@16.2.1
  - @atlaskit/status@0.3.6
  - @uidu/editor-test-helpers@7.0.0

## 39.0.1

- [patch][ca17040178](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ca17040178):

  - ED-6243: Dont use breakpoint width calculations for tables in renderer

## 39.0.0

- [patch][5b5ae91921](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5b5ae91921):

  - Require Identifier type from media-core instead of media-card

- Updated dependencies [fc6164c8c2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fc6164c8c2):
- Updated dependencies [190c4b7bd3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/190c4b7bd3):
  - @uidu/editor-common@32.0.0
  - @atlaskit/media-card@54.0.0
  - @atlaskit/media-filmstrip@27.0.0
  - @uidu/editor-json-transformer@4.1.10
  - @uidu/editor-test-helpers@6.3.22
  - @uidu/task-decision@11.2.1
  - @atlaskit/util-data-test@10.2.1
  - @atlaskit/media-test-helpers@20.1.5
  - @atlaskit/media-core@27.1.0

## 38.0.8

- [patch][e609e6d78c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e609e6d78c):

  - FM-1464: Add callback to ReactRenderer.onComplete to notify native renderBridge

## 38.0.7

- Updated dependencies [46dfcfbeca](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/46dfcfbeca):
  - @uidu/editor-common@31.1.1
  - @atlaskit/media-core@27.0.2
  - @atlaskit/media-filmstrip@26.1.2
  - @atlaskit/media-test-helpers@20.1.4
  - @atlaskit/media-card@53.0.0

## 38.0.6

- [patch][05c5bf7a93](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/05c5bf7a93):

  - Dont user pointer cursor for external images in Cards

## 38.0.5

- [patch][6ebe368d95](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6ebe368d95):

  - Allow passing through renderer props

## 38.0.4

- [patch][fb61c590cf](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fb61c590cf):

  - ED-6173: stop renderer from sending useInlinePlayer to mediaGroup

## 38.0.3

- [patch][a1ad76375d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a1ad76375d):

  - ED-6123: scale down table columns by 15if table is bigger than renderer width

## 38.0.2

- [patch][557a2b5734](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/557a2b5734):

  - ED-5788: bump prosemirror-view and prosemirror-model

## 38.0.1

- [patch][fab72e17b1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fab72e17b1):

  - ED-6122: Handle TinyMCE migrated tables, where total table width is less than defined layout

## 38.0.0

- Updated dependencies [69c8d0c19c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/69c8d0c19c):
  - @uidu/editor-common@31.0.0
  - @uidu/editor-test-helpers@6.3.17
  - @atlaskit/media-card@52.0.0
  - @atlaskit/media-filmstrip@26.0.0
  - @atlaskit/media-test-helpers@20.1.0
  - @uidu/editor-json-transformer@4.1.8
  - @uidu/task-decision@11.1.8
  - @atlaskit/util-data-test@10.0.36
  - @atlaskit/media-core@27.0.0

## 37.0.3

- [patch][e2eca7e6d5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e2eca7e6d5):

  - ED-6111: fixed renderer rendering unsupported content with some ADF

## 37.0.2

- Updated dependencies [07a187bb30](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/07a187bb30):
  - @uidu/editor-test-helpers@6.3.14
  - @atlaskit/media-card@51.0.2
  - @atlaskit/media-core@26.2.1
  - @atlaskit/media-filmstrip@25.0.2
  - @atlaskit/media-test-helpers@20.0.0

## 37.0.1

- Updated dependencies [d7ef59d432](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d7ef59d432):
  - @uidu/docs@6.0.1
  - @uidu/button@10.1.2
  - @atlaskit/navigation-next@4.1.2
  - @uidu/editor-common@30.0.1
  - @uidu/editor-test-helpers@6.3.13
  - @uidu/mentions@16.0.1
  - @atlaskit/status@0.3.2
  - @uidu/task-decision@11.1.7
  - @atlaskit/media-card@51.0.1
  - @atlaskit/media-filmstrip@25.0.1
  - @atlaskit/media-test-helpers@19.1.1
  - @atlaskit/smart-card@9.4.1
  - @atlaskit/profilecard@6.1.5
  - @atlaskit/field-range@5.0.14
  - @atlaskit/icon@16.0.0

## 37.0.0

- [minor][b1627a5837](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b1627a5837):

  - Enable inline video player in Editor and Renderer

- Updated dependencies [85d5d168fd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/85d5d168fd):
  - @uidu/editor-common@30.0.0
  - @atlaskit/media-card@51.0.0
  - @atlaskit/media-filmstrip@25.0.0
  - @uidu/editor-json-transformer@4.1.7
  - @uidu/editor-test-helpers@6.3.12
  - @uidu/task-decision@11.1.6
  - @atlaskit/util-data-test@10.0.34
  - @atlaskit/media-test-helpers@19.1.0
  - @atlaskit/media-core@26.2.0

## 36.0.0

- Updated dependencies [dadef80](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dadef80):
- Updated dependencies [3ad16f3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3ad16f3):
  - @uidu/editor-common@29.0.0
  - @atlaskit/media-card@50.0.0
  - @atlaskit/media-filmstrip@24.0.0
  - @uidu/editor-json-transformer@4.1.6
  - @uidu/editor-test-helpers@6.3.11
  - @uidu/task-decision@11.1.5
  - @atlaskit/util-data-test@10.0.33
  - @atlaskit/media-test-helpers@19.0.0
  - @atlaskit/media-core@26.1.0

## 35.1.0

- [minor][be6313e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/be6313e):

  - ED-5477 Support rendering of inline code together with other marks

## 35.0.5

- [patch][c5ee0c8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c5ee0c8):

  - Added Annotation mark to ADF, editor & renderer

## 35.0.4

- [patch][dfdfaf2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dfdfaf2):

  - ED-5493 Fix Media Cards bigger in renderer than editor

## 35.0.3

- [patch][48abc90](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/48abc90):

  - Fixed date border radius in renderer

## 35.0.2

- [patch][609d32d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/609d32d):

  - ED-5966 Fix issue where renderer incorrectly displayed numbered tables without headers

## 35.0.1

- Updated dependencies [0c116d6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0c116d6):
  - @uidu/editor-json-transformer@4.1.5
  - @uidu/editor-test-helpers@6.3.8
  - @uidu/editor-common@28.0.2
  - @atlaskit/util-data-test@10.0.32
  - @uidu/mentions@16.0.0

## 35.0.0

- Updated dependencies [cbb8cb5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cbb8cb5):
  - @uidu/editor-common@28.0.0
  - @uidu/editor-test-helpers@6.3.7
  - @atlaskit/media-card@49.0.0
  - @atlaskit/media-filmstrip@23.0.0
  - @atlaskit/media-test-helpers@18.9.1
  - @uidu/editor-json-transformer@4.1.4
  - @uidu/task-decision@11.1.4
  - @atlaskit/util-data-test@10.0.31
  - @atlaskit/media-core@26.0.0

## 34.0.0

- Updated dependencies [72d37fb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/72d37fb):
  - @uidu/editor-common@27.0.0
  - @uidu/editor-test-helpers@6.3.6
  - @atlaskit/media-card@48.0.0
  - @atlaskit/media-filmstrip@22.0.0
  - @uidu/editor-json-transformer@4.1.3
  - @uidu/task-decision@11.1.3
  - @atlaskit/util-data-test@10.0.30
  - @atlaskit/media-core@25.0.0
  - @atlaskit/media-test-helpers@18.9.0

## 33.0.7

- [patch][8db5ddc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8db5ddc):

  - ED-6002 Fixes overflowed layout column rendering in renderer

## 33.0.6

- [patch][38f3592](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/38f3592):

  - ED-5990 Fixes logic for merging marks

## 33.0.5

- [patch][f112576](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f112576):

  - ED-6001: fix react error "Maximum update depth exceeded" in renderer

## 33.0.4

- Updated dependencies [e858305](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e858305):
  - @uidu/editor-json-transformer@4.1.2
  - @uidu/editor-test-helpers@6.3.5
  - @uidu/task-decision@11.1.2
  - @uidu/editor-common@26.0.0

## 33.0.3

- Updated dependencies [00c648e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/00c648e):
- Updated dependencies [a17bb0e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a17bb0e):
- Updated dependencies [99f08a0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/99f08a0):
  - @atlaskit/status@0.3.0

## 33.0.2

- [patch][40510b0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/40510b0):

  - Add panel type to fix copy-paste

## 33.0.1

- Updated dependencies [135ed00](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/135ed00):
  - @uidu/editor-common@25.0.3
  - @atlaskit/media-core@24.7.2
  - @atlaskit/media-filmstrip@21.0.2
  - @atlaskit/media-test-helpers@18.7.2
  - @atlaskit/media-card@47.0.0

## 33.0.0

- Updated dependencies [b3738ea](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b3738ea):
  - @uidu/editor-common@25.0.0
  - @atlaskit/media-card@46.0.0
  - @atlaskit/media-filmstrip@21.0.0
  - @uidu/editor-json-transformer@4.1.1
  - @uidu/editor-test-helpers@6.3.4
  - @uidu/task-decision@11.1.1
  - @atlaskit/util-data-test@10.0.28
  - @atlaskit/media-test-helpers@18.7.0
  - @atlaskit/media-core@24.7.0

## 32.2.0

- [minor][b9f8a8f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b9f8a8f):

  - Adding alignment options to media

## 32.1.2

- [patch][95f98cc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/95f98cc):

  - User can click on a smart card to open a new window/tab

## 32.1.1

- [patch][d9815ba](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d9815ba):

  - ED-5888 Add dark mode for task-decision

## 32.1.0

- [minor][1205725](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1205725):

  - Move schema to its own package

## 32.0.0

- [patch][8ae67fc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8ae67fc):

  - Use stretchy-fit resizeMode for media card components instead of full-fit or undefined values;

- Updated dependencies [80f765b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/80f765b):
  - @uidu/editor-common@23.0.0
  - @atlaskit/media-card@45.0.0
  - @atlaskit/media-filmstrip@20.0.0
  - @uidu/editor-json-transformer@4.0.25
  - @uidu/editor-test-helpers@6.3.2
  - @uidu/task-decision@11.0.9
  - @atlaskit/util-data-test@10.0.26
  - @atlaskit/media-test-helpers@18.6.2
  - @atlaskit/media-core@24.6.0

## 31.1.4

- [patch][d3f3e19](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d3f3e19):

  - restored StatusContainer to editor-core, avoid re-rendering on event handlers, removed unused props in the renderer

- [patch][44cc61d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/44cc61d):

  - added native status analytics

## 31.1.3

- Updated dependencies [58b84fa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/58b84fa):
  - @uidu/button@10.1.1
  - @atlaskit/code@8.2.2
  - @atlaskit/field-range@5.0.12
  - @atlaskit/icon@15.0.2
  - @atlaskit/navigation-next@4.0.9
  - @atlaskit/size-detector@5.0.9
  - @uidu/theme@7.0.1
  - @uidu/editor-json-transformer@4.0.24
  - @atlaskit/analytics-listeners@4.1.4
  - @atlaskit/analytics-namespaced-context@2.1.5
  - @uidu/mentions@15.1.8
  - @atlaskit/status@0.2.10
  - @uidu/task-decision@11.0.8
  - @atlaskit/util-data-test@10.0.25
  - @atlaskit/media-card@44.1.3
  - @atlaskit/media-core@24.5.2
  - @atlaskit/media-filmstrip@19.0.3
  - @atlaskit/smart-card@9.0.4
  - @atlaskit/profilecard@6.1.2
  - @uidu/docs@6.0.0

## 31.1.2

- [patch][0623610](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0623610):

  - Display media singles with video inside as inline video player

## 31.1.1

- [patch][232238c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/232238c):

  - ED-5866: Turn off lazy loading for images on mobile.

## 31.1.0

- [minor][a1b03d0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a1b03d0):

  - ED-3890 Adds Indentation support on paragraphs and headings

## 31.0.7

- Updated dependencies [d13242d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d13242d):
  - @uidu/docs@5.2.3
  - @uidu/button@10.0.4
  - @atlaskit/code@8.2.1
  - @atlaskit/field-range@5.0.11
  - @atlaskit/icon@15.0.1
  - @uidu/editor-common@22.2.3
  - @uidu/mentions@15.1.7
  - @atlaskit/status@0.2.8
  - @uidu/task-decision@11.0.7
  - @atlaskit/smart-card@9.0.2
  - @atlaskit/profilecard@6.1.1
  - @uidu/theme@7.0.0

## 31.0.6

- [patch][3061b52](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3061b52):

  - AK-5723 - adjust files in package.json to ensure correct publishing of dist/package.json

## 31.0.5

- [patch][4c0c2a0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4c0c2a0):

  - Fix Cards throwing Error when client is not provided.

## 31.0.4

- Updated dependencies [df32968](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/df32968):
  - @uidu/editor-test-helpers@6.2.22
  - @atlaskit/smart-card@9.0.0

## 31.0.3

- Updated dependencies [ab9b69c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ab9b69c):
  - @atlaskit/smart-card@8.8.5
  - @uidu/docs@5.2.2
  - @uidu/button@10.0.1
  - @uidu/editor-common@22.0.2
  - @uidu/editor-test-helpers@6.2.21
  - @uidu/mentions@15.1.3
  - @atlaskit/status@0.2.6
  - @uidu/task-decision@11.0.6
  - @atlaskit/media-card@44.0.2
  - @atlaskit/media-filmstrip@19.0.2
  - @atlaskit/media-test-helpers@18.3.1
  - @atlaskit/profilecard@6.0.3
  - @atlaskit/icon@15.0.0

## 31.0.2

- Updated dependencies [6998f11](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6998f11):
  - @uidu/docs@5.2.1
  - @atlaskit/icon@14.6.1
  - @uidu/theme@6.2.1
  - @atlaskit/analytics-listeners@4.1.1
  - @uidu/task-decision@11.0.5
  - @atlaskit/media-card@44.0.1
  - @atlaskit/media-core@24.5.1
  - @atlaskit/media-filmstrip@19.0.1
  - @atlaskit/smart-card@8.8.4
  - @atlaskit/profilecard@6.0.2
  - @atlaskit/field-range@5.0.9
  - @uidu/button@10.0.0

## 31.0.1

- [patch][1c42021](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1c42021):

  - ED-5775: fix columns collapsing in renderer

## 31.0.0

- Updated dependencies [7e8b4b9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7e8b4b9):
  - @uidu/editor-common@22.0.0
  - @atlaskit/media-card@44.0.0
  - @atlaskit/media-filmstrip@19.0.0
  - @uidu/editor-json-transformer@4.0.22
  - @uidu/editor-test-helpers@6.2.19
  - @uidu/task-decision@11.0.4
  - @atlaskit/util-data-test@10.0.21
  - @atlaskit/media-test-helpers@18.3.0
  - @atlaskit/media-core@24.5.0

## 30.3.2

- [patch][030007e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/030007e):

  - ED-5776: fix number column when first column is resized

## 30.3.1

- [patch][f2cb9d9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f2cb9d9):

  - ED-5785: fix number column when header row is enabled

## 30.3.0

- [minor][1e5cd32](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e5cd32):

  - Make layouts stack on small screens

## 30.2.1

- Updated dependencies [9c0844d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9c0844d):
  - @uidu/editor-common@21.2.2
  - @atlaskit/profilecard@6.0.0

## 30.2.0

- [minor][14477fa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/14477fa):

  - Adding text alignment to editor and renderer

## 30.1.1

- [patch][b19b7bb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b19b7bb):

  - ED-5721 Adds support for rendering optional content

  Renderer can now handle empty headings, actions & decisions

## 30.1.0

- [minor][b440439](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b440439):

  - Add breakout mark to editor, renderer and adf-utils

## 30.0.1

- [patch][26027dd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/26027dd):

  - Upgrade react syntax highlighter to version that ships its own async loaded languages and supports SSR

## 30.0.0

- Updated dependencies [2c21466](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2c21466):
  - @uidu/editor-common@21.0.0
  - @atlaskit/media-card@43.0.0
  - @atlaskit/media-filmstrip@18.0.0
  - @uidu/editor-json-transformer@4.0.21
  - @uidu/editor-test-helpers@6.2.16
  - @uidu/task-decision@11.0.2
  - @atlaskit/util-data-test@10.0.20
  - @atlaskit/media-test-helpers@18.2.12
  - @atlaskit/media-core@24.4.0

## 29.5.2

- [patch][f6c3f01](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f6c3f01):

  - ED-5586: Removes padding from editor and renderer for mobile.

## 29.5.1

- Updated dependencies [04c7192](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/04c7192):
  - @uidu/editor-common@20.3.7
  - @atlaskit/media-core@24.3.1
  - @atlaskit/media-filmstrip@17.0.2
  - @atlaskit/media-test-helpers@18.2.11
  - @atlaskit/media-card@42.0.0

## 29.5.0

- [minor][ed15858](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ed15858):

  - ED-5552: Adds shadow to overflow elements in the renderer.

## 29.4.0

- [minor][abef80b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/abef80b):

  - ED-5527: apply max-width: 100% and pass container size to Card as dimension

## 29.3.1

- Updated dependencies [a6dd6e3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a6dd6e3):
  - @uidu/editor-common@20.3.1
  - @atlaskit/profilecard@5.0.0

## 29.3.0

- [minor][d793999](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d793999):

  - ED-5583: Add support for more EventHandlers in the renderer

  * Added event handlers for `Link` mark, `BlockCard` node and `InlineCard` node.
  * Removed `applicationCard` event handlers as this node no longer exists in the renderer.

## 29.2.2

- [patch][f3d067d" d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f3d067d"
  d):

  - Fix font size for numbered column in tables with dynamic text sizing

## 29.2.1

- [patch][8636991" d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8636991"
  d):

  - ED-5518: fix numbered column with merged rows

## 29.2.0

- [minor] Don't open external links in new window [2bb95c0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2bb95c0)

## 29.1.0

- This versions seems to have not published correctly, so we are republishing at 29.2.0

## 29.0.6

- [patch] Inline code should wrap [f1d9a54](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f1d9a54)

## 29.0.5

- [patch] Fix label for panels [621bf75](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/621bf75)

## 29.0.4

- [patch] ED-5513: render table that respects columns widths except on mobile [716bb9d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/716bb9d)

## 29.0.3

- [patch] Fix incorrect word-breaking for codeblocks in Safari. FM-1278 [9fef2a7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9fef2a7)

## 29.0.2

- [patch] Change breakpoints for dynamic text sizing [f660016](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f660016)

## 29.0.1

- [patch] ED-5523: fix rendering number column table with header column [f74c658](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f74c658)

## 29.0.0

- [major] Updated dependencies [b1ce691](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b1ce691)
  - @uidu/editor-common@20.0.0
  - @atlaskit/media-card@41.0.0
  - @atlaskit/media-filmstrip@17.0.0
  - @uidu/editor-json-transformer@4.0.18
  - @uidu/editor-test-helpers@6.2.7
  - @uidu/task-decision@11.0.1
  - @atlaskit/util-data-test@10.0.16
  - @atlaskit/media-core@24.3.0
  - @atlaskit/media-test-helpers@18.2.8

## 28.0.1

- [patch] Updated dependencies [8a1ccf2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8a1ccf2)
  - @atlaskit/util-data-test@10.0.15
  - @uidu/task-decision@11.0.0

## 28.0.0

- [major] Remove support for ApplicationCard [6e510d8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6e510d8)

## 27.2.2

- [patch] ED-5494: fix nested breakout nodes [1eaf1f1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1eaf1f1)

## 27.2.1

- [patch] Fixes not rendering whitespace for empty paragraphs. ED-5500 [b7e5935](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b7e5935)

## 27.2.0

- [minor] Replaces util-shared-styles with theme. ED-5351 [55a4f00](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/55a4f00)

## 27.1.1

- [patch] Move render document export into seperate file [e976cd8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e976cd8)

## 27.1.0

- [minor] Summary: Deprecate props, add support for new API. ED-5201 [00e4bb3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/00e4bb3)

## 27.0.1

- [patch] Async load highlighter languages [9102fa2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9102fa2)

## 27.0.0

- [major] Updated dependencies [2afa60d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2afa60d)
  - @uidu/editor-common@19.0.0
  - @atlaskit/media-card@39.0.0
  - @atlaskit/media-filmstrip@16.0.0
  - @uidu/editor-json-transformer@4.0.17
  - @uidu/editor-test-helpers@6.2.6
  - @uidu/task-decision@10.0.2
  - @atlaskit/util-data-test@10.0.14
  - @atlaskit/media-test-helpers@18.2.5
  - @atlaskit/media-core@24.2.0

## 26.0.1

- [patch] Upgrade react-syntax-highlighter again and use async loaded prism [260d66a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/260d66a)

## 26.0.0

- [major] Updated dependencies [8b2c4d3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8b2c4d3)
- [major] Updated dependencies [3302d51](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3302d51)
  - @uidu/editor-common@18.0.0
  - @atlaskit/media-card@38.0.0
  - @atlaskit/media-filmstrip@15.0.0
  - @uidu/editor-json-transformer@4.0.16
  - @uidu/editor-test-helpers@6.2.5
  - @uidu/task-decision@10.0.1
  - @atlaskit/util-data-test@10.0.12
  - @atlaskit/media-core@24.1.0
  - @atlaskit/media-test-helpers@18.2.3

## 25.0.0

- [major] Upgrade task and decisions and editor to use @uidu/analytics. Remove usage of @atlaskit/analytics. [23c7eca](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/23c7eca)

## 24.3.2

- [patch] Upgraded react-syntax-highlighter to 8.0.2 [7cc7000](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7cc7000)

## 24.3.1

- [patch] ED-5457: moving table css classnames to a const [2e1f627](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2e1f627)

## 24.3.0

- [minor] ED-5246 support image resizing [111d02f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/111d02f)

## 24.2.1

- [patch] Updated dependencies [65c6514](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/65c6514)
  - @uidu/docs@5.0.8
  - @uidu/editor-common@17.0.7
  - @uidu/mentions@15.0.10
  - @atlaskit/status@0.2.1
  - @uidu/task-decision@9.0.1
  - @atlaskit/media-card@37.0.1
  - @atlaskit/media-filmstrip@14.0.3
  - @atlaskit/media-test-helpers@18.2.1
  - @atlaskit/profilecard@4.0.10
  - @atlaskit/icon@14.0.0

## 24.2.0

- [minor] ED-5203 Added support for truncating the renderer with a fade out [bf07ac4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bf07ac4)

## 24.1.2

- [patch] Added code splits to the node types of the Renderer [8dd6e52](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8dd6e52)

## 24.1.1

- [patch] Updated dependencies [dae7792](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dae7792)
  - @uidu/editor-common@17.0.5
  - @atlaskit/media-core@24.0.2
  - @atlaskit/media-filmstrip@14.0.2
  - @atlaskit/smart-card@8.2.2
  - @atlaskit/media-card@37.0.0
  - @atlaskit/media-test-helpers@18.2.0

## 24.1.0

- [minor] FS-2963 When inserting a status, I can pick a colour from a predefined colour picker [a633d77](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a633d77)
- [patch] Updated dependencies [547b3d9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/547b3d9)
  - @atlaskit/status@0.2.0

## 24.0.1

- [patch] Numbered column in table should be able to fit number > 100 [7a43676](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7a43676)

## 24.0.0

- [major] Updated dependencies [927ae63](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/927ae63)
  - @uidu/editor-common@17.0.0
  - @atlaskit/util-data-test@10.0.10
  - @uidu/editor-test-helpers@6.1.2
  - @atlaskit/media-card@36.0.0
  - @atlaskit/media-filmstrip@14.0.0
  - @uidu/editor-json-transformer@4.0.12
  - @atlaskit/media-core@24.0.0
  - @atlaskit/media-test-helpers@18.0.0
  - @uidu/task-decision@9.0.0

## 23.0.1

- [patch] Updated dependencies [1be4bb8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1be4bb8)
  - @uidu/editor-common@16.2.1
  - @atlaskit/media-core@23.2.1
  - @atlaskit/media-filmstrip@13.0.2
  - @atlaskit/media-card@35.0.0

## 23.0.0

- [major] Add dynamic text sizing support to renderer and editor [2a6410f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2a6410f)

## 22.2.0

- [minor] Add support for tables with numbered columns. ED-4709 [cc19e25](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc19e25)

## 22.1.0

- [minor] FS-2961 Introduce status component and status node in editor [7fe2b0a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7fe2b0a)

## 22.0.0

- [major] Updated dependencies [6e1d642](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6e1d642)
  - @uidu/editor-common@16.0.0
  - @atlaskit/media-card@34.0.0
  - @atlaskit/media-filmstrip@13.0.0
  - @uidu/editor-json-transformer@4.0.11
  - @uidu/editor-test-helpers@6.0.9
  - @uidu/task-decision@8.1.9
  - @atlaskit/util-data-test@10.0.9
  - @atlaskit/media-core@23.2.0
  - @atlaskit/media-test-helpers@17.1.0

## 21.0.7

- [patch] Update TS to 3.0 [f68d367](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f68d367)
- [none] Updated dependencies [f68d367](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f68d367)
  - @atlaskit/media-test-helpers@17.0.2
  - @atlaskit/media-filmstrip@12.0.1
  - @atlaskit/media-core@23.1.1
  - @uidu/mentions@15.0.9
  - @uidu/editor-json-transformer@4.0.10
  - @uidu/editor-common@15.0.7
  - @atlaskit/media-card@33.0.2
  - @uidu/editor-test-helpers@6.0.8

## 21.0.6

- [patch] MediaSingle image now has 100% max-width in table cells [9e5ae81](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9e5ae81)
- [patch] Updated dependencies [9e5ae81](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9e5ae81)
  - @uidu/editor-common@15.0.6

## 21.0.5

- [patch] move tests and add dev dependencies to help test [177a858](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/177a858)

## 21.0.4

- [patch] Unique heading IDs [d312d25](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d312d25)

## 21.0.3

- [patch] Fix issue where BreakoutProvider would not import correctly in Typescript [6b95448](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6b95448)

## 21.0.2

- [patch] ED-3919: Fix typography and other styles, align styles between editor and renderer [d0f9293](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d0f9293)

## 21.0.1

- [patch] Updated dependencies [da65dec](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/da65dec)
  - @uidu/editor-common@15.0.1

## 21.0.0

- [major] Updated dependencies [7545979](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7545979)
  - @uidu/editor-common@15.0.0
  - @atlaskit/media-card@33.0.0
  - @atlaskit/media-filmstrip@12.0.0
  - @uidu/editor-json-transformer@4.0.8
  - @uidu/editor-test-helpers@6.0.6
  - @uidu/task-decision@8.1.7
  - @atlaskit/util-data-test@10.0.8
  - @atlaskit/media-core@23.1.0

## 20.1.2

- [patch] Update Page Layout sizing to be more compact, fix quick-insert icon, fix issue with Popup not centering toolbar in certain situations [1effb83](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1effb83)

## 20.1.1

- [patch] Updated dependencies [911a570](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/911a570)
  - @atlaskit/media-test-helpers@17.0.0
  - @atlaskit/media-filmstrip@11.0.2
  - @atlaskit/media-core@23.0.2
  - @uidu/editor-json-transformer@4.0.7
  - @atlaskit/media-card@32.0.6
  - @uidu/editor-test-helpers@6.0.5

## 20.1.0

- [minor] Adds option to disable heading ids in renderer, and disable them by default in conversations [efcca1a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/efcca1a)

## 20.0.11

- [patch] Updated dependencies [b12f7e6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b12f7e6)
  - @atlaskit/smart-card@8.0.1
  - @uidu/task-decision@8.1.6
  - @atlaskit/util-data-test@10.0.7
  - @atlaskit/profilecard@4.0.8
  - @uidu/editor-common@14.0.11
  - @uidu/editor-test-helpers@6.0.3
  - @uidu/mentions@15.0.6
  - @uidu/editor-json-transformer@4.0.6
  - @atlaskit/media-card@32.0.5
  - @atlaskit/media-filmstrip@11.0.1

## 20.0.10

- [patch] Updated dependencies [dd91bcf](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dd91bcf)
  - @uidu/editor-common@14.0.10

## 20.0.9

- [patch] Updated dependencies [48b95b0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/48b95b0)
  - @atlaskit/smart-card@8.0.0
  - @atlaskit/media-card@32.0.4
- [none] Updated dependencies [e9b1477](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e9b1477)
  - @atlaskit/media-card@32.0.4

## 20.0.8

- [patch] Renderer now only renders double height emojis when appearance is 'message' [fa78199](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fa78199)
- [none] Updated dependencies [fa78199](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fa78199)

## 20.0.7

- [patch] Updated dependencies [df22ad8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/df22ad8)
  - @uidu/theme@6.0.0
  - @atlaskit/profilecard@4.0.7
  - @uidu/task-decision@8.1.5
  - @atlaskit/icon@13.2.5
  - @atlaskit/code@8.0.1
  - @uidu/docs@5.0.6

## 20.0.6

- [patch] Updated dependencies [f9c0cdb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f9c0cdb)
  - @atlaskit/code@8.0.0
  - @uidu/docs@5.0.5

## 20.0.5

- [patch] ED-5190: fixed mediaSingle styles in renderer [4f09dea](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4f09dea)
- [none] Updated dependencies [4f09dea](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4f09dea)
  - @uidu/editor-common@14.0.6

## 20.0.4

- [patch] ED-4824: added renderer support for smart cards [7cf0a78](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7cf0a78)
- [none] Updated dependencies [7cf0a78](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7cf0a78)
  - @atlaskit/smart-card@7.0.5
  - @uidu/editor-common@14.0.5

## 20.0.3

- [patch] ED-5218, extensions with default width should not be centre aligned. [d6bd53e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d6bd53e)
- [none] Updated dependencies [d6bd53e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d6bd53e)

## 20.0.2

- [patch] ED-5180: fix table columns collapse [2e0e5a1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2e0e5a1)
- [none] Updated dependencies [2e0e5a1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2e0e5a1)
  - @uidu/editor-json-transformer@4.0.5

## 20.0.1

- [patch] Fixes the examples in renderer [696acde](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/696acde)
- [none] Updated dependencies [696acde](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/696acde)

## 20.0.0

- [patch] ED-5170: fix table horizontal scroll in renderer [c8eb097](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c8eb097)

- [none] Updated dependencies [597e0bd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/597e0bd)
  - @atlaskit/profilecard@4.0.3
  - @uidu/task-decision@8.1.3
  - @atlaskit/util-data-test@10.0.3
  - @uidu/editor-json-transformer@4.0.4
  - @uidu/editor-test-helpers@6.0.0
  - @uidu/editor-common@14.0.0
- [none] Updated dependencies [61df453](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/61df453)
  - @atlaskit/util-data-test@10.0.3
  - @atlaskit/profilecard@4.0.3
  - @uidu/editor-common@14.0.0
  - @uidu/editor-test-helpers@6.0.0
  - @uidu/task-decision@8.1.3
  - @uidu/editor-json-transformer@4.0.4
- [none] Updated dependencies [812a39c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/812a39c)
  - @atlaskit/profilecard@4.0.3
  - @uidu/task-decision@8.1.3
  - @atlaskit/util-data-test@10.0.3
  - @uidu/editor-json-transformer@4.0.4
  - @uidu/editor-test-helpers@6.0.0
  - @uidu/editor-common@14.0.0
- [none] Updated dependencies [c8eb097](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c8eb097)
  - @uidu/task-decision@8.1.3
  - @atlaskit/util-data-test@10.0.3
  - @atlaskit/profilecard@4.0.3
  - @uidu/editor-common@14.0.0
  - @uidu/editor-test-helpers@6.0.0
  - @uidu/editor-json-transformer@4.0.4
- [major] Updated dependencies [d02746f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d02746f)
  - @atlaskit/media-test-helpers@16.0.0
  - @atlaskit/media-filmstrip@11.0.0
  - @atlaskit/media-core@23.0.0
  - @atlaskit/util-data-test@10.0.3
  - @atlaskit/profilecard@4.0.3
  - @uidu/task-decision@8.1.3
  - @uidu/editor-json-transformer@4.0.4
  - @uidu/editor-common@14.0.0
  - @atlaskit/media-card@32.0.0
  - @uidu/editor-test-helpers@6.0.0

## 19.2.8

- [patch] ED-5144, extensions breakout support for renderer. [071e7c2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/071e7c2)
- [patch] Updated dependencies [071e7c2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/071e7c2)

## 19.2.7

- [patch] Updated dependencies [59ccb09](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/59ccb09)
  - @atlaskit/media-card@31.3.0
  - @atlaskit/media-filmstrip@10.2.2
  - @uidu/editor-common@13.2.8

## 19.2.6

- [patch] Updated dependencies [acd86a1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/acd86a1)
  - @atlaskit/media-card@31.2.1
  - @atlaskit/media-filmstrip@10.2.1
  - @uidu/task-decision@8.1.2
  - @atlaskit/util-data-test@10.0.2
  - @atlaskit/profilecard@4.0.2
  - @uidu/mentions@15.0.2
  - @uidu/editor-json-transformer@4.0.3
  - @uidu/editor-common@13.2.7
  - @uidu/editor-test-helpers@5.1.2
  - @atlaskit/icon@13.2.2
  - @atlaskit/media-core@22.2.1
  - @atlaskit/media-test-helpers@15.2.1
  - @uidu/theme@5.1.2
  - @atlaskit/code@7.0.2
  - @uidu/docs@5.0.2
  - @atlaskit/size-detector@5.0.3

## 19.2.5

- [patch] Bump prosemirror-model to 1.6 in order to use toDebugString on Text node spec [fdd5c5d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fdd5c5d)
- [none] Updated dependencies [fdd5c5d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fdd5c5d)
  - @uidu/editor-common@13.2.6
  - @uidu/editor-test-helpers@5.1.1
  - @uidu/editor-json-transformer@4.0.2

## 19.2.4

- [patch] Updated dependencies [7fa84a2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7fa84a2)
  - @atlaskit/media-filmstrip@10.2.0
  - @atlaskit/media-card@31.2.0

## 19.2.3

- [patch] ED-4995: added support for the rest of the page layout types in the renderer [9d9acfa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d9acfa)
- [none] Updated dependencies [9d9acfa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d9acfa)
  - @uidu/editor-common@13.2.4

## 19.2.2

- [patch] ED-5033, fixes for multiple date related issues. [c9911e0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c9911e0)
- [patch] Updated dependencies [c9911e0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c9911e0)
  - @uidu/editor-common@13.2.2

## 19.2.1

- [patch] Updated dependencies [fad25ec](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fad25ec)
  - @atlaskit/media-test-helpers@15.2.0
  - @atlaskit/media-core@22.1.0
  - @uidu/editor-common@13.2.1
  - @atlaskit/media-card@31.1.0
  - @uidu/editor-test-helpers@5.0.3

## 19.2.0

- [patch] Updated dependencies [fa6f865](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fa6f865)
  - @atlaskit/media-card@31.0.0
  - @atlaskit/media-filmstrip@10.1.0
  - @uidu/editor-common@13.2.0
  - @atlaskit/media-test-helpers@15.1.0
- [none] Updated dependencies [fdd03d8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fdd03d8)
  - @atlaskit/media-card@31.0.0
  - @atlaskit/media-filmstrip@10.1.0
  - @uidu/editor-common@13.2.0
  - @atlaskit/media-test-helpers@15.1.0
- [patch] Updated dependencies [49c8425](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/49c8425)
  - @atlaskit/media-card@31.0.0
  - @atlaskit/media-filmstrip@10.1.0
  - @uidu/editor-common@13.2.0
  - @atlaskit/media-test-helpers@15.1.0
- [minor] Updated dependencies [3476e01](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3476e01)
  - @atlaskit/media-card@31.0.0
  - @atlaskit/media-filmstrip@10.1.0
  - @uidu/editor-common@13.2.0

## 19.1.0

- [minor] Updated dependencies [f6bf6c8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f6bf6c8)
  - @uidu/mentions@15.0.0
  - @atlaskit/util-data-test@10.0.1
  - @uidu/editor-common@13.1.0

## 19.0.7

- [patch] ED-4199, Adding support for column layout in renderer. [51ccf5f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/51ccf5f)
- [patch] Updated dependencies [51ccf5f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/51ccf5f)
  - @uidu/editor-common@13.0.9

## 19.0.6

- [patch] ED-5123: fix getText util when passing ADNode [195e6e0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/195e6e0)
- [none] Updated dependencies [195e6e0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/195e6e0)

## 19.0.5

- [patch] Updated dependencies [b1e8a47](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b1e8a47)
  - @uidu/editor-common@13.0.7

## 19.0.4

- [patch] Fixing issue with image wrapper class name in renderer. [635c686](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/635c686)
- [none] Updated dependencies [635c686](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/635c686)

## 19.0.3

- [patch] New floating toolbar for Panel [4d528ab](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4d528ab)
- [none] Updated dependencies [4d528ab](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4d528ab)
  - @uidu/editor-common@13.0.5

## 19.0.2

- [patch] ED-5046, fixing image rendering in renderer. [1c70502](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1c70502)
- [none] Updated dependencies [1c70502](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1c70502)

## 19.0.1

- [patch] Updated dependencies [4342d93](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4342d93)
  - @uidu/editor-common@13.0.1

## 19.0.0

- [major] Updates to React ^16.4.0 [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
- [major] Updated dependencies [563a7eb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/563a7eb)
  - @atlaskit/media-card@30.0.0
  - @atlaskit/media-filmstrip@10.0.0
  - @uidu/task-decision@8.0.0
  - @atlaskit/util-data-test@10.0.0
  - @atlaskit/profilecard@4.0.0
  - @uidu/editor-json-transformer@4.0.0
  - @uidu/editor-common@13.0.0
  - @uidu/editor-test-helpers@5.0.0
  - @uidu/mentions@14.0.0
  - @atlaskit/media-core@22.0.0
  - @atlaskit/media-test-helpers@15.0.0
  - @uidu/theme@5.0.0
  - @atlaskit/code@7.0.0
  - @uidu/docs@5.0.0
  - @atlaskit/size-detector@5.0.0
  - @atlaskit/icon@13.0.0
- [major] Updated dependencies [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
  - @atlaskit/media-card@30.0.0
  - @atlaskit/media-filmstrip@10.0.0
  - @uidu/task-decision@8.0.0
  - @atlaskit/util-data-test@10.0.0
  - @atlaskit/profilecard@4.0.0
  - @uidu/mentions@14.0.0
  - @uidu/editor-json-transformer@4.0.0
  - @uidu/editor-test-helpers@5.0.0
  - @uidu/editor-common@13.0.0
  - @atlaskit/media-test-helpers@15.0.0
  - @atlaskit/media-core@22.0.0
  - @uidu/theme@5.0.0
  - @atlaskit/code@7.0.0
  - @uidu/docs@5.0.0
  - @atlaskit/size-detector@5.0.0
  - @atlaskit/icon@13.0.0

## 18.2.18

- [none] Updated dependencies [5f6ec84](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5f6ec84)
  - @uidu/editor-test-helpers@4.2.4
  - @uidu/task-decision@7.1.14
  - @uidu/editor-common@12.0.0
  - @uidu/editor-json-transformer@3.1.8
- [patch] Updated dependencies [5958588](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5958588)
  - @uidu/editor-test-helpers@4.2.4
  - @uidu/task-decision@7.1.14
  - @uidu/editor-common@12.0.0
  - @uidu/editor-json-transformer@3.1.8

## 18.2.17

- [patch] Updated dependencies [c98857e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c98857e)
  - @uidu/mentions@13.1.10
  - @atlaskit/util-data-test@9.1.19
  - @uidu/editor-test-helpers@4.2.3
  - @uidu/editor-common@11.4.6
- [patch] Updated dependencies [8a125a7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8a125a7)
  - @uidu/mentions@13.1.10
  - @atlaskit/util-data-test@9.1.19
  - @uidu/editor-test-helpers@4.2.3
  - @uidu/editor-common@11.4.6
- [patch] Updated dependencies [cacfb53](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cacfb53)
  - @uidu/mentions@13.1.10
  - @atlaskit/util-data-test@9.1.19
  - @uidu/editor-test-helpers@4.2.3
  - @uidu/editor-common@11.4.6

## 18.2.16

- [patch] Updated dependencies [6f51fdb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6f51fdb)
  - @uidu/editor-common@11.4.5

## 18.2.15

- [patch] ED-5037 don't render 0px column width if no size has been set [e1cb1c6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e1cb1c6)
- [none] Updated dependencies [e1cb1c6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e1cb1c6)

## 18.2.14

- [patch] add heading id [1f301cc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1f301cc)

- [none] Updated dependencies [1f301cc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1f301cc)
- [none] Updated dependencies [a973ac3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a973ac3)

## 18.2.13

- [patch] Updated dependencies [17b638b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/17b638b)
  - @uidu/editor-common@11.3.14

## 18.2.12

- [none] Updated dependencies [8c711bd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8c711bd)
  - @uidu/editor-test-helpers@4.2.1
  - @uidu/editor-common@11.3.12
- [patch] Updated dependencies [42ee1ea](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/42ee1ea)
  - @atlaskit/media-test-helpers@14.0.6
  - @atlaskit/media-filmstrip@9.0.7
  - @atlaskit/media-core@21.0.0
  - @uidu/editor-common@11.3.12
  - @atlaskit/media-card@29.1.8
  - @uidu/editor-test-helpers@4.2.1

## 18.2.11

- [patch] Add missing dependencies to packages to get the website to build [99446e3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/99446e3)

- [none] Updated dependencies [99446e3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/99446e3)
  - @atlaskit/media-filmstrip@9.0.6
  - @atlaskit/profilecard@3.13.1
  - @uidu/docs@4.2.2
- [none] Updated dependencies [9bac948](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9bac948)
  - @atlaskit/media-filmstrip@9.0.6
  - @uidu/docs@4.2.2

## 18.2.10

- [patch] Updated dependencies [d7dca64](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d7dca64)
  - @uidu/mentions@13.1.4
  - @atlaskit/util-data-test@9.1.16
  - @uidu/editor-common@11.3.10

## 18.2.9

- [patch] Updated dependencies [8d5053e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8d5053e)
  - @atlaskit/util-data-test@9.1.15
  - @uidu/task-decision@7.1.8
  - @uidu/mentions@13.1.3
  - @uidu/editor-json-transformer@3.1.5
  - @uidu/editor-common@11.3.8
  - @uidu/editor-test-helpers@4.1.9

## 18.2.8

- [patch] Updated dependencies [eee2d45](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/eee2d45)
  - @atlaskit/code@6.0.0
  - @uidu/docs@4.2.1

## 18.2.7

- [patch] Updated dependencies [0cf2f52](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0cf2f52)
  - @atlaskit/util-data-test@9.1.14
  - @uidu/task-decision@7.1.7
  - @uidu/mentions@13.1.2
  - @uidu/editor-json-transformer@3.1.4
  - @uidu/editor-test-helpers@4.1.8
  - @uidu/editor-common@11.3.7

## 18.2.6

- [patch] Updated dependencies [c57e9c1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c57e9c1)
  - @atlaskit/media-test-helpers@14.0.4
  - @atlaskit/media-filmstrip@9.0.5
  - @atlaskit/media-card@29.1.5
  - @uidu/editor-common@11.3.5
  - @uidu/editor-test-helpers@4.1.7
  - @atlaskit/media-core@20.0.0

## 18.2.5

- [patch] Remove pinned prosemirror-model@1.4.0 and move back to caret ranges for prosemirror-model@^1.5.0 [4faccc0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4faccc0)
- [patch] Updated dependencies [4faccc0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4faccc0)
  - @uidu/task-decision@7.1.2
  - @uidu/editor-common@11.3.0
  - @uidu/editor-test-helpers@4.1.5
  - @uidu/editor-json-transformer@3.1.3

## 18.2.4

- [patch] ED-4741, adding support for date node in renderer. [2460f47](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2460f47)
- [none] Updated dependencies [2460f47](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2460f47)
  - @uidu/editor-common@11.2.9

## 18.2.3

- [patch] Updated dependencies [74a0d46](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/74a0d46)
  - @atlaskit/media-card@29.1.3
  - @atlaskit/media-filmstrip@9.0.4
  - @uidu/editor-common@11.2.8
- [patch] Updated dependencies [6c6f078](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6c6f078)
  - @atlaskit/media-card@29.1.3
  - @atlaskit/media-filmstrip@9.0.4
  - @uidu/editor-common@11.2.8
- [patch] Updated dependencies [5bb26b4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5bb26b4)
  - @atlaskit/media-card@29.1.3
  - @atlaskit/media-filmstrip@9.0.4
  - @uidu/editor-common@11.2.8

## 18.2.2

- [patch] Adds in proper task and decision support for text representation [e59b749](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e59b749)
- [none] Updated dependencies [e59b749](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e59b749)

## 18.2.1

- [patch] Add Table breakout mode in renderer [0d3b375](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0d3b375)
- [none] Updated dependencies [0d3b375](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0d3b375)
  - @uidu/editor-common@11.2.5

## 18.2.0

- [minor] Refactor text serializer a bit and adds in table support [7393dc3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7393dc3)
- [none] Updated dependencies [7393dc3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7393dc3)

## 18.1.2

- [patch] Clean Changelogs - remove duplicates and empty entries [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
- [none] Updated dependencies [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
  - @atlaskit/media-card@29.1.2
  - @atlaskit/util-data-test@9.1.13
  - @uidu/task-decision@7.1.1
  - @uidu/mentions@13.1.1
  - @uidu/editor-json-transformer@3.1.2
  - @atlaskit/media-filmstrip@9.0.3
  - @uidu/editor-test-helpers@4.1.2
  - @uidu/editor-common@11.2.1
  - @atlaskit/media-test-helpers@14.0.3
  - @atlaskit/media-core@19.1.3
  - @uidu/theme@4.0.4
  - @atlaskit/code@5.0.4
  - @atlaskit/size-detector@4.1.2
  - @atlaskit/icon@12.1.2

## 18.1.1

- [patch] Update changelogs to remove duplicate [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
- [none] Updated dependencies [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
  - @atlaskit/media-card@29.1.1
  - @atlaskit/util-data-test@9.1.12
  - @uidu/editor-json-transformer@3.1.1
  - @atlaskit/media-filmstrip@9.0.2
  - @uidu/editor-test-helpers@4.1.1
  - @uidu/editor-common@11.1.2
  - @atlaskit/media-test-helpers@14.0.2
  - @atlaskit/media-core@19.1.2
  - @uidu/theme@4.0.3
  - @atlaskit/icon@12.1.1
  - @atlaskit/code@5.0.3
  - @uidu/docs@4.1.1
  - @atlaskit/size-detector@4.1.1

## 18.1.0

- [none] Updated dependencies [7217164](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7217164)
  - @uidu/editor-test-helpers@4.1.0
  - @uidu/task-decision@7.1.0
  - @atlaskit/util-data-test@9.1.11
  - @uidu/mentions@13.1.0
  - @uidu/editor-common@11.1.0
  - @uidu/editor-json-transformer@3.1.0

## 18.0.4

- [patch] Updated dependencies [2de7ce7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2de7ce7)
  - @atlaskit/media-card@29.0.3
  - @uidu/editor-common@11.0.7
- [patch] Updated dependencies [97efb49](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/97efb49)
  - @atlaskit/media-card@29.0.3
  - @uidu/editor-common@11.0.7
- [patch] Updated dependencies [f86d117](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f86d117)
  - @atlaskit/media-card@29.0.3
  - @uidu/editor-common@11.0.7

## 18.0.3

- [patch] Update and lock prosemirror-model version to 1.4.0 [febf753](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/febf753)
- [none] Updated dependencies [febf753](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/febf753)
  - @uidu/editor-common@11.0.6
  - @uidu/editor-test-helpers@4.0.7
  - @uidu/editor-json-transformer@3.0.11

## 18.0.2

- [patch] Updated dependencies [823caef](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/823caef)
  - @atlaskit/media-card@29.0.2
  - @uidu/editor-common@11.0.3

## 18.0.1

- [patch] Updated dependencies [732d2f5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/732d2f5)
  - @atlaskit/media-card@29.0.1
  - @uidu/editor-common@11.0.2

## 18.0.0

- [major] makes styled-components a peer dependency and upgrades version range from 1.4.6 - 3 to ^3.2.6 [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
- [patch] Updated dependencies [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
  - @atlaskit/media-card@29.0.0
  - @atlaskit/util-data-test@9.1.10
  - @uidu/task-decision@7.0.0
  - @uidu/mentions@13.0.0
  - @uidu/editor-json-transformer@3.0.9
  - @atlaskit/media-filmstrip@9.0.0
  - @uidu/editor-test-helpers@4.0.3
  - @uidu/editor-common@11.0.0
  - @atlaskit/media-test-helpers@14.0.0
  - @atlaskit/media-core@19.0.0
  - @atlaskit/icon@12.0.0
  - @uidu/theme@4.0.0
  - @atlaskit/code@5.0.0
  - @uidu/docs@4.0.0
  - @atlaskit/size-detector@4.0.0

## 17.0.9

- [patch] Updated dependencies [1c87e5a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1c87e5a)
  - @atlaskit/media-card@28.0.6
  - @atlaskit/util-data-test@9.1.9
  - @uidu/task-decision@6.0.9
  - @uidu/mentions@12.0.3
  - @uidu/editor-json-transformer@3.0.8
  - @atlaskit/media-filmstrip@8.0.9
  - @uidu/editor-test-helpers@4.0.2
  - @uidu/editor-common@10.1.9

## 17.0.8

- [patch] Updated dependencies [35d547f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/35d547f)
  - @atlaskit/media-card@28.0.5
  - @uidu/editor-common@10.1.4

## 17.0.7

- [patch] Fix mediaSingle [179332e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/179332e)
- [none] Updated dependencies [179332e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/179332e)

## 17.0.6

- [patch] Updated dependencies [41eb1c1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/41eb1c1)
  - @uidu/editor-common@10.1.3

## 17.0.5

- [patch] ED-4447 Fix image breakout rendering [b73e05d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b73e05d)
- [none] Updated dependencies [b73e05d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b73e05d)
  - @uidu/editor-common@10.1.2

## 17.0.4

- [patch] Updated dependencies [639ae5e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/639ae5e)
  - @uidu/mentions@12.0.2
  - @atlaskit/util-data-test@9.1.7
  - @uidu/editor-common@10.1.1

## 17.0.3

- [patch] Updated dependencies [0edc6c8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0edc6c8)

## 17.0.2

- [patch] Updated dependencies [758b342](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/758b342)
  - @uidu/task-decision@6.0.7

## 17.0.1

- [none] Updated dependencies [ba702bc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ba702bc)
  - @uidu/mentions@12.0.0
  - @atlaskit/util-data-test@9.1.6
  - @uidu/editor-common@10.0.3

## 17.0.0

- [patch] ED-4570, application card without icon should render properly. [714ab32](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/714ab32)
- [none] Updated dependencies [febc44d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/febc44d)
  - @uidu/editor-test-helpers@4.0.0
  - @uidu/task-decision@6.0.6
  - @atlaskit/util-data-test@9.1.4
  - @uidu/editor-common@10.0.0
  - @uidu/editor-json-transformer@3.0.7

## 16.3.0

- [minor] Adds support for adfStage [4b303ce](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4b303ce)
- [none] Updated dependencies [4b303ce](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4b303ce)

## 16.2.6

- [none] Updated dependencies [8fd4dd1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8fd4dd1)
  - @uidu/editor-test-helpers@3.1.8
  - @uidu/task-decision@6.0.5
  - @atlaskit/util-data-test@9.1.3
  - @uidu/mentions@11.1.4
  - @uidu/editor-json-transformer@3.0.6
  - @uidu/editor-common@9.3.9

## 16.2.5

- [patch] Renamed smart card components and exposed inline smart card views [1094bb6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1094bb6)
- [patch] Updated dependencies [1094bb6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1094bb6)
  - @atlaskit/media-card@27.1.3

## 16.2.4

- [patch] Adding nested ul support [ce87690](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ce87690)
- [none] Updated dependencies [ce87690](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ce87690)

## 16.2.3

- [patch] Disable overlay for mediaSingle [147bc84](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/147bc84)
- [none] Updated dependencies [147bc84](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/147bc84)
  - @uidu/editor-common@9.3.6

## 16.2.2

- [patch] ED-4120 support placeholder text in renderer [616a6a5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/616a6a5)
- [patch] Updated dependencies [616a6a5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/616a6a5)
  - @uidu/editor-common@9.3.5

## 16.2.1

- [patch] Updated dependencies [3ef21cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3ef21cd)
  - @uidu/editor-common@9.3.4

## 16.2.0

- [minor] Set line-height based on appearance [b21cd55](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b21cd55)
- [none] Updated dependencies [b21cd55](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b21cd55)

## 16.1.3

- [patch] Add a blank space between mention and text in text renderer [940ecc7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/940ecc7)

## 16.1.0

- [minor] Adding support for external images [9935105](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9935105)

## 16.0.8

- [patch] ED-4568, adding support for panel types success and error in renderer. [1aef8d2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1aef8d2)

## 16.0.5

- [patch] Fix rendering of multiple text nodes in inline code [9ee5612](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9ee5612)

## 16.0.4

- [patch] CFE-1078: Add the type of extension to the call to extension handler [4db252c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4db252c)

## 16.0.2

- [patch] Use node type as fallback behavior for unsupported node [090d962](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/090d962)

## 16.0.1

- [patch] Always wrap text [bcd3361](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bcd3361)

## 15.0.1

- [patch] Added missing dependencies and added lint rule to catch them all [0672503](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0672503)

## 15.0.0

- [major] Bump to React 16.3. [4251858](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4251858)

## 14.0.0

- [major] Generic Text Serializer [1549347](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1549347)

## 13.3.3

- [patch] support table colwidth in renderer, fix other table properties in email renderer [f78bef4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f78bef4)

## 13.2.0

- [minor] stop creating mediaContext in MediaCard component [ad8c3c0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ad8c3c0)

## 13.0.16

- [patch] Move types/interfaces for ExtensionHandlers to editor-common [3d26cab](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3d26cab)

## 13.0.14

- [patch] Prevent CodeBlocks from overflowing their container [50cc975](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/50cc975)

## 13.0.13

- [patch] Upgrading ProseMirror Libs [35d14d5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/35d14d5)

## 13.0.11

- [patch] Adds styling for unknown blocks [5cdc63c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5cdc63c)

## 13.0.10

- [patch] Add "sideEffects: false" to AKM2 packages to allow consumer's to tree-shake [c3b018a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c3b018a)

## 13.0.9

- [patch] Change Media Group resize mode to full-fit from crop [05575db](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/05575db)

## 13.0.6

- [patch] Add analytics events for click and show actions of media-card [031d5da](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/031d5da)

## 13.0.2

- [patch] Adds margin-top to ApplicationCard, MediaGroup and CodeBlock in renderer content [f2ae5ca](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f2ae5ca)

## 12.2.0

- [minor] E-mail renderer [722657b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/722657b)

## 12.1.0

- [minor] Fixes Media Cards in renderer [064bfb5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/064bfb5)

## 12.0.0

- [major] Use media-core as peerDependency [c644812](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c644812)

## 11.5.11

- [patch] Add key as an optional parameter to applicationCard actions [28be081](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/28be081)

## 11.5.6

- [patch] Fix missing styled-components dependency [64d89c8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/64d89c8)

## 11.5.5

- [patch] Remove margin from first headings [c8c342d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c8c342d)

## 11.5.4

- [patch] add span and background attribs for table nodes in renderer [8af61df](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8af61df)

## 11.5.1

- [patch] FS-1461 fixed rendererContext handling in TaskItem [6023540](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6023540)

## 11.5.0

- [minor] FS-1461 objectAri and containerAri are optional in RendererContext [1b20296](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1b20296)

## 11.4.5

- [patch] updated the repository url to https://bitbucket.org/atlassian/atlaskit-mk-2 [1e57e5a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e57e5a)

## 11.4.3

- [patch] added a prop to enable the new applicationCard designs [3057eb2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3057eb2)

## 11.4.1

- [patch] bump editor-common to 6.1.2 [bb7802e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bb7802e)

## 11.4.0

- [minor] Support mediaSingle [400ff24](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/400ff24)

## 11.3.10

- [patch] bump mention to 9.1.1 to fix mention autocomplete bug [c7708c6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c7708c6)

## 11.3.7

- [patch] move MediaItem to renderer, bump icons [5e71725](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5e71725)

## 11.3.6

- [patch] Bump editor versions [afa6885](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/afa6885)

## 11.3.0

- [minor] Add React 16 support. [12ea6e4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/12ea6e4)

## 11.0.0

- [major] We now use ProseMirror Schema to validate document [d059d6a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d059d6a)

## 10.1.5

- [patch] FS-1581 decreased big emoji size [fe39b29](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fe39b29)

## 10.1.3

- [patch] Fixed stand alone file and link card rendering [9b467a6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9b467a6)

## 10.1.0

- [minor] Add ADF-Encoder utility to simplify using a transformer with the renderer [5b1ea37](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5b1ea37)

## 10.0.5

- [patch] Only bodiedExtension has content [6d4caae](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6d4caae)

## 10.0.3

- [patch] Bumped task decision version [1180bbe](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1180bbe)

## 10.0.0

- [major] Addes in extension node and modify ReactSerializer class construtor to accept an object. [e408698](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e408698)
- [major] Addes in extension node [e52d336](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e52d336)

## 9.0.0

- [major] Update signature onClick event on filmstrip (renderer) [30bdfcc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/30bdfcc)

## 8.12.0

- [patch] Fix dependencies [9f9de42](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9f9de42)

## 8.11.0

- [minor] Move validators from renderer to editor-common [3e2fd00](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3e2fd00)

## 8.10.13

- [patch] Use styled-component for link mark to avoid cascading styles to affect media. [0c9475b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0c9475b)

## 8.10.10

- [patch] bump icon dependency [da14956](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/da14956)

## 8.10.4

- [patch] Fixed stand alone file and link card rendering [9b467a6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9b467a6)

## 8.10.2

- [patch] Upgrade mention to ^8.1.0 in editor and renderer [48b5af4](48b5af4)

## 8.10.0

- [minor] Adding 'image' node for bitbucket consumption; this is unstable and should not be used [590ce41](590ce41)

## 8.8.1

- [patch] Use correct dependencies [7b178b1](7b178b1)
- [patch] Adding responsive behavior to the editor. [e0d9867](e0d9867)

## 8.8.0

- [minor] Added big emoji rendering logic to renderer [f85c47a](f85c47a)

## 8.7.1

- [patch] Removing the attrs.language !== undefined validation check for codeBlock nodes [1c20b73](1c20b73)

## 8.7.0

- [minor] Upgrade Media Editor packages [193c8a0](193c8a0)
