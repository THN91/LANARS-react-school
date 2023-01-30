import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import API from '../../core/services/API';
import {IAlbum} from '../interfaces';
import {IAlbumState} from '../interfaces/StateSlices';
import {
  isFulfilled,
  isFulfilledAction,
  isPending,
  isPendingAction,
  isRejected,
  isRejectedAction,
} from '../helpers/helpersStore';


export const addAlbum = createAsyncThunk(
  'photo/addAlbum',
  async function (album: IAlbum, thunkAPI) {
    try {
      return await API.post('/api/albums', album) as IAlbum;
    } catch (error) {
      return thunkAPI.rejectWithValue('Error');
    }
  }
);

export const updateAlbum = createAsyncThunk(
  'photo/updateAlbum',
  async function (album: Required<IAlbum>, thunkAPI) {
    try {
      return await API.patch('/api/albums', album) as IAlbum;
    } catch (error) {
      return thunkAPI.rejectWithValue('Error');
    }
  }
);

export const getAlbum = createAsyncThunk(
  'photo/getAlbum',
  async function (id: number[] | undefined, thunkAPI) {
    try {
      if (Array.isArray(id) && id.length === 1 && id[0] !== 0) {
        return await API.get(`/api/albums?ids=${id}`) as IAlbum;
      }
      else {
        return await API.get(`/api/albums${id && id.length > 1 ? `?ids=${id}` : ''}`) as IAlbum[];
      }
    } catch (error) {
      return thunkAPI.rejectWithValue('Error');
    }
  }
);

export const deleteAlbum = createAsyncThunk(
  'photo/deleteAlbum',
  async function (id: number[], thunkAPI) {
    try {
      return await API.delete(`/api/albums?ids=${id.join()}`) as number[];
    } catch (error) {
      return thunkAPI.rejectWithValue('Error');
    }
  }
);

const initialState: IAlbumState = {
  album: [],
  loading: 'IDLE',
  error: '',
};

const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    clearAlbumState: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(addAlbum.fulfilled, (state, action) => {
        state.loading = 'SUCCEEDED';
        state.album.push(action.payload);
      })
      .addCase(updateAlbum.fulfilled, (state, action) => {
        state.loading = 'SUCCEEDED';
        state.album = state.album.map(album => album.id === action.payload.id ? action.payload : album);
      })
      .addCase(getAlbum.fulfilled, (state, action) => {
        state.loading = 'SUCCEEDED';
        state.album = Array.isArray(action.payload) ? action.payload : [action.payload];
      })
      .addCase(deleteAlbum.fulfilled, (state, action) => {
        state.loading = 'SUCCEEDED';
        state.album = action.payload.length === 1
          ? state.album.filter(item => item.id !== action.payload[0])
          : state.album = [];
      })
      .addMatcher(isPending, isPendingAction)
      .addMatcher(isFulfilled, isFulfilledAction)
      .addMatcher(isRejected, isRejectedAction);
  },
});

export const {clearAlbumState} = albumSlice.actions;

export default albumSlice.reducer;
