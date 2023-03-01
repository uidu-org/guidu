import {
  ArrowDownTrayIcon,
  ArrowsPointingOutIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
  PrinterIcon,
} from '@heroicons/react/24/outline';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { toolbarPlugin, ToolbarSlot } from '@react-pdf-viewer/toolbar';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import Button, { ButtonGroup } from '@uidu/button';
import { FileIdentifier } from '@uidu/media-core';
import React from 'react';
import styled from 'styled-components';
import tw, { theme } from 'twin.macro';
import { DocRendererProps } from '../types';

// pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const PdfViewerWrapper = styled.div`
  --rpv-core__inner-page-background-color: ${theme`colors.gray.100`};

  .rpv-core__inner-page {
    ${tw`py-8`}
  }
`;

function PDFRendererStateless({ file }: DocRendererProps) {
  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;

  return (
    <PdfViewerWrapper tw="relative h-full">
      <div tw="absolute bottom-6 left-1/2 z-50 flex -translate-x-2/4 space-x-20 rounded border bg-gray-700 p-2">
        <Toolbar>
          {(props: ToolbarSlot) => {
            const {
              CurrentPageInput,
              Download,
              EnterFullScreen,
              GoToNextPage,
              GoToPreviousPage,
              NumberOfPages,
              Print,
              ZoomIn,
              ZoomOut,
            } = props;
            return (
              <>
                <ButtonGroup>
                  <ZoomOut>
                    {(props) => (
                      <Button
                        onClick={props.onClick}
                        iconBefore={<MagnifyingGlassMinusIcon tw="h-5 w-5" />}
                        tw="bg-transparent p-0 text-white hover:(bg-white bg-opacity-10)"
                      />
                    )}
                  </ZoomOut>
                  <ZoomIn>
                    {(props) => (
                      <Button
                        onClick={props.onClick}
                        iconBefore={<MagnifyingGlassPlusIcon tw="h-5 w-5" />}
                        tw="bg-transparent p-0 text-white hover:(bg-white bg-opacity-10)"
                      />
                    )}
                  </ZoomIn>
                </ButtonGroup>
                <ButtonGroup>
                  <GoToPreviousPage>
                    {(props) => (
                      <Button
                        onClick={props.onClick}
                        iconBefore={<ChevronUpIcon tw="h-5 w-5" />}
                        tw="bg-transparent p-0 text-white hover:(bg-white bg-opacity-10)"
                      />
                    )}
                  </GoToPreviousPage>
                  <div
                    style={{ padding: '0px 2px' }}
                    tw="flex flex-nowrap items-center space-x-1 whitespace-nowrap"
                  >
                    <CurrentPageInput />
                    <span tw="text-white">/</span>
                    <span tw="text-white">
                      <NumberOfPages />
                    </span>
                  </div>
                  <GoToNextPage>
                    {(props) => (
                      <Button
                        onClick={props.onClick}
                        iconBefore={<ChevronDownIcon tw="h-5 w-5" />}
                        tw="bg-transparent p-0 text-white hover:(bg-white bg-opacity-10)"
                      />
                    )}
                  </GoToNextPage>
                </ButtonGroup>
                <ButtonGroup>
                  <EnterFullScreen>
                    {(props) => (
                      <Button
                        onClick={props.onClick}
                        iconBefore={<ArrowsPointingOutIcon tw="h-5 w-5" />}
                        tw="bg-transparent p-0 text-white hover:(bg-white bg-opacity-10)"
                      />
                    )}
                  </EnterFullScreen>
                  <Download>
                    {(props) => (
                      <Button
                        onClick={props.onClick}
                        iconBefore={<ArrowDownTrayIcon tw="h-5 w-5" />}
                        tw="bg-transparent p-0 text-white hover:(bg-white bg-opacity-10)"
                      />
                    )}
                  </Download>
                  <Print>
                    {(props) => (
                      <Button
                        onClick={props.onClick}
                        iconBefore={<PrinterIcon tw="h-5 w-5" />}
                        tw="bg-transparent p-0 text-white hover:(bg-white bg-opacity-10)"
                      />
                    )}
                  </Print>
                </ButtonGroup>
              </>
            );
          }}
        </Toolbar>
      </div>
      <Viewer fileUrl={file.url} plugins={[toolbarPluginInstance]} />
    </PdfViewerWrapper>
  );
}

function PDFRenderer({
  file,
  pdfJsVersion,
}: {
  file: FileIdentifier;
  pdfJsVersion: string;
}) {
  return (
    <Worker
      workerUrl={`https://unpkg.com/pdfjs-dist@${pdfJsVersion}/build/pdf.worker.min.js`}
    >
      <PDFRendererStateless file={file} />
    </Worker>
  );
}

export default PDFRenderer;

PDFRenderer.fileTypes = ['pdf', 'application/pdf'];
PDFRenderer.weight = 0;
