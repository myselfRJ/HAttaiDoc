import {
    View,
    StyleSheet,
    TextInput,
    Text,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    CUSTOMCOLOR,
    CUSTOMFONTSIZE,
    CUSTOMFONTFAMILY,
} from '../settings/styles';
import { language } from '../settings/userpreferences';
import { Language } from '../settings/customlanguage';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addVitals } from '../redux/features/prescription/prescriptionSlice';
import { useNavigation, useRoute } from '@react-navigation/native';
import { HButton, InputText, SelectorBtn } from '../components';
import { CONSTANTS } from '../utility/constant';
import DatePicker from 'react-native-date-picker';
import PrescriptionHead from '../components/prescriptionHead';
import {
    moderateScale,
    verticalScale,
    horizontalScale,
} from '../utility/scaleDimension';
import { ScrollView } from 'react-native-gesture-handler';
import { mode } from '../redux/features/prescription/prescribeslice';
import VitalField from '../components/vitalFields';
import { validateInput } from '../utils/FormUtils/Validators';
import Seperator from '../components/seperator';
import { commonstyles } from '../styles/commonstyle';

const Vitals = () => {
    return (
        <View style={styles.main}>
            <PrescriptionHead heading='Vitals' />
            <View style={styles.container}>
                <Text style={commonstyles.subhead}>Basic</Text>
                <Seperator />
                <View style={styles.fields}>
                    <VitalField
                        name='Height'
                        placeholder='Cm'
                    />
                    <VitalField
                        name='Weight'
                        placeholder='Kg'
                    />
                    <VitalField
                        name='BMI'
                        placeholder='00'
                    />
                    <VitalField
                        name='Pulse'
                        placeholder='bpm'
                    />
                    <VitalField
                        name='Temp'
                        placeholder='°C'
                    />
                    <VitalField
                        name='SPO2'
                        placeholder='%'
                    />
                    <VitalField
                        name='Res_Rate'
                        placeholder='brpm'
                    />

                </View>
                <Text style={commonstyles.subhead}>Blood Pressure</Text>
                <Seperator />
                <View style={styles.fields}>
                    <VitalField
                        name='Systolic BP'
                        placeholder='mmhg'
                    />
                    <VitalField
                        name='Diastolic BP'
                        placeholder='mmhg'
                    />
                </View>
                <Text style={commonstyles.subhead}>Pregnancy</Text>
                <Seperator />
                <View style={styles.fields}>
                    <View style={styles.preg}>
                        <Text style={styles.name}>LMP</Text>
                        <SelectorBtn
                            size={20}
                            inputstyle={{ fontSize: 10 }}
                            // onPress={() => {
                            //   handleDate();
                            // }}
                            name={'calendar'}
                            // input={lmpdates}
                        />
                    </View>
                </View>
            </View>

        </View>
    )
};
const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingHorizontal: horizontalScale(24),
        paddingVertical: verticalScale(12)
    },
    container: {
        gap: moderateScale(4),
        borderWidth: 1,
    },
    fields: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    name: {
        width: moderateScale(65),
        fontWeight: '400',
        fontSize: CUSTOMFONTSIZE.h3,
        color: CUSTOMCOLOR.black,
    }, 
    preg: {
        flexDirection: 'row',
        paddingHorizontal: horizontalScale(8)
    }
})
export default Vitals;