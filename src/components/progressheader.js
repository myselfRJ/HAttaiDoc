import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';

const ProgresHeader = props => {
  return (
    <View style={styles.main}>
      {props?.progressData?.map((item, index) => {
        return (
          <View
            key={index}
            style={{
              flexDirection: 'row',

              // width:horizontalScale           justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={styles.progress}>
              <View
                style={{
                  ...styles.circle,
                  backgroundColor: item.status ? '#2CBB15' : '#bbbaaa',
                }}>
                <Icon name={'check'} size={32} color="#ffffff" />
              </View>
              <Text>{item.progressname}</Text>
            </View>

            {index !== 2 ? (
              <View
                style={{
                  ...styles.seperator,
                  backgroundColor: item.status ? '#2CBB15' : '#bbbbbb',
                }}></View>
            ) : null}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    widthhorizontalScalelignSelf: 'center',
    paddingHorizontal: horizontalScale(64),
    paddingVertical: verticalScale(24),
  },
  progress: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
  },
  seperator: {
    paddingHorizontal: horizontalScale(24),
    height: verticalScale(4),
    width: horizontalScale(200),
    marginBottom: 16,
    marginHorizontal: horizontalScale(16),
    borderRadius: moderateScale(4),

    backgroundColor: '#21f345',
  },
  circle: {
    height: verticalScale(48),
    width: verticalScale(48),
    borderRadius: verticalScale(24),
    backgroundColor: '#aaaaaa',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProgresHeader;
