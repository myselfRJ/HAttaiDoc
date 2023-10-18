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
              justifyContent: 'space-between',

              // width:horizontalScale           justifyContent: 'center',
            }}>
            <View style={styles.progress}>
              <View
                style={{
                  ...styles.circle,
                  backgroundColor: item.status ? '#2CBB15' : '#bbbaaa',
                }}>
                <Icon name={'check'} size={moderateScale(32)} color="#ffffff" />
              </View>
              <Text>{item.progressname}</Text>
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: horizontalScale(16),
              }}>
              <View
                style={
                  index !== 2
                    ? {
                        ...styles.seperator,
                        backgroundColor: item.status ? '#2CBB15' : '#bbbbbb',
                      }
                    : null
                }></View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',

    paddingHorizontal: horizontalScale(64),
    paddingVertical: verticalScale(24),
  },
  progress: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  seperator: {
    // paddingHorizontal: horizontalScale(24),
    height: verticalScale(4),
    alignSelf: 'center',
    width: horizontalScale(160),
    marginBottom: verticalScale(14),
    borderRadius: moderateScale(4),
    backgroundColor: '#21f345',
  },
  circle: {
    height: moderateScale(48),
    width: moderateScale(48),
    borderRadius: moderateScale(24),
    backgroundColor: '#aaaaaa',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProgresHeader;
