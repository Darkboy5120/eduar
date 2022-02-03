import axios from 'axios';

const apiPath = 'http://localhost:3001/apis';

const req = (api, data) => axios.get(
  apiPath,
  { params: { ...data, api } },
);

const request = {
  get: (api, data) => req(api, data),
};

export default request;
