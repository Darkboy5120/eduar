import React, {useState} from 'react';
import './styles.css';
import Dropdown from '../Dropdown';
import DropdownItem from '../DropdrownItem';
import InputSearch from '../../atoms/Input';
import {FaAlignJustify, FaUserCircle} from 'react-icons/fa';
import Modal from '../../atoms/Modal';
import SignForm from '../../atoms/SignForm';
import InputText from '../../atoms/InputText';

const Navbar = () => {
  const [signInModal, setSignInModal] = useState(false);
  const signInFooter = {
    label: "¿Aun no tienes cuenta? ",
    trigger: "aqui",
    onClick: () => {
      setSignInModal(false);
    },
  };
  const signInSubmit = {
    label: "Iniciar sesión",
    onClick: () => console.log("signed in"),
  };

  return (
    <div className="navbar">
      <Modal title="Inicio de sesión" visible={signInModal} setVisible={setSignInModal}>
        <SignForm title="Llena tus datos" footer={signInFooter} submit={signInSubmit}>
          <InputText title="Correo" placeholder="ejemplo@gmail.mx" />
          <InputText type="password" title="Contraseña" />
        </SignForm>
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
        <Dropdown leftIcon={<FaUserCircle />} align="right" >
          <DropdownItem title="Iniciar sesión" onClick={() => setSignInModal(true)} />
          <DropdownItem title="Crear cuenta" onClick={() => console.log(123)} />
        </Dropdown>
      </div>
    </div>
  );
};

export default Navbar;