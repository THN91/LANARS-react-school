import React, {useEffect} from 'react';

import {Box, ImageListItem} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

import {useAppDispatch, useAppSelector} from '../shared/hooks/redux_hooks';
import {getPhoto} from '../shared/store/photoSlice';
import {colors} from '../styles/variables';


const Favorites = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const {photos} = useAppSelector(state => state.photo);

  useEffect(() => {
    dispatch(getPhoto([]));
  }, []);

  // const isFavorite = (photoId: number) => photos.find(item=>item.id === photoId && item.isFavorite);

  return (
    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 1, mt: 3}}>
      {photos.map((item) => item.isFavorite && (
        <ImageListItem sx={{position: 'relative'}} key={item.id}>
          <img
            style={{borderRadius: 8, width: 142, height: 142}}
            src={`data:${item.type};base64,${item.image}`}
            alt={item.description}/>
          <StarIcon sx={{
            display: 'flex',
            position: 'absolute',
            bottom: '5px',
            left: '5px',
            color: colors.light.checkbox,
          }}/>
        </ImageListItem>
      ))}
    </Box>
  );
};
export default Favorites;

