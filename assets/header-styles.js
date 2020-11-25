import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const headerStyles = (theme) => {
  const themeObject = {
    backgroundColor: theme.blue.primary,
    display: 'flex',
    flex: 1,
    text: {
      color: theme.white,
      fontFamily: 'Lato-Black',
      paddingTop: 29,
      fontSize: 28,
    },
    statusBar: {
      height: 140,
      backgroundColor: theme.blue.primary,
      borderBottomRightRadius: 50,
      borderBottomLeftRadius: 50,
    },
    backButton: {
      top: -100,
      position: 'absolute',
    },
  };
  return themeObject;
};
