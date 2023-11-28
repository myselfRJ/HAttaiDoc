import {View, Text, StyleSheet, TextInput, Alert} from 'react-native';
import PrescriptionHead from '../components/prescriptionHead';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utility/scaleDimension';
import {HButton, InputText, Option, PlusButton} from '../components';
import {CUSTOMCOLOR, CUSTOMFONTSIZE} from '../settings/styles';
import {commonstyles} from '../styles/commonstyle';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addobstericHistory} from '../redux/features/prescription/pastHistory';
import ObstetricField from '../components/obstetricField';
import CustomCalendar from '../components/calendar';

const ObstetricHistory = () => {
  const dispatch = useDispatch();
  const obs = useSelector(state => state?.pasthistory?.obstericHistory);
  // const [value, setvalue] = useState({
  //   year: '',
  //   anc: '',
  //   delivery: '',
  //   pn: '',
  //   baby: '',
  //   age: '',
  //   others: '',
  // });
  // const handlevalue = (name, value) => {
  //   setvalue(prev => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };
  const [show, setShow] = useState(false);
  const [showTerm, setshowTerm] = useState(false);
  const [showPre, setshowpre] = useState(false);
  const [showAbor, setShowabor] = useState(false);
  const [living, setLiving] = useState('');
  const [gravidity, setGravidity] = useState({
    value: '',
    desc: '',
  });
  const handleGravidity = (name, value) => {
    setGravidity(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  const [term, setTerm] = useState({
    value: '',
    desc: '',
  });
  const handleTerm = (name, value) => {
    setTerm(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  const [premature, setPremature] = useState({
    value: '',
    desc: '',
  });
  const handlePremature = (name, value) => {
    setPremature(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  const [abortions, setAbortions] = useState({
    value: '',
    desc: '',
  });
  const handleAbortion = (name, value) => {
    setAbortions(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  const handledata = () => {
    dispatch(
      addobstericHistory({
        year: value?.year,
        anc: value?.anc,
        delivery: value?.delivery,
        pn: value?.pn,
        baby: value?.baby,
        age: value?.age,
        others: value?.others,
      }),
    );
  };
  const [child, setChild] = useState({
    age: '',
    gender: '',
  });
  const [ind, setInd] = useState(parseInt(1));
  const [addChild, setAddchild] = useState([]);
  const [childShow, setChildShow] = useState(false);
  // const handlePlus = () => {
  //   setAddchild(prevChildren => [
  //     ...prevChildren,
  //     {age: child.age, gender: child.gender},
  //   ]);
  //   setChild({age: '', gender: ''});
  //   setInd(parseInt(ind) + 1);
  // };
  const handlePlus = () => {
    const parsedLiving = parseInt(living, 10);
    if (addChild.length < parsedLiving) {
      setInd(parseInt(ind) + 1);
    } else {
      setInd(null);
    }
    if (parsedLiving > 0 && addChild.length < parsedLiving) {
      setAddchild(prevChildren => [
        ...prevChildren,
        {age: child.age, gender: child.gender},
      ]);
      setChild({age: '', gender: ''});
    } else {
      // setChildShow(!childShow);
      Alert.alert('Warning', 'Cannot add more children.');
      console.log('Cannot add more children.');
    }

    setChild({age: '', gender: ''});
  };

  const handleOptions = value => {
    handleChangeValue('gender', value);
  };

  const handleChangeValue = (field, value) => {
    setChild(prevValues => ({
      ...prevValues,
      [field]: value,
    }));
  };
  console.log('====================================');
  console.log('garadfgh', childShow);
  console.log('====================================');
  return (
    <View style={styles.main}>
      <PrescriptionHead heading={'Past Obstetric History(GPLA)'} />
      {/* <View style={styles.fields}>
        <InputText
          label={'Year'}
          placeholder={'Year'}
          inputContainer={styles.input}
          value={value.year}
          setValue={val => handlevalue('year', val)}
        />
        <InputText
          label={'ANC'}
          placeholder={'ANC'}
          inputContainer={styles.input}
          value={value.anc}
          setValue={val => handlevalue('anc', val)}
        />
        <InputText
          label={'Delivery'}
          placeholder={'Delivery'}
          inputContainer={styles.input}
          value={value.delivery}
          setValue={val => handlevalue('delivery', val)}
        />
        <InputText
          label={'PN'}
          placeholder={'PN'}
          inputContainer={styles.input}
          value={value.pn}
          setValue={val => handlevalue('pn', val)}
        />
        <InputText
          label={'Baby'}
          placeholder={'Baby'}
          inputContainer={styles.input}
          value={value.baby}
          setValue={val => handlevalue('baby', val)}
        />
        <InputText
          label={'Age'}
          placeholder={'Age'}
          inputContainer={styles.input}
          value={value.age}
          setValue={val => handlevalue('age', val)}
        />
      </View>
      <InputText
        label={'Others'}
        placeholder={'Others'}
        value={value.others}
        setValue={val => handlevalue('others', val)}
      /> */}
      <ObstetricField
        label={'Gravidity'}
        values={gravidity.value}
        setvalues={val => {
          handleGravidity('value', val), setShow(true);
        }}
        desc={gravidity.desc}
        setDesc={val => handleGravidity('desc', val)}
        show={show}
        onPress={() => setShow(!show)}
      />
      <ObstetricField
        label={'Term'}
        values={term.value}
        setvalues={val => {
          handleTerm('value', val), setshowTerm(true);
        }}
        desc={term.desc}
        setDesc={val => handleTerm('desc', val)}
        show={showTerm}
        onPress={() => setshowTerm(!showTerm)}
      />
      <ObstetricField
        label={'Premature'}
        values={premature.value}
        setvalues={val => {
          handlePremature('value', val), setshowpre(true);
        }}
        desc={premature.desc}
        setDesc={val => handlePremature('desc', val)}
        show={showPre}
        onPress={() => setshowpre(!showPre)}
      />
      <ObstetricField
        label={'Abortions'}
        values={abortions.value}
        setvalues={val => {
          handleAbortion('value', val), setShowabor(true);
        }}
        desc={abortions.desc}
        setDesc={val => handleAbortion('desc', val)}
        show={showAbor}
        onPress={() => setShowabor(!showAbor)}
      />
      <View style={styles.field}>
        <Text style={styles.text}>{'Living'}</Text>
        <TextInput
          placeholder="Enter"
          style={styles.inputtext}
          value={living}
          onChangeText={val => {
            setLiving(val), setChildShow(true);
          }}
        />
      </View>
      {childShow
        ? addChild?.length < parseInt(living) && (
            <View
              style={{
                borderWidth: 0.5,
                borderColor: CUSTOMCOLOR.primary,
                paddingHorizontal: horizontalScale(8),
                paddingVertical: verticalScale(8),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: horizontalScale(32),
                  alignItems: 'center',
                  // alignSelf: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={styles.text1}>{ind} Child</Text>
                <TextInput
                  placeholder="Age"
                  style={styles.inputtext}
                  value={child.age}
                  onChangeText={val => handleChangeValue('age', val)}
                />
                <View style={styles.radiogroup}>
                  <Option
                    label="Male"
                    value="male"
                    selected={child.gender === 'male'}
                    onPress={() => handleOptions('male')}
                  />
                  <Option
                    label="Female"
                    value="female"
                    selected={child.gender === 'female'}
                    onPress={() => handleOptions('female')}
                  />
                </View>
              </View>
              <PlusButton
                icon={'plus'}
                size={moderateScale(20)}
                style={{alignSelf: 'flex-end'}}
                onPress={handlePlus}
              />
            </View>
          )
        : null}
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
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
    gap: moderateScale(8),
    backgroundColor: CUSTOMCOLOR.background,
  },
  fields: {
    flexDirection: 'row',
    // flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  input: {
    width: horizontalScale(100),
  },
  field: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(16),
  },
  text: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: CUSTOMCOLOR.black,
  },
  text1: {
    fontSize: CUSTOMFONTSIZE.h3,
    fontWeight: '400',
    color: CUSTOMCOLOR.black,
  },
  inputtext: {
    borderWidth: 0.5,
    borderColor: CUSTOMCOLOR.primary,
    paddingHorizontal: horizontalScale(32),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(4),
  },
  radiogroup: {
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(6),
    flexDirection: 'row',
    gap: moderateScale(24),
    // borderWidth:1,
    // justifyContent: 'flex-start',
  },
});
export default ObstetricHistory;
