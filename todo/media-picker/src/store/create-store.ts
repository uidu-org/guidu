import { Context } from '@uidu/media-core';
import { applyMiddleware, createStore, Store, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import { CloudService } from '../popup/services/cloud-service';
import { MediaApiFetcher } from '../popup/tools/fetcher/fetcher';
import { WsProvider } from '../popup/tools/websocket/wsProvider';
import reducers from '../popup/reducers/reducers';
import { State } from '../popup/domain';
import defaultState from '../popup/default_state';
import appConfig from '../config';
import changeAccount from '../popup/middleware/changeAccount';
import { changeService } from '../popup/middleware/changeService';
import { fetchNextCloudFilesPageMiddleware } from '../popup/middleware/fetchNextCloudFilesPage';
import { changeCloudAccountFolderMiddleware } from '../popup/middleware/changeCloudAccountFolder';
import startAppMiddleware from '../popup/middleware/startApp';
import { getConnectedRemoteAccounts } from '../popup/middleware/getConnectedRemoteAccounts';
import { getFilesInRecents } from '../popup/middleware/getFilesInRecents';
import { importFilesMiddleware } from '../popup/middleware/importFiles';
import { startCloudAccountOAuthFlow } from '../popup/middleware/startAuth';
import unlinkCloudAccount from '../popup/middleware/unlinkCloudAccount';
import { proxyUploadEvents } from '../popup/middleware/proxyUploadEvents';
import cancelUpload from '../popup/middleware/cancelUpload';
import { editRemoteImageMiddleware } from '../popup/middleware/editRemoteImage';
import finalizeUploadMiddleware from '../popup/middleware/finalizeUpload';
import getPreviewMiddleware from '../popup/middleware/getPreview';
import { handleCloudFetchingEvent } from '../popup/middleware/handleCloudFetchingEvent';
import searchGiphy from '../popup/middleware/searchGiphy';
import hidePopupMiddleware from '../popup/middleware/hidePopup';
import sendUploadEventMiddleware from '../popup/middleware/sendUploadEvent';
import { PopupConfig, PopupUploadEventEmitter } from '../components/types';
import analyticsProcessing from '../popup/middleware/analyticsProcessing';
import { removeFileFromRecents } from '../popup/middleware/removeFileFromRecents';

export default (
  eventEmitter: PopupUploadEventEmitter,
  tenantContext: Context,
  userContext: Context,
  config: Partial<PopupConfig>,
): Store<State> => {
  const userAuthProvider = userContext.config.authProvider;
  const redirectUrl = appConfig.html.redirectUrl;
  const fetcher = new MediaApiFetcher();
  const wsProvider = new WsProvider();
  const cloudService = new CloudService(userAuthProvider);
  const partialState: State = {
    ...defaultState,
    redirectUrl,
    tenantContext: tenantContext,
    userContext: userContext,
    config,
  };
  return createStore(
    reducers,
    partialState,
    composeWithDevTools(
      applyMiddleware(
        analyticsProcessing as any,
        startAppMiddleware() as any,
        getFilesInRecents() as any,
        changeService as any,
        changeAccount as any,
        changeCloudAccountFolderMiddleware(fetcher) as any,
        fetchNextCloudFilesPageMiddleware(fetcher) as any,
        startCloudAccountOAuthFlow(fetcher, cloudService) as any,
        unlinkCloudAccount(fetcher) as any,
        getConnectedRemoteAccounts(fetcher) as any,
        cancelUpload as any,
        importFilesMiddleware(eventEmitter, wsProvider),
        editRemoteImageMiddleware() as any,
        getPreviewMiddleware(),
        finalizeUploadMiddleware(fetcher),
        proxyUploadEvents as any,
        handleCloudFetchingEvent as any,
        searchGiphy(fetcher) as any,
        hidePopupMiddleware(eventEmitter) as any,
        sendUploadEventMiddleware(eventEmitter),
        removeFileFromRecents as any,
      ),
    ),
  );
};
