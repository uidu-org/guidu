// @flow

export type ReactElement = any;

export type DrawerProps = {
  /** The icon to use as the back icon for this drawer */
  backIcon: ReactElement,
  /** The drawer contents */
  children?: ReactElement,
  /** The header for this Drawer – often the ContainerTitle for a given Container */
  header?: ReactElement,
  /** Set whether the drawer is visible. */
  isOpen: boolean,
  /** Whether the Drawer is full width – used for focus tasks */
  isFullWidth?: boolean,
  /** A function to call when the backIcon button is clicked, or when the blanket
   behind the Drawer is clicked */
  onBackButton: () => mixed,
  /** The primary icon in the Drawer – usually the globalPrimaryIcon that was
   given to the GlobalNavigation component */
  primaryIcon: ReactElement,
};
