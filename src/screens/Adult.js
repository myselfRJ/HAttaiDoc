import React, {useState, useCallback} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../utility/scaleDimension';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {HButton, SelectorBtn} from '../components';
import DatePicker from 'react-native-date-picker';
import GalleryModel from '../components/GalleryModal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DocumentPicker, {types} from 'react-native-document-picker';
import TextStyle from '../components/textstyle';
import {commonstyles} from '../styles/commonstyle';

const Adult = () => {
  const status = ['Up to date', 'Pending Vaccination'];
  const [selectedStatus, setSelectedStatus] = useState('Up to date');
  const [search, setsearch] = useState('');
  const datee = new Date();
  const [value, setvalue] = useState('');
  const [open, setOpen] = useState(false);
  const [show, setshow] = useState(false);
  const [visible, setvisible] = useState(false);
  const [document, setdocument] = useState([]);
  const [document1, setdocument1] = useState([]);

  const remove = index => {
    const filteredArray = [...document];
    filteredArray.splice(0, 1);
    setdocument(filteredArray);
    setshow(!show);
  };
  const pickDocument = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [types.pdf],
      });
      if (selectedStatus === 'Up to date') {
        setdocument([
          ...document,
          {
            uri: response[0]?.uri,
            type: response[0]?.type,
            name: response[0]?.name,
          },
        ]);
      } else if (selectedStatus === 'Pending Vaccination') {
        setdocument1([
          ...document1,
          {
            uri: response[0]?.uri,
            type: response[0]?.type,
            name: response[0]?.name,
          },
        ]);
      }
      // console.log(response);
    } catch (err) {
      console.warn(err);
    }
    setshow(!show);
    setvisible(false);
  }, []);

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.5,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        if (selectedStatus === 'Up to date') {
          setdocument([
            ...document,
            {
              uri: response.assets?.[0]?.uri,
              type: response.assets?.[0]?.type,
              name: response.assets?.[0]?.fileName,
            },
          ]);
        } else if (selectedStatus === 'Pending Vaccination') {
          setdocument1([
            ...document1,
            {
              uri: response.assets?.[0]?.uri,
              type: response.assets?.[0]?.type,
              name: response.assets?.[0]?.fileName,
            },
          ]);
        }
      }
    });
    setshow(!show);
    setvisible(false);
  };

  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.5,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        // console.log(response)
        if (selectedStatus === 'Up to date') {
          setdocument([
            ...document,
            {
              name: response.assets?.[0]?.fileName,
              uri: response.assets?.[0]?.uri,
              type: response.assets?.[0]?.type,
            },
          ]);
        } else if (selectedStatus === 'Pending Vaccination') {
          setdocument1([
            ...document1,
            {
              name: response.assets?.[0]?.fileName,
              uri: response.assets?.[0]?.uri,
              type: response.assets?.[0]?.type,
            },
          ]);
        }
      }
    });
    setshow(!show);
    setvisible(false);
  };
  console.log('document===========', document1);
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text
          style={{
            fontSize: CUSTOMFONTSIZE.h1,
            color: CUSTOMCOLOR.black,
            fontWeight: '500',
          }}>
          Adult
        </Text>
        <View>
          <View
            style={{paddingVertical: verticalScale(15), gap: moderateScale(7)}}>
            <Text style={styles.label}>Vaccination Status</Text>
            <View style={{flexDirection: 'row', gap: moderateScale(10)}}>
              {status.map(item => (
                <Pressable
                  style={{
                    backgroundColor:
                      item === selectedStatus
                        ? CUSTOMCOLOR.primary
                        : CUSTOMCOLOR.white,
                    // padding: moderateScale(7),
                    borderRadius: moderateScale(5),
                    paddingHorizontal: horizontalScale(16),
                    paddingVertical: verticalScale(12),
                    borderWidth: moderateScale(1),
                    borderColor: CUSTOMCOLOR.primary,
                  }}
                  onPress={() => setSelectedStatus(item)}>
                  <Text
                    style={{
                      color:
                        item === selectedStatus
                          ? CUSTOMCOLOR.white
                          : CUSTOMCOLOR.primary,
                      fontWeight: '400',
                      fontSize: moderateScale(15),
                    }}>
                    {item}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
          {selectedStatus === 'Pending Vaccination' && (
            <View style={{gap: moderateScale(15)}}>
              <View style={{gap: moderateScale(7)}}>
                <Text style={styles.label}>Vaccination Name</Text>
                <View
                  style={{
                    borderWidth: moderateScale(1),
                    borderColor: CUSTOMCOLOR.primary,
                    borderRadius: moderateScale(4),
                    paddingHorizontal: horizontalScale(10),
                    flexDirection: 'row',
                    paddingVertical: verticalScale(8),
                  }}>
                  <View style={{flexBasis: '70%'}}>
                    <TextInput
                      placeholder="Vaccination Name"
                      placeholderTextColor={CUSTOMCOLOR.background}
                      value={search}
                      onChangeText={setsearch}
                      style={{
                        padding: 0,
                        fontSize: moderateScale(14),
                        color: CUSTOMCOLOR.black,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flexBasis: '30%',
                      borderWidth: moderateScale(1),
                      borderColor: CUSTOMCOLOR.primary,
                      borderRadius: moderateScale(2),
                      paddingHorizontal: horizontalScale(5),
                    }}>
                    <SelectorBtn
                      select={{
                        paddingLeft: moderateScale(0),
                        paddingHorizontal: 0,
                        paddingVertical: 0,
                        borderWidth: 0,
                      }}
                      placeholder={'Date'}
                      input={value || 'Date'}
                      setValue={setvalue}
                      name={'calendar'}
                      int={{
                        paddingHorizontal: moderateScale(2),
                        fontSize: moderateScale(14),
                        color: value
                          ? CUSTOMCOLOR.black
                          : CUSTOMCOLOR.background,
                      }}
                      onPress={() => setOpen(true)}
                      style={{padding: moderateScale(0), margin: 0}}
                    />
                    <DatePicker
                      modal
                      open={open}
                      date={datee}
                      mode="date"
                      onConfirm={date => {
                        setOpen(false);
                        setvalue(date.toISOString().split('T')[0]);
                      }}
                      onCancel={() => {
                        setOpen(false);
                      }}
                    />
                  </View>
                </View>
              </View>

              <View style={{gap: moderateScale(7)}}>
                <Text style={styles.label}>Upload Record</Text>
                <Pressable
                  style={{
                    borderWidth: moderateScale(1),
                    borderColor: CUSTOMCOLOR.primary,
                    width: '40%',
                    alignItems: 'center',
                    borderRadius: moderateScale(4),
                    paddingVertical: verticalScale(12),
                    paddingHorizontal: horizontalScale(8),
                  }}
                  onPress={() => {
                    setvisible(!visible);
                  }}>
                  <Text
                    style={{
                      color: CUSTOMCOLOR.primary,
                      fontWeight: '500',
                      fontSize: CUSTOMFONTSIZE.h2,
                    }}>
                    Upload Document
                  </Text>
                </Pressable>
              </View>
              {document1.length > 0 && (
                <TextStyle
                  txt={[document1[0].name]}
                  container={{width: '100%'}}
                  remove={remove}
                  txtstyle={{flexBasis: '80%'}}
                  icon={
                    document1[0].name.slice(-3) === 'pdf'
                      ? 'file-pdf-box'
                      : 'image'
                  }
                />
              )}
            </View>
          )}
          {selectedStatus === 'Up to date' && (
            <View style={{gap: moderateScale(10)}}>
              <View style={{gap: moderateScale(7)}}>
                <Text style={styles.label}>Upload Record</Text>
                <Pressable
                  style={{
                    borderWidth: moderateScale(1),
                    borderColor: CUSTOMCOLOR.primary,
                    width: '40%',
                    alignItems: 'center',
                    borderRadius: moderateScale(4),
                    paddingVertical: verticalScale(12),
                    paddingHorizontal: horizontalScale(8),
                  }}
                  onPress={() => {
                    setvisible(!visible);
                  }}>
                  <Text
                    style={{
                      color: CUSTOMCOLOR.primary,
                      fontWeight: '500',
                      fontSize: CUSTOMFONTSIZE.h2,
                    }}>
                    Upload Document
                  </Text>
                </Pressable>
              </View>
              {/* {document.length > 0 && (
              <TextStyle
                txt={[document[0].name]}
                container={{width: '100%'}}
                remove={remove}
                txtstyle={{flexBasis: '80%'}}
                icon={
                  document[0].name.slice(-3) === 'pdf'
                    ? 'file-pdf-box'
                    : 'image'
                }
              />
            )} */}
            </View>
          )}
        </View>
        {visible && (
          <GalleryModel
            Close={setvisible}
            visible={visible}
            OnGallery={openImagePicker}
            OnCamera={handleCameraLaunch}
            OnPick={pickDocument}
            pdf={true}
          />
        )}
      </ScrollView>
      <View
        style={{flex: 1, justifyContent: 'flex-end', bottom: moderateScale(8)}}>
        <HButton label={'Save'} btnstyles={commonstyles.activebtn} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CUSTOMCOLOR.white,
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(16),
  },
  label: {
    color: CUSTOMCOLOR.black,
    fontSize: CUSTOMFONTSIZE.h2,
  },
});

export default Adult;
