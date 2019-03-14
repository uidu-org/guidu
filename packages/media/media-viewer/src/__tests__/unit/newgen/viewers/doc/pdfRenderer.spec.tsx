import * as React from 'react';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import * as PDFJSViewer from 'pdfjs-dist/web/pdf_viewer';
import Button from '@atlaskit/button';
import {
  PDFRenderer,
  pdfViewerClassName,
  Props,
  State,
} from '../../../../../newgen/viewers/doc/pdfRenderer';
import { ZoomControls } from '../../../../../newgen/zoomControls';
import { Spinner } from '../../../../../newgen/loading';
import { ErrorMessage } from '../../../../../newgen/error';
import { mountWithIntlContext } from '@uidu/media-test-helpers';

function createFixture(documentPromise: Promise<any>) {
  const onClose = jest.fn();
  pdfjsLib.getDocument = jest.fn(() => ({
    promise: documentPromise,
  }));
  PDFJSViewer.PDFViewer = jest.fn(() => {
    return {
      setDocument: jest.fn(),
      firstPagePromise: new Promise(() => {}),
    };
  });
  const el = mountWithIntlContext<Props, State>(
    <PDFRenderer src={''} onClose={onClose} />,
  );
  return { el, onClose };
}

describe('PDFRenderer', () => {
  let originalGetDocument: any;
  let originalViewer: any;
  beforeEach(() => {
    originalGetDocument = pdfjsLib.getDocument;
    originalViewer = PDFJSViewer.PDFViewer;
  });
  afterEach(() => {
    pdfjsLib.getDocument = originalGetDocument;
    PDFJSViewer.PDFViewer = originalViewer;
  });

  it('supports zooming', async () => {
    const documentPromise = Promise.resolve({});
    const { el } = createFixture(documentPromise);
    await documentPromise;
    el.update();

    expect(el.state('zoomLevel').value).toEqual(1);
    expect(el.state('doc').status).toEqual('SUCCESSFUL');
    expect(el.find(ZoomControls)).toHaveLength(1);
    el.find(ZoomControls)
      .find(Button)
      .first()
      .simulate('click');
    expect(el.state('zoomLevel').value).toBeLessThan(1);
  });

  it('shows a loading indicator until the document is ready', () => {
    const unresolvedDocumentPromise = new Promise(() => {});
    const { el } = createFixture(unresolvedDocumentPromise);
    expect(el.find(Spinner)).toHaveLength(1);
  });

  it('shows an error message when the document could not be loaded', async () => {
    const failedDocumentPromise = Promise.reject(new Error('test'));
    const { el } = createFixture(failedDocumentPromise);

    // wait for promise rejection ignoring the error
    await failedDocumentPromise.catch(() => {});
    el.update();

    const errorMessage = el.find(ErrorMessage);
    expect(errorMessage).toHaveLength(1);
    expect(errorMessage.text()).toContain(
      "We couldn't generate a preview for this file",
    );
    expect(errorMessage.find(Button)).toHaveLength(0);
  });

  it('MSW-700: clicking on background of DocViewer does not close it', async () => {
    const documentPromise = Promise.resolve({});
    const { el, onClose } = createFixture(documentPromise);
    await documentPromise;
    el.update();

    el.find(`.${pdfViewerClassName}`).simulate('click');

    expect(onClose).toHaveBeenCalled();
  });
});
