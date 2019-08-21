import AnnotateIcon from '@atlaskit/icon/glyph/media-services/annotate';
import { EditorView } from 'prosemirror-view';
import * as React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  EVENT_TYPE,
  withAnalytics,
} from '../../../plugins/analytics';
import { Command } from '../../../types';
import Button from '../../floating-toolbar/ui/Button';
import Separator from '../../floating-toolbar/ui/Separator';
import { openMediaEditor } from '../commands/media-editor';
import { MediaPluginState, stateKey } from '../pm-plugins/main';

const annotate: Command = (state, dispatch) => {
  const pluginState: MediaPluginState | undefined = stateKey.getState(state);
  if (!pluginState) {
    return false;
  }

  const { mediaSingle } = state.schema.nodes;
  const selected = pluginState.selectedMediaContainerNode();
  if (!selected || selected.type !== mediaSingle) {
    return false;
  }

  const {
    id,
    collection: collectionName,
    occurrenceKey,
  } = selected.firstChild!.attrs;

  return withAnalytics({
    action: ACTION.CLICKED,
    actionSubject: ACTION_SUBJECT.MEDIA,
    actionSubjectId: ACTION_SUBJECT_ID.ANNOTATE_BUTTON,
    eventType: EVENT_TYPE.UI,
  })(
    openMediaEditor(state.selection.from + 1, {
      id,
      collectionName,
      mediaItemType: 'file',
      occurrenceKey,
    }),
  )(state, dispatch);
};

export const messages = defineMessages({
  annotate: {
    id: 'fabric.editor.annotate',
    defaultMessage: 'Annotate',
    description:
      'Annotate an image by drawing arrows, adding text, or scribbles.',
  },
});

type AnnotationToolbarProps = {
  viewContext: any;
  id: string;
  view?: EditorView;
};

export class AnnotationToolbar extends React.Component<AnnotationToolbarProps> {
  state = {
    isImage: false,
  };

  async componentDidMount() {
    await this.checkIsImage();
  }

  async checkIsImage() {
    const state = await this.props.viewContext.file.getCurrentState(
      this.props.id,
    );

    if (state && state.status !== 'error' && state.mediaType === 'image') {
      this.setState({
        isImage: true,
      });
    }
  }

  componentDidUpdate(prevProps: AnnotationToolbarProps) {
    if (prevProps.id !== this.props.id) {
      this.setState({ isImage: false }, () => {
        this.checkIsImage();
      });
    }
  }

  onClickAnnotation = () => {
    const { view } = this.props;
    if (view) {
      annotate(view.state, view.dispatch);
    }
  };

  render() {
    if (!this.state.isImage) {
      return null;
    }

    return (
      <>
        <Separator />
        <FormattedMessage {...messages.annotate}>
          {(title: string) => (
            <Button
              title={title}
              icon={<AnnotateIcon label={title} />}
              onClick={this.onClickAnnotation}
            />
          )}
        </FormattedMessage>
      </>
    );
  }
}

export const renderAnnotationButton = (pluginState: MediaPluginState) => {
  return (view?: EditorView, idx?: number) => {
    const selectedContainer = pluginState.selectedMediaContainerNode();
    if (!selectedContainer) {
      return null;
    }

    return (
      <AnnotationToolbar
        key={idx}
        viewContext={pluginState.mediaContext!}
        id={selectedContainer.firstChild!.attrs.id}
        view={view}
      />
    );
  };
};
