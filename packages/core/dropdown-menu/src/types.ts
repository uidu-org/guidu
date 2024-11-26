import { PopupProps } from '@uidu/popup';
import { KeyboardEvent, MouseEvent, ReactNode } from 'react';

export interface DropdownMenuProps extends Omit<PopupProps, 'trigger'> {
  /** Content that will be rendered inside the layer element. Should typically be
   * `DropdownItemGroup` or `DropdownItem`, or checkbox / radio variants of those. */
  children?: ReactNode;
  /** Controls the open state of the dropdown. */
  isOpen: boolean;
  /** Content which will trigger the dropdown menu to open and close. Use with `triggerType`
   * to easily get a button trigger. */
  trigger?: ReactNode;
  triggerComponent?: PopupProps['trigger'];

  /** Callback to know when the menu is correctly positioned after it is opened */
  onPositioned?: Function;

  /** Called when the menu should be open/closed. Received an object with `isOpen` state. */
  onOpenChange: (args: OnOpenChangeArgs) => void;
}

export interface OnOpenChangeArgs {
  isOpen: boolean;
  event?: MouseEvent | KeyboardEvent;
}
