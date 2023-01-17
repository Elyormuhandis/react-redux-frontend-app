import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../url';

//Barcha keldi kettilar uchun ishlatiladi

export const getAllStatistics = createAsyncThunk(
  'user/getAllStatistics',
  async ({ start, end }, { getState, rejectWithValue }) => {
    try {
      const { userToken } = getState().user;
      const { data } = await axios.get(
        `${BASE_URL}statistics/getallbycreatedatbetween?start=${start}&&end=${end}}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

//Boshqarmadan ketganlarni logini olish uchun ishlatiladi

export const getAllStatisticsFromDivision = createAsyncThunk(
  'user/getAllStatisticsFromDivision',
  async ({ start, end, divisionId }, { getState, rejectWithValue }) => {
    try {
      const { userToken } = getState().user;
      const { data } = await axios.get(
        `${BASE_URL}statistics/getallbycreatedatbetweenfromdivision?start=${start}&&end=${end}&&divisionId=${divisionId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

//Boshqarmaga kelganlarni logini olish uchun ishlatiladi

export const getAllStatisticsToDivision = createAsyncThunk(
  'user/getAllStatisticsToDivision',
  async ({ start, end, divisionId }, { getState, rejectWithValue }) => {
    try {
      const { userToken } = getState().user;
      const { data } = await axios.get(
        `${BASE_URL}statistics/getallbycreatedatbetweentodivision?start=${start}&&end=${end}&&divisionId=${divisionId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
