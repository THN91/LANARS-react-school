import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import API from '../../core/services/API';
import {IPhoto} from '../interfaces';
import {IPhotoState} from '../interfaces/StateSlices';
import {
  isFulfilled,
  isFulfilledAction,
  isPending,
  isPendingAction,
  isRejected,
  isRejectedAction,
} from '../helpers/helpersStore';


export const addPhoto = createAsyncThunk(
  'photo/addPhoto',
  async function (photo: IPhoto, thunkAPI) {
    try {
      return await API.post('/api/photos', photo) as IPhoto;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updatePhoto = createAsyncThunk(
  'photo/updatePhoto',
  async function (photo: Required<IPhoto>, thunkAPI) {
    try {
      return await API.patch('/api/photos', photo) as IPhoto;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getPhoto = createAsyncThunk(
  'photo/getPhoto',
  async function (id: number[] | undefined, thunkAPI) {
    try {
      if (Array.isArray(id) && id.length === 1 && id[0] !== 0) {
        return await API.get(`/api/photos?ids=${id}`) as IPhoto;
      } else {
        return await API.get(`/api/photos${id && id.length > 1 ? `?ids=${id}` : ''}`) as IPhoto[];
      }
    } catch (error) {
      return thunkAPI.rejectWithValue('Error');
    }
  }
);

export const deletePhoto = createAsyncThunk(
  'photo/deletePhoto',
  async function (id: number[], thunkAPI) {
    try {
      return await API.delete(`/api/photos?ids=${id.join()}`) as number[];
    } catch (error) {
      return thunkAPI.rejectWithValue('Error');
    }
  }
);

const initialState: IPhotoState = {
  photos: [],
  loading: 'IDLE',
  error: '',
  checkedPhoto: [],
  checked: {},
  isNew: {},
};

const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    clearPhotoState: () => initialState,
    clearIsNew: (state) => {
      state.isNew = {};
    },
    changeHeader: (state, action) => {
      state.checkedPhoto = action.payload;
    },
    setChecked: (state, action) => {
      state.checked = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addPhoto.fulfilled, (state, action) => {
        if (typeof action.payload.id === 'number') {
          state.isNew = {...state.isNew, [action.payload.id]: true};
        }
        state.photos.push(action.payload);
      })
      .addCase(updatePhoto.fulfilled, (state, action) => {
        state.loading = 'SUCCEEDED';
        state.photos = state.photos.map(photo => photo.id === action.payload.id ? action.payload : photo);
      })
      .addCase(getPhoto.fulfilled, (state, action) => {
        state.loading = 'SUCCEEDED';
        state.photos = Array.isArray(action.payload) ? action.payload : [action.payload];
      })
      .addCase(deletePhoto.fulfilled, (state, action) => {
        state.loading = 'SUCCEEDED';
        state.photos = action.payload.length === 1
          ? state.photos.filter(item => item.id !== action.payload[0])
          : state.photos = [];
      })
      .addMatcher(isPending, isPendingAction)
      .addMatcher(isFulfilled, isFulfilledAction)
      .addMatcher(isRejected, isRejectedAction);
  },
});

export const {clearPhotoState, changeHeader, setChecked, clearIsNew} = photoSlice.actions;

export default photoSlice.reducer;
