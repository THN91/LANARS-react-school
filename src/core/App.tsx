import React from 'react';
import {Route, Routes} from 'react-router';

import {ThemeProvider} from '@mui/material';

import {theme} from '../styles/theme';
import {AllPath} from '../shared/constants/path';
import Photos from '../modules/Photos';
import Albums from '../modules/Albums';
import Favorites from '../modules/Favorites';
import Layout from '../shared/components/Layout';
import NotFoundPage from '../modules/NotFoundPage';
import Album from '../modules/Album';
import CreateAlbum from '../modules/CreateAlbum';



const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path={AllPath.ALL_PHOTO} element={<Layout/>}>
          <Route index element={<Photos/>}/>
          <Route path={AllPath.ALBUM} element={<Albums/>}/>
          <Route path={AllPath.FAVORITES} element={<Favorites/>}/>
          <Route path={AllPath.NOT_FOUND_PAGE} element={<NotFoundPage/>}/>
        </Route>
        <Route path={'albums/:albumId'} element={<Album/>}/>
        <Route path={'albums/createAlbum'} element={<CreateAlbum/>}/>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
