import setUpfrontIdDeferred from '../../setUpfrontIdDeferred';
import { SetUpfrontIdDeferred } from '../../../actions/setUpfrontIdDeferred';

describe('setUpfrontIdDeferred()', () => {
  it('should append new deferred to the existing ones', () => {
    const initialState: any = {
      deferredIdUpfronts: {
        1: {},
      },
    };
    const action: SetUpfrontIdDeferred = {
      type: 'SET_UPFRONT_ID_DEFERRED',
      id: '2',
      resolver() {},
      rejecter() {},
    };
    const newState = setUpfrontIdDeferred(initialState, action);

    expect(newState).toEqual({
      deferredIdUpfronts: {
        1: {},
        2: {
          resolver: action.resolver,
          rejecter: action.rejecter,
        },
      },
    });
  });
});
