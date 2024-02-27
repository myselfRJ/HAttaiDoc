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
  const appointmentID = useSelector(state => state?.address?.appointment_id);
  const obstetric = useSelector(state => state?.pasthistory?.obstericHistory);
  const [show, setShow] = useState(false);
  const [showTerm, setshowTerm] = useState(false);
  const [showPre, setshowpre] = useState(false);
  const [showAbor, setShowabor] = useState(false);
  const [living, setLiving] = useState('');
  const [para, setpara] = useState('');
  const [paraShow, setParaShow] = useState(false);
  const [addpara, setAddPara] = useState([]);
  const [abor, setAbor] = useState('');
  const [aborShow, setAborShow] = useState(false);
  const [addAbor, setAddAbor] = useState([]);
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

  const [child, setChild] = useState({
    name: 'Child',
    age: '',
    gender: '',
  });
  const [aborData, setAborData] = useState({
    name: 'Abortion',
    year: '',
    reason: '',
    place: '',
    period: '',
    treatment: '',
  });
  const [paraData, setParaData] = useState({
    name: 'Para',
    year: '',
    anc: '',
    delivery: '',
    gestation: '',
    pn: '',
  });
  const [ind, setInd] = useState(parseInt(1));
  const [aborInd, setAborInd] = useState(parseInt(1));
  const [paraInd, setparaInd] = useState(parseInt(1));
  const [addChild, setAddchild] = useState([]);
  const [childShow, setChildShow] = useState(false);
  const handleDeleteChild = index => {
    const newChild = addChild?.filter((_, ind) => ind !== index);
    setAddchild(newChild);
    setInd(index + parseInt(1));
  };
  const handleDeleteAbor = index => {
    const newChild = addAbor?.filter((_, ind) => ind !== index);
    setAddAbor(newChild);
    setAborInd(index + parseInt(1));
  };
  const handleDeletePara = index => {
    const newpara = addpara?.filter((_, ind) => ind !== index);
    setAddPara(newpara);
    setparaInd(index + parseInt(1));
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
  const handleAbortionPlus = () => {
    const parsedAbor = parseInt(abor, 10);
    setAddAbor(prev => {
      if (prev?.length <= parsedAbor - 1) {
        return [
          ...prev,
          {
            name: `Abortion ${aborInd}`,
            year: aborData?.year,
            reason: aborData?.reason,
            place: aborData?.place,
            period: aborData?.period,
            treatment: aborData?.treatment,
          },
        ];
      }
    });
    setAborData({year: '', reason: '', place: '', period: '', treatment: ''});
    setAborInd(prevInd => prevInd + 1);
  };
  const handleParaPlus = () => {
    const parsedPara = parseInt(para, 10);
    setAddPara(prev => {
      if (prev?.length <= parsedPara - 1) {
        return [
          ...prev,
          {
            name: `Para ${paraInd}`,
            year: paraData?.year,
            anc: paraData?.anc,
            delivery: paraData?.delivery,
            gestation: paraData?.gestation,
            pn: paraData?.pn,
          },
        ];
      }
    });
    setParaData({year: '', anc: '', delivery: '', gestation: '', pn: ''});
    setparaInd(prev => prev + 1);
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
  const handleAborData = (field, value) => {
    setAborData(prev => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleparaData = (field, value) => {
    setParaData(prev => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleparaOptions = value => {
    handleparaData('gestation', value);
  };
  useEffect(() => {
    const obs =
      obstetric?.length > 0
        ? obstetric
            ?.filter(item => item?.appointment_id === appointmentID)
            ?.slice(-1)?.[0]?.mens
        : {};
    if (obs) {
      setGravidity({
        value: obs?.gravidity?.value,
        desc: obs?.gravidity?.desc,
      });
      if (obs?.gravidity?.desc) {
        setShow(true);
      }
      if (obs?.term?.length > 0) {
        setpara(obs?.term[obs?.term?.length - 1]['para']);
        setParaShow(true);
        obs?.term?.forEach(element => {
          if (
            element?.year &&
            element?.anc &&
            element?.delivery &&
            element?.gestation &&
            element?.pn
          ) {
            setAddPara(prevChildren => [
              ...prevChildren,
              {
                name: element?.name,
                year: element?.year,
                anc: element?.anc,
                delivery: element?.delivery,
                gestation: element?.gestation,
                pn: element?.pn,
              },
            ]);
          }
        });
      }
      // setPremature({
      //   value: obs?.premature?.value,
      //   desc: obs?.premature?.desc,
      // });
      // if (obs?.premature?.desc) {
      //   setshowpre(true);
      // }
      // setAbortions({
      //   value: obs?.abortions?.value,
      //   desc: obs?.abortions?.desc,
      // });
      // if (obs?.abortions?.desc) {
      //   setShowabor(true);
      // }
      if (obs?.abortions?.length > 0) {
        setAbor(obs?.abortions[obs?.abortions?.length - 1]['abotions']);
        setAborShow(true);
        obs?.abortions?.forEach(element => {
          if (
            element?.year &&
            element?.reason &&
            element?.place &&
            element?.period &&
            element?.treatment
          ) {
            setAddAbor(prevChildren => [
              ...prevChildren,
              {
                name: element?.name,
                year: element?.year,
                reason: element?.reason,
                place: element?.place,
                period: element?.period,
                treatment: element?.treatment,
              },
            ]);
          }
        });
      }
      if (obs?.living?.length > 0) {
        setLiving(obs?.living[obs?.living?.length - 1]['living']);
        setChildShow(true);
        obs?.living?.forEach(element => {
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
  // console.log('addchild===', addpara);
  const handledata = () => {
    dispatch(
      addobstericHistory([
        ...obstetric,
        {
          mens: {
            gravidity: gravidity,
            term: [...addpara, {para: para}],
            abortions: [...addAbor, {abotions: abor}],
            living: [...addChild, {living: living}],
          },
          appointment_id: appointmentID,
        },
      ]),
    );
    nav.goBack();
  };
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
        <View style={styles.field}>
          <View
            style={{
              flexDirection: 'row',
              gap: horizontalScale(4),
              alignItems: 'center',
            }}>
            <Text style={styles.text}>{'Para/Term'}</Text>
            <Text style={styles.def}>
              {'(Number of pregnancies carried 37+ weeks)'}
            </Text>
          </View>
          <TextInput
            placeholderTextColor={CUSTOMCOLOR.disable}
            placeholder="Enter"
            style={styles.inputtext}
            value={para}
            onChangeText={val => {
              setpara(val), setParaShow(true);
            }}
          />
        </View>
        {paraShow
          ? addpara?.length <= parseInt(para) && (
              <View
                style={{
                  borderWidth: 0.5,
                  borderColor: CUSTOMCOLOR.primary,
                  paddingHorizontal: horizontalScale(8),
                  paddingVertical: verticalScale(16),
                  borderRadius: moderateScale(4),
                  gap: verticalScale(16),
                }}>
                {addpara.length > 0 &&
                  addpara?.map((item, ind) => (
                    <ShowChip
                      align={{
                        width: '95%',
                      }}
                      main={{marginBottom: verticalScale(-4)}}
                      key={ind}
                      text={`${item.name} | Year : ${item.year} | ANC : ${item.anc} | Delivery : ${item.delivery} | Gestation : ${item.gestation} | PN : ${item.pn}`}
                      onPress={() => handleDeletePara(ind)}
                      size={moderateScale(20)}
                      style={{
                        height: moderateScale(24),
                        width: moderateScale(24),
                      }}
                      ind={ind}
                    />
                  ))}
                {addpara?.length <= parseInt(para) - 1 ? (
                  <>
                    <Text style={styles.text1}>Pregnancy {paraInd}</Text>
                    <View
                      style={{
                        // flexDirection: 'row',
                        paddingHorizontal: horizontalScale(16),
                        gap: verticalScale(8),
                        alignItems: 'center',
                        // flexWrap: 'wrap',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{flexDirection: 'row', gap: moderateScale(24)}}>
                        <InputText
                          label="Year"
                          placeholder="Eg: 2003"
                          inputContainer={styles.parafields}
                          value={paraData?.year}
                          setValue={val => handleparaData('year', val)}
                        />
                        <InputText
                          label="ANC"
                          placeholder="ANC"
                          inputContainer={styles.parafields}
                          value={paraData?.anc}
                          setValue={val => handleparaData('anc', val)}
                        />
                      </View>

                      <View style={styles.radiogroupcontainer}>
                        <Text
                          style={{
                            fontSize: CUSTOMFONTSIZE.h3,
                            color: CUSTOMCOLOR.black,
                          }}>
                          Select
                        </Text>
                        <View style={styles.radiogroup}>
                          <Option
                            label="Term"
                            value="Term"
                            selected={paraData?.gestation === 'Term'}
                            onPress={() => handleparaOptions('Term')}
                          />
                          <Option
                            label="Preterm"
                            value="Preterm"
                            selected={paraData?.gestation === 'Preterm'}
                            onPress={() => handleparaOptions('Preterm')}
                          />
                        </View>
                      </View>
                      <View
                        style={{flexDirection: 'row', gap: moderateScale(24)}}>
                        <InputText
                          label="Delivery"
                          placeholder="Delivery"
                          inputContainer={styles.parafields}
                          value={paraData?.delivery}
                          setValue={val => handleparaData('delivery', val)}
                        />

                        <InputText
                          label="PN"
                          placeholder="PN"
                          inputContainer={styles.parafields}
                          value={paraData?.pn}
                          setValue={val => handleparaData('pn', val)}
                        />
                      </View>
                      <PlusButton
                        icon={'plus'}
                        size={moderateScale(20)}
                        style={{alignSelf: 'flex-end'}}
                        onPress={handleParaPlus}
                      />
                    </View>
                  </>
                ) : null}
              </View>
            )
          : null}
        {/* <ObstetricField
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
        /> */}
        {/* <ObstetricField
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
        /> */}
        {/* <ObstetricField
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
        /> */}
        <View style={styles.field}>
          <View
            style={{
              flexDirection: 'row',
              gap: horizontalScale(4),
              alignItems: 'center',
            }}>
            <Text style={styles.text}>{'Abortions'}</Text>
            <Text style={styles.def}>
              {'(Number of losses before 20 weeks)'}
            </Text>
          </View>
          <TextInput
            placeholderTextColor={CUSTOMCOLOR.disable}
            placeholder="Enter"
            style={styles.inputtext}
            value={abor}
            onChangeText={val => {
              setAbor(val), setAborShow(true);
            }}
          />
        </View>
        {aborShow
          ? addAbor?.length <= parseInt(abor) && (
              <View
                style={{
                  borderWidth: 0.5,
                  borderColor: CUSTOMCOLOR.primary,
                  paddingHorizontal: horizontalScale(8),
                  paddingVertical: verticalScale(16),
                  borderRadius: moderateScale(4),
                  gap: verticalScale(16),
                }}>
                {addAbor.length > 0 &&
                  addAbor?.map((item, ind) => (
                    <ShowChip
                      align={{
                        width: '95%',
                      }}
                      main={{marginBottom: verticalScale(-4)}}
                      key={ind}
                      text={`${item.name} | Year : ${item.year} | Reason : ${item.reason} | Place : ${item.place} | Period : ${item.period} | Treatment : ${item.treatment}`}
                      onPress={() => handleDeleteAbor(ind)}
                      size={moderateScale(20)}
                      style={{
                        height: moderateScale(24),
                        width: moderateScale(24),
                      }}
                      ind={ind}
                    />
                  ))}
                {addAbor?.length <= parseInt(abor) - 1 ? (
                  <>
                    <Text style={styles.text1}>Abortion {aborInd}</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingHorizontal: horizontalScale(16),
                        gap: verticalScale(12),
                        // alignItems: 'center',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        // borderWidth: 1,
                      }}>
                      {/* <View
                        style={{flexDirection: 'row', gap: moderateScale(24)}}> */}
                      <InputText
                        label="Year"
                        placeholder="Eg: 2004"
                        inputContainer={styles.parafields}
                        value={aborData?.year}
                        setValue={val => handleAborData('year', val)}
                      />
                      <InputText
                        label="Reason"
                        placeholder="Reason"
                        inputContainer={styles.parafields}
                        value={aborData?.reason}
                        setValue={val => handleAborData('reason', val)}
                      />
                      {/* </View> */}
                      {/* <View
                        style={{flexDirection: 'row', gap: moderateScale(24)}}> */}
                      <InputText
                        label="Place"
                        placeholder="Place"
                        inputContainer={styles.parafields}
                        value={aborData?.place}
                        setValue={val => handleAborData('place', val)}
                      />
                      <InputText
                        label="Period"
                        placeholder="Period"
                        inputContainer={styles.parafields}
                        value={aborData?.period}
                        setValue={val => handleAborData('period', val)}
                      />
                      {/* </View> */}
                      {/* <View
                        style={{
                          flexDirection: 'row',
                          alignSelf: 'flex-start',
                          marginLeft: horizontalScale(52),
                          borderWidth: 1,
                        }}> */}
                      <InputText
                        label="Treatment"
                        placeholder="Treatment"
                        inputContainer={styles.parafields}
                        value={aborData?.treatment}
                        setValue={val => handleAborData('treatment', val)}
                      />
                      {/* </View> */}
                      <PlusButton
                        icon={'plus'}
                        size={moderateScale(24)}
                        style={{alignSelf: 'flex-end'}}
                        onPress={handleAbortionPlus}
                      />
                    </View>
                  </>
                ) : null}
              </View>
            )
          : null}
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
                      align={{
                        width: '95%',
                      }}
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
    // paddingHorizontal: moderateScale(48),
    // paddingVertical: moderateScale(6),
    flexDirection: 'row',
    gap: moderateScale(24),
    // borderWidth:1,
    // alignSelf: 'flex-start',
  },
  radiogroupcontainer: {
    // paddingHorizontal: moderateScale(52),
    // paddingVertical: moderateScale(6),
    // flexDirection: 'row',
    gap: moderateScale(4),
    // borderWidth:1,
    alignSelf: 'flex-start',
  },
  parafields: {
    width: '48%',
  },
});
export default ObstetricHistory;
