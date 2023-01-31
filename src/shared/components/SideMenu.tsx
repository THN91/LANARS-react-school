import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {MenuItem, MenuList, styled} from '@mui/material';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import PhotoAlbumOutlinedIcon from '@mui/icons-material/PhotoAlbumOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

import {AllPath} from '../constants/path';
import {colors} from '../../styles/variables';


const SideMenuBtn = styled(MenuItem)(() => ({
  width: 168,
  margin: 8,
  padding: 8,
  borderRadius: 48,
  color: colors.light.text,
  ['&:hover, &.Mui-selected']: {
    borderRadius: 48,
    color: colors.light.primary,
    backgroundColor: colors.light.bgBtnSideMenu,
  },
}));


const SideMenu = (): JSX.Element => {
  const navigate = useNavigate();
  const [route, setRoute] = useState<string>(AllPath.ALL_PHOTO);

  const handlerClick = (path: string) => {
    setRoute(path);
    navigate(path);
  };
  return (
    <MenuList sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', p: 4}}>
      <SideMenuBtn
        selected={route === AllPath.ALL_PHOTO}
        onClick={() => handlerClick(AllPath.ALL_PHOTO)}
      >
        <InsertPhotoOutlinedIcon sx={{p: '0 8px 0 16px'}}/>
        All photos
      </SideMenuBtn>
      <SideMenuBtn
        selected={route === AllPath.ALBUM}
        onClick={() => handlerClick(AllPath.ALBUM)}
      >
        <PhotoAlbumOutlinedIcon sx={{p: '0 8px 0 16px'}}/>
        Albums
      </SideMenuBtn>
      <SideMenuBtn
        selected={route === AllPath.FAVORITES}
        onClick={() => handlerClick(AllPath.FAVORITES)}
      >
        <StarBorderOutlinedIcon sx={{p: '0 8px 0 16px'}}/>
        Favorites
      </SideMenuBtn>
    </MenuList>
  );
};

export default SideMenu;
