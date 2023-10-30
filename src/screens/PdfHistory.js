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
  console.log('=======>', appointment_id);
  const fetchConsultationPdf = async () => {
    const response = await fetchApi(URL.get_consultationPDF(appointment_id), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      setConsultationData(jsonData?.data);
    }
  };
  const [show, setShow] = useState(false);
  useEffect(() => {
    fetchConsultationPdf();
    setShow(true);
  }, []);

  const path = `${fileurl}${consultationData?.file_url}`;
  console.log(path);
  return (
    <>
      {show && (
        <PDFViewer
          //   path={path}
          path={
            'http://10.9.64.61:8000/media/uploads/ConsultationPdf/9444537826_sipzRac.pdf'
          }
        />
      )}
    </>
  );
};
export default PatientHistoryPdf;
