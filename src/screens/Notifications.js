import {View, Text, StyleSheet} from 'react-native';
import NotificationCard from '../components/notificationCard';
import {horizontalScale, verticalScale} from '../utility/scaleDimension';
import {CUSTOMCOLOR} from '../settings/styles';
const Notifications = ({route}) => {
  const {
    notification,
    age,
    name,
    gende,
    complaint,
    consultation_fees,
    patient_pic_url,
  } = route.params;
  return (
    <View style={styles.main}>
      {notification?.length > 0 &&
        notification?.map(
          (item, index) =>
            !item?.doctor_phone_number?.includes('sent') &&
            !item?.notification_data?.includes('pdf') && (
              <NotificationCard
                key={index}
                age={age}
                data={item}
                name={name}
                gende={gende}
                complaint={complaint}
                consultation_fees={consultation_fees}
                patient_pic_url={patient_pic_url}
              />
            ),
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(16),
    backgroundColor: CUSTOMCOLOR.white,
  },
});

export default Notifications;
