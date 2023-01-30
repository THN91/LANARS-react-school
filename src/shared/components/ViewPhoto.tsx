import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {AppBar, Box, IconButton, ImageListItem, Stack, Toolbar} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {colors} from "../../styles/variables";
import {useAppDispatch, useAppSelector} from "../hooks/redux_hooks";
import {getPhoto} from "../store/photoSlice";


const ViewPhoto = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {photos} = useAppSelector(state => state.photo);

  useEffect(() => {
    dispatch(getPhoto([4]))
  }, [])

  return (
    <Box sx={{
      height: '100%',
      backgroundColor: '#000000',
      color: colors.light.colorIcon
    }}>
      <AppBar position="absolute" color="transparent" sx={{boxShadow: 'none'}}>
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
            <IconButton size="large" color="inherit">
              <StarBorderOutlinedIcon/>
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
      <Stack spacing={8} direction="row" sx={{justifyContent: 'center', alignItems: 'center'}}>
        <IconButton size="large" color="inherit">
          <ArrowBackIosIcon/>
        </IconButton>
        {photos[0] &&
          <ImageListItem>
            <img
              style={{width: '80vw', height: '100vh'}}
              src={`data:${photos[0].type};base64,${photos[0].image}`}
              alt={photos[0].description}/>
          </ImageListItem>
        }
        <IconButton size="large"  color="inherit">
          <ArrowForwardIosIcon/>
        </IconButton>
      </Stack>
    </Box>
  )
};

export default ViewPhoto;
