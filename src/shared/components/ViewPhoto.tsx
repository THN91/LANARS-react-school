import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {AppBar, Box, IconButton, ImageListItem, Stack, styled, Toolbar} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

import {colors} from '../../styles/variables';
import {useAppDispatch, useAppSelector} from '../hooks/redux_hooks';
import {IPhoto} from '../interfaces';
import {updatePhoto} from '../store/photoSlice';

const PrevNextBtn = styled(IconButton)(() => ({
  width: 64,
  height: 64,
  backgroundColor: colors.light.bgBtnViewPhoto,
  ['&:hover']: {
    backgroundColor: colors.light.bgBtnViewPhoto,
  },
}));


const ViewPhoto = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {photos, viewPhoto} = useAppSelector(state => state.photo);
  const [currentPhoto, setCurrentPhoto] = useState<number>();
  const indexPhoto = photos.findIndex(item => item.id === viewPhoto);


  useEffect(() => {
    setCurrentPhoto(indexPhoto);
  }, []);

  const nextPhoto = () => setCurrentPhoto(Number(currentPhoto) + 1);

  const prevPhoto = () => setCurrentPhoto(Number(currentPhoto) - 1);

  const addPhotoFavorites = () => {
    const photo = photos.find(item => item.id === photos[Number(currentPhoto)].id) as Required<IPhoto>;
    dispatch(updatePhoto({...photo, isFavorite: !photo.isFavorite}));
  };

  return (
    <Box sx={{
      height: '100%',
      backgroundColor: '#000000',
      color: colors.light.colorIcon,
    }}
    >
      <AppBar
        position="absolute"
        color="transparent"
        sx={{
          boxShadow: 'none',
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%)',
        }}
      >
        <Toolbar sx={{margin: '0 40px', justifyContent: 'space-between', alignItems: 'center'}}>
          <IconButton
            onClick={() => navigate(-1)}
            size="large"
            color="inherit"
          >
            <ArrowBackIcon/>
          </IconButton>
          <Stack direction="row" spacing={2}>
            <IconButton size="large" color="inherit">
              <AddIcon/>
            </IconButton>
            <IconButton onClick={() => addPhotoFavorites()} size="large" color="inherit">
              {photos[Number(currentPhoto)] && photos[Number(currentPhoto)].isFavorite ?
                <StarOutlinedIcon/> :
                <StarBorderOutlinedIcon/>
              }
            </IconButton>
            <IconButton size="large" color="inherit">
              <FileUploadOutlinedIcon/>
            </IconButton>
            <IconButton size="large" color="inherit">
              <DeleteOutlineOutlinedIcon/>
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <Stack direction="row" sx={{justifyContent: 'center', alignItems: 'center'}}>
        <Box sx={{display: 'flex', justifyContent: 'center', width: '20vw'}}>
          {currentPhoto !== 0 &&
            <PrevNextBtn onClick={() => prevPhoto()} color="inherit">
              <ArrowBackIosIcon/>
            </PrevNextBtn>}
        </Box>
        {currentPhoto !== undefined &&
          <ImageListItem>
            <img
              style={{width: '80vw', height: '100vh'}}
              src={`data:${photos[currentPhoto].type};base64,${photos[currentPhoto].image}`}
              alt={photos[currentPhoto].description}/>
          </ImageListItem>
        }
        <Box sx={{display: 'flex', justifyContent: 'center', width: '20vw'}}>
          {photos.length - 1 !== currentPhoto &&
            <PrevNextBtn onClick={() => nextPhoto()} color="inherit">
              <ArrowForwardIosIcon/>
            </PrevNextBtn>}
        </Box>
      </Stack>
    </Box>
  );
};

export default ViewPhoto;
