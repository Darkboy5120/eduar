import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/router';
import CustomText from '../../atoms/CustomText';
import CustomButton from '../../atoms/CustomButton';
import FlexContainer from '../../../layouts/FlexContainer';
import CustomLink from '../../atoms/CustomLink';
import AppFilter from '../../molecules/AppFilter';

function ShowMyAr({ type }) {
  const router = useRouter();
  return type === 2
    ? (
      <>
        <CustomText h1 text="Aun no has subido aplicaciones" />
        <FlexContainer>
          <CustomText text="Si necesitas ayuda para comenzar, consulta la -" />
          <CustomLink href="foo">guía</CustomLink>
          <CustomText text="- para desarrolladores" />
        </FlexContainer>
        <br />
        <CustomButton title="Subir AR" leftIcon={<FaPlus />} onClick={() => router.push('/?p=newar')} />
      </>
    )
    : (
      <>
        <CustomText h1 text="Has subido los siguientes AR" />
        <br />
        <CustomButton title="Subir AR" leftIcon={<FaPlus />} onClick={() => router.push('/?p=newar')} />
        <br />
        <AppFilter devMode />
      </>
    );
}

export default ShowMyAr;
