import { Token, TokenProvider } from '@uidu/editor-common/provider-factory';
import { Command } from '../../../types';
import { pluginKey } from './plugin-key';

export const ACTIONS = {
  SET_PROVIDER: 'SET_PROVIDER',
  SET_RESULTS: 'SET_RESULTS',
  SET_CONTEXT: 'SET_CONTEXT',
};

export const setProvider =
  (provider: TokenProvider | undefined): Command =>
  (state, dispatch) => {
    if (dispatch) {
      dispatch(
        state.tr.setMeta(pluginKey, {
          action: ACTIONS.SET_PROVIDER,
          params: { provider },
        }),
      );
    }
    return true;
  };

export const setResults =
  (results: Token[]): Command =>
  (state, dispatch) => {
    if (dispatch) {
      dispatch(
        state.tr.setMeta(pluginKey, {
          action: ACTIONS.SET_RESULTS,
          params: { results },
        }),
      );
    }
    return true;
  };
