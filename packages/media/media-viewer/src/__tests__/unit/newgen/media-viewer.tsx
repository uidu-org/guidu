const mediaViewerModule = require.requireActual(
  '../../../newgen/analytics/media-viewer',
);
const mediaViewerModalEventSpy = jest.fn();
const mockMediaViewer = {
  ...mediaViewerModule,
  mediaViewerModalEvent: mediaViewerModalEventSpy,
};
jest.mock('../../../newgen/analytics/media-viewer', () => mockMediaViewer);

import * as React from 'react';
import { mount } from 'enzyme';
import { Subject } from 'rxjs/Subject';
import Button from '@atlaskit/button';
import { FileItem, Identifier } from '@uidu/media-core';
import { KeyboardEventWithKeyCode } from '@uidu/media-test-helpers';
import { createContext } from '../_stubs';
import { Content } from '../../../newgen/content';
import { MediaViewer } from '../../../newgen/media-viewer';
import { CloseButtonWrapper } from '../../../newgen/styled';
import { ErrorMessage } from '../../../newgen/error';
import Header from '../../../newgen/header';
import { ItemSource } from '../../../newgen/domain';

function createFixture(items: Identifier[], identifier: Identifier) {
  const subject = new Subject<FileItem>();
  const context = createContext();
  const onClose = jest.fn();
  const itemSource: ItemSource = {
    kind: 'ARRAY',
    items,
  };
  const el = mount(
    <MediaViewer
      selectedItem={identifier}
      itemSource={itemSource}
      context={context}
      onClose={onClose}
    />,
  );
  return { subject, el, onClose };
}

describe('<MediaViewer />', () => {
  const identifier: Identifier = {
    id: 'some-id',
    occurrenceKey: 'some-custom-occurrence-key',
    mediaItemType: 'file',
  };

  it('should display an error if data source is not supported', () => {
    const { el } = createFixture([], identifier);
    expect(el.find(ErrorMessage)).toHaveLength(1);
  });

  it('should close Media Viewer on click', () => {
    const { el, onClose } = createFixture([identifier], identifier);
    el.find(Content).simulate('click');
    expect(onClose).toHaveBeenCalled();
  });

  it.skip('should close Media Viewer on ESC shortcut', () => {
    const { onClose } = createFixture([identifier], identifier);
    const e = new KeyboardEventWithKeyCode('keydown', {
      bubbles: true,
      cancelable: true,
      keyCode: 27,
    });
    document.dispatchEvent(e);
    expect(onClose).toHaveBeenCalled();
  });

  it('should not close Media Viewer when clicking on the Header', () => {
    const { el, onClose } = createFixture([identifier], identifier);
    el.find(Header).simulate('click');
    expect(onClose).not.toHaveBeenCalled();
  });

  it('the error view show close on click', () => {
    const selectedItem: Identifier = {
      id: 'some-id-2',
      occurrenceKey: 'some-custom-occurrence-key',
      mediaItemType: 'file',
    };
    const { el, onClose } = createFixture([], selectedItem);
    expect(el.find(ErrorMessage)).toHaveLength(1);
    el.find(Content).simulate('click');
    expect(onClose).toHaveBeenCalled();
  });

  it('should always render the close button', () => {
    const { el, onClose } = createFixture([identifier], identifier);

    expect(el.find(CloseButtonWrapper)).toHaveLength(1);
    el.find(CloseButtonWrapper)
      .find(Button)
      .simulate('click');
    expect(onClose).toHaveBeenCalled();
  });

  describe('Analytics', () => {
    it('should trigger the screen event when the component loads', () => {
      createFixture([identifier], identifier);
      expect(mediaViewerModalEventSpy).toHaveBeenCalled();
    });
  });
});
