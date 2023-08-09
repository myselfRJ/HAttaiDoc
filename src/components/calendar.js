import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';
import { Calendar } from 'react-native-calendars';
import {
    CUSTOMCOLOR,
    CUSTOMFONTFAMILY,
    CUSTOMFONTSIZE,
} from '../settings/styles';
import DocumentPicker from 'react-native-document-picker'
import { language } from '../settings/userpreferences';
import { Language } from '../settings/customlanguage';
import { SelectorBtn } from '../components';
import { commonstyles } from '../styles/commonstyle';

const CustomCalendar = (props) => {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const handleCancel = () => {
        setIsCalendarOpen(false);
    };

    const handleSelect = () => {
        setIsCalendarOpen(false);
    };

    return (
        <View style={styles.container}>
            <View
                style={{
                    alignSelf: 'flex-start',
                    width: '100%',
                }}>
                <SelectorBtn
                    label={Language[language]['dob']}
                    name="calendar"
                    onPress={() => setIsCalendarOpen(true)}
                    input={props.date}
                />
            </View>
            <Modal
                style={{ backgroundColor: CUSTOMCOLOR.white }}
                transparent={true}
                visible={isCalendarOpen}
                animationType="fade"
                onRequestClose={() => setIsCalendarOpen(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.calendarContainer}>
                        <Calendar
                            onDayPress={props.onpress}
                            markedDates={props.date ? { [props.date]: { selected: true } } : {}}
                        />

                        <View style={styles.modalButtonsContainer}>
                            <Pressable style={styles.cancelButton} onPress={handleCancel}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </Pressable>
                            <Pressable style={styles.selectButton} onPress={handleSelect}>
                                <Text style={styles.buttonText}>Select</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
        paddingVertical: 8,
        width: '100%',
        alignItems: 'center',
        gap: 8,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    calendarContainer: {
        height: 430,
        width: 400,
        paddingHorizontal: 32,
        backgroundColor: CUSTOMCOLOR.white,
        borderRadius: 8,
        elevation: 4,
    },
    modalButtonsContainer: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 16,

    },
    cancelButton: {
        padding: 8,
        borderRadius: 4,
    },
    selectButton: {
        padding: 8,
    },
    buttonText: {
        color: 'green',
    },
    DOBselect: {
        width: '100%',
        paddingHorizontal: 8,
    },
});

export default CustomCalendar;
