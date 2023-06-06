import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 5,
    marginBottom: 5,
    minHeight: 45,
  },
  dropdown: {
    borderWidth: 0.5,
    flex: 1,
    paddingHorizontal: 10,
  },
  // dropdownStyle: {
  //   width: '100%',
  //   height: 45,
  //   borderRadius: 5,
  //   borderWidth: 1,
  // },
  // rowText: {
  //   textAlign: 'left',
  //   minHeight: 20,
  //   // textTransform: 'capitalize',
  // },
  // dropdownTextStyle: {
  //   textAlign: 'left',
  //   fontSize: 13,
  //   // textTransform: 'capitalize',
  // },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    // textTransform: 'capitalize',
  },
});
