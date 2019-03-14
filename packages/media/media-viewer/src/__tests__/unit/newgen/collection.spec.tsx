import * as React from 'react';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import { Context, FileIdentifier } from '@uidu/media-core';
import {
  mountWithIntlContext,
  fakeContext,
} from '@uidu/media-test-helpers';
import { MediaCollectionItem } from '@uidu/media-store';
import Spinner  from '@uidu/spinner';
import ArrowRightCircleIcon from '@atlaskit/icon/glyph/chevron-right-circle';
import { createContext } from '../_stubs';
import { Collection, Props, State } from '../../../newgen/collection';
import { ErrorMessage } from '../../../newgen/error';
import { List } from '../../../newgen/list';

const collectionName = 'my-collection';

const identifier: any = {
  id: 'some-id',
  occurrenceKey: 'some-custom-occurrence-key',
  mediaItemType: 'file',
};

const identifier2: any = {
  id: 'some-id-2',
  occurrenceKey: 'some-custom-occurrence-key-2',
  mediaItemType: 'file',
};

const mediaCollectionItems: MediaCollectionItem[] = [
  {
    id: identifier.id,
    occurrenceKey: identifier.occurrenceKey || '',
    insertedAt: 1,
    details: {
      artifacts: {},
      mediaType: 'image',
      mimeType: '',
      name: '',
      processingStatus: 'succeeded',
      size: 1,
    },
  },
  {
    id: identifier2.id,
    occurrenceKey: identifier2.occurrenceKey,
    insertedAt: 1,
    details: {
      artifacts: {},
      mediaType: 'image',
      mimeType: '',
      name: '',
      processingStatus: 'succeeded',
      size: 1,
    },
  },
];

function createFixture(
  context: Context,
  identifier: FileIdentifier,
  onClose?: () => {},
) {
  const el = mountWithIntlContext<Props, State>(
    <Collection
      defaultSelectedItem={identifier}
      collectionName={collectionName}
      context={context}
      onClose={onClose}
      pageSize={999}
    />,
  );
  return el;
}

describe('<Collection />', () => {
  it('should show a spinner while requesting items', () => {
    const el = createFixture(createContext(), identifier);
    expect(el.find(Spinner)).toHaveLength(1);
  });

  it('should fetch collection items', () => {
    const context = createContext();
    createFixture(context, identifier);
    expect(context.collection.getItems).toHaveBeenCalledTimes(1);
    expect(context.collection.getItems).toHaveBeenCalledWith('my-collection', {
      limit: 999,
    });
  });

  it('should show an error if items failed to be fetched', () => {
    const context = fakeContext({
      collection: {
        getItems: new Observable(observer => observer.error()),
      },
    });
    const el = createFixture(context, identifier);
    el.update();
    const errorMessage = el.find(ErrorMessage);
    expect(errorMessage).toHaveLength(1);
    expect(errorMessage.text()).toContain(
      'Something went wrong.It might just be a hiccup.',
    );
  });

  it('should reset the component when the collection prop changes', () => {
    const context = createContext();
    const el = createFixture(context, identifier);
    expect(context.collection.getItems).toHaveBeenCalledTimes(1);
    el.setProps({ collectionName: 'other-collection' });
    expect(context.collection.getItems).toHaveBeenCalledTimes(2);
  });

  it('should reset the component when the context prop changes', () => {
    const context = createContext();
    const el = createFixture(context, identifier);
    expect(context.collection.getItems).toHaveBeenCalledTimes(1);

    const context2 = createContext();
    el.setProps({ context: context2 });

    expect(context.collection.getItems).toHaveBeenCalledTimes(1);
    expect(context2.collection.getItems).toHaveBeenCalledTimes(1);
  });

  it('should restore PENDING state when component resets', () => {
    const subject = new Subject();
    const context = fakeContext({
      collection: {
        getItems: subject,
      },
    });
    const el = createFixture(context, identifier);
    expect(el.state().items.status).toEqual('PENDING');
    subject.next(mediaCollectionItems);
    expect(el.state().items.status).toEqual('SUCCESSFUL');

    el.setProps({ collectionName: 'other-collection' });
    expect(el.state().items.status).toEqual('PENDING');
  });

  it('MSW-720: adds the collectionName to all identifiers passed to the List component', () => {
    const subject = new Subject();
    const context = fakeContext({
      collection: {
        getItems: subject,
        loadNextPage: jest.fn(),
      },
    });
    const el = createFixture(context, identifier);
    subject.next(mediaCollectionItems);
    el.update();
    const listProps: any = el.find(List).props();
    expect(listProps.defaultSelectedItem.collectionName).toEqual(
      collectionName,
    );
    listProps.items.forEach((item: any) => {
      expect(item.collectionName).toEqual(collectionName);
    });
  });

  describe('Next page', () => {
    it('should load next page if we instantiate the component with the last item of the page as selectedItem', () => {
      const subject = new Subject();
      const context = fakeContext({
        collection: {
          getItems: subject,
          loadNextPage: jest.fn(),
        },
      });
      createFixture(context, identifier2);
      subject.next(mediaCollectionItems);
      expect(context.collection.getItems).toHaveBeenCalledTimes(1);
      expect(context.collection.loadNextPage).toHaveBeenCalled();
    });

    it('should NOT load next page if we instantiate the component normally', () => {
      const context = createContext();
      createFixture(context, identifier);
      expect(context.collection.getItems).toHaveBeenCalledTimes(1);
      expect(context.collection.loadNextPage).not.toHaveBeenCalled();
    });

    it('should load next page if we navigate to the last item of the list', () => {
      const subject = new Subject();
      const context = fakeContext({
        collection: {
          getItems: subject,
          loadNextPage: jest.fn(),
        },
      });
      const el = createFixture(context, identifier);
      subject.next(mediaCollectionItems);
      el.update();

      expect(context.collection.loadNextPage).not.toHaveBeenCalled();
      el.find(ArrowRightCircleIcon).simulate('click');
      expect(context.collection.loadNextPage).toHaveBeenCalled();
    });
  });
});
