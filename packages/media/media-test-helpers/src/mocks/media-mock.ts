import { Server } from 'kakapo';
import * as exenv from 'exenv';
import { createApiRouter, createMediaPlaygroundRouter } from './routers';
import {
  createDatabase,
  generateUserData,
  generateTenantData,
} from './database';

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
    this.server.use(createApiRouter());

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
