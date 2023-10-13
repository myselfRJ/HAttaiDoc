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
            <Text style={styles.text}>{userdata?.clinic_id}</Text>
            <Text style={styles.text}>{userdata?.role}</Text>
          </View>
        </View>
        <View style={{gap: moderateScale(16)}}>
          <View style={{flexDirection: 'row', gap: moderateScale(8)}}>
            <Pressable
              style={styles.gap}
              onPress={() => navigation.navigate('adduser', {id})}>
              <Icon
                name={'pencil'}
                size={moderateScale(24)}
                color={CUSTOMCOLOR.primary}
              />
            </Pressable>
            <Pressable
              style={styles.gap}
              // onPress={() => navigation.navigate('adduser', { index })}
            >
              <Icon
                name={'share-variant'}
                size={moderateScale(24)}
                color={CUSTOMCOLOR.primary}
              />
            </Pressable>
            <Pressable style={styles.gap} onPress={props.cancel}>
              <Icon
                name={'close'}
                size={moderateScale(24)}
                color={CUSTOMCOLOR.error}
              />
            </Pressable>
            {/* <Pressable
            style={styles.gap}
            onPress={() => {
              setShow(!show);
            }}>
            <Icon
              name={show ? 'chevron-up' : 'chevron-down'}
              size={24}
              color={CUSTOMCOLOR.primary}
            />
          </Pressable> */}
          </View>
          <Text
            style={{
              fontSize: CUSTOMFONTSIZE.h4,
              color: CUSTOMCOLOR.black,
              fontWeight: '400',
            }}>
            Visiting Hrs : 9:00-5:00
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Main: {
    paddingHorizontal: horizontalScale(32),
    paddingVertical: verticalScale(24),
    backgroundColor: CUSTOMCOLOR.white,
    borderRadius: moderateScale(8),
    borderWidth: moderateScale(2),
    borderColor: CUSTOMCOLOR.borderColor,
  },
  text: {
    color: CUSTOMCOLOR.black,
    fontSize: CUSTOMFONTSIZE.h3,
    fontWeight: '400',
  },
  gap: {
    padding: moderateScale(4),
    borderWidth: moderateScale(2),
    borderColor: '#C0DFFC',
    borderRadius: moderateScale(100),
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
