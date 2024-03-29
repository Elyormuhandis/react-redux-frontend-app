import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../url';
import { setProgress } from './attachment.slice';

//upload Files
//upload Files
export const uploadFiles = createAsyncThunk(
  'attachment/upload',
  async ({ toDivision, file }, { getState, rejectWithValue, dispatch }) => {
    try {
      const { userToken } = getState().user;
      const formData = new FormData();
      formData.append(`file-${file.file.name}`, file.file);
      const { data } = await axios.post(
        `${BASE_URL}attachment/uploadFileToFileSystem?toDivision=${toDivision}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userToken}`,
          },
          onUploadProgress: (e) => {
            const progressInfo = {
              id: file.id,
              progress: Math.round((100 * e.loaded) / e.total),
            };
            dispatch(setProgress(progressInfo));
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

//Boshqarmadan ketgan fayllar ro'yxatini olish uchun ishlatiladi

export const getAllByFromDivision = createAsyncThunk(
  'attachment/getAllByFromDivision',
  async (arg, { getState, rejectWithValue }) => {
    try {
      const { userToken } = getState().user;
      const { data } = await axios.get(
        `${BASE_URL}attachment/getAllByFromDivision`,
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

//Boshqarmaga kelgan fayllar ro'yxatini olish uchun ishlatiladi

export const getAllByToDivision = createAsyncThunk(
  'attachment/getAllByToDivision',
  async (arg, { getState, rejectWithValue }) => {
    try {
      const { userToken } = getState().user;
      const { data } = await axios.get(
        `${BASE_URL}attachment/getAllByToDivision`,
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

//Fayl ko'rilganligini yoki ko'rilmaganligini beradi (textni jirniy yoki oddiy qilish uchun)

export const setView = createAsyncThunk(
  'attachment/setView',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { userToken } = getState().user;
      const { data } = await axios.get(`${BASE_URL}attachment/setView/${id}`, {
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

//Fayl kelgani to'g'risida tasdiq beradi

export const setPDTV = createAsyncThunk(
  'attachment/setPDTV',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { userToken } = getState().user;
      const { data } = await axios.get(`${BASE_URL}attachment/setPDTV/${id}`, {
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

//Bitta kelgan faylni olish uchun ishlatiladi

export const getOneReceivedFile = createAsyncThunk(
  'attachment/getOneReceivedFile',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { userToken } = getState().user;
      const { data } = await axios.get(`${BASE_URL}attachment/getOneTo/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
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

//Bitta ketgan faylni olish uchun ishlatiladi

export const getOneSentFile = createAsyncThunk(
  'attachment/getOneSentFile',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { userToken } = getState().user;
      const { data } = await axios.get(
        `${BASE_URL}attachment/getOneFrom/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
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

//Faylni skachat qilish uchun ishlatiladi

export const downloadFileFromFileSystem = createAsyncThunk(
  'attachment/downloadFileFromFileSystem',
  async ({ id, fileName }, { getState, rejectWithValue }) => {
    try {
      const { userToken } = getState().user;
      const { data } = await axios
        .get(`${BASE_URL}attachment/downloadFileFromFileSystem/${id}`, {
          responseType: 'blob',
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.style = 'display:none';
          link.href = url;
          link.setAttribute('download', fileName); //or any other extension
          document.body.appendChild(link);
          link.click();
          link.remove();
        });
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

//Fayl o'chiradi

export const deleteOneTo = createAsyncThunk(
  'attachment/deleteOneTo',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { userToken } = getState().user;
      const { data } = await axios.delete(
        `${BASE_URL}attachment/deleteOneTo/${id}`,
        {
          headers: {
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
//Boshqarmaga fayl kelganmi yoki yo'qmi bilish uchun kerak

export const baseUpdate = createAsyncThunk(
  'attachment/deleteOneTo',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { userToken } = getState().user;
      const { data } = await axios.get(
        `${BASE_URL}baseUpdate/updatedBoolean?divisionId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
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
