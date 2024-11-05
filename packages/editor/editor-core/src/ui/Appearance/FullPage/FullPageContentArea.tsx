import {
  akEditorGutterPadding,
  ProviderFactory,
  WidthConsumer,
} from '@uidu/editor-common';
import { EditorView } from 'prosemirror-view';
import React, { ReactElement } from 'react';
import EditorActions from '../../../actions';
import { EventDispatcher } from '../../../event-dispatcher';
import {
  EditorAppearance,
  ReactComponents,
  UIComponentFactory,
} from '../../../types';
import { ClickAreaBlock } from '../../Addon';
import ContextPanel from '../../ContextPanel';
import PluginSlot from '../../PluginSlot';
import WidthEmitter from '../../WidthEmitter';
import {
  ContentArea,
  EditorContentArea,
  ScrollContainer,
  SidebarArea,
} from './StyledComponents';

interface FullPageEditorContentAreaProps {
  allowAnnotation: boolean | undefined;
  appearance: EditorAppearance | undefined;
  contentArea: HTMLElement | undefined;
  contentComponents: UIComponentFactory[] | undefined;
  contextPanel: ReactComponents | undefined;
  customContentComponents: ReactComponents | undefined;
  disabled: boolean | undefined;
  editorActions: EditorActions | undefined;
  editorDOMElement: ReactElement;
  editorView: EditorView;
  eventDispatcher: EventDispatcher | undefined;
  popupsMountPoint: HTMLElement | undefined;
  popupsBoundariesElement: HTMLElement | undefined;
  popupsScrollableElement: HTMLElement | undefined;
  providerFactory: ProviderFactory;
  scrollContainer: HTMLElement | null;
  contentAreaRef(ref: HTMLElement | null): void;
  scrollContainerRef(ref: HTMLElement | null): void;
}

export const FullPageContentArea: React.FunctionComponent<FullPageEditorContentAreaProps> =
  React.memo((props) => {
    return (
      <ContentArea>
        <ScrollContainer
          ref={props.scrollContainerRef}
          allowAnnotation={props.allowAnnotation}
          className="fabric-editor-popup-scroll-parent"
        >
          <ClickAreaBlock editorView={props.editorView}>
            <WidthConsumer>
              {({ width }) => (
                <EditorContentArea
                  fullWidthMode={props.appearance === 'full-width'}
                  innerRef={props.contentAreaRef}
                  containerWidth={width}
                >
                  <div
                    style={{
                      padding: `0 ${akEditorGutterPadding}px`,
                      boxSizing: 'border-box',
                    }}
                    className={[
                      'ak-editor-content-area',
                      props.appearance === 'full-width'
                        ? 'fabric-editor--full-width-mode'
                        : '',
                    ].join(' ')}
                  >
                    {props.customContentComponents}
                    {
                      <PluginSlot
                        editorView={props.editorView}
                        editorActions={props.editorActions}
                        eventDispatcher={props.eventDispatcher}
                        providerFactory={props.providerFactory}
                        appearance={props.appearance}
                        items={props.contentComponents}
                        contentArea={props.contentArea}
                        popupsMountPoint={props.popupsMountPoint}
                        popupsBoundariesElement={props.popupsBoundariesElement}
                        popupsScrollableElement={props.popupsScrollableElement}
                        disabled={!!props.disabled}
                        containerElement={props.scrollContainer}
                      />
                    }
                    {props.editorDOMElement}
                  </div>
                </EditorContentArea>
              )}
            </WidthConsumer>
          </ClickAreaBlock>
        </ScrollContainer>
        <SidebarArea>{props.contextPanel || <ContextPanel />}</SidebarArea>
        <WidthEmitter editorView={props.editorView} />
      </ContentArea>
    );
  });
