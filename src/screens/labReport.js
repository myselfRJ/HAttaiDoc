import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
  Dimensions,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import PrescriptionHead from '../components/prescriptionHead';
import PresComponent from '../components/presComponent';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import ShowChip from '../components/showChip';
import {
  addLabReport,
  updateLabReport,
} from '../redux/features/prescription/labreport';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';
import {URL} from '../utility/urls';
import {InputText, HButton, SelectionTab, SelectorBtn} from '../components';
import {fetchApi} from '../api/fetchApi';
import {
  CUSTOMFONTSIZE,
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
} from '../settings/styles';
import {
  StoreAsyncData,
  UpdateAsyncData,
  RetriveAsyncData,
  clearStorage,
} from '../utility/AsyncStorage';
import {
  CONSTANT,
  formatdate,
  handleAddDates,
  showToast,
} from '../utility/const';
import {commonstyles} from '../styles/commonstyle';
import CustomModal from '../components/CustomModal';
import Option from '../components/option';
import DatePicker from 'react-native-date-picker';

const LabReports = () => {
  const {phone} = useSelector(state => state?.phone?.data);
  const token = useSelector(state => state.authenticate.auth.access);
  const appointmentID = useSelector(state => state?.address?.appointment_id);
  const navigation = useNavigation();
  const option = 'procedure';
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);
  const [filtered, setFilteredData] = useState([]);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [customDays, setCustomDays] = useState('');
  const [selectedDays, setSelectedDays] = useState('3');
  const [returnDate, setReturnDate] = useState(
    formatdate(handleAddDates(date, selectedDays)),
  );
  const dispatch = useDispatch();
  const prev = useSelector(state => state?.labreport?.labReport);
  const lab =
    prev?.length > 0
      ? prev?.filter(item => item?.appointment_id === appointmentID)
      : [];
  const [sug, setSug] = useState([]);
  const [seletedType, setSelectedType] = useState();
  const [modal, setModal] = useState(false);
  const HandleAddValue = () => {
    if (value) {
      dispatch(
        addLabReport([
          ...prev,
          {lab_test: value, appointment_id: appointmentID},
        ]),
      );
      setValue('');
    }
  };

  const handleOptions = value => {
    setSelectedDays(value);
    setReturnDate(formatdate(handleAddDates(date, value)));
  };

  const handleDate = () => {
    setOpen(true);
  };

  const handleConfirm = selectedDate => {
    setDate(selectedDate);
    const date = selectedDate?.toISOString()?.split('T')[0];
    console.log(date);
    setReturnDate(formatdate(date));
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handelvalue = value => {
    setCustomDays(value);
    setSelectedDays(value.length > 0 ? value : '30');
  };
  const handleDelete = index => {
    if (prev) {
      const updatedPrescriptions = prev?.filter((item, ind) => ind !== index);

      dispatch(updateLabReport(updatedPrescriptions));
    }
  };

  const term = 'test';
  const fetchTests = async () => {
    const response = await fetchApi(URL.snomed(value ? value : 'NA', option), {
      method: 'GET',
      headers: {
        // Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      const snomed_data = jsonData?.map(item => ({term: item}));
      setData(snomed_data);
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchTests();
  }, [value, term, option]);

  useEffect(() => {
    const filtering_data = [
      ...data,
      ...CONSTANT?.micro_biology,
      ...CONSTANT?.clinical_pathology,
      ...CONSTANT?.blood,
      ...CONSTANT?.urine,
      ...CONSTANT?.vitamin_assays,
      ...CONSTANT?.tumor_markers,
      ...CONSTANT?.hormones,
      ...CONSTANT?.coagulation_assays,
    ];
    if (value) {
      const filtered = filtering_data?.filter(
        item =>
          item?.term && item?.term.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredData([{term: value}, ...filtered]);
    } else {
      setFilteredData(filtering_data);
    }
  }, [data, value]);
  console.log(prev);

  const HandlePress = value => {
    setValue(value);
    setSelected(value);
    dispatch(
      addLabReport([...prev, {lab_test: value, appointment_id: appointmentID}]),
    );
    if (sug?.length > 0) {
      UpdateAsyncData(`labs${phone}`, {lab_test: value});
    }
    setValue('');
  };

  const handledata = () => {
    if (sug?.length === 0 || !sug) {
      StoreAsyncData(`labs${phone}`, prev);
    }
    const values = prev?.map(item => ({...item, date: returnDate}));
    dispatch(addLabReport(values));
    navigation.goBack();
  };
  const selectChange = value => {
    setSelected(value);
    dispatch(
      addLabReport([...prev, {lab_test: value, appointment_id: appointmentID}]),
    );
  };
  useEffect(() => {
    RetriveAsyncData(`labs${phone}`).then(array => {
      const uniqueArray = array?.filter((item, index) => {
        return (
          index === array?.findIndex(obj => obj.lab_test === item?.lab_test)
        );
      });
      if (uniqueArray?.length > 15) {
        uniqueArray?.splice(15);
        setSug(uniqueArray);
      } else {
        setSug(uniqueArray);
      }
    });
  }, []);

  const [template, setTemplate] = useState('');
  const [loading, setLoading] = useState(false);
  const savingTemplate = async () => {
    const lst_data = prev?.map(item => ({lab_test: item?.lab_test}));
    const bodyData = {
      key: 'tests',
      temp_name: template,
      temp_data: JSON.stringify(lst_data),
      doc_phone: phone,
    };
    setLoading(true);
    try {
      const response = await fetchApi(URL.savingTemplate, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });
      if (response.ok) {
        const jsonData = await response.json();
        if (jsonData?.status === 'success') {
          setModal(!modal);
          // Alert.alert('success', 'Succesfully saved');
          showToast('success', 'Succesfully saved');
          setLoading(false);
        } else {
          // Alert.alert('warn', jsonData?.message);
          showToast('error', jsonData?.message);
          setModal(!modal);
          setLoading(false);
        }
      }
    } catch (error) {
      // Alert.alert('error', JSON.stringify(error));
      showToast('error', JSON.stringify(error));
      setLoading(false);
      setModal(!modal);
    }
  };
  const [templatesData, setTemplatesData] = useState([]);
  const HandleTemplates = () => {
    if (!template) {
      // Alert.alert('', 'Please Enter Template Name');
      showToast('info', 'Please Enter Template Name');
    } else {
      savingTemplate();
    }
  };
  const fetchData = async () => {
    const response = await fetchApi(URL.getTemplates('tests', phone), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const jsonData = await response.json();
    setTemplatesData(jsonData?.data);
  };
  useEffect(() => {
    fetchData();
  }, [prev]);
  const [selectedTemplate, setSelectedTemplate] = useState();
  const handleDispatch = data => {
    if (selectedTemplate === data) {
      setSelectedTemplate('');
      dispatch(addLabReport([]));
    } else {
      setSelectedTemplate(data);
      const parsedData = JSON.parse(data);
      const lstdata = parsedData?.map(item => ({
        lab_test: item?.lab_test,
        appointment_id: appointmentID,
      }));
      dispatch(addLabReport(lstdata));
    }
  };
  return (
    <View style={styles.main}>
      <PrescriptionHead heading="Investigation Prescribed" />
      <ScrollView
        style={styles.appointmentcard}
        contentContainerStyle={{gap: 16}}
        persistentScrollbar={true}>
        <View>
          {/* <View style={styles.tab}>
            {CONSTANT.test?.map((val, ind) => (
              <SelectionTab
                selectContainer={{
                  paddingHorizontal: horizontalScale(64),
                  paddingVertical: verticalScale(8),
                  borderColor: CUSTOMCOLOR.primary,
                }}
                label={val}
                key={ind}
                onPress={() => handleSelect(val)}
                selected={seletedType === val}
              />
            ))}
          </View> */}
          <View style={styles.input}>
            <InputText
              inputContainer={styles.inputtext}
              label="Search"
              placeholder="Search Lab / Radialogy / Procedure"
              value={value}
              setValue={setValue}
              search={true}
              IconName={
                (show && filtered.length > 0) ||
                value === selected ||
                value.length === 0
                  ? 'magnify'
                  : 'close'
              }
              onPress={() => setValue('')}
            />
            {value.length > 1 &&
              (value === selected || show ? null : (
                <View style={styles.dropdownContainer}>
                  <ScrollView persistentScrollbar={true}>
                    {filtered?.map((val, index) => (
                      <TouchableOpacity
                        style={{
                          paddingHorizontal: horizontalScale(4),
                          paddingVertical: verticalScale(8),
                        }}
                        onPress={() => HandlePress(val?.term)}
                        key={index}>
                        <Text
                          style={{
                            fontSize: CUSTOMFONTSIZE.h3,
                            padding: moderateScale(10),
                            color: CUSTOMCOLOR.black,
                          }}>
                          {val.term}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              ))}

            <View
              style={{
                padding: moderateScale(16),
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: moderateScale(8),
                paddingHorizontal: horizontalScale(8),
              }}>
              {sug?.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => selectChange(item?.lab_test)}
                  style={[
                    styles.recomend,
                    {
                      backgroundColor:
                        value === item
                          ? CUSTOMCOLOR.primary
                          : CUSTOMCOLOR.recent,
                    },
                  ]}>
                  <Text
                    style={{
                      fontWeight: '700',
                      color:
                        value === item
                          ? CUSTOMCOLOR.white
                          : CUSTOMCOLOR.primary,
                    }}>
                    {item?.lab_test}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View
              style={{
                top: moderateScale(32),
                gap: moderateScale(4),
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {lab?.map((item, ind) =>
                lab.length > 0 ? (
                  <ShowChip
                    key={ind}
                    text={item?.lab_test}
                    onPress={() => handleDelete(ind)}
                    ind={ind}
                  />
                ) : null,
              )}
            </View>
            <View
              style={{
                marginTop: verticalScale(36),
                gap: moderateScale(4),
              }}>
              <View>
                <SelectorBtn
                  onPress={handleDate}
                  label={'Date'}
                  name={'calendar'}
                  input={returnDate}
                />

                {open && (
                  <DatePicker
                    modal
                    open={open}
                    date={date}
                    theme="auto"
                    mode="datetime"
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                  />
                )}
              </View>
              <Text style={styles.dateText}>Days:</Text>
              <View style={styles.radiogroup}>
                <Option
                  label="3 Days"
                  value="3"
                  selected={selectedDays === '3'}
                  onPress={() => handleOptions('3')}
                />
                <Option
                  label="7 Days"
                  value="7"
                  selected={selectedDays === '7'}
                  onPress={() => handleOptions('7')}
                />
                <Option
                  label="15 Days"
                  value="15"
                  selected={selectedDays === '15'}
                  onPress={() => handleOptions('15')}
                />
                <Option
                  label="30 Days"
                  value="30"
                  selected={selectedDays === '30'}
                  onPress={() => handleOptions('30')}
                />
                <Option
                  label="60 Days"
                  value="60"
                  selected={selectedDays === '60'}
                  onPress={() => handleOptions('60')}
                />
                <Option
                  label="90 Days"
                  value="90"
                  selected={selectedDays === '90'}
                  onPress={() => handleOptions('90')}
                />
                <View style={{width: moderateScale(100)}}>
                  <InputText
                    value={customDays}
                    placeholder={'Enter Days'}
                    setValue={val => {
                      handelvalue(val);
                      setReturnDate(
                        formatdate(
                          handleAddDates(date, val ? val : selectedDays),
                        ),
                      );
                    }}
                    keypad="numeric"
                  />
                </View>
              </View>
            </View>
            {templatesData?.length > 0 && (
              <View
                style={{
                  marginTop: moderateScale(80),
                  gap: moderateScale(8),
                }}>
                <Text
                  style={{
                    color: CUSTOMCOLOR.black,
                    fontSize: CUSTOMFONTSIZE.h2,
                    fontWeight: '500',
                  }}>
                  {' '}
                  Your Templates:
                </Text>
                <View
                  style={{
                    paddingLeft: moderateScale(4),
                    flexDirection: 'row',
                    gap: moderateScale(16),
                    flexWrap: 'wrap',
                  }}>
                  {templatesData?.map((item, inbdex) => (
                    <SelectorBtn
                      key={inbdex}
                      select={{
                        backgroundColor:
                          selectedTemplate === item?.temp_data
                            ? CUSTOMCOLOR.primary
                            : CUSTOMCOLOR.recent,
                      }}
                      inputstyle={{
                        color:
                          selectedTemplate === item?.temp_data
                            ? CUSTOMCOLOR.white
                            : CUSTOMCOLOR.primary,
                        fontWeight: '700',
                      }}
                      input={item?.temp_name}
                      onPress={() => handleDispatch(item?.temp_data)}
                    />
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
        <HButton
          btnstyles={{
            backgroundColor: CUSTOMCOLOR.white,
            borderColor: CUSTOMCOLOR.primary,
            borderWidth: 1,
          }}
          textStyle={{color: CUSTOMCOLOR.black}}
          label={'Save as Template'}
          onPress={() => {
            setModal(!modal);
          }}
        />
        <HButton
          btnstyles={commonstyles.activebtn}
          label={'Save'}
          onPress={() => {
            handledata();
          }}
        />
      </View>
      {modal && (
        <CustomModal visible={modal} Close={setModal}>
          <View style={{backgroundColor: CUSTOMCOLOR.white}}>
            <InputText
              label={'Template Name:'}
              required={true}
              value={template}
              setValue={setTemplate}
              placeholder={'Enter Template Name'}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: moderateScale(24),
            }}>
            <HButton
              loading={loading}
              label={'save'}
              onPress={HandleTemplates}
            />
          </View>
        </CustomModal>
      )}
    </View>
  );
};
export default LabReports;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(16),
    gap: moderateScale(8),
    backgroundColor: CUSTOMCOLOR.background,
  },
  appointmentcard: {
    height:
      Dimensions.get('window').height >= 900
        ? moderateScale(492)
        : moderateScale(350),
    paddingHorizontal: horizontalScale(8),
    gap: moderateScale(16),
  },
  inputtext: {
    paddingVertical: verticalScale(0),
    // borderWidth:1
  },
  dropdownContainer: {
    height: moderateScale(300),
    backgroundColor: CUSTOMCOLOR.white,
    // marginHorizontal: horizontalScale(8),
    borderWidth: 1,
    borderColor: CUSTOMCOLOR.borderColor,
  },
  recomend: {
    padding: moderateScale(8),
    borderRadius: moderateScale(4),
    // paddingHorizontal: horizontalScale(16),

    paddingVertical: verticalScale(12),
    borderWidth: 0.5,
    borderColor: CUSTOMCOLOR.primary,
  },
  tab: {
    flexDirection: 'row',
    gap: moderateScale(8),
    // paddingHorizontal:horizontalScale(8),
    paddingVertical: verticalScale(16),
    // top:moderateScale(24)
  },
  // DateContainer: {
  //   borderRadius: moderateScale(4),
  //   // justifyContent: 'space-between',
  // },
  radiogroup: {
    padding: moderateScale(8),
    flexDirection: 'row',
    gap: moderateScale(36),
    flexWrap: 'wrap',
  },
  dateText: {
    fontFamily: CUSTOMFONTFAMILY.body,
    color: CUSTOMCOLOR.black,
    fontSize: CUSTOMFONTSIZE.h3,
    fontWeight: '400',
  },
});
