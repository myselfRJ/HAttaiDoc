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
  const status = ['N', 'A'];
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>{props.label}</Text>
        </View>
        <View style={{flexDirection: 'row', gap: moderateScale(8)}}>
          <Option
            label="N"
            selected={props.option === 'N'}
            onPress={() => props.setOption('N')}
          />
          <Option
            label="A"
            selected={props.option === 'A'}
            onPress={() => props.setOption('A')}
          />
        </View>
      </View>
      {props.option === 'A' && (
        <TextInput
          style={styles.textinput}
          placeholder="Description"
          value={props.value}
          onChangeText={props.setvalue}></TextInput>
      )}
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
    fontSize: CUSTOMFONTSIZE.h2,
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
