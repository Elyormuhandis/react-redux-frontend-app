import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const BASE_URL = "http://localhost:8080/";

//upload Files
export const uploadFiles = createAsyncThunk(
  'attachment/upload',
  async ({toDivision, files}, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { userToken } = getState().user
      //foreach not working with files
      const formData = new FormData();
      for(let i=0; i<files.length; i++){
         formData.append(`file${i}`, files[i]);
      }
   
      const { data } = await axios.post(
        `${BASE_URL}attachment/uploadFileToFileSystem?toDivision=${toDivision}`, 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userToken}`,
          },
        })
      console.log(data);
      return data
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)


//Fayl ko'rilganligini yoki ko'rilmaganligini beradi (textni jirniy yoki oddiy qilish uchun)

export const setView = createAsyncThunk(
  'user/getUsersByPage',
  async ({page=0}, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { userToken } = getState().user
      const { data } = await axios.get(
        `${BASE_URL}api/user/?page=0`, 
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
      return data
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)



