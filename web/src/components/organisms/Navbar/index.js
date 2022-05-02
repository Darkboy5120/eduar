import React, { useState, useEffect } from 'react';
import { FaAlignJustify, FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import styles from './styles.module.css';
import Dropdown from '../../molecules/Dropdown';
import DropdownItem from '../../molecules/DropdrownItem';
import InputSearch from '../../molecules/InputSearch';
import SignInForm from '../SignInForm';
import SignUpForm from '../SignUpForm';
import globalStore from '../../../assets/store/reducers/globalStore';
import firebasePipe from '../../../assets/controllers/firebasePipe';

function Navbar() {
  const [signInModal, setSignInModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const globalState = useSelector(globalStore.getState);
  const alert = useAlert();
  const fbPipe = firebasePipe.init(null, alert);

  useEffect(() => {
    if (!globalStore.signed) {
      fbPipe.autoSignIn();
    }
  }, []);

  return (
    <div className={styles.navbar}>
      <SignInForm
        title="Inicio de sesión"
        size="big"
        visible={signInModal}
        setVisible={setSignInModal}
        footerOnClick={() => {
          setSignInModal(false);
          setSignUpModal(true);
        }}
        dismiss={() => setSignInModal(false)}
      />
      <SignUpForm
        title="Registro"
        size="big"
        visible={signUpModal}
        setVisible={setSignUpModal}
        footerOnClick={() => {
          setSignUpModal(false);
          setSignInModal(true);
        }}
        dismiss={() => setSignUpModal(false)}
      />
      <Dropdown title="Eduar" leftIcon={<FaAlignJustify />}>
        <DropdownItem title="Categorías" linkTarget="/?p=home" />
        <DropdownItem title="¿Que es Eduar?" linkTarget="/?p=welcome" />
        <DropdownItem title="Objetivos" linkTarget="/?p=welcome" />
        <DropdownItem title="Para maestros" linkTarget="/?p=welcome" />
        <DropdownItem title="Guía para desarrolladores" linkTarget="/?p=welcome" />
      </Dropdown>
      <div className={styles.rightContainer}>
        <InputSearch />
        <Dropdown leftIcon={<FaUserCircle />} align="right">
          <p>{globalState.user.firstname}</p>
          <p>{globalState.user.email}</p>
          {globalState.signed ? (
            <>
              <DropdownItem title="Ver perfil" linkTarget={`/?p=myprofile&user=${globalState.user.email}`} />
              <DropdownItem title="Mis AR" linkTarget="/?p=myar" />
              <DropdownItem title="Mis favoritos" linkTarget="/?p=myfavorite" />
              <DropdownItem title="Cerrar sesión" onClick={() => fbPipe.signOut()} />
            </>
          ) : null}
          {!globalState.signed ? (
            <>
              <DropdownItem title="Iniciar sesión" onClick={() => setSignInModal(true)} />
              <DropdownItem title="Crear cuenta" onClick={() => setSignUpModal(true)} />
            </>
          ) : null}
        </Dropdown>
      </div>
    </div>
  );
}

export default Navbar;
