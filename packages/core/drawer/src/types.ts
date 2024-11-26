import * as React from 'react';

export type DrawerSize = 'narrow' | 'medium' | 'wide' | 'extended' | 'full';
export type DrawerOrigin = 'left' | 'top' | 'right' | 'bottom';

export type BaseProps = {
  /** The content of the drawer */
  children: any;
  /** Icon to be rendered in your drawer as a component, if available */
  icon?: React.ComponentType;
  /** Available drawer sizes */
  size: DrawerSize;
  /** Available drawer origins */
  origin: DrawerOrigin;
  /** stacked drawers */
  isStacked?: boolean;
  /** Classnames are applied to the wrapper, useful for custom widths or custom backgrounds */
  className?: string;
  /** Classnames applied to blanket */
  blanketClassName?: string;
};

export type DrawerPrimitiveProps = BaseProps & {
  in: boolean;
  onClose?: (event: React.MouseEvent) => void;
  onCloseComplete?: () => void;
  shouldUnmountOnExit?: boolean;
};

export type DrawerProps = BaseProps & {
  /**
      Callback function to be called when the drawer will be closed.
    */
  onClose?: (event: React.MouseEvent | React.KeyboardEvent) => void;
  /** A callback function that will be called when the drawer has finished its close transition. */
  onCloseComplete?: () => void;
  /**
      Callback function that will be called when the drawer is displayed and `keydown` event is triggered.
    */
  onKeyDown?: (event: React.KeyboardEvent) => void;
  /** Controls if the drawer is open or close */
  isOpen: boolean;
  /** Boolean that controls if drawer should be retained/discarded */
  shouldUnmountOnExit?: boolean;
};

/**
  Type of keyboard event that triggers which key will should close the drawer.
*/
export type CloseTrigger = 'backButton' | 'blanket' | 'escKey';
