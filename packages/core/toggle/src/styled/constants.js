// @flow
import { gridSize } from '@uidu/theme';

const dimensions = {
  regular: {
    height: gridSize() * 2,
    width: gridSize() * 4,
  },
  large: {
    height: gridSize() * 2 + gridSize() / 2,
    width: gridSize() * 5,
  },
};

export const borderWidth = '2px';
export const paddingUnitless = gridSize() / 4;
export const transition = '0.2s';

export const getHeight = ({ size }: { size: string }) =>
  dimensions[size].height;
export const getWidth = ({ size }: { size: string }) => dimensions[size].width;
