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

import {useAppDispatch, useAppSelector} from '../hooks/redux_hooks';
import {AllPath} from '../constants/path';
import {IAlbumAddPhoto} from '../interfaces/AlbumProps';
import {getPhoto} from '../store/photoSlice';


const AppBarAlbum = ({checkedPhotoId, setIsOpen, isOpen}: IAlbumAddPhoto): JSX.Element => {
  const dispatch = useAppDispatch();
  const {album} = useAppSelector(state => state.album);

  const handlerClick = ()=> {
    dispatch(getPhoto([]));
    setIsOpen(!isOpen);
  };

  return (
    <AppBar position="sticky" color="inherit" sx={{boxShadow: 'none'}}>
      <Toolbar sx={{margin: '24px 56px', justifyContent: 'space-between', alignItems: 'center'}}>
        {checkedPhotoId.length !== 0 ?
          <>
            <Box sx={{display: 'flex', alignItems: 'center', width: '100%'}}>
              <Link style={{textDecoration: 'none', color: 'inherit'}} to={AllPath.ALBUM}>
                <IconButton size="large" edge="start" color="inherit">
                  <CloseIcon/>
                </IconButton>
              </Link>
              <Typography component="span" variant="h1">
                {
                  checkedPhotoId.length === 0
                    ? 'Add to album'
                    : checkedPhotoId.length === 1
                      ? 'Selected 1 photo'
                      : `Selected ${checkedPhotoId.length} photos`
                }
              </Typography>
            </Box>
            <Stack direction="row" spacing={2}>
              <IconButton size="large" color="primary">
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
