import {View, Text, StyleSheet} from 'react-native';
import NotificationCard from '../components/notificationCard';
import {horizontalScale, verticalScale} from '../utility/scaleDimension';
import {CUSTOMCOLOR} from '../settings/styles';
const Notifications = ({route}) => {
  const {notification} = route.params;

  return (
    <View style={styles.main}>
      {notification?.length > 0 &&
        notification?.map((item, index) => (
          !item?.doctor_phone_number?.includes('sent') && (
            <NotificationCard key={index} data={item} />
          )
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex:1,
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(16),
    backgroundColor: CUSTOMCOLOR.white,
  },
});

export default Notifications;