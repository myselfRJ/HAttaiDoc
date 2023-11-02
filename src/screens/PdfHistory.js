import React, {useState, useEffect, useRef} from 'react';
import {View} from 'react-native';
import PDFViewer from '../components/PdfViewer';
import {useRoute} from '@react-navigation/native';
import {fetchApi} from '../api/fetchApi';
import {URL, fileurl} from '../utility/urls';
import {useSelector} from 'react-redux';

const PatientHistoryPdf = () => {
  const [consultationData, setConsultationData] = useState({});
  const token = useSelector(state => state.authenticate.auth.access);
  const route = useRoute();
  const {path} = route.params;
  const fetchConsultationPdf = async () => {
    const response = await fetchApi(URL.get_consultationPDF(appointment_id), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      setConsultationData(jsonData?.data?.file_url);
      if (jsonData?.data) {
        setShow(true);
      }
    }
  };
  // const [show, setShow] = useState(false);
  // useEffect(() => {
  //   fetchConsultationPdf();

  // }, []);

  const path_source = `${fileurl}${path}`;
  console.log('====path', path);
  return <PDFViewer path={path_source} />;
};
export default PatientHistoryPdf;
