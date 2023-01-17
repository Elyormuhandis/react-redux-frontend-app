import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../url';

export const getDivisions = createAsyncThunk(
  'division/get',
  async (arg, { getState, rejectWithValue }) => {
    try {
      const { userToken } = getState().user;
      const { data } = await axios.get(`${BASE_URL}api/division`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      });
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
export const addDivision = createAsyncThunk(
  'division/add',
  async ({ name, active }, { getState, rejectWithValue }) => {
    try {
      const { userToken } = getState().division;
      const { data } = await axios.post(
        `${BASE_URL}api/division`,
        { name, active },
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
export const editDivision = createAsyncThunk(
  'division/edit',
  async ({ id, name, active }, { getState, rejectWithValue }) => {
    try {
      const { userToken } = getState().division;
      const { data } = await axios.put(
        `${BASE_URL}api/division/${id}`,
        { id, name, active },
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
export const deleteDivision = createAsyncThunk(
  'division/edit',
  async ({ id, name, active }, { getState, rejectWithValue }) => {
    console.log(id, name, active);
    try {
      const { userToken } = getState().division;
      const { data } = await axios.put(
        `${BASE_URL}api/division/${id}`,
        { id, name, active },
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
