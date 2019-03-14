import { of } from 'rxjs/observable/of';
import { Context, ContextConfig, FileFetcher } from '@uidu/media-core';

const getDefaultContextConfig = () => ({
  authProvider: jest.fn().mockReturnValue(() =>
    Promise.resolve({
      clientId: 'some-client-id',
      token: 'some-token',
      baseUrl: 'some-service-host',
    }),
  ),
});
export const fakeContext = (
  stubbedContext: any = {},
  config: ContextConfig = getDefaultContextConfig(),
): Context => {
  const returns = (value: any) => jest.fn().mockReturnValue(value);
  const getFile = jest.fn().mockReturnValue(of({}));
  const collection = {
    getItems: returns(of([])),
    loadNextPage: jest.fn(),
  } as any;
  const getImage = jest.fn() as any;
  const getImageUrl = jest.fn().mockResolvedValue('some-image-url');
  const getImageMetadata = jest.fn();
  const touchFiles = jest.fn();
  const downloadBinary = jest.fn();
  const file = {
    getFileState: getFile,
    downloadBinary,
    upload: jest.fn(),
    getArtifactURL: jest.fn(),
    touchFiles,
    getCurrentState: jest.fn(),
  } as FileFetcher;
  const defaultContext: Context = {
    getImageMetadata,
    getImage,
    getImageUrl,
    config,
    collection,
    file,
  };

  const wrappedStubbedContext: any = {};
  Object.keys(stubbedContext).forEach(methodName => {
    wrappedStubbedContext[methodName] = returns(stubbedContext[methodName]);
  });

  if (stubbedContext.file) {
    Object.keys(stubbedContext.file).forEach(methodName => {
      wrappedStubbedContext.file[methodName] = returns(
        stubbedContext.file[methodName],
      );
    });
  }

  if (stubbedContext.collection) {
    Object.keys(stubbedContext.collection).forEach(methodName => {
      wrappedStubbedContext.collection[methodName] = returns(
        stubbedContext.collection[methodName],
      );
    });
  }

  if (stubbedContext.context) {
    Object.keys(stubbedContext.context).forEach(methodName => {
      wrappedStubbedContext.context[methodName] = returns(
        stubbedContext.context[methodName],
      );
    });
  }

  return {
    ...defaultContext,
    ...wrappedStubbedContext,
  };
};
