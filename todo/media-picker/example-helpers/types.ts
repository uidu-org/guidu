import { Preview } from '../src/domain/preview';

export type AuthEnvironment = 'asap' | 'client';

export interface PreviewData {
  preview?: Preview;
  readonly fileId: string;
  readonly upfrontId?: Promise<string>;
}
