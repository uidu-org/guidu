import 'whatwg-fetch/dist/fetch.umd';

export const getCsrfToken = () =>
  document.querySelector('meta[name="csrf-token"]').getAttribute('content');

export const signedFetch = (req, init) => {
  const headers = new Headers({
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-Token': getCsrfToken(),
    Accept: 'application/json, */*',
  });

  if (init.headers) {
    Object.keys(init.headers).forEach(key => {
      headers.append(key, init.headers[key]);
    });
  }

  const request = new Request(req, {
    ...init,
    headers,
    credentials: 'same-origin',
  });
  return fetch(request); // eslint-disable-line compat/compat
};

// Payload should always be a FormData
export const signedFetchNew = (url, method, payload) => {
  const headers = new Headers({
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-Token': getCsrfToken(),
    Accept: 'application/json, */*',
  });

  const request = new Request(url, {
    method,
    body: payload,
    headers,
    credentials: 'same-origin',
  });
  return fetch(request); // eslint-disable-line compat/compat
};

export const handleFetchErrorsWith = (
  response,
  dispatch,
  callback = () => {},
) =>
  response.json().then(
    json => {
      if (!response.ok) {
        dispatch(callback());
        return Promise.reject(json.error);
      }
      return json;
    },
    () => {
      dispatch(callback());
      return Promise.reject('Network error');
    },
  );
