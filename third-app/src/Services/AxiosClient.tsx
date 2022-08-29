import axios from 'axios';
import { URL_API } from '../utils/url_api';

const axiosClient = axios.create({
  baseURL: URL_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  },
);

export default axiosClient;
