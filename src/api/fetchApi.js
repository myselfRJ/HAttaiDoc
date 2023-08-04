import {getAccessToken} from '../redux/features/authenticate/authenticateSlice';

export const fetchApi = async (url, request) => {
  //const url = 'http://127.0.0.1:8000/api/v1/doctor-authenticate/generate-otp';

  try {
    const response = await fetch(url, request);
    return response;
  } catch (error) {
    console.error(error);
  }
  return {};
};
