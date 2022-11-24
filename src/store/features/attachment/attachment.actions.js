import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const BASE_URL = "http://localhost:8080/";

//upload Files
export const uploadFiles = createAsyncThunk(
  'attachment/upload',
  async ({toDivision, files}, { getState, rejectWithValue }) => {
    console.log(toDivision, files);
    try {
      const { userToken } = getState().user
      const formData = new FormData();
      files.forEach((file, idx) => {
        formData.append(`file${idx}`, file);
      });
   
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



//Boshqarmadan ketgan fayllar ro'yxatini olish uchun ishlatiladi

export const getAllByFromDivision = createAsyncThunk(
  'user/getAllByFromDivision',
  async (arg, { getState, rejectWithValue }) => {
    try {
      const { userToken } = getState().user
      const { data } = await axios.get(
        `${BASE_URL}attachment/getAllByFromDivision`, 
        {
          headers: {
            'Content-Type': 'application/json',
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

//Boshqarmaga kelgan fayllar ro'yxatini olish uchun ishlatiladi

export const getAllByToDivision = createAsyncThunk(
  'user/getAllByToDivision',
  async (arg, { getState, rejectWithValue }) => {
    try {
      const { userToken } = getState().user
      const { data } = await axios.get(
        `${BASE_URL}attachment/getAllByToDivision`, 
        {
          headers: {
            'Content-Type': 'application/json',
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



//Fayl ko'rilganligini yoki ko'rilmaganligini beradi (textni jirniy yoki oddiy qilish uchun)

export const setView = createAsyncThunk(
  'user/setView',
  async (id, { getState, rejectWithValue }) => {
    console.log(id);
    try {
      const { userToken } = getState().user
      const { data } = await axios.get(
        `${BASE_URL}attachment/setView/${id}`, 
        {
          headers: {
            'Content-Type': 'application/json',
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

//Fayl kelgani to'g'risida tasdiq beradi

export const setPDTV = createAsyncThunk(
  'user/setPDTV',
  async ({id}, { getState, rejectWithValue }) => {
    try {
      const { userToken } = getState().user
      const { data } = await axios.get(
        `${BASE_URL}attachment/setPDTV/${id}`, 
        {
          headers: {
            'Content-Type': 'application/json',
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

//Bitta kelgan faylni olish uchun ishlatiladi

export const getOneReceivedFile = createAsyncThunk(
  'user/getOneReceivedFile',
  async ({id}, { getState, rejectWithValue }) => {
    try {
      const { userToken } = getState().user
      const { data } = await axios.get(
        `${BASE_URL}attachment/getOneTo/${id}`, 
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


//Bitta ketgan faylni olish uchun ishlatiladi

export const getOneSentFile = createAsyncThunk(
  'user/getOneSentFile',
  async ({id}, { getState, rejectWithValue }) => {
    try {
      const { userToken } = getState().user
      const { data } = await axios.get(
        `${BASE_URL}attachment/getOneFrom/${id}`, 
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



//Faylni skachat qilish uchun ishlatiladi


export const downloadFileFromFileSystem = createAsyncThunk(
  'user/downloadFileFromFileSystem',
  async ({id, fileName}, { getState, rejectWithValue }) => {
    try {
      const { userToken } = getState().user
      const { data } = await axios.get(
        `${BASE_URL}attachment/downloadFileFromFileSystem/${id}`, 
        {
          responseType: 'blob',
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          // maxContentLength: Infinity,
          // maxBodyLength: Infinity
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.style='display:none'
          link.href = url;
          link.setAttribute('download', fileName); //or any other extension
          document.body.appendChild(link);
          link.click();
          link.remove();
          
      })

    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

//Fayl o'chiradi

export const deleteOneTo = createAsyncThunk(
  'user/deleteOneTo',
  async ({id}, { getState, rejectWithValue }) => {
    try {
      const { userToken } = getState().user
      const { data } = await axios.delete(
        `${BASE_URL}attachment/deleteOneTo/${id}`, 
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




