import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { CUSTOMCOLOR, CUSTOMFONTFAMILY } from '../settings/styles';
import VisitOpen from '../components/visitopen';
import HeaderAvatar from '../components/headeravatar';
import PlusButton from '../components/plusbtn';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Language } from '../settings/customlanguage';
import { language } from '../settings/userpreferences';

const Visit = ({ navigation }) => {
  const dataObject = [
    { label: 'Vitals', icon: 'chevron-right', navigate: 'vitals' },
    { label: 'Chief Complaints', icon: 'chevron-right', navigate: 'complaints' },
    { label: 'Notes', icon: 'chevron-right', navigate: 'notes' },
    { label: 'Refer to Doctor', icon: 'chevron-right', navigate: 'refertodoctor' },
  ];
  const basicObject = [
    {
      pulse: 72,
      weight: 72,
      height: 72,
      temp: 98,
      res_rate: 98
    }
  ];
  const pressureObject=[
    {
      systolic:60,
      diastolic:60
    }
  ];
  const pregnancyObject=[
    {
      lmp:2,
      us:3
    }
  ]
  const complaint=['Headache and sever stomach pain'];
  const notes=['Lorem ipsum dolor sit amet consectetur. Sit orci convallis sit diam ut.'];
  const doctor=['Refer to Dr.Balu Rangnathan']

  return (
    <View style={styles.main}>
      <View style={styles.select}>
        <HeaderAvatar />
      </View>

      <View style={styles.appointment}>
        <Text style={styles.h2}>Consultation</Text>
        {dataObject.map((value, index) => (
          <View key={index}>
            <View style={styles.visitOpenItem}>
              <VisitOpen
                label={value.label}
                icon={value.icon}
                navigate={() => navigation.navigate(value.navigate)}
              />
              {value.label === 'Vitals' && (
                <View style={styles.basiccontainer}>
                  <View style={{ flexDirection: "row" ,flexWrap:'wrap'}}>
                    <Icon name='thermometer' color={CUSTOMCOLOR.primary} size={16} />
                    {basicObject.map((item, index) => {
                      return (
                        <View key={index} style={{ flexDirection: "row",gap:8,padding:2 }}>
                          <Text style={styles.pulse}>{Language[language]['pulse_rate']}:{item.pulse}</Text>
                          <Text style={styles.pulse}>{Language[language]['weight']}:{item.weight}kg</Text>
                          <Text style={styles.pulse}>{Language[language]['height']}:{item.height}cm</Text>
                          <Text style={styles.pulse}>{Language[language]['temp']}:{item.temp}F</Text>
                          <Text style={styles.pulse}>{Language[language]['rate']}:{item.res_rate}F</Text>
                        </View>
                      );
                    })}
                     </View>
                    <View style={{ flexDirection: "row",flexWrap:'wrap' }}>
                    <Icon name='water-check' color={CUSTOMCOLOR.primary} size={16} />
                    {pressureObject.map((item, index) => {
                      return (
                        <View key={index} style={{ flexDirection: "row",gap:8 ,padding:2}}>
                          <Text style={styles.pulse}>{Language[language]['systolic_bp']}:{item.systolic}mmHg</Text>
                          <Text style={styles.pulse}>{Language[language]['diastolic_bp']}:{item.diastolic}mmHg</Text>
                        </View>
                      );
                    })}
                  </View>
                  <View style={{ flexDirection: "row",flexWrap:'wrap' }}>
                    <Icon name='calendar-range' color={CUSTOMCOLOR.primary} size={16} />
                    {pregnancyObject.map((item, index) => {
                      return (
                        <View key={index} style={{ flexDirection: "row",gap:8 ,padding:2}}>
                          <Text style={styles.pulse}>{Language[language]['lmp_edd']}:{item.lmp}week</Text>
                          <Text style={styles.pulse}>{Language[language]['us_edd']}:{item.us}week</Text>
                        </View>
                      );
                    })}
                  </View>  
                </View>
              )}
              {value.label==='Chief Complaints' &&(
                <View style={styles.complaintcontainer}>
                 <Icon name='file-document-edit' color={CUSTOMCOLOR.primary} size={16} />
                 <Text style={styles.pulse}>{complaint}</Text>
                </View>

              )}
              {value.label==='Notes' &&(
                <View style={styles.complaintcontainer}>
                 <Icon name='file-document-edit' color={CUSTOMCOLOR.primary} size={16} />
                 <Text style={styles.pulse}>{notes}</Text>
                </View>

              )}
              {value.label==='Refer to Doctor' &&(
                <View style={styles.complaintcontainer}>
                 <Icon name='doctor' color={CUSTOMCOLOR.primary} size={16} />
                 <Text style={styles.pulse}>{doctor}</Text>
                </View>

              )}
            </View>
          </View>
        ))}
      </View>

      <PlusButton
        icon="close"
        style={{ position: 'absolute', left: 0, bottom: 0 }}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 24,
    gap: 16,
  },
  select: {
    gap: 8,
  },
  tab: {
    flexDirection: 'row',
    gap: 24,
  },
  appointment: {
    gap: 8,
    paddingHorizontal: 8,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: CUSTOMFONTFAMILY.opensans,
    lineHeight: 20 * 2,
    color: CUSTOMCOLOR.black,
  },
  visitOpenItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: "wrap",
    borderBottomWidth: 0.4,
    borderBottomColor: CUSTOMCOLOR.primary,
    // height:100
  },
  basiccontainer: {
    width: 635,
    height: 100,
    borderRadius: 4,
    padding: 8,
    gap: 16,
   
  },
  pulse: {
    fontFamily: CUSTOMFONTFAMILY.body,
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 15.04,
    color: CUSTOMCOLOR.black,
  },
  complaintcontainer:{
    width: 635,
    height: 32,
    borderRadius: 4,
    padding: 4,
    gap: 4,
    flexDirection:"row"
  },
  
});

export default Visit;
