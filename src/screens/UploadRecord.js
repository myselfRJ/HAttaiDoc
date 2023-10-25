import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {
  moderateScale,
  horizontalScale,
  verticalScale,
} from '../utility/scaleDimension';
import {CUSTOMCOLOR, CUSTOMFONTSIZE} from '../settings/styles';
import {InputText, SelectorBtn} from '../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropdownComponent from '../components/Dropdownbox';
import DatePicker from 'react-native-date-picker';
import UploadCard from '../components/UploadCard';
import PrescribeHead from '../components/prescriptionHead';
import DocumentPicker from 'react-native-document-picker';

const Uploadrecord = () => {
  const [description, setDescription] = useState('');
  const [recordstype, setRecordsType] = useState('');
  const [otherstype, setOthersType] = useState('');
  const recordItems = [
    {label: 'Prescription', value: 'Prescription'},
    {label: 'Scan', value: 'Scan'},
    {label: 'Lab', value: 'Lab'},
    {label: 'Others', value: 'Others'},
  ];
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedFilename, setSelectedFilename] = useState();
  const [uploaddocument, SetUploadDocument] = useState({});

  const pickSingleFile = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
        allowMultiSelection: true,
      });
      setSelectedFilename(result[0]?.name);
      SetUploadDocument(result[0]?.uri);
      console.log('result===', result[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        // Handle other errors
      }
    }
  };

  console.log('=====>jhgbhsgb', selectedFilename);

  const handleDelete = index => {
    if (selectedFilename.length > 0) {
      const updatedfiles = selectedFilename?.filter(
        (item, ind) => ind !== index,
      );
      setSelectedFilename(updatedfiles);
    }
  };

  return (
    <View
      style={{
        paddingHorizontal: horizontalScale(24),
        gap: moderateScale(8),
        paddingVertical: verticalScale(16),
      }}>
      <PrescribeHead heading={'Upload Records'} />
      <DropdownComponent
        style={{paddingHorizontal: 0}}
        value={recordstype}
        select={value => setRecordsType(value)}
        placeholder="Type of Record"
        data={recordItems}
      />
      {recordstype === 'Others' ? (
        <InputText
          label={'Enter Type'}
          value={otherstype}
          setValue={setOthersType}
          placeholder="Enter Type of Record"
        />
      ) : null}
      <View>
        <SelectorBtn
          label={'Issue Date'}
          select={{
            borderWidth: 1,
            borderColor: CUSTOMCOLOR.primary,
            // marginHorizontal: horizontalScale(4),
          }}
          input={date.toISOString().split('T')[0]}
          setValue={setDate}
          name={'calendar'}
          onPress={() => setOpen(true)}
        />
        <DatePicker
          modal
          open={open}
          date={date}
          mode="date"
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
      <InputText
        label={'Description'}
        placeholder="Type your description here"
        value={description}
        setValue={setDescription}
        // maxLength={1000}
        multiline
      />
      <View>
        {/* {selectedFilename?.map((filename, index) => (
          
        ))} */}
        <Text>{selectedFilename}</Text>
      </View>
      <View style={styles.icon}>
        {/* <UploadCard onGallery={pickSingleFile} /> */}
        <TouchableOpacity
          onPress={pickSingleFile}
          style={{
            paddingHorizontal: horizontalScale(16),
            paddingVertical: verticalScale(8),
            borderColor: CUSTOMCOLOR.borderColor,
            borderWidth: moderateScale(1),
            borderRadius: moderateScale(5),
          }}>
          <Text
            style={{
              color: CUSTOMCOLOR.primary,
              fontSize: CUSTOMFONTSIZE.h3,
              fontWeight: '400',
            }}>
            Upload
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: CUSTOMCOLOR.black,
    fontSize: CUSTOMFONTSIZE.h2,
    fontWeight: 'bold',
    paddingBottom: moderateScale(16),
  },
  txt: {
    color: CUSTOMCOLOR.black,
    fontSize: CUSTOMFONTSIZE.h4,
    fontWeight: '400',
  },
  icon: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
});

export default Uploadrecord;
