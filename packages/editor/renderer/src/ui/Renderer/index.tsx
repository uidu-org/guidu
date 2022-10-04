import { defaultSchema } from '@uidu/adf-schema';
import { reduce } from '@uidu/adf-utils';
import { CreateUIAnalyticsEvent } from '@uidu/analytics';
import { FabricChannel } from '@uidu/analytics-listeners';
import { FabricEditorAnalyticsContext } from '@uidu/analytics-namespaced-context';
import {
  ADFStage,
  BaseTheme,
  EventHandlers,
  ExtensionHandlers,
  getAnalyticsAppearance,
  getResponseEndTime,
  ProviderFactory,
  startMeasure,
  stopMeasure,
  UnsupportedBlock,
  WidthProvider,
  WithCreateAnalyticsEvent,
} from '@uidu/editor-common';
import { Schema } from 'prosemirror-model';
import * as React from 'react';
import { PureComponent } from 'react';
import { IntlProvider } from 'react-intl';
import { ReactSerializer, renderDocument, RendererContext } from '../../';
import AnalyticsContext from '../../analytics/analyticsContext';
import { ACTION, ACTION_SUBJECT, EVENT_TYPE } from '../../analytics/enums';
import { AnalyticsEventPayload, MODE, PLATFORM } from '../../analytics/events';
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
  allowDynamicTextSizing?: boolean;
  allowHeadingAnchorLinks?: boolean;
  maxHeight?: number;
  truncated?: boolean;
  createAnalyticsEvent?: CreateUIAnalyticsEvent;
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
    startMeasure('Renderer Render Time');
  }

  private anchorLinkAnalytics() {
    const anchorLinkAttributeHit =
      !this.props.disableHeadingIDs &&
      window.location.hash &&
      document.getElementById(
        decodeURIComponent(window.location.hash.slice(1)),
      );

    if (anchorLinkAttributeHit) {
      this.fireAnalyticsEvent({
        action: ACTION.VIEWED,
        actionSubject: ACTION_SUBJECT.ANCHOR_LINK,
        attributes: { platform: PLATFORM.WEB, mode: MODE.RENDERER },
        eventType: EVENT_TYPE.UI,
      });
    }
  }

  componentDidMount() {
    this.fireAnalyticsEvent({
      action: ACTION.STARTED,
      actionSubject: ACTION_SUBJECT.RENDERER,
      attributes: { platform: PLATFORM.WEB },
      eventType: EVENT_TYPE.UI,
    });

    this.rafID = requestAnimationFrame(() => {
      stopMeasure('Renderer Render Time', (duration) => {
        this.fireAnalyticsEvent({
          action: ACTION.RENDERED,
          actionSubject: ACTION_SUBJECT.RENDERER,
          attributes: {
            platform: PLATFORM.WEB,
            duration,
            ttfb: getResponseEndTime(),
            nodes: reduce<Record<string, number>>(
              this.props.document,
              (acc, node) => {
                acc[node.type] = (acc[node.type] || 0) + 1;
                return acc;
              },
              {},
            ),
          },
          eventType: EVENT_TYPE.OPERATIONAL,
        });
      });
      this.anchorLinkAnalytics();
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
      allowDynamicTextSizing,
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
      allowDynamicTextSizing,
      allowHeadingAnchorLinks,
      allowColumnSorting,
      fireAnalyticsEvent: this.fireAnalyticsEvent,
    });
  }

  private fireAnalyticsEvent = (event: AnalyticsEventPayload) => {
    const { createAnalyticsEvent } = this.props;

    if (createAnalyticsEvent) {
      const channel = FabricChannel.editor;
      createAnalyticsEvent(event).fire(channel);
    }
  };

  render() {
    const {
      document,
      onComplete,
      schema,
      appearance,
      adfStage,
      allowDynamicTextSizing,
      maxHeight,
      truncated,
    } = this.props;

    try {
      const { result, stat } = renderDocument(
        document,
        this.serializer!,
        schema || defaultSchema,
        adfStage,
      );

      if (onComplete) {
        onComplete(stat);
      }
      const rendererOutput = (
        <CopyTextProvider>
          <IntlProvider locale="en">
            <AnalyticsContext.Provider
              value={{
                fireAnalyticsEvent: (event: AnalyticsEventPayload) =>
                  this.fireAnalyticsEvent(event),
              }}
            >
              <SmartCardStorageProvider>
                <RendererWrapper
                  appearance={appearance}
                  dynamicTextSizing={!!allowDynamicTextSizing}
                >
                  {result}
                </RendererWrapper>
              </SmartCardStorageProvider>
            </AnalyticsContext.Provider>
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
        <RendererWrapper
          appearance={appearance}
          dynamicTextSizing={!!allowDynamicTextSizing}
        >
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

const RendererWithAnalytics = (props: Props) => (
  <FabricEditorAnalyticsContext
    data={{ appearance: getAnalyticsAppearance(props.appearance) }}
  >
    <WithCreateAnalyticsEvent
      render={(createAnalyticsEvent) => (
        <Renderer {...props} createAnalyticsEvent={createAnalyticsEvent} />
      )}
    />
  </FabricEditorAnalyticsContext>
);

export default RendererWithAnalytics;

type RendererWrapperProps = {
  appearance: RendererAppearance;
  dynamicTextSizing: boolean;
} & { children?: React.ReactNode };

export function RendererWrapper({
  appearance,
  children,
  dynamicTextSizing,
}: RendererWrapperProps) {
  return (
    <WidthProvider>
      <BaseTheme dynamicTextSizing={dynamicTextSizing}>
        <Wrapper appearance={appearance}>{children}</Wrapper>
      </BaseTheme>
    </WidthProvider>
  );
}
