import { Context, ContextFactory } from '@uidu/media-core';
import { Store } from 'redux';
import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import * as exenv from 'exenv';
import App, { AppProxyReactContext } from '../popup/components/app';
import { cancelUpload } from '../popup/actions/cancelUpload';
import { showPopup } from '../popup/actions/showPopup';
import { resetView } from '../popup/actions/resetView';
import { getFilesInRecents } from '../popup/actions/getFilesInRecents';
import { State } from '../popup/domain';
import { hidePopup } from '../popup/actions/hidePopup';
import { createStore } from '../store';
import { UploadComponent } from './component';

import { defaultUploadParams } from '../domain/uploadParams';
import { UploadParams } from '../domain/config';
import {
  PopupUploadEventPayloadMap,
  Popup,
  PopupUploadEventEmitter,
  PopupConfig,
} from './types';

export class PopupImpl extends UploadComponent<PopupUploadEventPayloadMap>
  implements PopupUploadEventEmitter, Popup {
  private readonly container?: HTMLElement;
  private readonly store: Store<State>;
  private tenantUploadParams: UploadParams;
  private proxyReactContext?: AppProxyReactContext;

  constructor(
    readonly tenantContext: Context,
    {
      container = exenv.canUseDOM ? document.body : undefined,
      uploadParams, // tenant
      proxyReactContext,
      singleSelect,
    }: PopupConfig,
  ) {
    super();
    this.proxyReactContext = proxyReactContext;

    const { userAuthProvider, cacheSize } = tenantContext.config;
    if (!userAuthProvider) {
      throw new Error(
        'When using Popup media picker userAuthProvider must be provided in the context',
      );
    }

    const userContext = ContextFactory.create({
      cacheSize,
      authProvider: userAuthProvider,
    });
    const tenantUploadParams = {
      ...defaultUploadParams,
      ...uploadParams,
    };

    this.store = createStore(this, tenantContext, userContext, {
      proxyReactContext,
      singleSelect,
      uploadParams: tenantUploadParams,
    });

    this.tenantUploadParams = tenantUploadParams;

    const popup = this.renderPopup();
    if (!popup) {
      return;
    }

    this.container = popup;
    if (container) {
      container.appendChild(popup);
    }
  }

  public async show(): Promise<void> {
    const { dispatch } = this.store;

    dispatch(resetView());
    dispatch(getFilesInRecents());
    dispatch(showPopup());
  }

  public async cancel(
    uniqueIdentifier?: string | Promise<string>,
  ): Promise<void> {
    if (!uniqueIdentifier) {
      return;
    }

    this.store.dispatch(
      cancelUpload({ tenantUploadId: await uniqueIdentifier }),
    );
  }

  public teardown(): void {
    if (!this.container) {
      return;
    }
    unmountComponentAtNode(this.container);
  }

  public hide(): void {
    this.store.dispatch(hidePopup());
  }

  public setUploadParams(uploadParams: UploadParams): void {
    this.tenantUploadParams = {
      ...defaultUploadParams,
      ...uploadParams,
    };
  }

  public emitClosed(): void {
    this.emit('closed', undefined);
  }

  private renderPopup(): HTMLElement | undefined {
    if (!exenv.canUseDOM) {
      return;
    }
    const container = document.createElement('div');

    render(
      <App
        store={this.store}
        proxyReactContext={this.proxyReactContext}
        tenantUploadParams={this.tenantUploadParams}
      />,
      container,
    );
    return container;
  }
}
