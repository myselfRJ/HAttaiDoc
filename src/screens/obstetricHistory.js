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
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addobstericHistory} from '../redux/features/prescription/pastHistory';
import ObstetricField from '../components/obstetricField';
import CustomCalendar from '../components/calendar';
import ShowChip from '../components/showChip';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {URL} from '../utility/urls';
import {fetchApi} from '../api/fetchApi';
const ObstetricHistory = ({route}) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.authenticate.auth.access);
  const {phone, patient_phone} = route.params;
  const nav = useNavigation();
  const obstetric = useSelector(state => state?.pasthistory?.obstericHistory);
  // console.log('obstetric========================', obstetric);
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
        gravidity: gravidity,
        term: term,
        premature: premature,
        abortions: abortions,
        living: [...addChild, {living: living}],
      }),
    );
    nav.goBack();
  };
  const [child, setChild] = useState({
    name: 'Child',
    age: '',
    gender: '',
  });
  const [ind, setInd] = useState(parseInt(1));
  const [addChild, setAddchild] = useState([]);
  const [childShow, setChildShow] = useState(false);
  const handleDeleteChild = index => {
    const newChild = addChild?.filter((_, ind) => ind !== index);
    setAddchild(newChild);
    setInd(index + parseInt(1));
  };
  const handlePlus = () => {
    const parsedLiving = parseInt(living, 10);

    setAddchild(prevChildren => {
      if (prevChildren.length <= parsedLiving - 1) {
        return [
          ...prevChildren,
          {
            name: `Child ${ind}`,
            age: child.age,
            gender: child.gender,
          },
        ];
      }
    });

    setChild({age: '', gender: ''});
    setInd(prevInd => prevInd + 1);
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
  // console.log('living=================', addChild);
  // const obstericHistory = useSelector(
  //   state => state?.pasthistory?.obstericHistory,
  // );
  // console.log('==========>', typeof JSON.stringify(obstericHistory));
  // console.log('pre============', premature);
  const fetchObstetricData = async () => {
    try {
      const response = await fetchApi(URL.getMedical(phone, patient_phone), {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const jsonData = await response.json();

        if (jsonData?.data[0]?.obsteric_history) {
          const mens = JSON.parse(jsonData.data[0].obsteric_history);
          // console.log('get data=======================', mens);
          setGravidity({
            value: mens?.gravidity?.value,
            desc: mens?.gravidity?.desc,
          });
          setTerm({
            value: mens?.term?.value,
            desc: mens?.term?.desc,
          });
          setPremature({
            value: mens?.premature?.value,
            desc: mens?.premature?.desc,
          });
          setAbortions({
            value: mens?.abortions?.value,
            desc: mens?.abortions?.desc,
          });
          // if (mens?.living?.length > 0) {
          //   mens?.living?.map(item => {
          //     setLiving(item?.living);
          //   });
          // if (mens?.living) {
          //   setLiving(mens.living.map(item => item?.living));

          //   setAddchild(prevChildren => [
          //     ...prevChildren,
          //     ...mens.living.map(item => ({
          //       name: item?.name,
          //       age: item?.age,
          //       gender: item?.gender,
          //     })),
          //   ]);
          // }
          // console.log(
          //   '==============>mens',
          //   mens?.living[mens?.living?.length - 1]['living'],
          // );
          setLiving(mens?.living[mens?.living?.length - 1]['living']);
          {
            mens?.living?.forEach(element => {
              if (element?.age && element?.gender && element?.name) {
                setAddchild(prevChildren => [
                  ...prevChildren,
                  {
                    name: element?.name,
                    age: element?.age,
                    gender: element?.gender,
                  },
                ]);
              }
            });
          }

          dispatch(addobstericHistory(mens));
        }
      } else {
        console.error('API call failed:', response.status, response);
      }
    } catch (error) {
      console.error('Error in fetchMedicalData:', error);
    }
  };

  // useEffect(() => {
  //   fetchObstetricData();
  // }, []);
  useEffect(() => {
    if (obstetric) {
      setGravidity({
        value: obstetric?.gravidity?.value,
        desc: obstetric?.gravidity?.desc,
      });
      if (obstetric?.gravidity?.desc) {
        setShow(true);
      }
      setTerm({
        value: obstetric?.term?.value,
        desc: obstetric?.term?.desc,
      });
      if (obstetric?.term?.desc) {
        setshowTerm(true);
      }
      setPremature({
        value: obstetric?.premature?.value,
        desc: obstetric?.premature?.desc,
      });
      if (obstetric?.premature?.desc) {
        setshowpre(true);
      }
      setAbortions({
        value: obstetric?.abortions?.value,
        desc: obstetric?.abortions?.desc,
      });
      if (obstetric?.abortions?.desc) {
        setShowabor(true);
      }
      if (obstetric?.living?.length > 0) {
        // obstetric?.living?.map(item => {
        setLiving(obstetric?.living[obstetric?.living?.length - 1]['living']);
        // });
        setChildShow(true);
        obstetric?.living?.forEach(element => {
          if (element?.age && element?.gender && element?.name) {
            setAddchild(prevChildren => [
              ...prevChildren,
              {
                name: element?.name,
                age: element?.age,
                gender: element?.gender,
              },
            ]);
          }
        });
      }
    }
  }, []);
  // console.log('addchild===', addChild);
  return (
    <View style={styles.main}>
      <PrescriptionHead heading={'Past Obstetric History (GPAL)'} />
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
      <ScrollView
        contentContainerStyle={{
          paddingBottom: moderateScale(280),
        }}>
        <ObstetricField
          label={'Gravida'}
          definition={'(Number of pregnancies including current)'}
          values={gravidity.value}
          numeric={true}
          setvalues={val => {
            handleGravidity('value', val), setShow(true);
          }}
          desc={gravidity.desc}
          setDesc={val => handleGravidity('desc', val)}
          show={show}
          onPress={() => {
            setShow(!show);
            setGravidity({...gravidity, desc: ''});
          }}
        />
        <ObstetricField
          numeric={true}
          label={'Para / Term'}
          definition={'(Number of pregnancies carried to 37+ weeks)'}
          values={term.value}
          setvalues={val => {
            handleTerm('value', val), setshowTerm(true);
          }}
          desc={term.desc}
          setDesc={val => handleTerm('desc', val)}
          show={showTerm}
          onPress={() => {
            setshowTerm(!showTerm);
            setTerm({...term, desc: ''});
          }}
        />
        <ObstetricField
          numeric={true}
          label={'Premature'}
          definition={
            '(Number of pregnancies carried between 20 and 36 6/7 weeks)'
          }
          values={premature.value}
          setvalues={val => {
            handlePremature('value', val), setshowpre(true);
          }}
          desc={premature.desc}
          setDesc={val => handlePremature('desc', val)}
          show={showPre}
          onPress={() => {
            setshowpre(!showPre);
            setPremature({...premature, desc: ''});
          }}
        />
        <ObstetricField
          numeric={true}
          label={'Abortions'}
          definition={'(Number of losses before 20 weeks)'}
          values={abortions.value}
          setvalues={val => {
            handleAbortion('value', val), setShowabor(true);
          }}
          desc={abortions.desc}
          setDesc={val => handleAbortion('desc', val)}
          show={showAbor}
          onPress={() => {
            setShowabor(!showAbor);
            setAbortions({...abortions, desc: ''});
          }}
        />
        <View style={styles.field}>
          <View
            style={{
              flexDirection: 'row',
              gap: horizontalScale(4),
              alignItems: 'center',
            }}>
            <Text style={styles.text}>{'Living'}</Text>
            <Text style={styles.def}>{'(Number of living children)'}</Text>
          </View>
          <TextInput
            placeholderTextColor={CUSTOMCOLOR.disable}
            placeholder="Enter"
            style={styles.inputtext}
            value={living}
            onChangeText={val => {
              setLiving(val), setChildShow(true);
            }}
          />
        </View>
        {childShow
          ? addChild?.length <= parseInt(living) && (
              <View
                style={{
                  borderWidth: 0.5,
                  borderColor: CUSTOMCOLOR.primary,
                  paddingHorizontal: horizontalScale(8),
                  paddingVertical: verticalScale(16),
                  borderRadius: moderateScale(4),
                  gap: verticalScale(16),
                }}>
                {addChild.length > 0 &&
                  addChild?.map((item, ind) => (
                    <ShowChip
                      main={{marginBottom: verticalScale(-4)}}
                      key={ind}
                      text={`${item.name} | Age : ${item.age} | Gender : ${item.gender}`}
                      onPress={() => handleDeleteChild(ind)}
                      size={moderateScale(20)}
                      style={{
                        height: moderateScale(24),
                        width: moderateScale(24),
                      }}
                      ind={ind}
                    />
                  ))}
                {addChild?.length <= parseInt(living) - 1 ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: horizontalScale(32),
                      alignItems: 'center',
                      // alignSelf: 'center',
                      justifyContent: 'center',
                      marginTop: moderateScale(8),
                    }}>
                    <Text style={styles.text1}>Child {ind}</Text>
                    <TextInput
                      placeholderTextColor={CUSTOMCOLOR.disable}
                      placeholder="Age"
                      style={styles.inputtext}
                      value={child.age}
                      onChangeText={val => handleChangeValue('age', val)}
                    />
                    <View style={styles.radiogroup}>
                      <Option
                        label="Male"
                        value="Male"
                        selected={child.gender === 'Male'}
                        onPress={() => handleOptions('Male')}
                      />
                      <Option
                        label="Female"
                        value="Female"
                        selected={child.gender === 'Female'}
                        onPress={() => handleOptions('Female')}
                      />
                    </View>
                    <PlusButton
                      icon={'plus'}
                      size={moderateScale(20)}
                      style={{alignSelf: 'flex-end'}}
                      onPress={handlePlus}
                    />
                  </View>
                ) : null}
              </View>
            )
          : null}
      </ScrollView>
      <View
        style={{
          // flex: 1,
          justifyContent: 'flex-end',
          bottom: verticalScale(32),
        }}>
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
    gap: moderateScale(16),
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
  def: {
    fontSize: moderateScale(14),
    fontWeight: '400',
    color: CUSTOMCOLOR.disable,
  },
  inputtext: {
    borderWidth: 0.5,
    borderColor: CUSTOMCOLOR.primary,
    paddingHorizontal: horizontalScale(32),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(4),
    color: CUSTOMCOLOR.black,
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
