import { RequestUnlinkCloudAccountAction } from '../../../actions/unlinkCloudAccount';
import { FileListUpdateAction } from '../../../actions/fileListUpdate';
import { mockFetcher, mockStore } from '@uidu/media-test-helpers';
import { changeCloudAccountFolderMiddleware } from '../../changeCloudAccountFolder';
import {
  changeCloudAccountFolder,
  FILE_LIST_UPDATE,
  REQUEST_UNLINK_CLOUD_ACCOUNT,
} from '../../../actions';

describe('changePath', () => {
  const clientId = 'some-client-id';
  const token = 'some-token';
  const serviceName = 'google';
  const accountId = 'some-account-id';
  const folderId = 'some-folder-id';
  const auth = { clientId, token };

  const setup = () => {
    const fetcher = mockFetcher();
    const store = mockStore();
    const next = jest.fn();

    const { userContext } = store.getState();
    (userContext.config.authProvider as jest.Mock<any>).mockReturnValue(
      Promise.resolve(auth),
    );

    return { fetcher, store, next };
  };

  it('should skip fetching for different action type', () => {
    const { fetcher, store, next } = setup();
    const action = { type: 'SOME_ANOTHER_REQUEST' };

    changeCloudAccountFolderMiddleware(fetcher)(store)(next)(action as any);

    expect(next).toBeCalledWith(action);
    expect(fetcher.fetchCloudAccountFolder).not.toBeCalled();
  });

  it('should dispatch path change when fetching successful', () => {
    const { fetcher, store, next } = setup();
    const action = changeCloudAccountFolder(serviceName, accountId, [
      { id: folderId, name: 'some-folder' },
    ]);
    const items = ['item1'];
    const data = { id: 'some-id', items };

    fetcher.fetchCloudAccountFolder.mockReturnValueOnce(Promise.resolve(data));

    return new Promise((resolve, reject) => {
      store.dispatch.mockImplementation(
        (fileListUpdateAction: FileListUpdateAction) => {
          try {
            expect(fileListUpdateAction.type).toEqual(FILE_LIST_UPDATE);
            expect(fileListUpdateAction.accountId).toEqual(accountId);
            expect(fileListUpdateAction.items).toEqual(items);

            expect(fetcher.fetchCloudAccountFolder).toBeCalledWith(
              auth,
              action.serviceName,
              action.accountId,
              action.path[0].id,
            );

            expect(next).toBeCalledWith(action);

            resolve();
          } catch (error) {
            reject(error);
          }
        },
      );

      changeCloudAccountFolderMiddleware(fetcher)(store)(next)(action);
    });
  });

  it('should dispatch account unlink if fetching ended with 401 error', () => {
    const { fetcher, store, next } = setup();
    const action = changeCloudAccountFolder(serviceName, accountId, [
      { id: folderId, name: 'some-folder' },
    ]);

    fetcher.fetchCloudAccountFolder.mockReturnValueOnce(
      Promise.reject({
        response: { status: 401 },
      }),
    );

    return new Promise((resolve, reject) => {
      store.dispatch.mockImplementation(
        (fileListUpdateAction: RequestUnlinkCloudAccountAction) => {
          try {
            expect(fileListUpdateAction.type).toEqual(
              REQUEST_UNLINK_CLOUD_ACCOUNT,
            );
            expect(fileListUpdateAction.account.id).toEqual(accountId);
            expect(fileListUpdateAction.account.name).toEqual(
              action.serviceName,
            );

            expect(fetcher.fetchCloudAccountFolder).toBeCalledWith(
              auth,
              action.serviceName,
              action.accountId,
              action.path[0].id,
            );

            expect(next).toBeCalledWith(action);

            resolve();
          } catch (error) {
            reject(error);
          }
        },
      );

      changeCloudAccountFolderMiddleware(fetcher)(store)(next)(action);
    });
  });
});
