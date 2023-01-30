import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router';

import {
  Box,
  Button,
  Checkbox,
  Dialog,
  Divider,
  IconButton,
  ImageListItem,
  Slide,
  styled,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {TransitionProps} from '@mui/material/transitions';

import {clearAlbumState, getAlbum, updateAlbum} from '../shared/store/albumSlice';
import {useAppDispatch, useAppSelector} from '../shared/hooks/redux_hooks';
import AppBarAlbum from '../shared/components/AppBarAlbum';
import {colors} from '../styles/variables';
import {clearPhotoState, getPhoto} from '../shared/store/photoSlice';
import UploadButton from '../shared/components/UploadButton/UploadButton';


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

const Transition = React.forwardRef(function transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} children={props.children}/>;
});

const Album = (): JSX.Element => {
  const {albumId} = useParams();
  const dispatch = useAppDispatch();
  const {album} = useAppSelector(state => state.album);
  const {photo} = useAppSelector(state => state);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [checkedPhoto, setCheckedPhoto] = useState<Record<number, boolean>>({});
  const isDisabled = Object.values(checkedPhoto).some(item => item);
  const arrayCheckedPhoto = Object.entries(checkedPhoto)
    .map(item => item[1] && Number(item[0]))
    .filter(item => item) as number[];

  useEffect(() => {
    if(isOpen){
      const selectedNewPhoto = photo.photos.reduce((acc, uploadPhoto) => {
        if (uploadPhoto.isNew && uploadPhoto.id) {
          return {...acc, [uploadPhoto.id]: true};
        }
        return {...acc};
      }, {});
      if (Object.keys(selectedNewPhoto).length !== 0) {
        setCheckedPhoto(prevState => ({...prevState, ...selectedNewPhoto}));
      }
    }
  }, [photo]);


  useEffect(() => {
    dispatch(clearPhotoState());
    dispatch(clearAlbumState());
    dispatch(getAlbum([Number(albumId)]));
  }, []);

  useEffect(() => {
    if (album.length === 1) {
      dispatch(getPhoto(album[0].photos));
    }
  }, [album]);


  const addPhotoToAlbum = () => {
    const newPhoto = {...album[0], photos: [...album[0].photos, ...arrayCheckedPhoto], id: Number(albumId)};
    dispatch(updateAlbum(newPhoto));
    setCheckedPhoto({});
    setIsOpen(!isOpen);
  };

  const handlerClick = (photoId: number) =>
    setCheckedPhoto((prevState) => ({...prevState, [photoId]: !prevState[photoId]}));

  return (
    <>
      <AppBarAlbum isOpen={isOpen} setIsOpen={setIsOpen} checkedPhotoId={arrayCheckedPhoto}/>
      <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 1, m: '24px 40px'}}>
        {photo.photos.map((item) => (
          <MyImageListItem
            key={item.id}
            selected={!!checkedPhoto[Number(item.id)]}
          >
            <img
              style={{borderRadius: 8, width: 142, height: 142}}
              src={`data:${item.type};base64,${item.image}`}
              alt="photo"/>
            <Checkbox
              onClick={() => handlerClick(Number(item.id))}
              checked={!!checkedPhoto[Number(item.id)]}
              sx={{
                display: arrayCheckedPhoto.find(photoId => photoId === item.id) ? 'flex' : 'none',
                position: 'absolute',
                top: '5px',
                right: '5px',
                color: '#fff',
              }}/>
          </MyImageListItem>
        ))}
      </Box>
      <Dialog fullScreen open={isOpen} TransitionComponent={Transition}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          height: '100%',
          bgcolor: 'background.paper',
        }}
        >
          <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', m: 1, p: '0 32px'}}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <IconButton onClick={() => setIsOpen(!isOpen)} size="large" edge="start" color="inherit">
                <CloseIcon/>
              </IconButton>
              <Typography component="span" variant="h1">
                {
                  arrayCheckedPhoto.length === 0
                    ? 'Add to album'
                    : arrayCheckedPhoto.length === 1
                      ? 'Selected 1 photo'
                      : `Selected ${arrayCheckedPhoto.length} photos`
                }
              </Typography>
            </Box>
            <Button variant="contained" color="primary" disabled={!isDisabled} onClick={addPhotoToAlbum}>
              DONE
            </Button>
          </Box>
          <Divider/>
          <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 1, m: '24px 40px'}}>
            {photo.photos.map((item) => (
              <MyImageListItem
                key={item.id}
                selected={!!checkedPhoto[Number(item.id)]}
                onClick={() => handlerClick(Number(item.id))}
              >
                <img
                  style={{borderRadius: 8, width: 142, height: 142}}
                  src={`data:${item.type};base64,${item.image}`}
                  alt={item.description}/>
                <Checkbox
                  checked={!!checkedPhoto[Number(item.id)]}
                  sx={{position: 'absolute', top: '5px', right: '5px', color: '#fff'}}
                  value={item.id}/>
              </MyImageListItem>
            ))}
          </Box>
          <Box sx={{display: 'flex', flexDirection: 'row-reverse', m: 5}}>
            <UploadButton nameBtn={'Select files from computer'}/>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default Album;
