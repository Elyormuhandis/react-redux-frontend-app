import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const BASE_URL = "http://localhost:8080/";


//Authentication User
export const userLogin = createAsyncThunk(
  'user/login',
  async ({ username, password }, { rejectWithValue }) => {
    
    try {
      const { data } = await axios.post(
        `${BASE_URL}api/auth/login`,
        { username, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
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


//get User by Id

export const getUser = createAsyncThunk(
  'user/getUserById',
  async ({id}, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { userToken } = getState().user
      const { data } = await axios.get(
        `${BASE_URL}api/user/?page=${id}`, 
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


//get Users by page 

export const getUsers = createAsyncThunk(
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



//add user asyncFunction
export const addUser = createAsyncThunk(
  'user/add',
  async ({ fullName, username, password, prePassword, divisionId, roleId }, { getState, rejectWithValue }) => {
    try {
      const { userToken } = getState().user
      const {data} = await axios.post(
        `${BASE_URL}api/user/addUser`,
        { fullName, username, password, prePassword, divisionId, roleId},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)


//edit Users 
export const editUser = createAsyncThunk(
  'user/editUser',
  async ({ fullName, username, password, prePassword, divisionId, roleId, id }, { getState, rejectWithValue }) => {
    try {
      const { userToken } = getState().user
      const { data } = await axios.put(
        `${BASE_URL}api/user/${id}`,
        { fullName, username, password, prePassword, divisionId, roleId}, 
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          }
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


//edit Users 
export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async ({ id }, { getState, rejectWithValue }) => {
    try {
      const { userToken } = getState().user
      const { data } = await axios.delete(
        `${BASE_URL}api/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          }
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


//get Roles
export const getRoles = createAsyncThunk(
  'user/getRoles',
  async (arg, { getState, rejectWithValue }) => {
    try {
      const { userToken } = getState().user
      const { data } = await axios.get(
        `${BASE_URL}api/role`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          }
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

//get Role by id 
export const getRole = createAsyncThunk(
  'user/getRole',
  async (args, { getState, rejectWithValue }) => {
    try {
      const { userToken } = getState().user
      const { data } = await axios.get(
        `${BASE_URL}api/user/role`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          }
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
