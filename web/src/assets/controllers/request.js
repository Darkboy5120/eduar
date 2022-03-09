/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import axios from 'axios';

const apiPath = 'http://localhost:3001/apis';

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
  // return fetch(apiPath, {
  //   body: newData,
  //   // body: JSON.stringify({ ...data, api }),
  //   // body: { ...data, api },
  //   method: 'post',
  //   // headers: {
  //   //   'Content-Type': 'application/x-www-form-urlencoded',
  //   // },
  //   // headers: {
  //   //   'Content-Type': 'multipart/form-data',
  //   // },
  //   // headers: {
  //   //   'Content-Type': 'application/json',
  //   // },
  // })
    .catch((e) => console.error(e));
};

const request = {
  post: (api, data, files) => req(api, data, files),
};

export default request;
