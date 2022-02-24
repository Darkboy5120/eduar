import axios from 'axios';

const apiPath = 'http://localhost:3001/apis';

const req = (api, data) => axios.post(
  apiPath,
  { ...data, api },
)
  .catch((e) => console.error(e));

const request = {
  post: (api, data) => req(api, data),
};

export default request;
