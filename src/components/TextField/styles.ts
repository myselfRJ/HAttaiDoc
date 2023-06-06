import {I18nManager, StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 5,
    marginTop: 5,
    // marginBottom: 5,
    height: 45,
    // borderWidth: 0.5,
  },
  leftIcon: {
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: I18nManager.isRTL ? 10 : 0,
  },
  textField: {
    fontFamily: 'Montserrat-Regular',
    flex: 1,
    padding: 12,
    height: 45,
    borderWidth: 0.5,
    borderColor: 'black',
    // backgroundColor: '#FAFFFF',

    fontSize: 14,
  },
  isPassword: {
    paddingRight: 45,
  },
  password: {
    position: 'absolute',
    padding: 10,
    top: 5,
    right: 10,
  },
});
