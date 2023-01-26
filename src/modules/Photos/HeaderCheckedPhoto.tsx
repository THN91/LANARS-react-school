import React from 'react';

import {AppBar, Box, Divider, IconButton, Stack, Toolbar, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import {useAppDispatch, useAppSelector} from '../../shared/hooks/redux_hooks';
import {changeHeader, getPhoto, setChecked, updatePhoto} from '../../shared/store/photoSlice';


const HeaderPhoto = (): JSX.Element => {

  const dispatch = useAppDispatch();
  const {checkedPhoto, photos} = useAppSelector(state => state.photo);

  const addPhotoFavorites = () => {
    for (const id of checkedPhoto) {
      const arrayIndex = id - 1;
      const photoIsFavorite = {
        date: photos[arrayIndex].date,
        description: photos[arrayIndex].description,
        id: Number(photos[arrayIndex].id),
        image: photos[arrayIndex].image,
        size: photos[arrayIndex].size,
        type: photos[arrayIndex].type,
        isFavorite: true,
        isNew: false,
      };
      dispatch(updatePhoto(photoIsFavorite));
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
              <IconButton size="large" color="primary">
                <AddIcon/>
              </IconButton>
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
          </>}
      </Toolbar>
      <Divider/>
    </AppBar>
  );
};

export default HeaderPhoto;
