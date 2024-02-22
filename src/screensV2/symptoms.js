import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {CUSTOMCOLOR, CUSTOMFONTSIZE} from '../settings/styles';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utility/scaleDimension';
import {Button, Chip, TextInput} from 'react-native-paper';
import {useEffect, useState} from 'react';
import {HButton, InputText} from '../components';
import Slider from '@react-native-community/slider';
import ShowChip from '../components/showChip';
import {all} from 'axios';
import {sortTimeIntervals} from '../utility/const';
import {fetchApi} from '../api/fetchApi';
import {URL} from '../utility/urls';
const devHeight = Dimensions.get('window').height;
const devWidth = Dimensions.get('window').width;
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

const SliderComponent = ({ValueText, label, value, setValue, min = 0, max}) => {
  return (
    <View style={{gap: 8}}>
      <SubHeadText label={label} />
      <View style={{justifyContent: 'center', width: '35%'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              color: CUSTOMCOLOR.black,
              fontSize: moderateScale(14),
              fontWeight: '400',
              alignSelf: 'center',
            }}>
            {min?.toString()}
          </Text>
          <Text
            style={{
              color: CUSTOMCOLOR.black,
              fontSize: moderateScale(14),
              fontWeight: '400',
              alignSelf: 'center',
            }}>
            {label}: {value?.toString()}
          </Text>
          <Text
            style={{
              color: CUSTOMCOLOR.black,
              fontSize: moderateScale(14),
              fontWeight: '400',
              alignSelf: 'center',
            }}>
            {max?.toString()}
          </Text>
        </View>
        <Slider
          style={{
            slider: {height: moderateScale(80)},

            height: moderateScale(10),
          }}
          minimumValue={min ? min : 0}
          maximumValue={max}
          onValueChange={value => setValue(Math.floor(value))}
          minimumTrackTintColor={CUSTOMCOLOR.success}
          maximumTrackTintColor={CUSTOMCOLOR.disable}
        />
      </View>
    </View>
  );
};

export const NewSymptoms = () => {
  const [symp, setSymp] = useState('');
  const [selectedSymp, setSelectedSymp] = useState('');
  const [severe, setSevere] = useState('');
  const [years, setYears] = useState();
  const [months, setMonths] = useState();
  const [days, setDays] = useState();
  const [hrs, setHrs] = useState();
  const [allSymptoms, setAllsymptoms] = useState([]);
  const [snomedData, setSnomedData] = useState([]);

  const sugs = [
    'Eye Strain',
    'Common Cold',
    'Knee pain',
    'Dengue',
    'Fever',
    'Eye itching',
    'Elbow Pain',
  ];
  const severity = ['Low', 'Medium', 'High'];
  const handleSelect = value => {
    if (value === selectedSymp) {
      setSelectedSymp('');
      value === symp ? setSymp('') : setSymp(value);
    } else {
      setSelectedSymp(value);
      setSymp(value);
    }
  };
  const handleSeverity = value => {
    if (value === severe) {
      setSevere('');
      value === severe ? setSevere('') : setSevere(value);
    } else {
      setSevere(value);
      setSevere(value);
    }
  };
  let symplist = [];
  useEffect(() => {
    if (years) {
      symplist.push(`${years} ${parseInt(years) > 1 ? 'years' : 'year'}`);
    }
    if (months) {
      symplist.push(`${months} ${parseInt(months) > 1 ? 'months' : 'month'}`);
    }
    if (days) {
      symplist.push(`${days} ${parseInt(days) > 1 ? 'days' : 'day'}`);
    }
    if (hrs) {
      symplist.push(`${hrs} ${parseInt(hrs) > 1 ? 'hrs' : 'hr'}`);
    }
  }, [days, hrs, years, months]);
  const handleDelSymps = ind => {
    const updatedSymp = allSymptoms?.filter((_, index) => index !== ind);
    setAllsymptoms(updatedSymp);
  };
  const option = 'finding++disorder';
  const fetchSymptom = async () => {
    const response = await fetchApi(URL.snomed(symp ? symp : 'NA', option), {
      method: 'GET',
      headers: {
        // Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      const snomed_data = jsonData?.map(item => ({term: item}));
      setSnomedData([...snomed_data, {term: symp}]);
    } else {
      console.error('API call failed:', response.status, response);
    }
  };

  useEffect(() => {
    fetchSymptom();
  }, [symp, option]);
  return (
    <View
      style={{
        paddingHorizontal: horizontalScale(16),
        paddingVertical: verticalScale(8),
        backgroundColor: CUSTOMCOLOR.white,
        flex: 1,
      }}>
      <ScrollView
        style={{height: devHeight / 1.25}}
        contentContainerStyle={{gap: verticalScale(16)}}>
        <SubHeadText label={'Symptom'} />
        <View style={{flexDirection: 'row', gap: 8}}>
          {sugs?.map(item => (
            <Chip onPress={() => handleSelect(item)} key={item} mode="flat">
              {item}
            </Chip>
          ))}
        </View>
        <InputText value={symp} setValue={setSymp} search={true} />
        {symp?.length > 1 &&
          (symp === selectedSymp ? null : (
            <View style={styles.dropdownContainer}>
              <ScrollView persistentScrollbar={true}>
                {snomedData?.map((val, index) => (
                  <TouchableOpacity
                    style={{
                      paddingHorizontal: horizontalScale(4),
                      paddingVertical: verticalScale(-1),
                    }}
                    onPress={() => handleSelect(val?.term)}
                    key={index}>
                    <Text
                      style={{
                        fontSize: CUSTOMFONTSIZE.h3,
                        padding: moderateScale(6),
                        color: CUSTOMCOLOR.black,
                      }}>
                      {val?.term}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          ))}
        <SubHeadText label={'Severity'} />
        <View style={{flexDirection: 'row', gap: 8}}>
          {severity?.map(item => (
            <Chip
              onPress={() => handleSeverity(item)}
              key={item}
              mode="flat"
              style={{
                backgroundColor:
                  item === severe ? CUSTOMCOLOR.success : CUSTOMCOLOR.disable,
              }}
              textStyle={{
                paddingVertical: verticalScale(8),
                color: item === severe ? CUSTOMCOLOR.white : CUSTOMCOLOR.black,
              }}>
              {item}
            </Chip>
          ))}
        </View>
        <View style={{gap: moderateScale(8)}}>
          <SubHeadText label={'Time period'} />
          <View style={{gap: moderateScale(32), paddingLeft: 16}}>
            <SliderComponent
              value={years}
              setValue={setYears}
              label={'Years'}
              max={10}
            />
            <SliderComponent
              value={months}
              setValue={setMonths}
              label={'Months'}
              max={12}
            />
            <SliderComponent
              value={days}
              setValue={setDays}
              label={'Days'}
              max={31}
            />
            <SliderComponent
              value={hrs}
              setValue={setHrs}
              label={'Hrs'}
              max={12}
            />
          </View>
        </View>
        {allSymptoms?.length > 0 && (
          <>
            {allSymptoms?.map((item, ind) => (
              <ShowChip
                key={ind}
                text={`Symptom: ${item?.symptom}        Severity: ${item?.severity}      Time: ${item?.time}`}
                onPress={() => handleDelSymps(ind)}
              />
            ))}
          </>
        )}
      </ScrollView>
      <View style={{alignItems: 'flex-start'}}>
        <HButton
          label={'add'}
          icon={'plus'}
          btnstyles={{backgroundColor: CUSTOMCOLOR.success}}
          onPress={() => {
            setAllsymptoms([
              ...allSymptoms,
              {
                symptom: symp,
                severity: severe,
                time: sortTimeIntervals(symplist)?.join(' , '),
              },
            ]);
            setSymp('');
            setSelectedSymp('');
            setDays();
            setYears();
            setHrs();
            setMonths();
            setSevere('');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    top: moderateScale(90),
    gap: moderateScale(16),
    position: 'absolute',
    zIndex: 4,
    width: '100%',
    height: moderateScale(220),
    backgroundColor: CUSTOMCOLOR.white,
    // paddingHorizontal: horizontalScale(8),
    borderWidth: 0.5,
    borderColor: CUSTOMCOLOR.primary,
    borderRadius: moderateScale(4),
  },
});
