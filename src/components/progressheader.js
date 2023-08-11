import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProgresHeader = props => {
  return (
    <View style={styles.main}>
      {props?.progressData?.map((item, index) => {
        return (
          <View
            key={index}
            style={{
              flexDirection: 'row',

              // width: '33.33%',
              justifyContent: 'center',
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
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 64,
    paddingVertical: 24,
  },
  progress: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
  },
  seperator: {
    paddingHorizontal: 24,
    height: 4,
    width: 200,
    marginBottom: 16,
    marginHorizontal: 16,
    borderRadius: 4,

    backgroundColor: '#21f345',
  },
  circle: {
    height: 48,
    width: 48,
    borderRadius: 32,
    backgroundColor: '#aaaaaa',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProgresHeader;
