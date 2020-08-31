import {
  GasPurePayload,
  GasPureScreenEventPayload,
} from '@uidu/analytics-gas-types';
import Logger from './helpers/logger';

export type AnalyticsWebClient = {
  sendUIEvent: (event: GasPurePayload) => void;
  sendOperationalEvent: (event: GasPurePayload) => void;
  sendTrackEvent: (event: GasPurePayload) => void;
  sendScreenEvent: (event: GasPureScreenEventPayload) => void;
};

export type ListenerProps = {
  children?: React.ReactNode;
  client?: AnalyticsWebClient | Promise<AnalyticsWebClient>;
  logger: Logger;
};

export enum FabricChannel {
  guidu = 'guidu',
  elements = 'fabric-elements',
  navigation = 'navigation',
  editor = 'editor',
  media = 'media',
}
