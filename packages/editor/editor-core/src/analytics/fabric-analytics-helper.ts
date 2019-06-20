import * as keymaps from '../keymaps';

export enum InsertType {
  SELECTED = 'selected',
  ENTER = 'enter',
  SHIFT_ENTER = 'shift-enter',
  SPACE = 'space',
  TAB = 'tab',
}

export function getInsertTypeForKey(key?: string) {
  if (key === keymaps.space.common) {
    return InsertType.SPACE;
  }
  if (key === keymaps.enter.common) {
    return InsertType.ENTER;
  }
  if (key === keymaps.tab.common) {
    return InsertType.TAB;
  }
  if (key === keymaps.insertNewLine.common) {
    return InsertType.SHIFT_ENTER;
  }
  return undefined;
}
