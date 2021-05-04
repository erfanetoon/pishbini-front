import React from 'react';
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  StylesProvider,
  ThemeProvider,
  jssPreset,
} from '@material-ui/core/styles';
import { faIR } from '@material-ui/core/locale';
import { create } from 'jss';
import rtl from 'jss-rtl';

interface ColorsInterface {
  primary: string;
  secondary: string;
  error: string;
  warning: string;
  info: string;
  success: string;
  white: string;
  black: string;
  backgroundOpacity: string;
  dividerColor: string;
  goldBackground: string;
  silverBackground: string;
  bronzeBackground: string;
}

export let Colors: ColorsInterface = {
  primary: '#2196F3',
  secondary: '#E91E63',
  error: '#FF5252',
  warning: '#FFC107',
  info: '#00BCD4',
  success: '#00e676',
  white: '#fff',
  black: '#000',
  backgroundOpacity: 'rgba(0, 0, 0, 0.250) !important',
  dividerColor: 'rgba(255, 255, 255, 0.250) !important',
  goldBackground: 'rgba(255, 215, 0, 0.3) !important',
  silverBackground: 'rgba(200, 200, 200, 0.3) !important',
  bronzeBackground: 'rgba(255, 80, 0, 0.3) !important',
};

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const theme = createMuiTheme(
  {
    palette: {
      primary: {
        main: Colors.primary,
        contrastText: '#fff',
      },
      secondary: {
        main: Colors.secondary,
        contrastText: '#fff',
      },
      error: {
        main: Colors.error,
        contrastText: '#fff',
      },
      warning: {
        main: Colors.warning,
        contrastText: '#fff',
      },
      info: {
        main: Colors.info,
        contrastText: '#fff',
      },
      success: {
        main: Colors.success,
        contrastText: '#fff',
      },
      text: {
        primary: Colors.black,
        secondary: Colors.white,
      },
    },
    direction: 'rtl',
    typography: {
      fontFamily: ['IRANSans', 'Tahoma', 'Arial'].join(','),
    },
    shape: {
      borderRadius: 16,
    },
    spacing: 4,
  },
  faIR
);

theme.shadows[4] = '0 .125rem .25rem rgba(0,0,0,.075)!important';
theme.shadows[5] = '0 .125rem .25rem rgba(255,255,255,.075)!important';
theme.shadows[8] = '0 .5rem 1rem rgba(0,0,0,.15)!important';
theme.shadows[9] = '0 .5rem 1rem rgba(255,255,255,.15)!important';
theme.shadows[12] = '0 1rem 3rem rgba(0,0,0,.175)!important';
theme.shadows[13] = '0 1rem 3rem rgba(255,255,255,.175)!important';

interface Children {
  children: React.ReactNode;
}

const App: React.FC<Children> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jss}>{children}</StylesProvider>
    </ThemeProvider>
  );
};

export default App;
