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
  const {appointment_id} = route.params;
  const fetchConsultationPdf = async () => {
    const response = await fetchApi(URL.get_consultationPDF(appointment_id), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      setConsultationData(jsonData?.data?.file_url);
      if (jsonData?.data){
          setShow(true);
      }
    }
  };
  const [show, setShow] = useState(false);
  useEffect(() => {
    fetchConsultationPdf();
   
  }, []);

  const path = `${fileurl}${consultationData}`;
  return (
    <>
      {show && (
        <PDFViewer
            path={path}
        />
      )}
    </>
  );
};
export default PatientHistoryPdf;
