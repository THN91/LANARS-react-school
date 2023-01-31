import React from 'react';
import {Link} from 'react-router-dom';

import {AppBar, Box, Divider, IconButton, Stack, Toolbar, Typography} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import CloseIcon from '@mui/icons-material/Close';

import {useAppDispatch, useAppSelector} from '../../shared/hooks/redux_hooks';
import {AllPath} from '../../shared/constants/path';
import {IAlbumAddPhoto} from '../../shared/interfaces/AlbumProps';
import {getPhoto, setChecked, updatePhoto} from '../../shared/store/photoSlice';
import {IPhoto} from '../../shared/interfaces';


const AppBarAlbum = ({setIsOpen, isOpen}: IAlbumAddPhoto): JSX.Element => {
  const dispatch = useAppDispatch();
  const {album} = useAppSelector(state => state.album);
  const {checkedPhoto, photos} = useAppSelector(state => state.photo);

  const handlerClick = ()=> {
    dispatch(getPhoto([]));
    setIsOpen(!isOpen);
  };

  const addPhotoFavorites = () => {
    for (const checkedId of checkedPhoto) {
      const photo = photos.find(item => item.id === checkedId) as Required<IPhoto>;
      dispatch(updatePhoto({...photo, isFavorite: !photo.isFavorite}));
    }
    dispatch(getPhoto([]));
    dispatch(setChecked({}));
  };

  return (
    <AppBar position="sticky" color="inherit" sx={{boxShadow: 'none'}}>
      <Toolbar sx={{margin: '24px 56px', justifyContent: 'space-between', alignItems: 'center'}}>
        {checkedPhoto.length !== 0 ?
          <>
            <Box sx={{display: 'flex', alignItems: 'center', width: '100%'}}>
              <Link style={{textDecoration: 'none', color: 'inherit'}} to={AllPath.ALBUM}>
                <IconButton size="large" edge="start" color="inherit">
                  <CloseIcon/>
                </IconButton>
              </Link>
              <Typography component="span" variant="h1">
                {
                  checkedPhoto.length === 0
                    ? 'Add to album'
                    : checkedPhoto.length === 1
                      ? 'Selected 1 photo'
                      : `Selected ${checkedPhoto.length} photos`
                }
              </Typography>
            </Box>
            <Stack direction="row" spacing={2}>
              <IconButton onClick={addPhotoFavorites} size="large" color="primary">
                <StarBorderOutlinedIcon/>
              </IconButton>
              <IconButton size="large" color="primary">
                <FileUploadOutlinedIcon/>
              </IconButton>
              <IconButton size="large" color="primary">
                <DeleteOutlineOutlinedIcon/>
              </IconButton>
            </Stack>
          </> :
          <>
            <Box sx={{display: 'flex', alignItems: 'center', width: '100%'}}>
              <Link style={{textDecoration: 'none', color: 'inherit'}} to={AllPath.ALBUM}>
                <IconButton size="large" edge="start" color="inherit">
                  <ArrowBackIcon/>
                </IconButton>
              </Link>
              <Typography variant="h6" component="div" sx={{width: '80%'}}>
                {album[0] && album[0].title}
                <Divider/>
              </Typography>
            </Box>
            <Stack direction="row" spacing={2}>
              <IconButton onClick={()=> handlerClick()} size="large" color="primary">
                <AddPhotoAlternateOutlinedIcon/>
              </IconButton>
              <IconButton size="large" color="primary">
                <FileUploadOutlinedIcon/>
              </IconButton>
              <IconButton size="large" color="primary">
                <ModeEditOutlinedIcon/>
              </IconButton>
              <IconButton size="large" color="primary">
                <DeleteOutlineOutlinedIcon/>
              </IconButton>
            </Stack>
          </>}
      </Toolbar>
      <Divider/>
    </AppBar>
  );
};

export default AppBarAlbum;
