import React, { useState } from 'react';
import './styles.css';
import { FaAlignJustify, FaUserCircle } from 'react-icons/fa';
import Dropdown from '../../molecules/Dropdown';
import DropdownItem from '../../molecules/DropdrownItem';
import InputSearch from '../../molecules/InputSearch';
import Modal from '../../atoms/Modal';
import SignInForm from '../SignInForm';

function Navbar() {
  const [signInModal, setSignInModal] = useState(false);

  return (
    <div className="navbar">
      <Modal title="Inicio de sesión" visible={signInModal} setVisible={setSignInModal}>
        <SignInForm footerOnClick={() => setSignInModal(false)} />
      </Modal>
      <Dropdown title="Eduar" leftIcon={<FaAlignJustify />}>
        <DropdownItem title="Categorias" linkTarget="foo" />
        <DropdownItem title="¿Que es Eduar?" linkTarget="foo" />
        <DropdownItem title="Objetivos" linkTarget="foo" />
        <DropdownItem title="Para maestros" linkTarget="foo" />
        <DropdownItem title="Guía para desarrolladores" linkTarget="foo" />
      </Dropdown>
      <div className="rightContainer">
        <InputSearch />
        <Dropdown leftIcon={<FaUserCircle />} align="right">
          <DropdownItem title="Iniciar sesión" onClick={() => setSignInModal(true)} />
          <DropdownItem title="Crear cuenta" onClick={() => console.log(123)} />
        </Dropdown>
      </div>
    </div>
  );
}

export default Navbar;
