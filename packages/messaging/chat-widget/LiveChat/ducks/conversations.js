import { apiCall, apiCatch } from 'utils';

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
    default:
      return state;
  }
}

// Selectors

// Action creators
const setConversation = (response) => ({
  type: SET_CONVERSATION,
  response,
});

const addConversation = (response) => ({
  type: ADD_CONVERSATION,
  response,
});

const createConversation = (payload) => (dispatch) => {
  return apiCall('post', '/dashboard/apps/conversations/conversations', payload)
    .then((response) => {
      dispatch(addConversation(response.data));
      return response.data;
    })
    .catch((error) => apiCatch(error, dispatch, () => {}));
};

const updateConversation = (conversation, payload, section) => (dispatch) => {
  return apiCall('patch', conversation.adminPath, payload)
    .then((response) => {
      dispatch(setConversation(response.data));
      return response.data;
    })
    .catch((error) => apiCatch(error, dispatch, () => {}));
};

export const actions = {
  createConversation,
  updateConversation,
};
