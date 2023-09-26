import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CUSTOMCOLOR} from '../settings/styles';
import {moderateScale} from '../utility/scaleDimension';

const UploadCard = props => {
  const [view, setView] = useState(false);

  return (
    <View style={styles.container}>
      {view && (
        <View style={styles.iconContainer}>
          <Pressable onPress={props.onGallery}>
            <View style={[styles.imgcontainer]}>
              <Icon
                name="image"
                size={moderateScale(28)}
                color={CUSTOMCOLOR.white}
              />
            </View>
          </Pressable>
          <Pressable onPress={props.onCamera}>
            <View style={styles.imgcontainer}>
              <Icon
                name="camera"
                size={moderateScale(28)}
                color={CUSTOMCOLOR.white}
              />
            </View>
          </Pressable>
        </View>
      )}
      <Pressable
        onPress={() => setView(!view)}
        style={[styles.button, styles.imgcontainer]}>
        {!view ? (
          <Icon
            name="file-document"
            size={moderateScale(28)}
            color={CUSTOMCOLOR.white}
          />
        ) : (
          <Icon
            name="close"
            size={moderateScale(28)}
            color={CUSTOMCOLOR.white}
          />
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'column',
  },
  imgcontainer: {
    backgroundColor: CUSTOMCOLOR.primary,
    width: moderateScale(64),
    height: moderateScale(64),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(32),
    gap: moderateScale(4),
  },
});

export default UploadCard;
