import {
  WsRemoteUploadEndData,
  WsRemoteUploadFailData,
  WsRemoteUploadProgressData,
  WsRemoteUploadStartData,
} from '../../../wsMessageData';
import { WsUploadEvents } from '../../wsUploadEvents';
import {
  DispatchUploadEvent,
  RemoteUploadActivity,
} from '../../remoteUploadActivity';

type CallbackFunction = (activity: RemoteUploadActivity) => void;

describe('RemoteUploadActivity', () => {
  let dispatchEvent: jest.Mock<DispatchUploadEvent<keyof WsUploadEvents>>;
  let uploadActivity: RemoteUploadActivity;
  let started: jest.Mock<CallbackFunction>;
  let completed: jest.Mock<CallbackFunction>;

  const uploadId = 'some-upload-id';
  const fileId = 'file-id';
  const otherUploadId = 'some-other-upload-id';
  const currentAmount = 123;
  const totalAmount = 456;
  const reason = 'some-reason';

  beforeEach(() => {
    dispatchEvent = jest.fn<DispatchUploadEvent<keyof WsUploadEvents>>();
    uploadActivity = new RemoteUploadActivity(uploadId, dispatchEvent);

    started = jest.fn<CallbackFunction>();
    completed = jest.fn<CallbackFunction>();
    uploadActivity.on('Started', started);
    uploadActivity.on('Completed', completed);
  });

  it('should skip event that has no type', () => {
    const incorrectData: any = {
      a: 12,
    };

    uploadActivity.processWebSocketData(incorrectData);
    expect(dispatchEvent).toHaveBeenCalledTimes(0);
  });

  it('should skip event that has no uploadId but known type', () => {
    const incorrectRemoteUploadProgressData: any = {
      type: 'RemoteUploadProgress',
      currentAmount,
      totalAmount,
    };

    uploadActivity.processWebSocketData(incorrectRemoteUploadProgressData);
    expect(dispatchEvent).toHaveBeenCalledTimes(0);
  });

  it('should dispatch RemoteUploadStart event', () => {
    const remoteUploadStartData: WsRemoteUploadStartData = {
      type: 'RemoteUploadStart',
      uploadId,
    };

    uploadActivity.processWebSocketData(remoteUploadStartData);

    expect(dispatchEvent).toHaveBeenCalledTimes(1);
    expect(dispatchEvent).toHaveBeenCalledWith('RemoteUploadStart', {
      uploadId,
    });

    expect(started).toHaveBeenCalledTimes(1);
    expect(started).toHaveBeenCalledWith(uploadActivity);
  });

  it('should dispatch RemoteUploadProgress event', () => {
    const remoteUploadProgressData: WsRemoteUploadProgressData = {
      type: 'RemoteUploadProgress',
      uploadId,
      currentAmount,
      totalAmount,
    };

    uploadActivity.processWebSocketData(remoteUploadProgressData);

    expect(dispatchEvent).toHaveBeenCalledTimes(1);
    expect(dispatchEvent).toHaveBeenCalledWith('RemoteUploadProgress', {
      uploadId,
      bytes: currentAmount,
      fileSize: totalAmount,
    });
  });

  it('should dispatch RemoteUploadEnd event and complete activity', () => {
    const remoteUploadEndData: WsRemoteUploadEndData = {
      type: 'RemoteUploadEnd',
      uploadId,
      fileId,
    };

    uploadActivity.processWebSocketData(remoteUploadEndData);

    expect(dispatchEvent).toHaveBeenCalledTimes(1);
    expect(dispatchEvent).toHaveBeenCalledWith('RemoteUploadEnd', {
      uploadId,
      fileId,
    });

    expect(completed).toHaveBeenCalledTimes(1);
    expect(completed).toHaveBeenCalledWith(uploadActivity);
  });

  it('should dispatch RemoteUploadFail event and complete activity', () => {
    const remoteUploadFailData: WsRemoteUploadFailData = {
      type: 'Error',
      error: 'RemoteUploadFail',
      uploadId,
      reason,
    };
    uploadActivity.processWebSocketData(remoteUploadFailData);

    expect(dispatchEvent).toHaveBeenCalledTimes(1);
    expect(dispatchEvent).toHaveBeenCalledWith('RemoteUploadFail', {
      uploadId,
      description: reason,
    });

    expect(completed).toHaveBeenCalledTimes(1);
    expect(completed).toHaveBeenCalledWith(uploadActivity);
  });

  it('should dispatch RemoteUploadFail event and complete activity with alternative response shape', () => {
    const remoteUploadFailData: WsRemoteUploadFailData = {
      type: 'Error',
      error: 'RemoteUploadFail',
      uploadId: 'blah',
      reason: 'blah',
      data: {
        uploadId,
        reason,
      },
    };

    uploadActivity.processWebSocketData(remoteUploadFailData);

    expect(dispatchEvent).toHaveBeenCalledTimes(1);
    expect(dispatchEvent).toHaveBeenCalledWith('RemoteUploadFail', {
      uploadId,
      description: reason,
    });

    expect(completed).toHaveBeenCalledTimes(1);
    expect(completed).toHaveBeenCalledWith(uploadActivity);
  });

  it('should not dispatch known event for another uploadId', () => {
    const remoteUploadProgressData: WsRemoteUploadProgressData = {
      type: 'RemoteUploadProgress',
      uploadId: otherUploadId,
      currentAmount,
      totalAmount,
    };

    uploadActivity.processWebSocketData(remoteUploadProgressData);
    expect(dispatchEvent).toHaveBeenCalledTimes(0);
  });
});
