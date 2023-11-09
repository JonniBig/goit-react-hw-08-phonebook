import { requestaddContact, requestdeleteContact } from 'services/api';
import axios from 'axios';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const instance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com/',
});
const setToken = token => {
  instance.defaults.headers.common.Authorization = 'Bearer ' + token;
};

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (formData, thunkApi) => {
    try {
      const { data } = await instance.post('/users/signup', formData);
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (formData, thunkApi) => {
    try {
      const { data } = await instance.post('/users/login', formData);
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const refreshThunk = createAsyncThunk(
  'auth/current',
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const token = state.auth.token;
    try {
      setToken(token);
      const { data } = await instance.get('/users/current');
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (newcontact, thunkApi) => {
    try {
      const addedContact = await requestaddContact(newcontact);
      return addedContact;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkApi) => {
    try {
      const deleteContact = await requestdeleteContact(id);
      return deleteContact;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const authInitialState = {
  userData: {
    name: null,
    email: null,
  },
  token: null,
  isSignedIn: false,
  isLoading: false,
  error: null,
};
const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,

  extraReducers: builder =>
    builder
      .addCase(registerThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.userData = action.payload.user;
        state.isSignedIn = true;
        state.isLoading = false;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loginThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.userData = action.payload.user;
        state.isSignedIn = true;
        state.isLoading = false;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(refreshThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refreshThunk.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.isSignedIn = true;
        state.isLoading = false;
      })
      .addCase(refreshThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addContact.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteContact.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(
          contact => contact.id !== action.payload.id
        );
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const authReducer = authSlice.reducer;
