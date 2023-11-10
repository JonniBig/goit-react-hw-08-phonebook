import axios from 'axios';

const { createSlice, createAsyncThunk, isAnyOf } = require('@reduxjs/toolkit');

export const instance = axios.create({
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
  },
  {
    condition: (_, thunkApi) => {
      const state = thunkApi.getState();
      const token = state.auth.token;
      if (!token) return false;
      return true;
    },
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, thunkApi) => {
    try {
      const { data } = await instance.post('/users/logout');
      return data;
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
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.userData = action.payload.user;
        state.isSignedIn = true;
        state.isLoading = false;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.userData = action.payload.user;
        state.isSignedIn = true;
        state.isLoading = false;
      })
      .addCase(refreshThunk.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.isSignedIn = true;
        state.isLoading = false;
      })
      .addCase(logoutThunk.fulfilled, () => {
        return authInitialState;
      })
      .addMatcher(
        isAnyOf(
          logoutThunk.pending,
          loginThunk.pending,
          refreshThunk.pending,
          registerThunk.pending
        ),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          logoutThunk.rejected,
          loginThunk.rejected,
          refreshThunk.rejected,
          registerThunk.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      ),
});

export const authReducer = authSlice.reducer;
