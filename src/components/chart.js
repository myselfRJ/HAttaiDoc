import {View, Image, StyleSheet, Text, Dimensions} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import {
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
  CUSTOMCOLOR,
} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import SelectDropdown from 'react-native-select-dropdown';
import {SvgXml} from 'react-native-svg';
import {down} from '../assets/svgs/svg';
const ChartCard = props => {
  //props->label,data
  const chartConfig = {
    backgroundColor: '#0091EA',
    backgroundGradientFrom: '#0091EA',
    backgroundGradientTo: '#0091EA',
    color: (opacity = 1) => `rgba(${255}, ${255}, ${255}, ${opacity})`,
    labelColor: () => `#333`,
    strokeWidth: 2,
    barPercentage: 1,
  };

  const selector = [
    Language[language]['weekly'],
    Language[language]['monthly'],
    // Language[language]['yearly'],
  ];
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{props.title}</Text>

        <SelectDropdown
          data={selector}
          renderDropdownIcon={() => <SvgXml xml={down} />}
          dropdownIconPosition="right"
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          defaultValue={Language[language]['montly']}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
          buttonStyle={{
            width: 100,
            height: 20,
            backgroundColor: CUSTOMCOLOR.white,
          }}
          buttonTextStyle={{
            color: CUSTOMCOLOR.black,
            fontSize: 12,
            lineHeight: 16,
            fontWeight: '300',
          }}
        />
      </View>
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}>
        <BarChart
          data={props.data}
          width={360}
          height={300}
          yAxisLabel={props.label ? props.label : undefined}
          withInnerLines={true}
          verticalLabelRotation={0}
          fromZero={true}
          showBarTops={true}
          chartConfig={{
            backgroundColor: CUSTOMCOLOR.white,
            backgroundGradientFrom: CUSTOMCOLOR.white,
            backgroundGradientTo: CUSTOMCOLOR.white,
            decimalPlaces: 0,
            barPercentage: 0.5,
            propsForLabels: {fontSize: 10, fontStyle: 'italic'},
            style: {backfaceVisibility: 'visible'},
            color: () => CUSTOMCOLOR.graph,
            labelColor: () => CUSTOMCOLOR.black,
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: CUSTOMCOLOR.white,
    paddingBottom: 8,
    borderRadius: 4,
  },
  header: {
    // paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: CUSTOMCOLOR.black,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '600',
  },
  graphStyle: {
    marginVertical: 8,
    borderRadius: 16,
  },
});
export default ChartCard;
