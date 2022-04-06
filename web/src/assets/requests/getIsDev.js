import globalStore from '../store/reducers/globalStore';
import request from '../controllers/request';

const getIsDev = (setData) => {
  request.post('global_isDev', {
    id: globalStore.getState().user.email,
  }).then((res) => {
    setData(res?.data?.code);
  });
};

export default getIsDev;
