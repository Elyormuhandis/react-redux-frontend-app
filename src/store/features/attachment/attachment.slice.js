import { createSlice } from '@reduxjs/toolkit';
import {
  uploadFiles,
  baseUpdate,
  downloadFileFromFileSystem,
  getAllByFromDivision,
  getAllByToDivision,
  getOneReceivedFile,
  getOneSentFile,
  setPDTV,
  setView,
} from './attachment.actions';

const userToken = localStorage.getItem('Token')
  ? localStorage.getItem('Token')
  : null;

const initialState = {
  files: [],
  dragFileList: [],
  loading: false,
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
  progress: 0,
};

const attachmentSlice = createSlice({
  name: 'attachment',
  initialState,
  reducers: {
    setDragFileList: (state, { payload }) => {
      state.dragFileList.push({
        id: new Date().getTime() + state.dragFileList.length,
        file: payload,
        progress: 0,
        isSent: false,
      });
    },
    editDragFileList: (state, { payload }) => {
      state.dragFileList = [...payload];
    },
    clearDragFileList: (state) => {
      state.dragFileList = [];
    },
    setProgress: (state, { payload }) => {
      state.dragFileList.find((file) => file.id === payload.id).progress =
        payload.progress;
    },
  },

  extraReducers: (builder) => {
    //upload files
    builder.addCase(uploadFiles.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(uploadFiles.fulfilled, (state, { payload }) => {
      state.dragFileList.find(
        (file) => `[${file.file.name}]` === payload.message
      ).isSent = payload.success;
      state.loading = false;
      state.success = payload.success;
      state.message = payload.message;
    });
    builder.addCase(uploadFiles.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // getAllByFromDivision
    builder.addCase(getAllByFromDivision.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllByFromDivision.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.yuborilganFayllar = payload.sort(function (a, b) {
        return a.id - b.id || a.orginalName.localeCompare(b.orginalName);
      });
    });
    builder.addCase(getAllByFromDivision.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // getAllByToDivision
    builder.addCase(getAllByToDivision.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllByToDivision.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.kelganFayllar = payload.sort(function (a, b) {
        return a.id - b.id || a.orginalName.localeCompare(b.orginalName);
      });
    });

    builder.addCase(getAllByToDivision.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // setView
    builder.addCase(setView.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(setView.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.message = payload.message;
      state.success = payload.success;
      state.kelganFayllar = payload.object.sort(function (a, b) {
        return a.id - b.id || a.orginalName.localeCompare(b.orginalName);
      });
    });

    builder.addCase(setView.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // setPDTV
    builder.addCase(setPDTV.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(setPDTV.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.message = payload.message;
      state.success = payload.success;
      state.kelganFayllar = payload.object.sort(function (a, b) {
        return a.id - b.id || a.orginalName.localeCompare(b.orginalName);
      });
    });

    builder.addCase(setPDTV.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // getOneReceivedFile
    builder.addCase(getOneReceivedFile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getOneReceivedFile.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.oneReceivedFile = payload;
    });

    builder.addCase(getOneReceivedFile.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // getOneSentFile
    builder.addCase(getOneSentFile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getOneSentFile.fulfilled, (state, { payload }) => {
      state.loading = false;
      console.log(payload);
      state.oneSentFile = payload;
    });

    builder.addCase(getOneSentFile.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // downloadFileFromFileSystem
    builder.addCase(downloadFileFromFileSystem.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      downloadFileFromFileSystem.fulfilled,
      (state, { payload }) => {
        state.loading = false;
        // state.downloadFileFromFileSystem = payload
      }
    );

    builder.addCase(
      downloadFileFromFileSystem.rejected,
      (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      }
    );
    // Boshqarmaga fayl kelganmi yoki yo'qmi bilish uchun kerak
    builder.addCase(baseUpdate.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(baseUpdate.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = payload.success;
      state.isUpdate = payload.message;
    });

    builder.addCase(baseUpdate.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const {
  setDragFileList,
  editDragFileList,
  clearDragFileList,
  setProgress,
} = attachmentSlice.actions;
export default attachmentSlice.reducer;
