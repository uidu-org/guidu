import WidthDetector from '@atlaskit/width-detector';
import { ProviderFactory } from '@uidu/editor-common';
import { EditorView } from 'prosemirror-view';
import * as React from 'react';
import styled from 'styled-components';
import EditorActions from '../../actions';
import { EventDispatcher } from '../../event-dispatcher';
import { DispatchAnalyticsEvent } from '../../plugins/analytics';
import { EditorAppearance, ToolbarUIComponentFactory } from '../../types';
import { isFullPage } from '../../utils/is-full-page';

const ToolbarComponentsWrapper = styled.div`
  display: flex;
`;

export enum ToolbarSize {
  XXL = 6,
  XL = 5,
  L = 4,
  M = 3,
  S = 2,
  XXXS = 1,
}

// Toolbar sizes for full page editor a little bit different, because it has more buttons e.g. actions button...
const toolbarSizesFullPage: Array<{ width: number; size: ToolbarSize }> = [
  { width: 650, size: ToolbarSize.XXL },
  { width: 580, size: ToolbarSize.XL },
  { width: 500, size: ToolbarSize.L },
  { width: 450, size: ToolbarSize.M },
  { width: 370, size: ToolbarSize.S },
];

const toolbarSizes: Array<{ width: number; size: ToolbarSize }> = [
  { width: 610, size: ToolbarSize.XXL },
  { width: 540, size: ToolbarSize.XL },
  { width: 460, size: ToolbarSize.L },
  { width: 450, size: ToolbarSize.M },
  { width: 370, size: ToolbarSize.S },
];

export interface ToolbarProps {
  items?: Array<ToolbarUIComponentFactory>;
  editorView: EditorView;
  editorActions?: EditorActions;
  eventDispatcher: EventDispatcher;
  providerFactory: ProviderFactory;
  appearance: EditorAppearance;
  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
  popupsScrollableElement?: HTMLElement;
  disabled: boolean;
  width?: number;
  dispatchAnalyticsEvent?: DispatchAnalyticsEvent;
}

export interface ToolbarInnerProps extends ToolbarProps {
  toolbarSize: ToolbarSize;
  isToolbarReducedSpacing: boolean;
  isReducedSpacing?: boolean;
}

export class ToolbarInner extends React.Component<ToolbarInnerProps> {
  shouldComponentUpdate(nextProps: ToolbarInnerProps) {
    return (
      nextProps.toolbarSize !== this.props.toolbarSize ||
      nextProps.disabled !== this.props.disabled ||
      nextProps.popupsMountPoint === this.props.popupsMountPoint ||
      nextProps.popupsBoundariesElement ===
        this.props.popupsBoundariesElement ||
      nextProps.popupsScrollableElement ===
        this.props.popupsScrollableElement ||
      nextProps.isReducedSpacing !== this.props.isToolbarReducedSpacing
    );
  }

  render() {
    const {
      appearance,
      editorView,
      editorActions,
      eventDispatcher,
      providerFactory,
      items,
      popupsMountPoint,
      popupsBoundariesElement,
      popupsScrollableElement,
      toolbarSize,
      disabled,
      isToolbarReducedSpacing,
      dispatchAnalyticsEvent,
    } = this.props;

    if (!items || !items.length) {
      return null;
    }

    return (
      <ToolbarComponentsWrapper>
        {items.map((component, key) => {
          const props: any = { key };
          const element = component({
            editorView,
            editorActions: editorActions as EditorActions,
            eventDispatcher,
            providerFactory,
            appearance,
            popupsMountPoint,
            popupsBoundariesElement,
            popupsScrollableElement,
            disabled,
            toolbarSize,
            isToolbarReducedSpacing,
            containerElement: undefined,
            dispatchAnalyticsEvent,
          });
          return element && React.cloneElement(element, props);
        })}
      </ToolbarComponentsWrapper>
    );
  }
}

const toolbarSizesForAppearance = (appearance?: EditorAppearance) =>
  isFullPage(appearance) ? toolbarSizesFullPage : toolbarSizes;

const widthToToolbarSize = (
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

export function Toolbar(props: ToolbarProps) {
  const toolbarSize = widthToToolbarSize(props.width || 0, props.appearance);
  return (
    <ToolbarInner
      {...props}
      toolbarSize={toolbarSize}
      isToolbarReducedSpacing={toolbarSize < ToolbarSize.XXL}
    />
  );
}

export default function ToolbarWithSizeDetector(props: ToolbarProps) {
  return (
    <div style={{ width: '100%', minWidth: '254px' }}>
      <WidthDetector>
        {width =>
          width === undefined ? null : <Toolbar {...props} width={width} />
        }
      </WidthDetector>
    </div>
  );
}
