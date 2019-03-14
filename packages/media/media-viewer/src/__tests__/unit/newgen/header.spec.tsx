import * as util from '../../../newgen/utils';
const constructAuthTokenUrlSpy = jest.spyOn(util, 'constructAuthTokenUrl');

import * as React from 'react';
import { Observable } from 'rxjs';
import { ReactWrapper, mount } from 'enzyme';
import { MediaType, FileState, Identifier } from '@uidu/media-core';
import DownloadIcon from '@atlaskit/icon/glyph/download';
import { fakeIntl } from '@uidu/media-test-helpers';
import { createContext } from '../_stubs';
import { Header, State as HeaderState } from '../../../newgen/header';
import { MetadataFileName, MetadataSubText } from '../../../newgen/styled';
import { LeftHeader } from '../../../newgen/styled';

const identifier: Identifier = {
  id: 'some-id',
  occurrenceKey: 'some-custom-occurrence-key',
  mediaItemType: 'file',
};

const identifier2: Identifier = {
  id: 'some-id-2',
  occurrenceKey: 'some-custom-occurrence-key',
  mediaItemType: 'file',
};

const processedImageState: FileState = {
  id: '123',
  mediaType: 'image',
  mimeType: 'jpeg',
  status: 'processed',
  name: 'my image',
  size: 0,
  artifacts: {},
};

describe('<Header />', () => {
  afterEach(() => {
    constructAuthTokenUrlSpy.mockClear();
  });

  it('shows an empty header while loading', () => {
    const context = createContext({
      getFileState: () => Observable.empty(),
    });
    const el = mount(
      <Header intl={fakeIntl} context={context} identifier={identifier} />,
    );
    const metadata = el.find(LeftHeader);
    expect(metadata.text()).toEqual('');
  });

  it('resubscribes to the provider when the data property value is changed', () => {
    const context = createContext({
      getFileState: () => Observable.of(processedImageState),
    });
    const el = mount(
      <Header intl={fakeIntl} context={context} identifier={identifier} />,
    );
    el.update();
    expect(el.find(MetadataFileName).text()).toEqual('my image');

    expect(context.file.getFileState).toHaveBeenCalledTimes(1);
    el.setProps({ identifier: identifier2 });
    expect(context.file.getFileState).toHaveBeenCalledTimes(2);
  });

  it('component resets initial state when new identifier is passed', () => {
    const context = createContext({
      getFileState: () => Observable.of(processedImageState),
    });
    const el = mount<{}, HeaderState>(
      <Header intl={fakeIntl} context={context} identifier={identifier} />,
    );

    expect(el.state().item.status).toEqual('SUCCESSFUL');

    // since the test is executed synchronously
    // let's prevent the second call to getFile from immediately resolving and
    // updating the state to SUCCESSFUL before we run the assertion.
    context.file.getFileState = () => Observable.never();

    el.setProps({ identifier: identifier2 });
    expect(el.state().item.status).toEqual('PENDING');
  });

  it('component resets initial state when new context is passed', () => {
    const context = createContext({
      getFileState: () => Observable.of(processedImageState),
    });
    const el = mount<{}, HeaderState>(
      <Header intl={fakeIntl} context={context} identifier={identifier} />,
    );
    expect(el.state().item.status).toEqual('SUCCESSFUL');

    // since the test is executed synchronously
    // let's prevent the second call to getFile from immediately resolving and
    // updating the state to SUCCESSFUL before we run the assertion.
    const newContext = createContext({
      getFileState: () => Observable.never(),
    });
    el.setProps({ context: newContext });
    expect(el.state().item.status).toEqual('PENDING');
  });

  describe('Metadata', () => {
    describe('File collectionName', () => {
      it('shows the title when loaded', () => {
        const context = createContext({
          getFileState: () => Observable.of(processedImageState),
        });
        const el = mount(
          <Header intl={fakeIntl} context={context} identifier={identifier} />,
        );
        el.update();
        expect(el.find(MetadataFileName).text()).toEqual('my image');
      });

      it('shows unknown if file collectionName not provided on metadata', () => {
        const unNamedImage = {
          ...processedImageState,
          name: '',
        };
        const context = createContext({
          getFileState: () => Observable.of(unNamedImage),
        });
        const el = mount(
          <Header intl={fakeIntl} context={context} identifier={identifier} />,
        );
        el.update();
        expect(el.find(MetadataFileName).text()).toEqual('unknown');
      });
    });

    describe('File metadata', () => {
      const testMediaTypeText = (
        mediaType: MediaType,
        expectedText: string,
      ) => {
        const testItem: FileState = {
          id: '123',
          mediaType,
          mimeType: 'jpeg',
          status: 'processed',
          name: 'my item',
          size: 12222222,
          artifacts: {},
        };
        const context = createContext({
          getFileState: () => Observable.of(testItem),
        });
        const el = mount(
          <Header intl={fakeIntl} context={context} identifier={identifier} />,
        );
        el.update();
        expect(el.find(MetadataSubText).text()).toEqual(
          `${expectedText} · 11.7 MB`,
        );
      };

      it('should render media type text and file size for each media type', () => {
        testMediaTypeText('image', 'image');
        testMediaTypeText('audio', 'audio');
        testMediaTypeText('video', 'video');
        testMediaTypeText('unknown', 'unknown');
        testMediaTypeText('doc', 'document');
      });

      it('should not render file size if unavailable', () => {
        const noSizeImage = {
          ...processedImageState,
          size: 0,
        };
        const context = createContext({
          getFileState: () => Observable.of(noSizeImage),
        });
        const el = mount(
          <Header intl={fakeIntl} context={context} identifier={identifier} />,
        );
        el.update();
        expect(el.find(MetadataSubText).text()).toEqual('image');
      });

      it('should not render media type if unavailable', () => {
        const noMediaTypeElement = {
          ...processedImageState,
          mediaType: '' as MediaType,
          size: 23232323,
        };
        const context = createContext({
          getFileState: () => Observable.of(noMediaTypeElement),
        });
        const el = mount(
          <Header intl={fakeIntl} context={context} identifier={identifier} />,
        );
        el.update();
        expect(el.find(MetadataSubText).text()).toEqual('unknown · 22.2 MB');
      });
    });

    it('shows nothing when metadata failed to be retrieved', () => {
      const context = createContext({
        getFileState: () => Observable.throw('something bad happened!'),
      });
      const el = mount(
        <Header intl={fakeIntl} context={context} identifier={identifier} />,
      );
      const metadata = el.find(LeftHeader);
      expect(metadata.text()).toEqual('');
    });

    it('MSW-720: passes the collectionName to getFile', () => {
      const collectionName = 'some-collection';
      const context = createContext({
        getFileState: () => Observable.of(processedImageState),
      });
      const identifierWithCollection = { ...identifier, collectionName };
      const el = mount(
        <Header
          intl={fakeIntl}
          context={context}
          identifier={identifierWithCollection}
        />,
      );
      el.update();
      expect(context.file.getFileState).toHaveBeenCalledWith('some-id', {
        collectionName: 'some-collection',
      });
    });

    it('MSW-720: passes the collectionName to context.file.downloadBinary', () => {
      const collectionName = 'some-collection';
      const context = createContext({
        getFileState: () => Observable.of(processedImageState),
      });
      const identifierWithCollection = { ...identifier, collectionName };
      const el = mount(
        <Header
          intl={fakeIntl}
          context={context}
          identifier={identifierWithCollection}
        />,
      );
      el.update();
      el.find(DownloadIcon).simulate('click');
      expect(
        (context.file.downloadBinary as jest.Mock).mock.calls[0][2],
      ).toEqual(collectionName);
    });
  });

  describe('Download button', () => {
    const assertDownloadButton = (
      el: ReactWrapper<any, any>,
      enabled: boolean,
    ) => {
      expect(el.find({ type: 'button', isDisabled: !enabled })).toHaveLength(1);
      expect(el.find(DownloadIcon)).toHaveLength(1);
    };

    it('should show the download button disabled while the item metadata is loading', () => {
      const context = createContext({
        getFileState: () => Observable.empty(),
      });
      const el = mount(
        <Header intl={fakeIntl} context={context} identifier={identifier} />,
      );
      el.update();
      assertDownloadButton(el, false);
    });

    it('should show the download button enabled when the item is loaded', () => {
      const context = createContext({
        getFileState: () => Observable.of(processedImageState),
      });
      const el = mount(
        <Header intl={fakeIntl} context={context} identifier={identifier} />,
      );
      el.update();
      assertDownloadButton(el, true);
    });

    it('should show the download button disabled when there is an error', () => {
      const context = createContext({
        getFileState: () => Observable.throw('something bad happened!'),
      });
      const el = mount(
        <Header intl={fakeIntl} context={context} identifier={identifier} />,
      );
      el.update();
      assertDownloadButton(el, false);
    });
  });
});
