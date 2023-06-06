import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  loader_container: {
    // height: height,
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'row',
    // backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1031,
  },
  loader_lable: {
    fontSize: 18,
    marginTop: 5,
    color: '#333',
  },
  inner_wrapper: {
    // backgroundColor: '#fff',
    // borderRadius: 4,
    // padding: 10,
    // opacity: 1,
    // zIndex: 2,
    width: '100%',
    alignItems: 'center',
  },
});
