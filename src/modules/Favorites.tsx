import React, {useEffect} from 'react';

import {Box, Checkbox, ImageListItem, styled} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

import {useAppDispatch, useAppSelector} from '../shared/hooks/redux_hooks';
import {getPhoto, setChecked} from '../shared/store/photoSlice';
import {colors} from '../styles/variables';

const MyImageListItem = styled(ImageListItem)(({selected}: { selected: boolean }) => ({
  borderRadius: 8,
  position: 'relative',
  cursor: 'pointer',
  backgroundColor: colors.light.colorIcon,
  ['&:hover']: {
    ['& .MuiCheckbox-root']: {
      display: 'block',
    },
  },
  ['img']: {
    transform: selected && 'scale(0.8)',
  },
  ['&.MuiSvgIcon-root']: {
    bottom: selected && 15,
    left: selected && 15,
    transform: selected && 'scale(0.8)',
  },
}));


const Favorites = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const {photos, checked} = useAppSelector(state => state.photo);
  const arrayCheckedPhoto = Object.entries(checked)
    .map(item => item[1] && Number(item[0]))
    .filter(item => item) as number[];

  useEffect(() => {
    dispatch(getPhoto([]));
  }, []);

  const handlerClick = (photoId: number) =>
    dispatch(setChecked({...checked, [photoId]: !checked[photoId]}));

  const isFavorite = (photoId: number) => photos.find(item => item.id === photoId && item.isFavorite);


  return (
    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 1, mt: 3, height: 142}}>
      {photos.map((item) => item.isFavorite && (
        <MyImageListItem
          key={item.id}
          selected={!!checked[Number(item.id)]}
        >
          <img
            style={{borderRadius: 8, width: 142, height: 142}}
            src={`data:${item.type};base64,${item.image}`}
            alt="photo"/>
          <Checkbox
            onClick={() => handlerClick(Number(item.id))}
            checked={!!checked[Number(item.id)]}
            sx={{
              display: arrayCheckedPhoto.find(photoId => photoId === item.id) ? 'flex' : 'none',
              position: 'absolute',
              top: '5px',
              right: '5px',
              color: colors.light.checkbox,
            }}/>
          <StarIcon sx={{
            display: isFavorite(Number(item.id)) ? 'flex' : 'none',
            position: 'absolute',
            bottom: '5px',
            left: '5px',
            color: colors.light.checkbox,
          }}/>
        </MyImageListItem>
      ))}
    </Box>
  );
};
export default Favorites;

