import axios from 'axios';

const apiPath = 'http://localhost:3001/apis';

const req = (api, data) => axios.post(
  apiPath,
  { ...data, api },
);

const request = {
  post: (api, data) => req(api, data),
};

export default request;
