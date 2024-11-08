import AnnotateIcon from '@atlaskit/icon/glyph/media-services/annotate';
import { getMediaClient, MediaClientConfig } from '@uidu/media-core';
import { EditorView } from 'prosemirror-view';
import React from 'react';
import { defineMessages, IntlShape } from 'react-intl';
import { Command } from '../../../types';
import Button from '../../floating-toolbar/ui/Button';
import Separator from '../../floating-toolbar/ui/Separator';
import { openMediaEditor } from '../commands/media-editor';
import { stateKey } from '../pm-plugins/plugin-key';
import { MediaPluginState } from '../pm-plugins/types';

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

  const { id, occurrenceKey, file } = selected.firstChild!.attrs;

  return openMediaEditor(state.selection.from + 1, file)(state, dispatch);
};

export const messages = defineMessages({
  annotate: {
    id: 'uidu.editor-core.annotate',
    defaultMessage: 'Annotate',
    description:
      'Annotate an image by drawing arrows, adding text, or scribbles.',
  },
});

type AnnotationToolbarProps = {
  viewMediaClientConfig: MediaClientConfig;
  id: string;
  collection?: string;
  intl: IntlShape;
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
    const mediaClient = getMediaClient(this.props.viewMediaClientConfig);
    if (!this.props.id) {
      return;
    }
    const state = await mediaClient.file.getCurrentState(this.props.id, {
      collectionName: this.props.collection,
    });

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

    const { intl } = this.props;

    const title = intl.formatMessage(messages.annotate);

    return (
      <>
        <Separator />
        <Button
          title={title}
          icon={<AnnotateIcon label={title} />}
          onClick={this.onClickAnnotation}
        />
      </>
    );
  }
}

export const renderAnnotationButton = (
  pluginState: MediaPluginState,
  intl: IntlShape,
) => {
  return (view?: EditorView, idx?: number) => {
    const selectedContainer = pluginState.selectedMediaContainerNode();
    if (!selectedContainer || !pluginState.mediaClientConfig) {
      return null;
    }

    return (
      <AnnotationToolbar
        key={idx}
        viewMediaClientConfig={pluginState.mediaClientConfig}
        id={selectedContainer.firstChild!.attrs.id}
        collection={selectedContainer.firstChild!.attrs.collection}
        view={view}
        intl={intl}
      />
    );
  };
};
