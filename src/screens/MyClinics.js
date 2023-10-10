import {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {checkNumber, checkOtp, checkPassword} from '../utility/checks';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import {
  HButton,
  StatusMessage,
  BottomSheetView,
  SelectorBtn,
} from '../components';
import {URL} from '../utility/urls';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {fetchApi} from '../api/fetchApi';
import {useDispatch, useSelector} from 'react-redux';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';
import PrescriptionHead from '../components/prescriptionHead';
import ClinicCard from '../components/ClinicCard';
import {updateclinics} from '../redux/features/profiles/clinicData';
import {useRoute} from '@react-navigation/native';
import {HttpStatusCode} from 'axios';
import {headerStatus} from '../redux/features/headerProgress/headerProgress';

const MyClinics = ({navigation}) => {
  const token = useSelector(state => state.authenticate.auth.access);
  const dispatch = useDispatch();

  const route = useRoute();
  const {prevScrn} = route.params;
  console.log('=========>prev', prevScrn);
  const clinics = useSelector(state => state.clinic?.clinics);
  const [loading, setLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState({});
  const [ind, setInd] = useState('');
  const SuccesRef = useRef(null);
  useEffect(() => {
    SuccesRef?.current?.snapToIndex(1);
  }, []);
  const ResetClinicRedux = () => {
    const ResetClinic = [];
    dispatch(updateclinics(ResetClinic));
  };
  const handleInd = index => {
    setInd(index);
  };
  const handleDeleteSlotChip = index => {
    const newClinics = clinics?.filter((_, i) => i !== index);
    dispatch(updateclinics(newClinics));
  };

  console.log('=========<>clinics', clinics);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetchApi(URL.addclinic, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(clinics),
      });
      if (response.status === HttpStatusCode.Ok) {
        const jsonData = await response.json();
        if (jsonData.status === 'success') {
          setApiStatus({status: 'success', message: 'Successfully created'});
          SuccesRef?.current?.snapToIndex(1);
          dispatch(headerStatus({index: 1, status: true}));
          {
            prevScrn === 'account'
              ? setTimeout(() => {
                  navigation.navigate('tab');
                }, 1000)
              : setTimeout(() => {
                  navigation.navigate('adduser', {prevScrn1});
                }, 1000);
          }
          setTimeout(() => {
            SuccesRef?.current?.snapToIndex(0);
          }, 5000);
          setLoading(false);
          ResetClinicRedux();
          // SuccesRef?.current?.snapToIndex(0);
        } else {
          setApiStatus({status: 'warning', message: jsonData.message});
          SuccesRef?.current?.snapToIndex(1);
          console.error('API call failed:', response.status, response);
          setLoading(false);
        }
      }
    } catch (error) {
      console.error('Error occurred:', error);
      setApiStatus({status: 'error', message: 'Please try again'});
      SuccesRef?.current?.snapToIndex(1);
      setLoading(false);
    }
  };
  return (
    <View style={styles.Main}>
      <PrescriptionHead heading={'My Clinics'} />
      <ScrollView>
        <View
          style={{
            alignSelf: clinics?.length > 0 ? 'flex-end' : 'center',
            alignItems: 'center',
            marginBottom: moderateScale(12),
          }}>
          <SelectorBtn
            select={styles.btn}
            inputstyle={styles.input}
            input={'Add Clinic'}
            Bname={'plus'}
            onPress={() => {
              navigation.navigate('addclinic', {prevScrn});
            }}
          />
        </View>
        {clinics?.map((item, index) => (
          <View key={index} style={{marginBottom: moderateScale(8)}}>
            <ClinicCard
              index={ind}
              data={item}
              cancel={() => {
                handleDeleteSlotChip(index);
                handleInd(index);
              }}
            />
          </View>
        ))}
      </ScrollView>
      {clinics?.length > 0 ? (
        <HButton
          btnstyles={styles.btnNext}
          textStyle={styles.input}
          label={'Next'}
          onPress={fetchData}
          loading={loading}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  Main: {
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(12),
    flex: 1,
  },
  input: {
    fontSize: CUSTOMFONTSIZE.h2,
    color: CUSTOMCOLOR.white,
    paddingLeft: moderateScale(8),
  },
  btn: {
    backgroundColor: CUSTOMCOLOR.primary,
    borderRadius: moderateScale(10),
  },
  btnNext: {
    backgroundColor: CUSTOMCOLOR.primary,
    justifyContent: 'center',
    marginHorizontal: moderateScale(56),
    borderRadius: moderateScale(10),
  },
});
export default MyClinics;
