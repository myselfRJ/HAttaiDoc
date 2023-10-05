import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Option from '../components/option';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import {HButton, InputText, PlusButton} from '../components';
import {useSelector, useDispatch} from 'react-redux';
import {
  addSymptom,
  updateSymptom,
} from '../redux/features/prescription/symptomslice';
import {
  CUSTOMCOLOR,
  CUSTOMFONTSIZE,
  CUSTOMFONTFAMILY,
} from '../settings/styles';
import PrescriptionHead from '../components/prescriptionHead';
import ShowChip from '../components/showChip';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utility/scaleDimension';

const Symptoms1 = () => {
  return (
    <View>
      <InputText />
    </View>
  );
};

export default Symptoms1;
