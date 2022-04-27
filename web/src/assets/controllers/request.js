/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import axios from 'axios';
import FormData from 'form-data';
import globals from '../datasets/globals';

// const apiPath = 'http://localhost:3001/apis';
const apiPath = `${globals.server.path}apis`;
let customAlert = null;

const isValidFile = (value) => {
  if (value.name && value.size && value.type) {
    return true;
  }
  return false;
};

const getInitialFormData = (api, data) => {
  const newData = new FormData();
  newData.append('api', api);
  for (const key in data) {
    newData.append(key, data[key]);
  }
  return newData;
};

const prepareFiles = (newData, files, filesArr) => {
  for (const file in files[filesArr]) {
    if (isValidFile(files[filesArr][file])) {
      newData.append(filesArr, files[filesArr][file]);
    }
  }
  return newData;
};

const req = (api, data, files) => {
  let newData = getInitialFormData(api, data);
  for (const filesArr in files) {
    newData = prepareFiles(newData, files, filesArr);
  }
  return axios.post(
    apiPath,
    newData,
  )
    .then((res) => {
      if (res?.data?.data?.newAchievements) {
        const { newAchievements } = res.data.data;
        for (const achieve of newAchievements) {
          customAlert.show(`Logro desbloqueado: ${achieve.title}`, { type: 'success' });
        }
      }
      return res;
    })
    .catch((e) => console.error(e));
};

const request = {
  setAlert: (newAlert) => {
    customAlert = newAlert;
  },
  post: (api, data, files) => req(api, data, files),
};

export default request;
