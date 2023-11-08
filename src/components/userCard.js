import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utility/scaleDimension';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const UserCard = props => {
  const userdata = props.data;
  const id = userdata?.id;
  const navigation = useNavigation();
  const index = props.index;
  const decodedData = userdata?.user_profile_pic_url;
  return (
    <View style={styles.shadowBox}>
      <View style={styles.Main}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', gap: moderateScale(12)}}>
            <Image
              source={{
                uri: `data:image/jpeg;base64,${decodedData}`,
              }}
              onError={error => console.error('Image load error:', error)}
              style={{
                height: moderateScale(65),
                width: moderateScale(65),
                borderRadius: 65 / 2,
              }}
            />
            <View>
              <Text
                style={{
                  color: CUSTOMCOLOR.black,
                  fontSize: CUSTOMFONTSIZE.h2,
                  fontWeight: '600',
                }}>
                {userdata?.clinic_user_name}
              </Text>
              <Text style={styles.text}>{userdata?.clinic_name}</Text>
              <Text style={styles.text}>{userdata?.role}</Text>
              <Text style={styles.text}>{userdata?.user_phone_number}</Text>
            </View>
          </View>
          <View style={{gap: moderateScale(16)}}>
            <View style={{flexDirection: 'row', gap: moderateScale(8)}}>
              <Pressable
                style={styles.gap}
                onPress={() => navigation.navigate('adduser', {id})}>
                <Icon
                  name={'pencil'}
                  size={moderateScale(16)}
                  color={CUSTOMCOLOR.primary}
                />
              </Pressable>
              <Pressable
                style={styles.gap}
                // onPress={() => navigation.navigate('adduser', { index })}
              >
                <Icon
                  name={'share-variant'}
                  size={moderateScale(16)}
                  color={CUSTOMCOLOR.primary}
                />
              </Pressable>
              <Pressable style={styles.gap} onPress={props.cancel}>
                <Icon
                  name={'close'}
                  size={moderateScale(16)}
                  color={CUSTOMCOLOR.error}
                />
              </Pressable>
            </View>
            {/* <Text
              style={{
                fontSize: CUSTOMFONTSIZE.h4,
                color: CUSTOMCOLOR.black,
                fontWeight: '400',
              }}>
              Visiting Hrs : 9:00-5:00
            </Text> */}
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  shadowBox: {
    backgroundColor: CUSTOMCOLOR.white,
    borderColor: CUSTOMCOLOR.borderColor,
    borderWidth: 0.75,
    borderRadius: 4,
  },
  Main: {
    marginHorizontal: horizontalScale(32),
    marginVertical: verticalScale(24),
    backgroundColor: CUSTOMCOLOR.white,
    borderRadius: moderateScale(8),
    zIndex: 2,

    // borderWidth: moderateScale(2),
    shadowColor: CUSTOMCOLOR.primary,

    shadowOffset: {width: 4, height: 4},
    // borderColor: CUSTOMCOLOR.borderColor,
  },
  text: {
    color: CUSTOMCOLOR.black,
    fontSize: CUSTOMFONTSIZE.h3,
    fontWeight: '400',
  },
  gap: {
    height: moderateScale(40),

    width: moderateScale(40),

    borderWidth: moderateScale(1),
    justifyContent: 'center',
    alignItems: 'center',

    borderColor: '#C0DFFC',
    borderRadius: moderateScale(24),
  },
  slot: {
    padding: moderateScale(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: moderateScale(2),
    borderColor: CUSTOMCOLOR.primary,
    borderRadius: moderateScale(10),
    backgroundColor: '#ECF6FF',
  },
  slotTime: {
    color: CUSTOMCOLOR.black,
    fontSize: CUSTOMFONTSIZE.h4,
    fontWeight: '400',
    alignSelf: 'center',
  },
});
export default UserCard;
