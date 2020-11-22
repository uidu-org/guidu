import { ButtonItemProps } from '@uidu/menu';
import { PositionType } from '@uidu/tooltip';
import React from 'react';

export interface Props {
  mountTo?: HTMLElement;
  boundariesElement?: HTMLElement;
  scrollableElement?: HTMLElement;
  isOpen?: boolean;
  onOpenChange?: (attrs: any) => void;
  onItemActivated?: (attrs: any) => void;
  onMouseEnter?: (attrs: any) => void;
  onMouseLeave?: (attrs: any) => void;
  fitWidth?: number;
  fitHeight?: number;
  offset?: Array<number>;
  zIndex?: number;
  items: Array<{
    items: MenuItem[];
  }>;
}

export interface MenuItem extends ButtonItemProps {
  key?: string;
  content: string | React.ReactChild | React.ReactFragment;
  value: {
    name: string;
  };
  shortcut?: string;
  tooltipDescription?: string;
  tooltipPosition?: PositionType;
  isDisabled?: boolean;
  handleRef?: any;
}

export interface State {
  target?: HTMLElement;
  popupPlacement: [string, string];
}
