import axios from 'axios';
import { useSelector } from 'react-redux';
import store from '../redux/stores/store';
const globalurl=store.getState().url.url
const PostApi = async (url,req_data,secure) => {
  // const globalurl = useSelector((state) => state.url.url
  console.log(globalurl,"gl")
    const headers = {
        'Content-Type': 'application/json',
      };
      if (secure){
          headers['Authorization'] = 'Bearer '+global.user_session
      }
    const result = await axios.post(globalurl+url, 
 JSON.stringify(req_data),{headers}
    );
    console.log(result.status,headers)
    // console.log(data);
  
    return result;
  };

 const PostForm = async(url,form_data)=>{
  const globalurl = useSelector((state) => state.url.url)
    console.log(url,"url",form_data)
    const headers = { 
      'Authorization': 'Bearer '+global.user_session, 
      "Content-Type": "multipart/form-data"
    };
    const result = await axios.post(globalurl+url, 
      form_data,{headers}
         );
      return result;
  }

  const GetApi = async (url,secure) => {
    const globalurl = useSelector((state) => state.url.url)
    console.log(url,"url")
      const headers = {
          'Content-Type': 'application/json',
        };
        if (secure){
            headers['Authorization'] = 'Bearer '+global.user_session
        }
      const result = await axios.get(globalurl+url, 
      {headers}
      );
      console.log(result.status,headers)
      // console.log(data);
    
      return result;
    };
  export  {PostApi,PostForm,GetApi};