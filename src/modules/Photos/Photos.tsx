import React, {useEffect} from 'react';

import {Box, Checkbox, ImageListItem, Stack, styled} from '@mui/material';

import {changeHeader, getPhoto, setChecked} from '../../shared/store/photoSlice';
import {useAppDispatch, useAppSelector} from '../../shared/hooks/redux_hooks';
import NotFound from '../../shared/components/NotFound';
import UploadButton from 'shared/components/UploadButton/UploadButton';
import {colors} from '../../styles/variables';

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
}));


const Photos = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const {photos, checked} = useAppSelector(state => state.photo);
  const arrayCheckedPhoto = Object.entries(checked)
    .map(item => item[1] && Number(item[0]))
    .filter(item => item) as number[];

  useEffect(() => {
    dispatch(getPhoto([]));
  }, []);

  useEffect(() => {
    dispatch(changeHeader([...arrayCheckedPhoto]));
  }, [checked]);

  const handlerClick = (photoId: number) => dispatch(setChecked({...checked, [photoId]: !checked[photoId]}));


  return (
    <>
      {photos.length === 0 ?
        <NotFound name="photo" svgSwitch={true}/> :
        <Stack>
          <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 1, mt: 3}}>
            {photos.map((item) => (
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
              </MyImageListItem>
            ))}
          </Box>
          <Box sx={{display: 'flex', justifyContent: 'flex-end', pr: 5}}>
            <UploadButton nameBtn="Upload photo"/>
          </Box>
        </Stack>
      }
    </>
  );
};
export default Photos;
