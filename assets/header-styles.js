import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const headerStyles = (theme) => {
  const themeObject = {
    backgroundColor: theme.blue.primary,
    display: 'flex',
    flex: 1,
    // width: windowWidth,
    // top: -50,
    // paddingTop: 20,
    // paddingBottom: 20,
    text: {
      color: theme.white,
    },
    statusBar: {
      height: 120,
      backgroundColor: theme.blue.primary,
      borderBottomRightRadius: 45,
      borderBottomLeftRadius: 45,
    },
  };
  return themeObject;
};
