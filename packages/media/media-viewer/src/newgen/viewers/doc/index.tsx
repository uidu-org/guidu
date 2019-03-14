import * as React from 'react';
import { Context, FileState } from '@uidu/media-core';
import { Outcome } from '../../domain';
import { createError, MediaViewerError } from '../../error';
import { Spinner } from '../../loading';
import { constructAuthTokenUrl } from '../../utils';
import { Props as RendererProps } from './pdfRenderer';
import { ComponentClass } from 'react';
import { getArtifactUrl } from '@uidu/media-store';
import { BaseViewer } from '../base-viewer';
import { getObjectUrlFromFileState } from '../../utils/getObjectUrlFromFileState';

const moduleLoader = () =>
  import(/* webpackChunkName:"@atlaskit-internal_media-viewer-pdf-viewer" */ './pdfRenderer');

const componentLoader: () => Promise<ComponentClass<RendererProps>> = () =>
  moduleLoader().then(module => module.PDFRenderer);

export type Props = {
  context: Context;
  item: FileState;
  collectionName?: string;
  onClose?: () => void;
};

export type State = {
  content: Outcome<string, MediaViewerError>;
};

export class DocViewer extends BaseViewer<string, Props> {
  static PDFComponent: ComponentClass<RendererProps>;

  protected get initialState() {
    return {
      content: Outcome.pending<string, MediaViewerError>(),
    };
  }

  protected async init() {
    if (!DocViewer.PDFComponent) {
      await this.loadDocViewer();
    }
    const { item, context, collectionName } = this.props;

    if (item.status === 'processed') {
      const pdfArtifactUrl = getArtifactUrl(item.artifacts, 'document.pdf');
      if (!pdfArtifactUrl) {
        this.setState({
          content: Outcome.failed(
            createError('noPDFArtifactsFound', undefined, item),
          ),
        });
        return;
      }
      try {
        const src = await constructAuthTokenUrl(
          pdfArtifactUrl,
          context,
          collectionName,
        );
        this.setState({
          content: Outcome.successful(src),
        });
      } catch (err) {
        this.setState({
          content: Outcome.failed(createError('previewFailed', err, item)),
        });
      }
    } else {
      const src = await getObjectUrlFromFileState(item);
      if (!src) {
        this.setState({
          content: Outcome.pending(),
        });
        return;
      }
      this.setState({
        content: Outcome.successful(src),
      });
    }
  }

  private async loadDocViewer() {
    DocViewer.PDFComponent = await componentLoader();
    this.forceUpdate();
  }

  protected release() {
    const { content } = this.state;
    if (!content.data) {
      return;
    }

    URL.revokeObjectURL(content.data);
  }

  protected renderSuccessful(content: string) {
    const { onClose } = this.props;
    const { PDFComponent } = DocViewer;

    if (!PDFComponent) {
      return <Spinner />;
    }
    return <PDFComponent src={content} onClose={onClose} />;
  }
}
