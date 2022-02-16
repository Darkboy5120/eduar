import React, { useState } from 'react';
import styles from './styles.module.css';
import { FaAlignJustify, FaUserCircle } from 'react-icons/fa';
import Dropdown from '../../molecules/Dropdown';
import DropdownItem from '../../molecules/DropdrownItem';
import InputSearch from '../../molecules/InputSearch';
import Modal from '../../atoms/Modal';
import SignInForm from '../SignInForm';
import SignUpForm from '../SignUpForm';

function Navbar() {
  const [signInModal, setSignInModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);

  return (
    <div className={styles.navbar}>
      <Modal title="Inicio de sesión" visible={signInModal} setVisible={setSignInModal}>
        <SignInForm footerOnClick={() => {
          setSignInModal(false);
          setSignUpModal(true);
        }}
        />
      </Modal>
      <Modal title="Registro" visible={signUpModal} setVisible={setSignUpModal}>
        <SignUpForm footerOnClick={() => {
          setSignUpModal(false);
          setSignInModal(true);
        }}
        />
      </Modal>
      <Dropdown title="Eduar" leftIcon={<FaAlignJustify />}>
        <DropdownItem title="Categorias" linkTarget="foo" />
        <DropdownItem title="¿Que es Eduar?" linkTarget="foo" />
        <DropdownItem title="Objetivos" linkTarget="foo" />
        <DropdownItem title="Para maestros" linkTarget="foo" />
        <DropdownItem title="Guía para desarrolladores" linkTarget="foo" />
      </Dropdown>
      <div className={styles.rightContainer}>
        <InputSearch />
        <Dropdown leftIcon={<FaUserCircle />} align="right">
          <DropdownItem title="Iniciar sesión" onClick={() => setSignInModal(true)} />
          <DropdownItem title="Crear cuenta" onClick={() => setSignUpModal(true)} />
        </Dropdown>
      </div>
    </div>
  );
}

export default Navbar;
