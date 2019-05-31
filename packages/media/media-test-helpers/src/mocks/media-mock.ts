import * as exenv from 'exenv';
import { Server } from 'kakapo';
import {
  createDatabase,
  generateTenantData,
  generateUserData,
} from './database';
import { createApiRouter, createMediaPlaygroundRouter } from './routers';

export type MockUserCollection = { [filename: string]: string };
export class MediaMock {
  private server = new Server();
  private collection: MockUserCollection | undefined;

  constructor(collection?: MockUserCollection) {
    this.collection = collection;
  }

  enable() {
    if (!exenv.canUseDOM) {
      return;
    }

    this.server.use(createDatabase());
    this.server.use(createMediaPlaygroundRouter());
    this.server.use(createApiRouter() as any);

    generateUserData(this.collection);
    generateTenantData();
  }

  disable() {
    // TODO: add teardown logic to kakapo server
    // tslint:disable:no-console
    console.warn('Disabling logic is not implemented in MediaMock');
  }
}

export const mediaMock = new MediaMock();
