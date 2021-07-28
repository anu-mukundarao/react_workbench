import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GET_ERRORS } from "./types";
const md5 = require('md5');

export const RegisterUser = (userData, history) => dispatch => {

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    }
    axios
      .post("/signup", userData, { headers: headers })
      
      .then(res => {
        //console.log(res);
       // alert(JSON.stringify(res.data));
        if (res.data.status === 201) {
          toast('registered successfully. please sign in');
        } 
        else if(res.data.status === 409){
          toast(res.data.msg);
        }
        else if(res.data.status === 500){
          toast(res.data.msg);
        }
        else if(res.data.status === 400){
          toast(res.data.msg);
        }
      })
      .catch(err =>
        {
          toast('something went wrong');
        }
      );
  };

export const tokenHandler = (history) => dispatch=>{
  const token = localStorage.getItem('token');
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  }
  const URL = `/delToken`;
  axios.delete(URL, {
    headers: headers,
   userData:{
    token: token
   }
  })
  // axios
  //   .delete(url,  { headers: headers }, userData: {

  //   })
    
    .then(res => {
      if (res.data.status === 200 ) {
        history.push("/");
      } 
      else if (res.data.status === 401){
        toast(res.data.msg);
      }
      else if(res.data.status === 500){
        toast(res.data.msg);
      }
    })
    // .catch(err =>
    //   { 
    //     toast('something went wrong');
    // }
    // )
 } 
export const SigninUser = (userData, history) => dispatch => {

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    }
    axios
      .post("/login", userData, { headers: headers })
      .then(res => {
        if (res.data.status === 200 ) {
          history.push("/icons", localStorage.setItem('token', md5(res.data.token)));
         
        } 
        else if (res.data.status === 401){
          toast(res.data.msg);
        }
        else if(res.data.status === 500){
          toast(res.data.msg);
        }
      })
      .catch(err =>
        { 
          toast('something went wrong');
      }
      )
  }  

export const UpdatePass = (userData, history) => dispatch =>{
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  }
  //console.log(userData);
  axios
    .post("/forgetpass", userData, { headers: headers })
    .then(res => {
      // console.log(res);
      // console.log(res.data.status);
      if (res.data.status === '200') {
        toast(res.data.msg);
      } 
      else if (res.data.status === '401'){
        toast(res.data.msg);
      }
      else if(res.data.status === '500'){
        toast(res.data.msg);
      }
    })
    .catch(err =>
      { 
        toast('something went wrong');
      }
    )
  }
//businessprocess

export const createbusinessProcess = (captureData) => dispatch => {
    //console.log(captureData)
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    }
    axios.post('/createbusinessprocess', captureData, { headers: headers })
      .then(response => {
        toast(response.data.message)
        localStorage.setItem("axiosStatus",response.data);
        //return 123;
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      )
  }  

export const updatebusinessProcess = (captureData) => dispatch => {
    // console.log(captureData)
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    }

    axios.put('/updatebusinessprocess', captureData, { headers: headers })
      .then(response => {
        toast(response.data.message)
      })
    
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      )
  }    

export const deletebusinessProcess = (captureData) => dispatch => {
    // console.log(captureData);
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    }
    
    axios.put('/deletebusinessprocess', captureData, { headers: headers })
      .then(response => {
         toast(response.data.message)
      })

      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      )
  } 

//categories
export const createCategory = (captureData) => dispatch => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  }
  axios.post('/createcategory', captureData, { headers: headers })
      .then(response => {
        toast(response.data.message)
      })

      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      )
} 

export const updateCategory = (captureData) => dispatch => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  }
  axios.put('/updatecategory', captureData, { headers: headers })
      .then(response => {
        toast(response.data.message)
      })

      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      )
} 

export const deleteCategory = (captureData) => dispatch => {
  // console.log()
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  }
  axios.put('/deletecategory', captureData, { headers: headers })
      .then(response => {
        toast(response.data.message)
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      )
} 

//applications
export const createApplication = (captureData) => dispatch =>{
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  }
  axios.post('/createapplication', captureData, { headers: headers })
      .then(response => {
        toast(response.data.message)
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      )
} 

export const updateApplication = (captureData) => dispatch =>{
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  }
  axios.put('/updateapplication', captureData, { headers: headers })
      .then(response => {
        toast(response.data.message)
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      )
} 

export const deleteApplication = (captureData) => dispatch =>{
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  }
  axios.put('/deleteapplication', captureData, { headers: headers })
      .then(response => {
        toast(response.data.message)
      })

      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      )
} 

//bots

export const createBotStore = (captureData) => dispatch => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  }
  axios.post('/createbot', captureData, { headers: headers })
      .then(response => {
        toast(response.data.message)
      })

      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      )
} 

export const updateBotStore = (captureData) => dispatch => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  }
  axios.put('/updatebot', captureData, { headers: headers })
      .then(response => {
        toast(response.data.message)
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      )
} 

export const deleteBotStore = (captureData) => dispatch => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  }
  axios.put('/deletebot', captureData, { headers: headers })
      .then(response => {
        toast(response.data.message)
      })

      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      )
} 
  
//bots details

export const createBotDetails = (captureData) => dispatch =>{
  // console.log(captureData);
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  }
  axios.post('/createbotdetail', captureData, { headers: headers })
      .then(response => {
        console.log(response)
        toast(response.data.message)
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      )
}

export const updateBotDetails = (captureData) => dispatch =>{
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  }
  axios.put('/updatebotdetail', captureData, { headers: headers })
      .then(response => {
        toast(response.data.message)
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      )
}

export const deleteBotDetails = (captureData) => dispatch =>{
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  }
  axios.put('/deletebotdetail', captureData, { headers: headers })
      .then(response => {
        toast(response.data.message)
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      )
}
