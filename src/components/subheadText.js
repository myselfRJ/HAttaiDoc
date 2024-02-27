import {Text, View} from 'react-native';
import {CUSTOMCOLOR} from '../settings/styles';
import {moderateScale} from '../utility/scaleDimension';

const SubHeadText = ({label}) => {
  return (
    <View>
      <Text
        style={{
          color: CUSTOMCOLOR.black,
          fontSize: moderateScale(14),
          fontWeight: '400',
        }}>
        {label}
      </Text>
    </View>
  );
};
export default SubHeadText;
