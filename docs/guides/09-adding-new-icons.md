---
title: Adding New Icons
description: How to add icons to @atlaskit/icon
---

# Adding New Icons

!!IMPORTANT

The icons package has a custom build process, as it generates its both stripped
svgs and glyphs that are committed to the repo, so that they can be accessed as
paths when published.

Adding or updating a new icon:
* Add / update the icon under `packages/core/icon/svgs_raw`
* Then run `yarn update:icons`

This will:
* build `@atlaskit/icon`
* build `@atlaskit/icon-object`
* build `@atlaskit/icons-file-type`
* build `@atlaskit/reduced-ui-pack`

Once these are built you should:
* Add your new icon to the list of icons in `packages/css-packs/reduced-ui-pack/src/internal/iconIds.js`
* Add your new icon to the list of icons in `packages/core/icon/src/components/__tests__/unit/indexSpec.js`
* locally check that the new/updated icons are rendered correctly on the website in `@atlaskit/icon`
* locally check that the new/updated icons are rendered correctly on the website in `@atlaskit/reduced-ui-pack`

If your icon is used only in a specific context or product, place it in
  `/svgs_raw/{subfolder}` and it will be namespaced appropriately.

Once your new icon is committed, make sure to include the maintainers of the `@atlaskit/icon` package in your PR.

## If you are updating an existing icon

To update an icon, you need a new updated svg. Replace the svg in the `svgs_raw` folder with the new svg, and run `yarn update:icons`.

## If your icon is not a 24 * 24px svg with 1 or 2 colors

It should not be added to the icons package, as these do not align to the ADG iconography guidelines.

