import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    htmlFontSize: 10,
    fontFamily: [
      'cursive',
      'sans-sarif',
      '"Comic Sans MS"',
    ].join(','),
  },
});

export default theme;
