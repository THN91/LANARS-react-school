import React from 'react';
import {Outlet} from 'react-router';

import {Box} from '@mui/material';

import {useAppSelector} from '../hooks/redux_hooks';
import Header from './Header';
import SideMenu from './SideMenu';
import HeaderPhoto from '../../modules/Photos/HeaderCheckedPhoto';


const Layout = (): JSX.Element => {
  const checkedPhoto = useAppSelector(state => state.photo.checkedPhoto);

  return (
    <>
      {checkedPhoto.length === 0 ? <Header/> : <HeaderPhoto/>}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: '346px 1fr',
        p: 0,
      }}
      >
        <SideMenu/>
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;

