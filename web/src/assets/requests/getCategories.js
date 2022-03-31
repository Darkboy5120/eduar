import request from '../controllers/request';

const getCategories = (setCategories) => {
  request.post('global_getCategories').then((res) => {
    setCategories(res?.data?.data);
  });
};

export default getCategories;
