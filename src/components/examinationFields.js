import {View, Text, StyleSheet, TextInput} from 'react-native';
import SelectionTab from './selectiontab';
import InputText from './inputext';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../utility/scaleDimension';
import {
  CUSTOMCOLOR,
  CUSTOMFONTSIZE,
  CUSTOMFONTFAMILY,
} from '../settings/styles';
import {mode} from '../redux/features/prescription/prescribeslice';
import Option from './option';

const Examination_Fields = props => {
  const check = props.check !== undefined ? true : false;
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>{props.label}</Text>
        </View>
        <View style={{flexDirection: 'row', gap: moderateScale(16)}}>
          <Option
            // style={{width: horizontalScale(32)}}
            label={check ? 'No' : 'N'}
            selected={props.option === (check ? 'Yes' : 'N')}
            onPress={() => props.setOption(check ? 'Yes' : 'N')}
          />
          <Option
            // style={{width: horizontalScale(32)}}
            label={check ? 'Yes' : 'A'}
            selected={props.option === (check ? 'No' : 'A')}
            onPress={() => props.setOption(check ? 'No' : 'A')}
          />
        </View>
      </View>
      {!check
        ? props.option !== '' && (
            <TextInput
              placeholderTextColor={CUSTOMCOLOR.disable}
              style={styles.textinput}
              placeholder="Description"
              value={props.value}
              multiline={true}
              onChangeText={props.setvalue}></TextInput>
          )
        : null}
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(12),
    gap: verticalScale(8),
    width: '48%',
  },
  container: {
    // paddingHorizontal: horizontalScale(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: moderateScale(24),
  },
  text: {
    color: CUSTOMCOLOR.black,
    fontSize: CUSTOMFONTSIZE.h3,
  },
  textinput: {
    backgroundColor: CUSTOMCOLOR.white,
    borderColor: CUSTOMCOLOR.primary,
    borderWidth: 1,
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(6),
    fontWeight: '400',
    fontSize: CUSTOMFONTSIZE.h3,
    color: CUSTOMCOLOR.black,
    borderRadius: 4,
    fontFamily: CUSTOMFONTFAMILY.body,
  },
});
export default Examination_Fields;
