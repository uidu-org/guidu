import { EditorAppearance } from '../../types';
import { isFullPage } from '../../utils/is-full-page';
import { ToolbarBreakPoint } from './toolbar-types';
import { ToolbarSize } from './types';

// Toolbar sizes for full page editor a little bit different, because it has more buttons e.g. actions button...
const toolbarSizesFullPage: ToolbarBreakPoint[] = [
  { width: 650, size: ToolbarSize.XXL },
  { width: 580, size: ToolbarSize.XL },
  { width: 500, size: ToolbarSize.L },
  { width: 450, size: ToolbarSize.M },
  { width: 370, size: ToolbarSize.S },
];

const toolbarSizes: ToolbarBreakPoint[] = [
  { width: 610, size: ToolbarSize.XXL },
  { width: 540, size: ToolbarSize.XL },
  { width: 460, size: ToolbarSize.L },
  { width: 450, size: ToolbarSize.M },
  { width: 370, size: ToolbarSize.S },
];

const toolbarSizesForAppearance = (appearance?: EditorAppearance) =>
  isFullPage(appearance) ? toolbarSizesFullPage : toolbarSizes;

export const toolbarSizeToWidth = (
  toolbarSize: ToolbarSize,
  appearance?: EditorAppearance,
) => {
  return (
    toolbarSizesForAppearance(appearance).find(
      ({ size }) => toolbarSize === size,
    ) || {
      width: ToolbarWidths.S,
    }
  ).width;
};

export const widthToToolbarSize = (
  toolbarWidth: number,
  appearance?: EditorAppearance,
) => {
  return (
    toolbarSizesForAppearance(appearance).find(
      ({ width }) => toolbarWidth > width,
    ) || {
      size: ToolbarSize.XXXS,
    }
  ).size;
};
