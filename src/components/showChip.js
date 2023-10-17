import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';

const ShowChip = props => {
  return (
    <View style={{...styles.main, ...props.main}}>
      <View key={props.ind} style={styles.child}>
        <Icon
          name={props.nameIcon}
          size={moderateScale(16)}
          color={CUSTOMCOLOR.primary}
        />
        <View style={styles.alignchild}>
          <Text
            style={{
              color: CUSTOMCOLOR.primary,
              fontFamily: CUSTOMFONTFAMILY.body,
              fontWeight: '700',
              fontSize: CUSTOMFONTSIZE.h3,
            }}>
            {props.text}
          </Text>

          <TouchableOpacity onPress={props.onPress}>
            <Icon
              name="delete"
              size={moderateScale(24)}
              color={CUSTOMCOLOR.delete}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ShowChip;

const styles = StyleSheet.create({
  main: {
    // width: '100%',
    borderWidth: moderateScale(1),
    padding: moderateScale(4),
    marginBottom: moderateScale(4),
    marginHorizontal: horizontalScale(8),
    backgroundColor: '#EAF3FC',
    borderColor: CUSTOMCOLOR.borderColor,
  },
  child: {
    flexDirection: 'row',
    // flex: 1,
    // width: '100%',
    marginBottom: moderateScale(5),
    //borderWidth:1,
  },
  alignchild: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(16),
  },
});
