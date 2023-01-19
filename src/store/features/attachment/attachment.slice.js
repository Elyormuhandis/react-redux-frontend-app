import { createSlice } from '@reduxjs/toolkit';
import {
  baseUpdate,
  downloadFileFromFileSystem,
  getAllByFromDivision,
  getAllByToDivision,
  getAllStatistics,
  getOneReceivedFile,
  getOneSentFile,
  setPDTV,
  setView,
  uploadFiles,
} from './attachment.actions';

const userToken = localStorage.getItem('Token')
  ? localStorage.getItem('Token')
  : null;

const initialState = {
  files: [],
  dragFileList: [],
  progress: 0,
  loading: false,
  loadingFile: false,
  message: '',
  yuborilganFayllar: [],
  oneReceivedFile: {},
  oneSentFile: {},
  kelganFayllar: [],
  downloadFileFromFileSystem: undefined,
  isUpdate: 'yoq',
  korildi: false,
  userToken,
  error: null,
  success: false,
};

const attachmentSlice = createSlice({
  name: 'attachment',
  initialState,
  reducers: {
    setDragFileList: (state, action) => {
      state.dragFileList = [...state.dragFileList, ...action.payload];
    },
    editDragFileList: (state, action) => {
      state.dragFileList = [...action.payload];
    },
    clearDragFileList: (state) => {
      state.dragFileList = [];
    },
    setProgress: (state, payload) => {
      state.progress = payload;
    },
  },

  extraReducers: {
    // upload files
    [uploadFiles.pending]: (state) => {
      state.loadingFile = true;
      state.error = null;
    },
    [uploadFiles.fulfilled]: (state, { payload }) => {
      state.loadingFile = false;
      state.success = payload.success;
      state.message = payload.message;
    },

    [uploadFiles.rejected]: (state, { payload }) => {
      state.loadingFile = false;
      state.error = payload;
    },

    // getAllByFromDivision
    [getAllByFromDivision.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getAllByFromDivision.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.yuborilganFayllar = payload.sort(function (a, b) {
        return a.id - b.id || a.orginalName.localeCompare(b.orginalName);
      });
    },

    [getAllByFromDivision.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // getAllByToDivision
    [getAllByToDivision.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getAllByToDivision.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.kelganFayllar = payload.sort(function (a, b) {
        return a.id - b.id || a.orginalName.localeCompare(b.orginalName);
      });
    },

    [getAllByToDivision.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // setView
    [setView.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [setView.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = payload.message;
      state.success = payload.success;
      state.kelganFayllar = payload.object.sort(function (a, b) {
        return a.id - b.id || a.orginalName.localeCompare(b.orginalName);
      });
    },

    [setView.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // setPDTV
    [setPDTV.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [setPDTV.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = payload.message;
      state.success = payload.success;
      state.kelganFayllar = payload.object.sort(function (a, b) {
        return a.id - b.id || a.orginalName.localeCompare(b.orginalName);
      });
    },

    [setPDTV.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // getOneReceivedFile
    [getOneReceivedFile.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getOneReceivedFile.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.oneReceivedFile = payload;
    },

    [getOneReceivedFile.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // getOneSentFile
    [getOneSentFile.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getOneSentFile.fulfilled]: (state, { payload }) => {
      state.loading = false;
      console.log(payload);
      state.oneSentFile = payload;
    },

    [getOneSentFile.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // downloadFileFromFileSystem
    [downloadFileFromFileSystem.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [downloadFileFromFileSystem.fulfilled]: (state, { payload }) => {
      state.loading = false;
      // state.downloadFileFromFileSystem = payload
    },

    [downloadFileFromFileSystem.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // Boshqarmaga fayl kelganmi yoki yo'qmi bilish uchun kerak
    [baseUpdate.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [baseUpdate.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = payload.success;
      state.isUpdate = payload.message;
    },

    [baseUpdate.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {
  setDragFileList,
  editDragFileList,
  clearDragFileList,
  setProgress,
} = attachmentSlice.actions;
export default attachmentSlice.reducer;
