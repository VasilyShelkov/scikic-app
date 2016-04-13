import fetch from 'isomorphic-fetch';

/**
 * Starts a new Promise chain, resolving immediately.
 * @param callback Must return a Promise.
 * @returns {Promise}
 */
export const newPromiseChain = () => (
  new Promise((resolve) => {
    resolve();
  })
);

/**
 * Generates the boilerplate headers for a JSON GET request
 * @returns {{method: string, headers: {Accept: string, Content-Type: string}}}
 */
export const makeGetHeader = () => ({
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

/**
 * Creates a JSON POST fetch promise with a given url and body
 * @param url Where to POST, e.g. '/search'
 * @param body The body of the request, e.g. {'query': 'liverpool'}
 */
export const fetchPost = (url, body) => (
  fetch(url, makePostHeader(body))
);

/**
 * Generates the boilerplate headers for a JSON POST request
 * @param body The body of the request, e.g. {'query': 'liverpool'}
 * @returns {{method: string, headers: {Accept: string, Content-Type: string}, body: *}}
 */
export const makePostHeader = (body) => {
  if (typeof body === 'object') {
    body = JSON.stringify(body);
  }

  return {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body,
  };
};
