import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Language } from '../settings/customlanguage';
import { CUSTOMCOLOR, CUSTOMFONTFAMILY } from '../settings/styles';
import { language } from '../settings/userpreferences';
import Logo from '../components/logo';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';



const Prescription = ({route}) => {
    const doctor_profile = useSelector(state=> state.doctor_profile)
    const patient = useSelector(state=>state?.patient)
    const vitals = useSelector(state=>state?.prescription?.vitalsData)
    console.log("vitals",vitals)
    const cheif_complaint =useSelector(state=>state?.prescription?.selectedComplaint)
    const symptom =  useSelector(state=>state?.symptoms?.symptom)
    console.log('symptom==',symptom)
    const symptomData= symptom.map((item)=> item.symptom)
    const prescribe_data=useSelector(state=>state?.pres)
    console.log('pres==',prescribe_data)
    const notes = useSelector(state=>state?.prescription?.note)
    const refer_doctor = useSelector(state=>state?.prescription?.selectedDoctor)
    const followup = useSelector(state=>state?.dateTime?.date)
    const clinic_name = useSelector(state=>state?.clinicid?.clinic_name)
    console.log('name===',clinic_name)
    const clinic_Address =useSelector(state=>state?.clinicid?.clinic_Address)
    console.log('address=',clinic_Address)
    console.log('patient phone--',patient_phone_number)
    return (
        <ScrollView>
            <View style={styles.main}>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 24,
                        paddingHorizontal: 8,
                        borderBottomColor: CUSTOMCOLOR.primary,
                        borderBottomWidth: 1,
                        padding: 12
                    }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Logo />
                        <View style={{ paddingHorizontal: 16 }}>
                            <Text style={styles.title}>
                                {Language[language]['dr']}{doctor_profile?.doctor_profile?.doctor_name}
                            </Text>
                            <Text style={styles.speciality}>{doctor_profile?.doctor_profile?.specialization}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.speciality}>{clinic_name}</Text>
                        <Text style={styles.speciality}>{clinic_Address}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Image source={require('../assets/images/RX.png')} style={styles.img} />
                    <Text style={styles.date}></Text>
                </View>
                <View>
                    <Text style={styles.date}></Text>
                </View>
                <View>
                    <Text style={styles.head}>{Language[language]['vitals']}:</Text>
                    <View style={styles.commonstyle}>
                        <Text style={styles.values}>{Language[language]['pulse_rate']}: {vitals.pulse_rate}</Text>
                        <Text style={styles.values}>{Language[language]['weight']}: {vitals.weight}</Text>
                        <Text style={styles.values}>{Language[language]['height']}: {vitals.height}</Text>
                        <Text style={styles.values}>{Language[language]['temp']}:{vitals.body_temperature}</Text>
                        <Text style={styles.values}>{Language[language]['rate']}: {vitals.rate}</Text>
                        <Text style={styles.values}>{Language[language]['bmi']}: {vitals.bmi}</Text>
                    </View>
                </View>
                <View >
                    <Text style={styles.head}>{Language[language]['cheif_complaints']} : <Text style={styles.values}>{cheif_complaint}</Text></Text>
                </View>
                <View>
                    <Text style={styles.head}>{Language[language]['diagnosis']} : <Text style={styles.values}>headache</Text></Text>
                </View>
                <View>
                    <Text style={styles.head}>{Language[language]['symptoms']} : <Text style={styles.values}>{symptomData}</Text></Text>
                </View>
                <View>
                    <Text style={styles.head}>{Language[language]['prescribe']} :</Text>
                </View>
                <View style={styles.presc}>
                    <Text style={styles.prescMenu}>S.no</Text>
                    <Text style={styles.prescMenu}>{Language[language]['mode']}</Text>
                    <Text style={styles.prescMenu}>{Language[language]['medicine']}</Text>
                    <Text style={styles.prescMenu}>{Language[language]['dose']}</Text>
                    <Text style={styles.prescMenu}>{Language[language]['timing']}</Text>
                    <Text style={styles.prescMenu}>{Language[language]['frequency']}</Text>
                    <Text style={styles.prescMenu}>{Language[language]['duration']}</Text>
                    <Text style={styles.prescMenu}>{Language[language]['quantity']}</Text>
                </View>
               {prescribe_data?.prescribeItems?.map((item,index)=><View style={styles.precvalues}>
                <Text style={styles.prescMenu}>{parseInt(index)+1}</Text>
                    <Text style={styles.prescMenu}>{item.mode}</Text>
                    <Text style={styles.prescMenu}>{item.medicine}</Text>
                    <Text style={styles.prescMenu}>{item.dose_quantity}</Text>
                    <Text style={styles.prescMenu}>{item.timing}</Text>
                    <Text style={styles.prescMenu}>{item.frequency}</Text>
                    <Text style={styles.prescMenu}>{item.duration}</Text>
                    <Text style={styles.prescMenu}>{item.total_quantity}</Text>
                </View>)}
                <View >
                    <Text style={styles.head}>{Language[language]['notes']} : <Text style={styles.values}>{notes}</Text></Text>
                </View>
                <View >
                    <Text style={styles.head}>{Language[language]['refer_doctor']} :</Text>
                    <View style={styles.refer}>
                        <Text style={styles.values}>{Language[language]['name']} : <Text style={styles.values}>{refer_doctor.doctor_name}</Text></Text>
                        <Text style={styles.values}>{Language[language]['specialist']} : <Text style={styles.values}>{refer_doctor.speciality}</Text></Text>
                        <Text style={styles.values}>{Language[language]['ph']} : <Text style={styles.values}>{refer_doctor.phone}</Text></Text>
                    </View>

                </View>
                <View >
                    <Text style={styles.head}>{Language[language]['test']} : <Text style={styles.values}></Text></Text>
                </View>
                <View >
                    <Text style={styles.head}>{Language[language]['follow_up']} : <Text style={styles.values}>{followup}</Text></Text>
                </View>
                <View style={styles.sign}>
                    <Text style={styles.values}>Digital sign</Text>
                    <Text style={styles.values}>Dr.name</Text>
                </View>
                <View >
                    <Text style={styles.head}>validity Upto : <Text style={styles.values}></Text></Text>
                </View>
                <View style={styles.description}>
                    <Text style={styles.values}>Not valid for Medical Legal Purpose</Text>
                    <Text style={styles.values}>In case of any drug percations or side effects STOP all medicines immediately and </Text>
                    <Text style={styles.values}>consult your doctor or nearest hospital</Text>
                </View>
                <View>
                    <Image source={require('../assets/images/footer.png')} style={styles.footerimg}/>
                </View>


            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 24
    },
    title: {
        fontFamily: CUSTOMFONTFAMILY.opensans,
        fontWeight: 600,
        fontSize: 20,
        color: CUSTOMCOLOR.primary
    },
    speciality: {
        fontFamily: CUSTOMFONTFAMILY.opensans,
        fontWeight: 400,
        fontSize: 20,
        color: CUSTOMCOLOR.primary
    },
    img: {
        width: 35,
        height: 53
    },
    date: {
        fontFamily: CUSTOMFONTFAMILY.opensans,
        fontWeight: 400,
        fontSize: 18,
        color: CUSTOMCOLOR.black
    },
    commonstyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    head: {
        fontFamily: CUSTOMFONTFAMILY.opensans,
        fontWeight: 400,
        fontSize: 18,
        color: CUSTOMCOLOR.primary,
        paddingVertical: 12,
        paddingHorizontal: 4
    },
    values: {
        fontFamily: CUSTOMFONTFAMILY.opensans,
        fontWeight: 400,
        fontSize: 16,
        color: CUSTOMCOLOR.black,
        paddingHorizontal: 8,
    },
    presc: {
        top: 8,
        paddingHorizontal: 8,
        paddingVertical: 8,
        backgroundColor: "#DFF0FF",
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    precvalues:{
        paddingHorizontal: 8,
        paddingVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between', 
    },
    prescMenu: {
        fontFamily: CUSTOMFONTFAMILY.opensans,
        fontWeight: 400,
        fontSize: 16,
        color: CUSTOMCOLOR.black,
    },
    refer: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    sign:{
        alignSelf:'flex-end',
        paddingHorizontal:16,
        paddingVertical:64
    },
    description:{
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:32
    },
    footerimg:{
        width:136,
        height:70,
        alignSelf:'flex-start'
    }

})
export default Prescription;