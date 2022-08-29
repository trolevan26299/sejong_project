import axiosClient from './AxiosClient';

const menuApi = {
  getMenuApi: () => {
    const url = '/menu/';
    return axiosClient.get(url);
  },
};

export default menuApi;
