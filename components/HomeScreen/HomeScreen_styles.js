import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({

  top : {
    marginTop: '5%',
  },

  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: '6%',
    marginLeft: '11.5%',
  },

  imgs: {
    resizeMode: 'stretch', // escala uniformemente la img con respecto a altura/ancho -> van a ser iguales o menores al contenedor
    width: 100,
    height: 150,
  },

  shadow: {
    width: 100,
    height: 150,
    shadowColor: '#4a4a4a',
    shadowOpacity: 0.6,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },

  bottom: {
    marginBottom: '2%',
  },

});
