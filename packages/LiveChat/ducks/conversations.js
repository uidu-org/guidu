import moment from 'moment';
import { apiCall, apiCatch } from 'utils';
import { setSectionLoadingStatus } from 'ducks/utils/loading';

import { ADD_MESSAGE } from './messages';

// Actions
export const ADD_CONVERSATION = '@uidu/LiveChat/conversations/ADD_CONVERSATION';
export const SET_CONVERSATION = '@uidu/LiveChat/conversations/SET_CONVERSATION';

// Constants

// Reducers
export default function reducer(state = {}, action) {
  switch (action.type) {
    case ADD_CONVERSATION:
    case SET_CONVERSATION:
      return {
        ...state[action.response.id],
        ...action.response,
        isLoading: false,
      };
    case ADD_MESSAGE: {
      return {
        ...state,
        lastMessage: action.response.entities.messages[action.response.result],
        updatedAt: moment().toISOString(),
      };
    }
    default:
      return state;
  }
}

// Selectors

// Action creators
const setConversation = response => ({
  type: SET_CONVERSATION,
  response,
});

const addConversation = response => ({
  type: ADD_CONVERSATION,
  response,
});

const createConversation = payload => dispatch => {
  dispatch(setSectionLoadingStatus('info', true));
  return apiCall('post', '/dashboard/apps/conversations/conversations', payload)
    .then(response => {
      dispatch(addConversation(response.data));
      dispatch(setSectionLoadingStatus('info', false));
      return response.data;
    })
    .catch(error =>
      apiCatch(error, dispatch, () => setSectionLoadingStatus('info', false)),
    );
};

const updateConversation = (conversation, payload, section) => dispatch => {
  dispatch(setSectionLoadingStatus(section, true));
  return apiCall('patch', conversation.adminPath, payload)
    .then(response => {
      dispatch(setConversation(response.data));
      return response.data;
    })
    .catch(error =>
      apiCatch(error, dispatch, () => setSectionLoadingStatus(section, false)),
    );
};

export const actions = {
  createConversation,
  updateConversation,
};
