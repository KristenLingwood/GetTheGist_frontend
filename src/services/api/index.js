import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

// set up an instance of axios configured to the API url
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});

/**
 * A wrapper around an Axios API call that works with auth and formats errors.
 *  The return value is the response payload; no "data" key is necessary
 * @param {String} method the HTTP verb you want to use (case insensitive)
 * @param {String} path the route path /endpoint
 * @param {Boolean} authRequired does this request require authentication
 * @param {Object} payload (optional) data in JSON form for POST/PATCH requests
 * @returns {*} response data
 */

export async function callAPI(method, path, payload = null) {
  try {
    method = method.toLowerCase();
    const methods = new Set(['get', 'post', 'patch', 'delete']);
    if (!methods.has(method)) {
      throw new Error(
        'You can only call the API with one of the following methods: `GET`, `POST`, `PATCH`, `DELETE`'
      );
    }
    const response = await api.request({
      method,
      url: path,
      data: payload
    });

    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
}
