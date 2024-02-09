import React, {useState, useEffect, useRef} from 'react';
import {View} from 'react-native';
import PDFViewer from '../components/PdfViewer';
import {useRoute} from '@react-navigation/native';
import {fetchApi} from '../api/fetchApi';
import {URL, fileurl} from '../utility/urls';
import {useSelector} from 'react-redux';
import {fetchPdfAndSaveToLocalFile} from '../utility/const';

const PatientHistoryPdf = () => {
  const [consultationData, setConsultationData] = useState({});
  const token = useSelector(state => state.authenticate.auth.access);
  const route = useRoute();
  const {path} = route.params;
  return <PDFViewer path={path} />;
};
export default PatientHistoryPdf;
