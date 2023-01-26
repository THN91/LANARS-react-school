import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

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

import {useAppDispatch, useAppSelector} from '../../shared/hooks/redux_hooks';
import {clearIsNew, clearPhotoState, getPhoto} from '../../shared/store/photoSlice';
import UploadButton from '../../shared/components/UploadButton/UploadButton';
import {colors} from '../../styles/variables';
import {IAlbumsProps} from '../../shared/interfaces/AlbumProps';
import {AllPath} from '../../shared/constants/path';


const MyImageListItem = styled(ImageListItem)(({selected}: { selected: boolean }) => ({
  borderRadius: 8,
  position: 'relative',
  cursor: 'pointer',
  backgroundColor: colors.light.colorIcon,
  ['img']: {
    transform: selected && 'scale(0.8)',
  },
}));

const AddPhotoContainer = styled(Box)(() => ({

}));

const Transition = React.forwardRef(function transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} children={props.children}/>;
});


const AddPhoto = ({isOpen, handleOpen, setPhotos}: IAlbumsProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const {photo} = useAppSelector(state => state);
  const [checkedPhoto, setCheckedPhoto] = useState<Record<number, boolean>>({});
  const checkedPhotoLength = Object.entries(checkedPhoto).filter(item => item[1]);
  const photos = Object.entries(checkedPhoto)
    .map(item => item[1] && Number(item[0])).filter(item => Number(item)) as number[];
  const isDisabled = Object.values(checkedPhoto).some(item => item);


  useEffect(() => {
    setCheckedPhoto(prevState => ({...prevState, ...photo.isNew}));
  }, [photo]);

  useEffect(() => {
    setPhotos(photos);
  }, [checkedPhoto]);

  useEffect(() => {
    dispatch(clearPhotoState());
    dispatch(getPhoto([]));
  }, []);

  const handlerClick = (id: number) =>
    setCheckedPhoto((prevState) => ({...prevState, [id]: !prevState[id]}));

  const handlerModal = () => {
    dispatch(clearPhotoState());
    dispatch(clearIsNew());
    dispatch(getPhoto([...photos]));
    handleOpen();
  };

  return (
    <Dialog fullScreen open={isOpen} TransitionComponent={Transition}>
      <AddPhotoContainer sx={{bgcolor: 'background.paper'}}>
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', m: 1, p: '0 32px'}}>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Link style={{textDecoration: 'none', color: 'inherit'}} to={AllPath.ALBUM}>
              <IconButton size="large" edge="start" color="inherit">
                <CloseIcon/>
              </IconButton>
            </Link>
            <Typography component="span" variant="h1">
              {
                checkedPhotoLength.length === 0
                  ? 'Add to album'
                  : checkedPhotoLength.length === 1
                    ? 'Selected 1 photo'
                    : `Selected ${checkedPhotoLength.length} photos`
              }
            </Typography>
          </Box>
          <Button variant="contained" color="primary" disabled={!isDisabled} onClick={handlerModal}>
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
          <UploadButton nameBtn={'SELECT FILES FROM COMPUTER'}/>
        </Box>
      </AddPhotoContainer>
    </Dialog>
  );
};

export default AddPhoto;
