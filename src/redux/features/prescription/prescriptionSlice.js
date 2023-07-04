import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedComplaint: '',
    note: '',
    doctors: [
        {
            name: 'Dr. Raju',
            speciality: 'Cardiologists',
            phone: '9878965678',
        },
        {
            name: 'Dr. Muthu',
            speciality: 'Gynecologist',
            phone: '9767342167',
        },
        {
            name: 'Dr. Chitti',
            speciality: 'Endocrinologist',
            phone: '9100765472',
        },
    ],
    selectedDoctor: " ",
    vitalsData:{}
};

const prescriptionSlice = createSlice({
    name: 'prescription',
    initialState,
    reducers: {
        addCheifComplaint: (state, action) => {
            state.selectedComplaint = action.payload;
        },
        addNote: (state, action) => {
            state.note = action.payload
        },
        addDoctorRefer: (state, action) => {
            state.selectedDoctor = action.payload
        },
        addVitals:(state,action)=>{
            state.vitalsData =action.payload;
        }
        

    },
});
export const { addCheifComplaint, addNote, addDoctorRefer,addVitals} = prescriptionSlice.actions;
export default prescriptionSlice.reducer;