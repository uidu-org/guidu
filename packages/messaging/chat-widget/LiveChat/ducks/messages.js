import { apiCall, apiCatch } from 'utils';

// Actions
export const INVALIDATE_GROUP = '@uidu/apps/groups/messages/INVALIDATE_GROUP';
export const REQUEST_MESSAGES = '@uidu/apps/groups/messages/REQUEST_MESSAGES';
export const RECEIVE_MESSAGES = '@uidu/apps/groups/messages/RECEIVE_MESSAGES';
export const ADD_MESSAGE = '@uidu/apps/groups/messages/ADD_MESSAGE';
export const REMOVE_MESSAGE = '@uidu/apps/groups/messages/REMOVE_MESSAGE';
export const UPDATE_MESSAGE = '@uidu/apps/groups/messages/UPDATE_MESSAGE';

// Reducer

export default function (
  state = {
    hasFetched: false,
    isFetching: false,
    didInvalidate: false,
    hasMore: true,
    messages: [],
  },
  action,
) {
  switch (action.type) {
    case INVALIDATE_GROUP:
      return {
        ...state,
        didInvalidate: true,
      };
    case REQUEST_MESSAGES:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      };
    case RECEIVE_MESSAGES:
      return {
        ...state,
        hasFetched: true,
        isFetching: false,
        didInvalidate: false,
        messages: [...state.messages, ...action.messages],
        hasMore: action.hasMore,
        lastUpdated: action.receivedAt,
      };
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [
          action.response.entities.messages[action.response.result],
          ...state.messages,
        ],
      };
    case REMOVE_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages.filter((m) => m.id !== action.response.result),
        ],
      };
    case UPDATE_MESSAGE: {
      const index = state.messages
        .map((m) => m.id)
        .indexOf(action.response.result);
      return {
        ...state,
        messages: [
          ...state.messages.slice(0, index),
          action.response.entities.messages[action.response.result],
          ...state.messages.slice(index + 1),
        ],
      };
    }
    default:
      return state;
  }
}

// Action creators
const addMessage = (messageable, kind, response) => ({
  type: ADD_MESSAGE,
  [kind]: messageable,
  response,
});

const removeMessage = (messageable, kind, response) => ({
  type: REMOVE_MESSAGE,
  [kind]: messageable,
  response,
});

const setMessage = (messageable, kind, response) => ({
  type: UPDATE_MESSAGE,
  [kind]: messageable,
  response,
});

const shouldFetchMessages = (state) => {
  const { messages } = state;

  if (!messages) {
    return true;
  }

  if (messages.isFetching) {
    return false;
  }
  return !messages.hasFetched;
};

const requestMessages = (messageable, kind) => ({
  type: REQUEST_MESSAGES,
  [kind]: messageable,
});

const receiveMessages = (messageable, kind, response) => ({
  type: RECEIVE_MESSAGES,
  [kind]: messageable,
  messages: response,
  hasMore: response.length > 0,
  receivedAt: Date.now(),
});

const fetchMessages = (messageable, kind, lastMessageId = undefined) => {
  return (dispatch, getState) => {
    if (shouldFetchMessages(getState(), messageable, kind)) {
      // Dispatch a thunk from thunk!
      dispatch(requestMessages(messageable, kind));
      return apiCall('get', `${messageable.adminPath}/messages`, {
        data: {
          last_message_id: lastMessageId,
        },
      }).then((response) => {
        dispatch(receiveMessages(messageable, kind, response.data));
      });
    }
  };
};

const createMessage = (messageable, kind, payload) => (dispatch) => {
  return apiCall('post', `${messageable.adminPath}/messages`, payload)
    .then((response) => {
      dispatch(addMessage(messageable, kind, response.data));
      return response.data;
    })
    .catch((error) => apiCatch(error, dispatch, () => {}));
};

const updateMessage = (messageable, kind, message, payload) => (dispatch) =>
  apiCall('patch', `${messageable.adminPath}/messages/${message.id}`, payload)
    .then((response) => {
      dispatch(setMessage(messageable, kind, response.data));
      return response.data;
    })
    .catch((error) => apiCatch(error, dispatch, () => {}));

const destroyMessage = (messageable, kind, message) => (dispatch) =>
  apiCall('delete', `${messageable.adminPath}/messages/${message.id}`)
    .then((response) => {
      dispatch(removeMessage(messageable, kind, message));
      return response.data;
    })
    .catch((error) => apiCatch(error, dispatch, () => {}));

export const actions = {
  createMessage,
  fetchMessages,
  updateMessage,
  destroyMessage,
};
