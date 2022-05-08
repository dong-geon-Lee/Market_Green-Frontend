import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

// const TOKEN = JSON.parse(localStorage.getItem("user"))?.accessToken;

// const config = {
//   headers: {
//     Authorization: `Bearer ${TOKEN}`,
//   },
// };

export const registerUser = createAsyncThunk(
  "user/register",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(API_URL + "/register", payload);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.messsage);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(API_URL + "/login", payload);

      localStorage.setItem("user", JSON.stringify(response.data));

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/update",
  async (payload, thunkAPI) => {
    console.log(payload, "목록");

    const { id } = payload;
    const TOKEN = thunkAPI.getState().user.user?.accessToken;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    };

    try {
      const response = await axios.put(API_URL + `/${id}`, payload, config);

      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/delete",
  async (payload, thunkAPI) => {
    const { id } = payload;

    const TOKEN = thunkAPI.getState().user.user.accessToken;

    const config = {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    };

    try {
      await axios.delete(API_URL + `/${id}`, config);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API_URL);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userToken = JSON.parse(localStorage.getItem("user"))
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: userToken,
  isLoading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
      state.isLoading = false;
      state.error = false;
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [registerUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [loginUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    [updateUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteUser.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteUser.fulfilled]: (state) => {
      localStorage.removeItem("user");

      state.isLoading = false;
      state.user = null;
      state.error = false;
    },
    [deleteUser.rejected]: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    [getUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = false;
    },
    [getUsers.rejected]: (state) => {
      state.isLoading = false;
      state.user = null;
      state.error = true;
    },
  },
});

export const { reset } = userSlice.actions;

export const userReducer = userSlice.reducer;
