import React from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import styles from './styles.module.css';

function UserPhoto({ width, height }) {
  const defaultUserPhoto = 'https://images.unsplash.com/photo-1533552755457-5b471cb2ab11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80';
  const userPhoto = useSelector((state) => state.user.photo);
  const userPhotoPath = userPhoto ?? defaultUserPhoto;

  return (
    <Image
      priority
      className={styles.image}
      width={width}
      height={height}
      layout="fixed"
      src={userPhotoPath}
      onClick={() => {
      }}
    />
  );
}

export default UserPhoto;

