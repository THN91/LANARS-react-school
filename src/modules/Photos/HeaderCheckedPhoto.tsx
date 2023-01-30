import React from 'react';

import {AppBar, Box, Divider, IconButton, Stack, Toolbar, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import {useAppDispatch, useAppSelector} from '../../shared/hooks/redux_hooks';
import {changeHeader, getPhoto, setChecked, updatePhoto} from '../../shared/store/photoSlice';
import {AllPath} from '../../shared/constants/path';
import {IPhoto} from '../../shared/interfaces';


const HeaderPhoto = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const {checkedPhoto, photos} = useAppSelector(state => state.photo);
  const isRenderIcon = window.location.pathname === AllPath.ALL_PHOTO;


  const addPhotoFavorites = () => {
    for (const checkedId of checkedPhoto) {
      const photo = photos.find(item => item.id === checkedId) as Required<IPhoto>;
      dispatch(updatePhoto({...photo, isFavorite: !photo.isFavorite}));
    }
    dispatch(getPhoto([]));
    dispatch(setChecked({}));
  };

  const allCheckedCancel = () => {
    dispatch(changeHeader([]));
    dispatch(setChecked({}));
  };

  return (
    <AppBar position="sticky" color="inherit" sx={{boxShadow: 'none'}}>
      <Toolbar sx={{margin: '0 40px', justifyContent: 'space-between', alignItems: 'center'}}>
        {checkedPhoto.length !== 0 &&
          <>
            <Box sx={{display: 'flex', alignItems: 'center', width: '100%'}}>
              <IconButton
                onClick={() => allCheckedCancel()}
                size="large"
                edge="start"
                color="inherit"
              >
                <CloseIcon/>
              </IconButton>
              <Typography component="span" variant="h1">
                {checkedPhoto.length === 1
                  ? 'Selected 1 photo'
                  : `Selected ${checkedPhoto.length} photos`
                }
              </Typography>
            </Box>
            <Stack direction="row" spacing={2}>
              {isRenderIcon &&
                <IconButton size="large" color="primary">
                  <AddIcon/>
                </IconButton>}
              <IconButton onClick={addPhotoFavorites} size="large" color="primary">
                <StarBorderOutlinedIcon/>
              </IconButton>
              {isRenderIcon &&
                <IconButton size="large" color="primary">
                  <FileUploadOutlinedIcon/>
                </IconButton>}
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

export default HeaderPhoto;
