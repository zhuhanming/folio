import axios from 'axios';
// import qs from 'qs';
import humps from 'humps';

const ApiService = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API,
  headers: { 'Content-Type': 'application/json' },
  transformResponse: [
    ...axios.defaults.transformResponse,
    data => humps.camelizeKeys(data)
  ],
  transformRequest: [
    data => humps.decamelizeKeys(data),
    ...axios.defaults.transformRequest
  ]
});

export default ApiService;
