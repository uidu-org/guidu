import { getCardStatus } from '../../card/getCardStatus';
import { CardState, CardProps } from '../../..';

describe('getCardStatus()', () => {
  describe('image files', () => {
    it('should keep existing status', () => {
      const state = {
        metadata: {
          mediaType: 'image',
        },
        status: 'uploading',
      } as CardState;
      const props = {
        identifier: {
          mediaItemType: 'file',
        },
      } as CardProps;

      expect(getCardStatus(state, props)).toEqual('uploading');
    });

    it('should fallback to processing if its complete and no preview is available', () => {
      const state = {
        metadata: {
          mediaType: 'image',
        },
        status: 'complete',
      } as CardState;
      const props = {
        identifier: {
          mediaItemType: 'file',
        },
      } as CardProps;

      expect(getCardStatus(state, props)).toEqual('processing');
    });
  });

  describe('non image files', () => {
    it('should return complete status if enough metadata is already available', () => {
      const state = {
        metadata: {
          name: 'file',
          size: 1,
          mediaType: 'doc',
        },
        status: 'processing',
      } as CardState;
      const props = {
        identifier: {
          mediaItemType: 'file',
        },
      } as CardProps;

      expect(getCardStatus(state, props)).toEqual('complete');
    });

    it('should keep current status if identifier is not a file', () => {
      const state = {
        metadata: {
          name: 'file',
          size: 1,
          mediaType: 'doc',
        },
        status: 'processing',
      } as CardState;
      const props = {
        identifier: {
          mediaItemType: 'external-image',
          dataURI: 'some-image',
        },
      } as CardProps;

      expect(getCardStatus(state, props)).toEqual('processing');
    });

    it('should return processing status if file has no size', () => {
      const state = {
        metadata: {
          name: 'file',
          size: 0,
          mediaType: 'unknown',
        },
        status: 'complete',
      } as CardState;
      const props = {
        identifier: {
          mediaItemType: 'file',
        },
      } as CardProps;

      expect(getCardStatus(state, props)).toEqual('processing');
    });
  });
});
