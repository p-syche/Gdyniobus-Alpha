import {createTheming} from '@callstack/react-theme-provider';

const {ThemeProvider, withTheme} = createTheming({
  blue: {
    primary: '#572cd8',
    light: '#905bff',
    dark: '#0000a5',
  },
  orange: {
    primary: '#ff7d3b',
    light: '#ffad69',
    dark: '#c64c08',
  },
  grey: '#f6f4fd',
  white: '#ffffff',
});

export {ThemeProvider, withTheme};
