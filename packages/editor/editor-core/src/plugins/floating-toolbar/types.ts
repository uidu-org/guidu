import { ProviderFactory } from '@uidu/editor-common/provider-factory';
import { Node, NodeType } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import React from 'react';
import { IntlShape } from 'react-intl';
import { Command } from '../../types/command';
import { DispatchAnalyticsEvent } from '../analytics/types/dispatch-analytics-event';
import { ButtonAppearance } from './ui/Button';
import { SelectOption } from './ui/Select';
import { DropdownOptions, RenderOptionsPropsT } from './ui/types';

export type Icon = React.ComponentType<{ label: string }>;
export type RenderOptionsProps = RenderOptionsPropsT<Command>;

export type AlignType = 'left' | 'center' | 'right';

export type FloatingToolbarButton<T> = {
  type: 'button';
  title: string;
  onClick: T;
  showTitle?: boolean;
  onMouseEnter?: T;
  onMouseLeave?: T;
  icon?: Icon;
  selected?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  appearance?: ButtonAppearance;
  href?: string;
  target?: string;
  className?: string;
  tooltipContent?: React.ReactNode;
  testId?: string;
};

export type FloatingToolbarInput<T> = {
  type: 'input';
  onSubmit: (...args: any[]) => T;
  onBlur: (...args: any[]) => T;
  defaultValue?: string;
  placeholder?: string;
  hidden?: boolean;
};

export type FloatingToolbarCustom = {
  type: 'custom';
  // No superset of all these types yet
  render: (
    view?: EditorView,
    idx?: number,
    dispatchAnalyticsEvent?: DispatchAnalyticsEvent,
  ) => React.ComponentClass | React.SFC | React.ReactElement<any> | null;
  hidden?: boolean;
};

export type FloatingToolbarSelect<T> = {
  type: 'select';
  options: SelectOption[];
  hidden?: boolean;
  hideExpandIcon?: boolean;
  defaultValue?: SelectOption;
  placeholder?: string;
  onChange: (selected: SelectOption) => T;
};

export type FloatingToolbarSeparator = {
  type: 'separator';
  hidden?: boolean;
};

export type FloatingToolbarDropdown<T> = {
  type: 'dropdown';
  title: string;
  icon?: Icon;
  options: DropdownOptions<T>;
  hidden?: boolean;
  hideExpandIcon?: boolean;
};

export type FloatingToolbarItem<T> =
  | FloatingToolbarButton<T>
  | FloatingToolbarDropdown<T>
  | FloatingToolbarSelect<T>
  | FloatingToolbarInput<T>
  | FloatingToolbarCustom
  | FloatingToolbarSeparator;

export interface FloatingToolbarConfig {
  title: string;
  /**
   * Override the DOM reference used to apply as the target for the
   * floating toolbar, if the config matches.
   *
   * By default, it will find the DOM reference of the node from the
   * head of the current selection.
   */
  getDomRef?: (view: EditorView) => HTMLElement | undefined;

  visible?: boolean;
  nodeType: NodeType | NodeType[];
  items:
    | Array<FloatingToolbarItem<Command>>
    | ((node: Node) => Array<FloatingToolbarItem<Command>>);
  align?: AlignType;
  className?: string;
  height?: number;
  width?: number;
  offset?: [number, number];
  forcePlacement?: boolean;
}

export type FloatingToolbarHandler = (
  state: EditorState,
  intl: IntlShape,
  providerFactory: ProviderFactory,
) => FloatingToolbarConfig | undefined;
