import { ProviderFactory } from '@uidu/editor-common';
import { EditorView } from 'prosemirror-view';
import React from 'react';
import { EditorActions } from '../../..';
import { EventDispatcher } from '../../../event-dispatcher';
import { DispatchAnalyticsEvent } from '../../../plugins/analytics';
import { CollabEditOptions } from '../../../plugins/collab-edit';
import Avatars from '../../../plugins/collab-edit/ui/avatars';
import {
  EditorAppearance,
  ReactComponents,
  ToolbarUIComponentFactory,
} from '../../../types';
import Toolbar from '../../Toolbar';
import { MainToolbar, MainToolbarCustomComponentsSlot } from './MainToolbar';

export interface FullPageToolbarProps {
  appearance?: EditorAppearance;
  providerFactory: ProviderFactory;
  editorActions?: EditorActions;
  editorDOMElement: JSX.Element;
  editorView: EditorView;
  eventDispatcher: EventDispatcher;
  dispatchAnalyticsEvent?: DispatchAnalyticsEvent;
  primaryToolbarComponents?: ToolbarUIComponentFactory[];
  customPrimaryToolbarComponents?: ReactComponents;
  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
  popupsScrollableElement?: HTMLElement;
  disabled: boolean;
  collabEdit?: CollabEditOptions;
  showKeyline: boolean;
}

export const FullPageToolbar: React.FunctionComponent<FullPageToolbarProps> = React.memo(
  (props) => {
    return (
      <MainToolbar showKeyline={props.showKeyline}>
        <Toolbar
          editorView={props.editorView}
          editorActions={props.editorActions}
          eventDispatcher={props.eventDispatcher}
          providerFactory={props.providerFactory}
          appearance={props.appearance}
          items={props.primaryToolbarComponents}
          popupsMountPoint={props.popupsMountPoint}
          popupsBoundariesElement={props.popupsBoundariesElement}
          popupsScrollableElement={props.popupsScrollableElement}
          disabled={props.disabled}
          dispatchAnalyticsEvent={props.dispatchAnalyticsEvent}
        />
        <MainToolbarCustomComponentsSlot>
          <Avatars
            editorView={props.editorView}
            eventDispatcher={props.eventDispatcher}
            inviteToEditComponent={
              props.collabEdit && props.collabEdit.inviteToEditComponent
            }
            inviteToEditHandler={
              props.collabEdit && props.collabEdit.inviteToEditHandler
            }
            isInviteToEditButtonSelected={
              props.collabEdit && props.collabEdit.isInviteToEditButtonSelected
            }
          />
          {props.customPrimaryToolbarComponents}
        </MainToolbarCustomComponentsSlot>
      </MainToolbar>
    );
  },
);
