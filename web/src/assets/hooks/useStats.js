import useInput from './useInput';
import inputValidations from '../controllers/inputValidations';

const useStats = (appDetails) => ({
  favorites: useInput(inputValidations.string, appDetails.favorites),
  endorsements: useInput(inputValidations.string, appDetails.popularity),
  alreadyFavorite: useInput(inputValidations.string, appDetails.already_favorite),
  alreadyEndorsement: useInput(inputValidations.string, appDetails.already_endorsement),
});

export default useStats;
