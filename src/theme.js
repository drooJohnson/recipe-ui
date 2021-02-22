import React from 'react';
import { createMuiTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme({
  typography: {
    h1:{
      fontSize:"42px",
      fontFamily:"'Space Grotesk', sans-serif",
    },
    h2:{
      fontSize:"36px",
      fontFamily:"'Space Grotesk', sans-serif",
    },
    h3:{
      fontSize:"32px",
      fontFamily:"'Space Grotesk', sans-serif",
    },
    h4:{
      fontSize:"28px",
      fontFamily:"'Space Grotesk', sans-serif",
    },
    h5:{
      fontSize:"24px",
      fontFamily:"'Space Grotesk', sans-serif",
    },
    h6:{
      fontSize:"20px",
      fontFamily:"'Space Grotesk', sans-serif",
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

theme = responsiveFontSizes(theme);

const Theme = ({children}) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}

export default Theme;
