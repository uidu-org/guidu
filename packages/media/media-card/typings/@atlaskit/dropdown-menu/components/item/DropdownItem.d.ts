import { ComponentType } from 'react';
import Item, {
  ItemProps,
  WithItemClickProps,
  WithItemFocusProps,
} from '@uidu/item';

declare const DropdownItem: ComponentType<
  ItemProps & WithItemClickProps & WithItemFocusProps
>;

export default DropdownItem;
