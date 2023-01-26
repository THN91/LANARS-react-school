import React from 'react';
import {Link} from 'react-router-dom';

import {Box, Button, Divider, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SwapVertIcon from '@mui/icons-material/SwapVert';

import {AllPath} from '../../shared/constants/path';


const HeaderAlbums = (): JSX.Element => {
  return (
    <>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        m: '24px 24px 16px 24px',
      }}
      >
        <Typography variant="h1" component="h4">
          Albums
        </Typography>
        <Box>
          <Link style={{textDecoration: 'none'}} to={AllPath.CREATE_ALBUM}>
            <Button variant="text">
              <AddIcon/>
              <Typography variant="button">
                CREATE ALBUM
              </Typography>
            </Button>
          </Link>
          <Button variant="text">
            <SwapVertIcon/>
            <Typography variant="button">
              BY DATE ADDED
            </Typography>
          </Button>
        </Box>
      </Box>
      <Divider/>
    </>
  );
};

export default HeaderAlbums;
