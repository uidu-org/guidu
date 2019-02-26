# @atlaskit/icon-object

## 3.0.3
- [patch] [1d1f6d1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1d1f6d1):

  - Make icon glyphs not import metadata

## 3.0.2
- Updated dependencies [58b84fa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/58b84fa):
  - @atlaskit/button@10.1.1
  - @atlaskit/field-text@7.0.18
  - @atlaskit/modal-dialog@7.1.1
  - @atlaskit/theme@7.0.1
  - @atlaskit/tooltip@12.1.13
  - @atlaskit/docs@6.0.0

## 3.0.1
- Updated dependencies [d13242d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d13242d):
  - @atlaskit/docs@5.2.3
  - @atlaskit/button@10.0.4
  - @atlaskit/field-text@7.0.16
  - @atlaskit/modal-dialog@7.0.14
  - @atlaskit/tooltip@12.1.12
  - @atlaskit/theme@7.0.0

## 3.0.0
- [major] [ab9b69c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ab9b69c):

  - Remove onClick props as icon is only a presentational placeholder. Please wrap icon into a Button or a Link component.

## 2.0.1
- Updated dependencies [6998f11](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6998f11):
  - @atlaskit/docs@5.2.1
  - @atlaskit/field-text@7.0.15
  - @atlaskit/modal-dialog@7.0.12
  - @atlaskit/theme@6.2.1
  - @atlaskit/tooltip@12.1.10
  - @atlaskit/button@10.0.0

## 2.0.0
- [patch] [29b160f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/29b160f):

  - Simplify the icons build process

  Icons no longer need a custom `build` step to be accurate on npm. This
  has come about by renaming the `es5` folder to `cjs`. If you weren't reaching
  into our package's internals, you shouldn't notice.

- [major] [80304f0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/80304f0):

  **NOTE** Unless you are using the `iconsInfo` export, this change is not breaking.

  - Rename `iconsInfo` to `metadata` to more accurately reflect its role

  This change comes with rethinking what is exported from this object,
  which no longer includes copies of the icons. If you need to rely on the
  metadata to get the packages, each should be required by your own code.

  The `icon-explorer` has an example of how to do this.
- Updated dependencies [b29bec1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b29bec1):
  - @atlaskit/icon-build-process@0.1.0

## 1.0.4
- [patch] Update to use babel-7 for build processes [e7bb74d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7bb74d)

## 1.0.3
- [patch] Adds missing implicit @babel/runtime dependency [b71751b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b71751b)

## 1.0.2
- [patch] Publish utils folder [272208b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/272208b)

## 1.0.1
- [patch] icon-file-type and icon-object publish glyphs, svgs, and es5 instead of just dist [0823d35](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0823d35)

## 1.0.0
- [major] Release icon-object and icon-file-type [709b239](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/709b239)
