/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import axios from 'axios';
import FormData from 'form-data';
import globals from '../datasets/globals';

// const apiPath = 'http://localhost:3001/apis';
const apiPath = `${globals.server.path}apis`;

const isValidFile = (value) => {
  if (value.name && value.size && value.type) {
    return true;
  }
  return false;
};

const req = (api, data, files) => {
  const newData = new FormData();
  newData.append('api', api);
  for (const key in data) {
    newData.append(key, data[key]);
  }
  for (const filesArr in files) {
    for (const file in files[filesArr]) {
      if (isValidFile(files[filesArr][file])) {
        newData.append(filesArr, files[filesArr][file]);
      }
    }
  }
  return axios.post(
    apiPath,
    newData,
  )
    .catch((e) => console.error(e));
};

const request = {
  post: (api, data, files) => req(api, data, files),
};

export default request;
