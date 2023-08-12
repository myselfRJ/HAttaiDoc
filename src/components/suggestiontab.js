import {Pressable, StyleSheet, Text} from 'react-native';
import {CUSTOMFONTSIZE} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from '../utility/scaleDimension';
const SuggestionTab = props => {
  return (
    <>
      <Pressable style={styles.tabcontainer}>
        <Text style={styles.tabtext}>{Language[language][props.label]}</Text>
      </Pressable>
    </>
  );
};
const styles = StyleSheet.create({
  tabcontainer: {
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(8),
    borderWidth: 0.5,
    borderColor: '#4BA5FA',
    borderRadius: 24,
  },
  tabtext: {
    fontStyle: 'normal',
    fontFamily: 'Open Sans',
    fontWeight: 400,
    fontSize: CUSTOMFONTSIZE.h4,
    color: '#4BA5FA',
  },
});

export default SuggestionTab;
