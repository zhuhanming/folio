import axios from 'axios';
import humps from 'humps';

const ImgApiService = axios.create({
  baseURL: 'https://api.imgbb.com/1',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  },
  transformResponse: [
    ...axios.defaults.transformResponse,
    data => humps.camelizeKeys(data)
  ],
  transformRequest: [
    data => humps.decamelizeKeys(data),
    ...axios.defaults.transformRequest
  ]
});

export default ImgApiService;
