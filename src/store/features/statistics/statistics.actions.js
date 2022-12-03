import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const BASE_URL = "http://localhost:8080/attachmentStatistics/";



//Fayl ko'rilganligini yoki ko'rilmaganligini beradi (textni jirniy yoki oddiy qilish uchun)

export const getAllByCreatedAtBetween = createAsyncThunk(
  'user/getAllByCreatedAtBetween',
  async (id, { getState, rejectWithValue }) => {
    const body = {
      start:"2022-10-01",
      end:"2022-12-01"
    }
    try {
      const { userToken } = getState().user
      const { data } = await axios.get(
        `${BASE_URL}getAllByCreatedAtBetween`, 
        body,
        {
          headers: {
            'Content-Type': 'application/json',
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
export const getAllByCreatedAtBetweenToDivision = createAsyncThunk(
  'user/getAllByCreatedAtBetweenToDivision',
  async (args, { getState, rejectWithValue }) => {
    
    const body = {
      start: "2022-10-01",
      end: "2022-12-01",
      divisionId: 12
    };

    try {
      const { userToken } = getState().user
      const { data } = await axios.get(
        `${BASE_URL}getAllByCreatedAtBetweenToDivision`, 
        body,
        {
          headers: {
            'Content-Type': 'application/json',
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
export const getAllByCreatedAtBetweenFromDivision = createAsyncThunk(
  'user/getAllByCreatedAtBetweenFromDivision',
  async (id, { getState, rejectWithValue }) => {
    
    const body = {
      start: "2022-10-01",
      end: "2022-12-01",
      divisionId: 12
    };

    try {
      const { userToken } = getState().user
      const { data } = await axios.get(
        `${BASE_URL}getAllByCreatedAtBetweenFromDivision`, 
        body,
        {
          headers: {
            'Content-Type': 'application/json',
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

export const testRequest = createAsyncThunk(
  'user/getAllByCreatedAtBetweenFromDivision',
  async (args, {getState, rejectWithValue}) =>{
    var data = JSON.stringify({
      "start": "2022-10-01",
      "end": "2022-12-01",
      "divisionId": 12
    });
    
    var config = {
      method: 'get',
      url: 'http://localhost:8080/attachmentStatistics/getAllByCreatedAtBetweenToDivision',
      headers: { 
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrdWNobGlqYW5nY2hpIiwiaWF0IjoxNjY5ODc1NzczLCJleHAiOjE2Njk5NjIxNzMsInJvbGVzIjoiVVNFUiJ9.8MMRHAsIDba7tDdYsezGg2nMZfa4aEJ6uhKCLh5IwZvuX43p0qurLk5i_HuP7Ji940Jf0FJ_Nf7BwWsSDaK_MA', 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
)




