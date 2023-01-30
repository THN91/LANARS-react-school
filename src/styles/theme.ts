import {createTheme} from '@mui/material';

import {colors} from './variables';

export const theme = createTheme({
  palette: {
    mode: 'light',
  },
  typography: {
    fontFamily: ['Saira', 'sans-serif'].join(','),
    fontSize: 16,
    h1: {
      fontWeight: 500,
      fontSize: 22,
      color: colors.light.text,
    },
    body1: {
      fontWeight: 500,
      color: colors.light.text,
    },
    subtitle1: {
      fontWeight: 400,
      fontSize: 14,
    },
    button: {
      fontWeight: 500,
      fontSize: 15,
    },
  },
  components: {
    ['MuiDivider']: {
      styleOverrides: {
        root: {
          borderColor: colors.light.divider,
        },
      },
    },
  },
});
