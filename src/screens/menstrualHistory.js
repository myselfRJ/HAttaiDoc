import {View, Text, StyleSheet} from 'react-native';
import PrescriptionHead from '../components/prescriptionHead';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utility/scaleDimension';
import {
  HButton,
  InputText,
  PlusButton,
  SelectionTab,
  SelectorBtn,
} from '../components';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {CONSTANTS} from '../utility/constant';
import {useState, useEffect} from 'react';
import DatePicker from 'react-native-date-picker';
import moment, {min} from 'moment';
import {addmenstrualHistory} from '../redux/features/prescription/pastHistory';
import {commonstyles} from '../styles/commonstyle';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {URL} from '../utility/urls';
import {fetchApi} from '../api/fetchApi';
import {ScrollView} from 'react-native-gesture-handler';
import {mode} from '../redux/features/prescription/prescribeslice';

const MenstrualHistory = ({navigation, route}) => {
  const dispatch = useDispatch();
  const menstrualHistory = useSelector(
    state => state?.pasthistory?.menstrualHistory,
  );
  const {phone, patient_phone} = route.params;
  const token = useSelector(state => state.authenticate.auth.access);
  const nav = useNavigation();
  // console.log(',enstr==', menstrualHistory);
  const selction = ['Yes', 'No'];
  const [age, setAge] = useState('');
  const [status, setStatus] = useState('');
  const [flow, setFlow] = useState('');
  const [cycle, setCycle] = useState('');
  const [preg, setPreg] = useState('');
  const [menopause, setMenopause] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [formatDate, setformatDate] = useState('');
  const [formatDate1, setformatDate1] = useState('');
  // const formatDate = moment(date).format('YYYY-MM-DD');
  const [date1, setDate1] = useState(new Date());
  const [open1, setOpen1] = useState(false);
  const [others, setOthers] = useState('');
  // const formatDate1 = moment(date1).format('YYYY-MM-DD');
  const formattedDate = date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const handleConfirm = date => {
    setDate(date);
    setOpen(false);
    setformatDate(moment(date).format('YYYY-MM-DD'));
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const handleConfirm1 = date => {
    setDate1(date);
    setOpen1(false);
    setformatDate1(moment(date1).format('YYYY-MM-DD'));
  };
  const handleCancel1 = () => {
    setOpen1(false);
  };
  const HandleSelect = val => {
    setStatus(val);
  };
  const Pregselect = val => {
    setPreg(val);
    if (val === 'No') {
      setformatDate('');
      if (val === 'Yes') {
        setformatDate1('');
      }
    }
  };
  const menoselect = val => {
    setMenopause(val);
    if (val === 'No') {
      setformatDate1('');
    }
  };

  const handledata = () => {
    dispatch(
      addmenstrualHistory({
        age: age,
        status: status,
        flowdays: flow,
        cycledays: cycle,
        pregnant: formatDate ? formatDate : '',
        menopause: formatDate1 ? formatDate1 : '',
        others: others,
      }),
    );

    setAge('');
    setStatus('');
    setFlow('');
    setCycle('');
    setPreg('');
    setMenopause('');
    setformatDate('');
    setformatDate1('');
    setOthers('');
    nav.goBack();
  };
  const pregn = menstrualHistory?.pregnant;
  // console.log(pregn), '================';

  const fetchMenstrualData = async () => {
    try {
      const response = await fetchApi(URL.getMedical(phone, patient_phone), {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const jsonData = await response.json();

        if (jsonData?.data[0]?.mensutral_history) {
          const mens = JSON.parse(jsonData.data[0].mensutral_history);
          // setMenstrual(mens);
          setAge(mens?.age);
          setStatus(mens?.status);
          setFlow(mens?.flowdays);
          setCycle(mens?.cycledays);
          setformatDate(mens?.pregnant);
          setformatDate1(mens?.menopause);
          setOthers(mens?.others);
          // console.log('mens================', mens);
          dispatch(addmenstrualHistory(mens));
        }
      } else {
        console.error('API call failed:', response.status, response);
      }
    } catch (error) {
      console.error('Error in fetchMedicalData:', error);
    }
  };

  // useEffect(() => {
  //   fetchMenstrualData();
  // }, []);
  // console.log('preg===', menstrualHistory.pregnant);
  useEffect(() => {
    if (menstrualHistory) {
      setAge(menstrualHistory?.age);
      setStatus(menstrualHistory?.status);
      setCycle(menstrualHistory?.cycledays);
      setFlow(menstrualHistory?.flowdays);
      setformatDate(menstrualHistory?.pregnant);
      setformatDate1(menstrualHistory?.menopause);
      setOthers(menstrualHistory?.others);
    }
    if (menstrualHistory?.pregnant) {
      menstrualHistory?.pregnant !== '' ? setPreg('Yes') : setPreg('No');
      menstrualHistory?.menopause !== ''
        ? setMenopause('Yes')
        : setMenopause('No');
    }
  }, []);
  return (
    <View style={styles.main}>
      <ScrollView
        contentContainerStyle={{
          gap: moderateScale(16),
          paddingBottom: verticalScale(120),
        }}>
        <PrescriptionHead heading="Menstrual History" />
        <InputText
          label={'Menarche (The first occurrence of menstruation)'}
          placeholder={'Age'}
          value={age}
          setValue={setAge}
          numeric={true}
        />
        <View style={styles.fields}>
          <View style={{gap: verticalScale(4)}}>
            <Text style={styles.text}>Menstruation Status</Text>
            <View style={{gap: horizontalScale(8), flexDirection: 'row'}}>
              {CONSTANTS.menstruration_status.map((item, ind) => (
                <SelectionTab
                  label={item}
                  key={ind}
                  onPress={() => HandleSelect(item)}
                  selected={status === item}
                />
              ))}
            </View>
          </View>
          <InputText
            inputContainer={{width: horizontalScale(200)}}
            label={'Cycle Days'}
            placeholder={'Enter Cycle Days'}
            value={cycle}
            setValue={setCycle}
            numeric={true}
          />
          <InputText
            inputContainer={{width: horizontalScale(200)}}
            label={'Flow Days'}
            placeholder={'Enter Days'}
            value={flow}
            setValue={setFlow}
            numeric={true}
          />

          {/* <PlusButton
                icon={'plus'}
                size={24}
                /> */}
        </View>
        <View style={{gap: verticalScale(4)}}>
          <Text style={styles.text}>Pregnant</Text>
          <View style={{gap: horizontalScale(8), flexDirection: 'row'}}>
            {selction.map((item, ind) => (
              <SelectionTab
                label={item}
                key={ind}
                onPress={() => Pregselect(item)}
                selected={preg === item}
              />
            ))}
          </View>
        </View>
        {preg === 'Yes' && (
          <>
            <SelectorBtn
              label={'LMP(Last month period)'}
              name="calendar"
              onPress={() => setOpen('to')}
              input={formatDate ? formatDate : 'Select Date'}
              style={styles.DOBselect}
            />
            <DatePicker
              modal
              open={open !== false}
              date={date}
              theme="auto"
              mode="date"
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
          </>
        )}
        {preg === 'No' && (
          <>
            <View style={{gap: verticalScale(4)}}>
              <Text style={styles.text}>Menopause</Text>
              <View style={{gap: horizontalScale(8), flexDirection: 'row'}}>
                {selction.map((item, ind) => (
                  <SelectionTab
                    label={item}
                    key={ind}
                    onPress={() => menoselect(item)}
                    selected={menopause === item}
                  />
                ))}
              </View>
            </View>
            {menopause === 'Yes' && (
              <>
                <SelectorBtn
                  label={'LMP(Last month period)'}
                  name="calendar"
                  onPress={() => setOpen1('to')}
                  input={formatDate1 ? formatDate1 : 'Select Date'}
                  style={styles.DOBselect}
                />
                <DatePicker
                  modal
                  open={open1 !== false}
                  date={date1}
                  theme="auto"
                  mode="date"
                  onConfirm={handleConfirm1}
                  onCancel={handleCancel1}
                />
              </>
            )}
          </>
        )}
        <InputText
          value={others}
          setValue={setOthers}
          label={'Others'}
          placeholder={'Others'}
        />
      </ScrollView>

      <View style={{justifyContent: 'flex-end'}}>
        <HButton
          btnstyles={commonstyles.activebtn}
          label={'Save'}
          onPress={() => {
            handledata();
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(16),
    backgroundColor: CUSTOMCOLOR.background,
    gap: moderateScale(16),
  },
  fields: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontFamily: CUSTOMFONTFAMILY.body,
    fontSize: CUSTOMFONTSIZE.h3,
    color: CUSTOMCOLOR.black,
    fontWeight: '400',
  },
});
export default MenstrualHistory;
