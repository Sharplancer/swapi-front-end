import { createSlice } from "@reduxjs/toolkit";

const API_URL = 'https://swapi.dev/api/people';

const initialState = {
  error: '',
  users: [],
  counts: 0,
  next: '',
  previous: '',
  status: '',
}

const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    usersRequest(state, action) {
      state.error = '';
      state.status = 'pending';
    },
    usersRequestSuccess(state, action) {
      state.users = action.payload.results;
      state.count = action.payload.count;
      state.status = 'success';
    },
    usersRequestFailure(state, action) {
      state.error = action.payload;
      state.status = 'failure';
    },
    searchRequest(state, action) {
      state.error = '';
      state.status = 'pending';
    },
    searchRequestSuccess(state, action) {
      state.users = action.payload.results;
      state.count = action.payload.count;
      state.status = 'success';
    },
    searchRequestFailure(state, action) {
      state.error = action.payload;
      state.status = 'failure';
    }
  }
});

const userActions = usersSlice.actions;

export const fetchUsers = (pageNum) => {
  return async (dispatch) => {
    dispatch(userActions.usersRequest());
    try {
      const response = await fetch(`${API_URL}/?page=${pageNum}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || response.statusText);
      }

      dispatch(userActions.usersRequestSuccess(responseData));
    } catch (error) {
      dispatch(userActions.usersRequestFailure(error.message))
    }
  }
}

export const searchUsers = (search, currentPage) => {
  return async (dispatch) => {
    dispatch(userActions.searchRequest());
    try {
      const response = await fetch(`${API_URL}/?search=${search}&page=${currentPage}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || response.statusText);
      }

      dispatch(userActions.searchRequestSuccess(responseData));
    } catch (error) {
      dispatch(userActions.searchRequestFailure(error.message))
    }
  }
}

export default usersSlice;
