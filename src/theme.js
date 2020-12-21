import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    h1:{
      fontSize:"42px"
    },
    h2:{
      fontSize:"36px"
    },
    h3:{
      fontSize:"32px"
    },
    h4:{
      fontSize:"28px"
    },
    h5:{
      fontSize:"24px"
    },
    h6:{
      fontSize:"20px"
    },
    subtitle1:{

    },
    subtitle2:{

    },
    body1:{

    },
    body2:{

    },
    button:{

    },
    caption:{

    },
    overline:{

    }
  }
})

const Theme = ({children}) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}

export default Theme;
