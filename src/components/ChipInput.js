import {View, Text, StyleSheet} from 'react-native';
import ShowChip from './showChip';
import InputText from './inputext';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utility/scaleDimension';

// import Icon from 'react'
const ChipInput = props => {
  const data = props.data;
  const item = props.item;
  return (
    <View style={styles.main}>
      <Text style={{...styles.labeltext, ...props.labelStyle}}>
        {props.label}
      </Text>

      <View style={styles.child}>
        {data?.map((value, index) => (
          <ShowChip
            key={index}
            text={`${value?.[item]}`}
            onPress={() => props.delete(index)}
          />
        ))}

        <InputText
          placeholder={props.placeholder}
          inputContainer={{paddingHorizontal: 0, paddingVertical: 0}}
          textStyle={{borderWidth: 0, borderColor: CUSTOMCOLOR.white}}
          value={props.value}
          setValue={props.setValue}
          blur={false}
          onSubmit={props.onSubmit}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    //   gap:8,
  },
  child: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: CUSTOMCOLOR.primary,
    flexWrap: 'wrap',
    gap: moderateScale(8),
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(4),
  },
  labeltext: {
    paddingBottom: moderateScale(1),
    fontWeight: '400',
    fontSize: CUSTOMFONTSIZE.h3,
    color: CUSTOMCOLOR.black,
    fontFamily: CUSTOMFONTFAMILY.body,
  },
});

export default ChipInput;
