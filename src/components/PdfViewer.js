import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import Pdf from 'react-native-pdf';
import {moderateScale, verticalScale} from '../utility/scaleDimension';
import HButton from './button';

const PDFViewer = props => {
  const source = {uri: props.path, cache: true};

  return (
    <View style={styles.container}>
      <Pdf
        trustAllCerts={false}
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    // margin: moderateScale(10),
  },
  pdf: {
    // flex: 1,
    // marginVertical: verticalScale(20),
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - verticalScale(110),
  },
});

export default PDFViewer;
