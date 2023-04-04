import { configureStore } from '@reduxjs/toolkit';

// slices
import userReducer from '../features/user/userSlice';

export default configureStore({
  reducer: {
    user: userReducer
  }
});