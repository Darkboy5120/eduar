import React from 'react';
import { FaPlus } from 'react-icons/fa';
import CustomText from '../../atoms/CustomText';
import CustomButton from '../../atoms/CustomButton';

function ShowMyAr({ type }) {
  return type === 2
    ? (
      <>
        <CustomText h1 text="Aun no has subido aplicaciones" />
        <CustomText text="Si necesitas ayuda para comenzar, consulta la guia para desarrolladores" />
        <br />
        <CustomButton title="Subir AR" leftIcon={<FaPlus />} />
      </>
    )
    : null;
}

export default ShowMyAr;
