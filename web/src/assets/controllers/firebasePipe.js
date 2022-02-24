import { initializeApp } from 'firebase/app';
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as authSignOut,
} from 'firebase/auth';
import globalStore, { signIn as gsSignIn, signOut as gsSignOut } from '../store/reducers/globalStore';
import request from './request';

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

const handleError = (req, callback) => {
  setLoading(true);
  req.catch((error) => {
    showError(error);
    setLoading(false);
  }).then((userCredential) => {
    if (userCredential) {
      setLoading(false);
      if (callback) {
        callback(userCredential.user);
      }
    }
  });
};

const signInServer = (user, dismiss) => {
  request.post('global_signIn', {
    email: user.email,
    auth: user.uid,
  }).then((res) => {
    if (setLoading) {
      setLoading(false);
    }
    switch (res?.data?.code) {
      case 0:
        globalStore.dispatch(gsSignIn(
          { user: { ...res.data.data, auth: user.uid }, signed: true },
        ));
        if (dismiss) {
          dismiss();
          alert.show('Sesión iniciada', { type: 'success' });
        }
        break;
      default:
        alert.show('Ha ocurrido un problema en el servidor', { type: 'error' });
    }
  });
};

const signIn = (email, password, dismiss) => {
  handleError(
    signInWithEmailAndPassword(auth, email, password),
    (user) => {
      setLoading(true);
      signInServer(user, dismiss);
    },
  );
};

const signUp = (email, password, firstname, lastname, birthdate, dismiss) => {
  handleError(
    createUserWithEmailAndPassword(auth, email, password),
    (user) => {
      setLoading(true);
      request.post('global_signUp', {
        email,
        password,
        firstname,
        lastname,
        birthdate,
        auth: user.uid,
      }).then((res) => {
        switch (res?.data?.code) {
          case 0:
            signIn(email, password, dismiss);
            break;
          default:
            alert.show('Ha ocurrido un problema en el servidor', { type: 'error' });
        }
      });
    },
  );
};

const autoSignIn = () => {
  auth.onAuthStateChanged((user) => {
    if (user && !setLoading) {
      // alert.show('Sesión restaurada', { type: 'success' });
      signInServer(user);
    } else {
      globalStore.dispatch(gsSignOut());
    }
  });
};

const signOut = (callback) => {
  authSignOut(auth).then(() => {
    globalStore.dispatch(gsSignOut());
    alert.show('Sesión cerrada', { type: 'success' });
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
      autoSignIn,
      auth,
    };
  },
};

export default firebasePipe;
