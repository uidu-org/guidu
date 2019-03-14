import {
  SetUpfrontIdDeferred,
  SET_UPFRONT_ID_DEFERRED,
} from '../actions/setUpfrontIdDeferred';
import { State } from '../domain';

export default function setUpfrontIdDeferred(
  state: State,
  action: SetUpfrontIdDeferred,
): State {
  if (action.type === SET_UPFRONT_ID_DEFERRED) {
    const { id, resolver, rejecter } = action;

    return {
      ...state,
      deferredIdUpfronts: {
        ...state.deferredIdUpfronts,
        [id]: { resolver, rejecter },
      },
    };
  } else {
    return state;
  }
}
