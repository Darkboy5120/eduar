import { initializeApp } from 'firebase/app';
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as authSignOut,
} from 'firebase/auth';
import globalStore, { signIn as gsSignIn, signOut as gsSignOut } from '../store/reducers/globalStore';

const firebaseConfig = {
  apiKey: 'AIzaSyAlUgYl40IL0MknZncZtOX9k1Yx8gO0ABo',
  authDomain: 'eduar-57b72.firebaseapp.com',
  projectId: 'eduar-57b72',
  storageBucket: 'eduar-57b72.appspot.com',
  messagingSenderId: '1084918711779',
  appId: '1:1084918711779:web:0cf3f7c26e7a2d538e4cd6',
  measurementId: 'G-ELVNT30HEK',
};

// eslint-disable-next-line no-unused-vars
const app = initializeApp(firebaseConfig);
const auth = getAuth();
let setLoading = null;
let alert = null;

const showError = (error) => {
  switch (error.code) {
    case 'auth/user-not-found':
      alert.show('Correo y/o contraseña incorrectos', { type: 'error' });
      break;
    case 'auth/email-already-in-use':
      alert.show('Ese correo ya esta registrado', { type: 'error' });
      break;
    default:
      alert.show(`${error.code}\n${error.message}`, { type: 'error' });
  }
};

const handleError = (req, successMessanje, { email }, callback) => {
  setLoading(true);
  req.catch((error) => {
    showError(error);
    setLoading(false);
  }).then((userCredential) => {
    if (userCredential) {
      setLoading(false);
      globalStore.dispatch(gsSignIn({ email }));
      alert.show(successMessanje, { type: 'success' });
      if (callback) {
        callback(userCredential.user);
      }
    }
  });
};

const signIn = (email, password, callback) => {
  handleError(
    signInWithEmailAndPassword(auth, email, password),
    'Sessión iniciada',
    { email },
    callback,
  );
};

const signUp = (email, password, callback) => {
  handleError(
    createUserWithEmailAndPassword(auth, email, password),
    'Cuenta creada, iniciando sesión...',
    { email },
    callback,
  );
};

const signOut = (callback) => {
  authSignOut().then(() => {
    gsSignOut();
    if (callback) {
      callback();
    }
  });
};

const firebasePipe = {
  init: (newSetLoading, newAlert) => {
    setLoading = newSetLoading;
    alert = newAlert;
    return {
      signIn,
      signUp,
      signOut,
    };
  },
};

export default firebasePipe;
