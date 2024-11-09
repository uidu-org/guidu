import { defaultSchema } from '@uidu/adf-schema';
import {
  ADFStage,
  EventHandlers,
  ExtensionHandlers,
  ProviderFactory,
  stopMeasure,
  UnsupportedBlock,
  WidthProvider,
} from '@uidu/editor-common';
import { Schema } from 'prosemirror-model';
import * as React from 'react';
import { PureComponent } from 'react';
import { IntlProvider } from 'react-intl';
import { ReactSerializer, renderDocument, RendererContext } from '../..';
import { CopyTextProvider } from '../../react/nodes/copy-text-provider';
import { RenderOutputStat } from '../../render-document';
import { Provider as SmartCardStorageProvider } from '../SmartCardStorage';
import { Wrapper } from './style';
import { TruncatedWrapper } from './truncated-wrapper';
import { RendererAppearance } from './types';

export interface Extension<T> {
  extensionKey: string;
  parameters?: T;
  content?: any; // This would be the original Atlassian Document Format
}

export interface Props {
  document: any;
  dataProviders?: ProviderFactory;
  eventHandlers?: EventHandlers;
  extensionHandlers?: ExtensionHandlers;
  onComplete?: (stat: RenderOutputStat) => void;
  portal?: HTMLElement;
  rendererContext?: RendererContext;
  schema?: Schema;
  appearance?: RendererAppearance;
  adfStage?: ADFStage;
  disableHeadingIDs?: boolean;
  allowHeadingAnchorLinks?: boolean;
  maxHeight?: number;
  truncated?: boolean;
  allowColumnSorting?: boolean;
}

export class Renderer extends PureComponent<Props, {}> {
  private providerFactory: ProviderFactory;

  private serializer?: ReactSerializer;

  private rafID: number | undefined;

  constructor(props: Props) {
    super(props);
    this.providerFactory = props.dataProviders || new ProviderFactory();
    this.updateSerializer(props);
  }

  componentDidMount() {
    this.rafID = requestAnimationFrame(() => {
      stopMeasure('Renderer Render Time', (duration) => {});
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    if (
      nextProps.portal !== this.props.portal ||
      nextProps.appearance !== this.props.appearance
    ) {
      this.updateSerializer(nextProps);
    }
  }

  private updateSerializer(props: Props) {
    const {
      eventHandlers,
      portal,
      rendererContext,
      document,
      extensionHandlers,
      schema,
      appearance,
      disableHeadingIDs,
      allowHeadingAnchorLinks,
      allowColumnSorting,
    } = props;

    this.serializer = new ReactSerializer({
      providers: this.providerFactory,
      eventHandlers,
      extensionHandlers,
      portal,
      objectContext: {
        adDoc: document,
        schema,
        ...rendererContext,
      } as RendererContext,
      appearance,
      disableHeadingIDs,
      allowHeadingAnchorLinks,
      allowColumnSorting,
    });
  }

  render() {
    const {
      document,
      onComplete,
      schema,
      appearance,
      adfStage,
      maxHeight,
      truncated,
    } = this.props;

    try {
      const { result, stat } = renderDocument(
        document,
        this.serializer,
        schema || defaultSchema,
        adfStage,
      );

      if (onComplete) {
        onComplete(stat);
      }
      const rendererOutput = (
        <CopyTextProvider>
          <IntlProvider locale="en">
            <SmartCardStorageProvider>
              <RendererWrapper appearance={appearance}>
                {result}
              </RendererWrapper>
            </SmartCardStorageProvider>
          </IntlProvider>
        </CopyTextProvider>
      );

      return truncated ? (
        <TruncatedWrapper height={maxHeight}>{rendererOutput}</TruncatedWrapper>
      ) : (
        rendererOutput
      );
    } catch (ex) {
      return (
        <RendererWrapper appearance={appearance}>
          <UnsupportedBlock />
        </RendererWrapper>
      );
    }
  }

  componentWillUnmount() {
    const { dataProviders } = this.props;

    if (this.rafID) {
      window.cancelAnimationFrame(this.rafID);
    }

    // if this is the ProviderFactory which was created in constructor
    // it's safe to destroy it on Renderer unmount
    if (!dataProviders) {
      this.providerFactory.destroy();
    }
  }
}

export default Renderer;

export function RendererWrapper({ children }: { children?: React.ReactNode }) {
  return (
    <WidthProvider>
      <Wrapper>{children}</Wrapper>
    </WidthProvider>
  );
}
